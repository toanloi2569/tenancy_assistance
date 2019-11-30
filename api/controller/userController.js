// var New = require('../schema/new')
// var User = require('../schema/user')
var User = require('../schema/user')
const bcrypt = require('bcrypt')

exports.createUser = function(req,res) {

    id_comment = (req.body.id_comment == undefined) ? null : req.body.id_comment.split(',')
    var user = new User ({
        user_name: req.body.user_name,
        password: req.body.password,
        role: Number(req.body.role),
        star: Number(req.body.star),
        number_rated: Number(req.body.number_rated),
        id_comment: id_comment,
        name: req.body.name,
        password: req.body.password
        
    })
    user.save(function (err) {
        if (err) {return next(err);}
        console.log("Luu thanh cong");
        res.send("Luu thanh cong")
    })
}


exports.registerUser = function(req, res, next){    
    User.findOne({cmt: req.body.cmt, role: Number(req.body.role)}, (err, user) => {
        if(user == null){ //Kiểm tra xem cmt đã được sử dụng chưa
            var user = new User ({
                user_name: req.body.user_name,
                password: req.body.password,
                role: Number(req.body.role),
                star: Number(req.body.star),
                number_rated: Number(req.body.number_rated),
                id_comment: id_comment,
                name: req.body.name,
                password: req.body.password
                
            })
            user.save((err, result) => {
                if(err) {return res.json({err})}
                res.json({user: result})
            })
        }else{
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}