// var New = require('../schema/new')
// var User = require('../schema/user')
var User = require('../schema/user')
const bcrypt = require('bcrypt')

exports.createUser = async function(req,res) {

    id_comment = (req.body.id_comment == undefined) ? null : req.body.id_comment.split(',')
    var user = new User ({
        user_name: req.body.user_name,
        role: Number(req.body.role),
        star: Number(req.body.star),
        number_rated: Number(req.body.number_rated),
        id_comment: id_comment,
        name: req.body.name,
        password: req.body.password

    });
    const token = await user.generateAuthToken();
    user.save(function (err) {
        if (err) {return next(err);}
        console.log("Luu thanh cong");
        res.status(201).send({ user, token });
    })
}


exports.registerUser = function(req, res, next){   
    User.findOne({cmt: req.body.cmt, role: Number(req.body.role)}, async function (err, user) {
        if(user == null){ //Kiểm tra xem cmt đã được sử dụng chưa
            var user = new User ({
                user_name: req.body.user_name,
                role: Number(req.body.role),
                cmt: Number(req.body.cmt),
                name: req.body.name,
                password: req.body.password
                
            });
            console.log("L65465");
            const token = await user.generateAuthToken();
            user.save(function (err) {
                if (err) {return next(err);}
                console.log("Luu thanh cong");
                res.status(201).send({ user, token });
            })
        }else{
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}

exports.loginUser = async function(req, res) {
    //Login a registered user
    try {
        const { user_name, password } = req.body
        const user = await User.findByCredentials(user_name, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.profileUser = async function(req, res) {
    // View logged in user profile
    res.send(req.user)
}

exports.logoutUser = async function (req, res) {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.logoutallUser = async function(req, res) {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}