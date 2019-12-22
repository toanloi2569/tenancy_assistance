var FormData = require('form-data');

var Contract = require('../schema/contract')
var User = require('../schema/user')
var Post = require('../schema/post')

var KeyController = require('../controller/keyController')
var ContractController = require('../controller/contractController')

var settings = require('../config/setting')

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
        tenantID: req.body.tenanID,
        tenantAdress: req.body.tenanAdress,

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
    contract_id = req.params._id

    var privateKey
    await User.findById(user_id, function(err, data) {
        if (err) return next(err)
        privateKey = data.privateKey
    })

    contract = await Contract.findById(contract_id).exec() 
    content = getContent(contract)
    contentHashed = await KeyController.hashText(content)
    signature = await KeyController.privateEncrypt(privateKey, contentHashed)

    if (req.user.role == 'Tenant') {
        contract.tenantSign = signature
    } else {
        contract.landlordSign = signature
    }

    contract.save(function(err) {
        if (err) return next(err)
        req.send(contract)
    })
}

exports.storeContractToBlockChain = async function storeContract() {
    var authorization = await getAuth(req.params.username, req.params.password)

    contract = await Contract.findById(req.params.contract_id).exec()
    landlord = await User.findById(contract.landlord_id).exec()
    tenant = await User.findById(contract.tenant_id).exec()

    var form_data = new FormData()
    form_data.append("so_cmt_chu_nha", landlord.ID)
    form_data.append("so_cmt_nguoi_thue_nha", tenant.ID)
    form_data.append("public_key_chu_nha", landlord.publicKey)
    form_data.append("public_key_nguoi_thue_nha", tenant.publicKey)
    form_data.append("noi_dung_hop_dong", ContractController.getContent(contract))
    form_data.append("ngay_bat_dau", contract.timeStart)
    form_data.append("ngay_ket_thuc", contract.timeEnd)
    form_data.append("idv_chu_nha", landlord.idv)
    form_data.append("idv_nguoi_thue_nha", tenant.idv)
    form_data.append("id_chu_nha", landlord._id)
    form_data.append("id_nguoi_thue_nha", tenant._id)

    await store(authorization, form_data).then(response => {
        contract_info = {
            timeStart : contract.timeStart,
            timeEnd : contract.timeEnd,
            time : time,
            landlord : landlord.name,
            tenant : tenant.name,
            idv_contract : response.data.id,
        }
        landlord.contracts_info.push(contract_info)
        tenant.contracts_info.push(contract_info)

        landlord.save().exec()
        tenant.save().exec()
        res.send(response.data)
    })
}

exports.getContractFromBlockChain = async function(req, res) {
    axios.get(settings.vChainPortContract + "/ContractInfo/get?id=" + req.params.idv_contract)
        .then(data => {
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

    contentDecoded = KeyController.publicDecrypt(publicKey, signature)
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
        "password" : username,
        "username" : password,
    }).then(res => {
        return res.data.authorization
    })
    .catch(err => {
        return err
    })
}

exports.getContent = function getContent(contract) {
    content = `
    {'content' : [
        {'Đại diện hợp đồng bên A' : [                             
            {'Họ tên chủ trọ' : '${contract.landlordName}'},         
            {'Số điện thoại' : '${contract.landlordPhone}'},          
            {'Số chứng minh thư' : '${contract.landlordID}'},          
            {'Địa chỉ thường trú' : '${contract.landlordAddress}'},
        ]},

        {'Đại diện hợp đồng bên B' : [                             
            {'Họ tên người thuê trọ' : '${contract.tenantName}'},      
            {'Số điện thoại' : '${contract.tenantPhone}'},             
            {'Số chứng minh thư' : '${contract.tenantID}'},            
            {'Địa chỉ thường trú' : '${contract.tenanAdress}'},
        ]},

        {'Nội dung hợp đồng' : [                                   
            {'Nơi cho thuê trọ' : '${contract.address}'},              
            {'Đặc điểm' : '${contract.feature}'},                   
            {'Diện tích cho thuê' : '${contract.square}'},
        ]},

        {'Cam kết' : [                                          
            { 'Bên A' : 'Bên A đồng ý cho bên B thuê căn nhà này với mục đích và hiện trạng nêu như trên' }
            { 'Bên B' : 'Bên B đồng ý thuê nhà bên A bới toàn bộ hiện trạng và mục đích sử dụng như trên' }
        ]},    

        {'Thời hạn hợp đồng' : [                                 
            {'Ngày bắt đầu' : '${contract.timeStart}'                
            {'Thời gian' : '${contract.time} tháng'
        ]},                  

        {'Giá tiền cho thuê' : '${contract.price}'},

        {'Các điều khoản trong hợp đồng': '[
    `
    for (i = 0; i < contract.length; i++) {
        content += `'Điều khoản ${i}' : '${contract.rule[i]}'`
    }
    content += `]'}]}`
    return content
}
