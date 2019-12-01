var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
const jwt = require('jsonwebtoken')

var Schema = mongoose.Schema;

var User = new Schema({
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
        enum: [1, 2]
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
            type: String,
            required: true
        }
    }],
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

User.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

User.statics.findByCredentials = async function(user_name, password) {
    // Search for a user by user_name and password.
    const user = await User.findOne({ user_name} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

User.methods.comparePassword = function(passwordAttempt, cb){

    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){

        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });

}

// cái đm mongodb #$%@#$%@#$^
// module.exports = mongoose.model('User', User);

try {
    exports.getModel = ()=> mongoose.model('User', userSchema)
 } catch (err){ exports.getModel = ()=> mongoose.model('User')}