var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contract = new Schema({
    landlord_id: { type: Schema.Types.ObjectId, required: true },
    tenant_id: { type: Schema.Types.ObjectId },

    /* Landlord Info*/
    landlordName: { type: String, require: true },
    landlordPhone: { type: String, require: true },
    landlordEmail: { type: String },
    landlordID: { type: String, require: true },
    landlordAddress: { type: String, require: true },

    /* Tenant Info */
    tenantName: { type: String },
    tenantPhone: { type: String },
    tenanEmail: { type: String },
    tenanID: { type: String },
    tenanAdress: { type: String },

    /* Contract */
    address: { type: String, require: true },
    feature: { type: String, require: true },
    square: { type: Number, require: true },
    price: { type: Number, require: true },
    timeStart: { type: Date, require: true },
    time: { type: String, require: true },

    rule: [{ type: String }],

    landlordSign : {type: String},
    tenantSign : {type: String}
})

Contract.virtual('timeEnd')
    .get(function () {
        return this.timeStart.getMonth() + this.time
    })

module.exports = mongoose.model('Contract', Contract);