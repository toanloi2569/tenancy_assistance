var Contract = require('../schema/contract')

exports.createContract = function (req, res, next) {
    contract = new Contract({
        landlord_id : (req.body.landlord_id == undefined) ? req.user._id : req.body.landlord_id,
        tenant_id : (req.body.landlord_id == undefined) ? undefined : req.user._id,

        /* Landlord Info*/
        landlordName: req.body.landlordName,
        landlordPhone: req.body.landlordPhone,
        landlordEmail: req.body.landlordPhone,
        landlordID: req.body.landlordID,
        landlordAddress: req.body.landlordAddress,

        /* Tenant Info */
        tenantName: req.body.tenantName,
        tenantPhone: req.body.tenantPhone,
        tenanEmail: req.body.tenanEmail,
        tenanID: req.body.tenanID,
        tenanAdress: req.body.tenanAdress,

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
