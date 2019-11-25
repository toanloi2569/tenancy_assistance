var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var New = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    square: {type: Number, required: true},
    price: {type: Number, require: true},
    district: {type: String, required: true},
    ward: {type: String, required: true},

    address: {type: String, required: true},
    phone: {type: Number, required: true},
    
    image: {type: String},
    content: {type: String, require: true}
})


module.exports = mongoose.model('New', New);