var Contract = require('../schema/contract')
var User = require('../schema/user')
var Post = require('../schema/post')
var KeyController = require('../controller/keyController')

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

    Contract.findById(contract_id, async function (err, contract) {
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
    })
}

exports.storeContract = function storeContract() {
    
}

exports.getContent = function getContent(contract) {
    content = `
        Đại diện hợp đồng bên A                             \n
        Họ tên chủ trọ : ${contract.landlordName}           \n
        Số điện thoại : ${contract.landlordPhone}           \n
        Số chứng minh thư : ${contract.landlordID}          \n
        Địa chỉ thường trú : ${contract.landlordAddress}    \n\n

        Đại diện hợp đồng bên B                             \n
        Họ tên người thuê trọ : ${contract.tenantName}      \n
        Số điện thoại : ${contract.tenantPhone}             \n
        Số chứng minh thư : ${contract.tenantID}            \n
        Địa chỉ thường trú : ${contract.tenanAdress}        \n\n

        Nội dung hợp đồng                                   \n    
        Nơi cho thuê trọ : ${contract.address}              \n
        Đặc điểm : ${contract.feature}                      \n
        Diện tích cho thuê : ${contract.square}             \n\n

        Cam kết :                                           \n
        Bên A đồng ý cho bên B thuê căn nhà này với mục đích và hiện trạng nêu như trên \n
        Bên B đồng ý thuê nhà bên A bới toàn bộ hiện trạng và mục đích sử dụng như trên \n\n

        Thời hạn hợp đồng :                                 \n
        Ngày bắt đầu : ${contract.timeStart}                \n
        Thời gian : ${contract.time} tháng                  \n\n

        Giá tiền cho thuê : ${contract.price}               \n\n

        Các điều khoản trong hợp đồng:                      \n
    `
    for (i = 0; i < contract.length; i++) {
        content += contract.rule[i] + '\n'
    }
    return content
}
