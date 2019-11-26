// var New = require('../schema/new')
// var User = require('../schema/user')
var User = require('../schema/user')

exports.createUser = function(req,res) {

    id_comment = (req.body.id_comment == undefined) ? null : req.body.id_comment.split(',')
    var user = new User ({
        role : Number(req.body.role),
        star : Number(req.body.star),
        number_rated : Number(req.body.number_rated),
        id_comment : id_comment,
        name : req.body.name,
    })

    user.save(function (err) {
        if (err) return console.error(err);
        console.log("Luu thanh cong");
        res.send("Luu thanh cong")
    })
}
