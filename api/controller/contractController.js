var FormData = require('form-data');

var Contract = require('../schema/contract')
var User = require('../schema/user')
var Post = require('../schema/post')

var KeyController = require('../controller/keyController')

var settings = require('../config/setting')
var axios = require('axios')

exports.fillContract = function (req, res, next) {
    contract = new Contract({
    
        landlord_id : req.body.landlord_id,
        tenant_id : req.user._id,

        /* Landlord Info*/
        landlordName: req.body.landlordName,
        landlordPhone: req.body.landlordPhone,
        landlordID: req.body.landlordID,
        landlordAddress: req.body.landlordAddress,

        /* Tenant Info */
        tenantName: req.body.tenantName,
        tenantPhone: req.body.tenantPhone,       
        tenantID: req.body.tenantID,
        tenantAddress: req.body.tenantAddress,

        /* Contract */
        address: req.body.address,
        feature: req.body.feature,
        square: req.body.square,
        price: req.body.price,
        timeStart: req.body.timeStart,
        time: req.body.time,

        rule: req.body.rule,
    })
    contract.save(function(err){
        if (err) {return next(err)}
    })
    res.status(200).send({"contract" : contract})
}

exports.getContracts = function(req, res, next) {
    Contract.find({landlord_id : req.user._id}, function(err, contracts) {
        if (err) return err

        var count = 0
        for (i = 0; i < contracts.length; i++) {
            if (!contracts[i].status) {
                count ++
            }
        }
        
        res.send({"contracts" : contracts, "no_read" : count})
    })
}

exports.checkContractAfterFill = function(req, res, next) {
    Contract.findById(req.params.contract_id, function(err, contract) {
        if (err) return err
        contract.status = true
        contract.save(function(err) {
            return err
        })
        res.send(contract)
    })
}

exports.getContractInfo = function(req, res, next) {
    var contract_id     
    Post.findById(req.params.post_id, function(err, post){
        contract_id = post.contract_id
        Contract.findById(contract_id, function(err, contract) {
            if (err) return next(err)
            res.send(contract)
        })
    })
}

exports.sign = async function(req, res, next) {
    user_id = req.user._id
    contract_id = req.params.contract_id

    var privateKey
    var publicKey
    await User.findById(user_id, function(err, data) {
        if (err) return next(err)
        privateKey = data.privateKey
        publicKey = data.publicKey
    })

    contract = await Contract.findById(contract_id).exec() 
    
    content = getContent(contract)
    contentHashed = await KeyController.hashText(content)
    contentHashed = Buffer.from(contentHashed, 'hex')
    signature = await KeyController.privateEncrypt(privateKey, contentHashed)
    signature = signature.toString('hex')

    if (req.user.role == 'Tenant') {
        contract.tenantSign = signature
    } else {
        contract.landlordSign = signature
    }

    contract.save(function(err) {
        if (err) return next(err)
    })
    res.send(contract)
}

exports.storeContractToBlockChain = async function storeContract(req, res) {
    console.log(req.params);
    
    var authorization 
    await getAuth(req.params.username, req.params.password).then(response => {
        authorization = response.data.authorization
    })
    
    contract = await Contract.findById(req.params.contract_id).exec()
    landlord = await User.findById(contract.landlord_id).exec()
    tenant = await User.findById(contract.tenant_id).exec()

    data = {
        "so_cmt_chu_nha" :  landlord.ID,
        "so_cmt_nguoi_thue_nha": tenant.ID,
        "public_key_chu_nha" : landlord.publicKey,
        "public_key_nguoi_thue_nha" : tenant.publicKey,
        "noi_dung_hop_dong" : getContent(contract),
        "ngay_bat_dau": contract.timeStart,
        "ngay_ket_thuc" : contract.timeEnd,
        "idv_chu_nha" : landlord.idv,
        "idv_nguoi_thue_nha" : tenant.idv,
        "id_chu_nha" : String(landlord._id),
        "id_nguoi_thue_nha" : String(tenant._id),
    }
    
    await store(authorization, data).then(async response => {
        contract_info = {
            timeStart : contract.timeStart,
            timeEnd : contract.timeEnd,
            time : contract.time,
            landlord : landlord.name,
            tenant : tenant.name,
            idv_contract : response.data.id,
        }
        landlord.contracts_info.push(contract_info)
        tenant.contracts_info.push(contract_info)

        landlord.save()
        tenant.save()
        
        res.send(response.data)
    })
}

exports.getContractFromBlockChain = async function(req, res) {
    axios.get(settings.vChainPortContract + "/ContractInfo/get?id=" + req.params.idv_contract)
        .then(data => {
            data.noi_dung_hop_dong = JSON.stringify(data.noi_dung_hop_dong)
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getValidContract = async function(req, res) {
    vContract   = await axios.get(settings.vChainPortContract + "/ContractInfo/get?id=" + req.params.idv_contract)

    landlord    = await User.findById(vContract.id_chu_nha)
    tenant      = await User.findById(vContract.id_nguoi_thue_nha)

    vLandlord   = await axios.get(settings.vChainPort + "/UserInfo/get?id=" + vContract.idv_chu_nha)
    vTenant     = await axios.get(settings.vChainPort + "/UserInfo/get?id=" + vContract.idv_nguoi_thue_nha)

    contentHashed = await KeyController.hashText(vContract.noi_dung_hop_dong)
    
    res.send({  
            "vContract" : vContract, 
            "landlord" : landlord, 
            "tenant" : tenant, 
            "vLandlord" : vLandlord, 
            "vTenant" : vTenant,
            "contentHashed" : contentHashed,
        })
}

exports.validContract = function(req, res) {
    signature = req.params.signature,
    publicKey = req.params.publicKey
    signature = Buffer.from(signature, 'hex')
    
    contentDecoded = KeyController.publicDecrypt(publicKey, signature)
    contentDecoded = contentDecoded.toString('hex')
    res.send(contentDecoded)
}

function store(authorization, form_data) {
    return axios.post(
        settings.vChainPortContract + "/ContractInfo/create",
        form_data, {
            headers: {
                Authorization : authorization,
            }
        }).catch(err => {
            console.log(err);
        })
}

function getAuth(username, password) {
    return axios.post(settings.vChainPortContract + '/authentication', {
        "password" : password,
        "username" : username,
    }).catch(err => {
        return err
    })
}

function getContent(contract) {
    content = `{`+             
        `landlordName : '${contract.landlordName}',`+      
        `landlordPhone : '${contract.landlordPhone}',`+          
        `landlordID : '${contract.landlordID}',`+         
        `landlordAddress : '${contract.landlordAddress}',`+                          
        `tenantName : '${contract.tenantName}',`+      
        `tenantPhone : '${contract.tenantPhone}',`+             
        `tenantID : '${contract.tenantID}',`+            
        `tenantAddress : '${contract.tenanAdress}',`+                              
        `address : '${contract.address}',`+             
        `feature : '${contract.feature}',`+                   
        `square : '${contract.square}',`+                          
        `timeStart : '${contract.timeStart}',`+            
        `time : '${contract.time}'}`
    
    return content
}

exports.getContent = {getContent}