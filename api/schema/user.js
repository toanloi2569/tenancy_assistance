var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var settings = require('../config/setting')

var Schema = mongoose.Schema;

var User_schema = new Schema({
    user_name: {
        type: String,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },

    role: {
        type: Number,
        enum: [1, 2],
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
    },

    messages: [{
        type: Object,
        sender: Schema.Types.ObjectId,
        is_contract: Boolean,
        contract: {
            content: String,
            sign1: String,
            sign2: String,
        }
    }],

    tokens: [{
        token: {
            type: String
        }
    }],
})

User_schema.virtual('star_avg')
    .get(function () {
        if (this.number_rated != 0) {
            return Math.round(this.star / this.number_rated)
        }
        else {
            return 'Người dùng chưa được đánh giá'
        }
    })

User_schema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

User_schema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id, role: user.role }, settings.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

User_schema.statics.findByCredentials = function (user_name, password) {
    // Search for a user by user_name and password.
    console.log("inside")
    const f_user = User.findOne({ user_name : user_name }, async function (err, user) {
        if (err) console.log(err);
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        var isPasswordMatch = await bcrypt.compare(password, user.password)
        
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        console.log(isPasswordMatch)
        return user
    })
    return f_user
}

User_schema.methods.comparePassword = function (passwordAttempt, cb) {

    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {

        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });

}

// cái đm mongodb #$%@#$%@#$^
User = mongoose.model('User', User_schema);
module.exports = User
// try {
//     exports.getModel = ()=> mongoose.model('User', User)
//  } catch (err){ exports.getModel = ()=> mongoose.model('User')}