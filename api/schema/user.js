var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var settings = require('../config/setting')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, },
    password: { type: String, required: true, trim: true, minlength: 6 },

    name: { type: String, required: true },
    phone: { type: String, require: true },
    email: { type: String, require: true, },
    ID: { type: String, require: true },
    role: { type: String, enum: ['Tenant', 'Host'], required: true },

    idv: { type: String, require: true },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },

    star: { type: Number },
    number_rated: { type: Number },
    id_comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

    tokens: [{
        token: {
            type: String
        }
    }],
})

UserSchema.virtual('star_avg')
    .get(function () {
        if (this.number_rated != 0) {
            return Math.round(this.star / this.number_rated)
        }
        else {
            return 'Người dùng chưa được đánh giá'
        }
    })

UserSchema.pre('save', function (next) {
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

UserSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id, role: user.role }, settings.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = function (username, password) {
    const f_user = User.findOne({ username: username }, async function (err, user) {
        if (err) console.log(err);
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        var isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        return user
    })
    return f_user
}

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {

        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
}

User = mongoose.model('User', UserSchema);
module.exports = User;
