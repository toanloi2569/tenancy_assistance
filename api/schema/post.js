var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    user_id: {type: Schema.Types.ObjectId, required: true},
    square: {type: Number, required: true},
    price: {type: Number, require: true},
    district: {type: String, required: true},
    ward: {type: String, required: true},

    address: {type: String, required: true},
    phone: {type: String, required: true},
    
    image: {type: String},
    content: {type: String, require: true},

    availability: {type: Boolean, require: true},
    date: {type: Date, require: true}
})


module.exports = mongoose.model('Post', Post);