var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    role: {type: Number, enum: [1, 2]},
    star: {type: Number},
    number_rated: {type: Number},
    id_comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    name: {type: String, required: true},
    anh: {type: String, required: true},
    cmt: {type: String, required: true},
    password: {type: String, required: true, trim: true, minlength: 6},
})

User
    .virtual('star_avg')
    .get(function(){
        if (this.number_rated != 0) {
            return Math.round(this.star / this.number_rated)
        } 
        else {
            return 'Người dùng chưa được đánh giá'
        }
    })

module.exports = mongoose.model('User', User);