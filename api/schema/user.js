var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var User = new Schema({

    user_name: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: Number, 
        required: true
    },

    star: {
        type: Number
    },

    number_rated: {
        type: Number
    },

    id_comment: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],

    name: {
        type: String, 
        required: true
    }
})

User.virtual('star_avg')
    .get(function(){
        if (this.number_rated != 0) {
            return Math.round(this.star / this.number_rated)
        } 
        else {
            return 'Người dùng chưa được đánh giá'
        }
    })

User.pre('save', function(next){

    var user = this;
    var SALT_FACTOR = 5;

    if(!user.isModified('password')){
        return next();
    } 

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){

        if(err){
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash){

            if(err){
                return next(err);
            }

            user.password = hash;
            next();

        });

    });

});

User.methods.comparePassword = function(passwordAttempt, cb){

    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){

        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });

}
    
module.exports = mongoose.model('User', User);