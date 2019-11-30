// var New = require('../schema/new')
// var User = require('../schema/user')
var User = require('../schema/user')
const bcrypt = require('bcrypt')

exports.createUser = function(req,res) {

    id_comment = (req.body.id_comment == undefined) ? null : req.body.id_comment.split(',')
    bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
        if (err) {return next(err);}
        const user = new User ({
            role : Number(req.body.role),
            star : Number(req.body.star),
            number_rated : Number(req.body.number_rated),
            id_comment : id_comment,
            name : req.body.name,
            password = hash,
        })
        user.save((err, result) => {
            if(err) {return res.json({err})}
            res.json({user: result})
        })
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
            bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                if (err) {return next(err);}
                const user = new User ({
                    role : Number(req.body.role),
                    star : Number(req.body.star),
                    number_rated : Number(req.body.number_rated),
                    id_comment : id_comment,
                    name : req.body.name,
                    password = hash,
                })
                user.save((err, result) => {
                    if(err) {return res.json({err})}
                    res.json({user: result})
                })
            })
        }else{
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}