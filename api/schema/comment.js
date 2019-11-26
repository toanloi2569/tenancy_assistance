var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    user_id: {type: Schema.Types.ObjectId, required: true},
    content: {type: String, required: true}
})

module.exports = mongoose.model('Comment', Comment);