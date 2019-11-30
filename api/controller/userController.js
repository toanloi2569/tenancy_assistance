var User = require('../schema/user')
var axios = require('axios');
var fs = require('fs');

exports.registerUser = function(req, res, next){    
    User.findOne({cmt: req.body.cmt, role: Number(req.body.role)}, function(err, user){
        if(user == null){ //Kiểm tra xem cmt đã được sử dụng chưa

            var form_data = new FormData()
            form_data.append({
                "so_cmt": req.body.id_number,
                "id": req.body.id_number,
                "public_key": req.body.public_key,
                "anh_mat_truoc": fs.createReadStream(req.body.img1),
                "anh_mat_sau": fs.createReadStream(req.body.img2),
            })
            var req_to_Vchain = {
                methods: "post",
                url: "178.128.217.110:8089/userInfo_DC2019_9/create",
                headers: {
                    "Authorization": "Basic REMyMDE5Xzk6U1RJUEdUUEZWTw==",
                    "Content-Type": "multipart/form-data"
                },
                data: form_data
            }

            axios(req_to_Vchain)
                .then(function(response){
                    var user = new User ({
                        user_name: req.body.user_name,
                        password: req.body.password,
                        role: Number(req.body.role),
                        star: Number(req.body.star),
                        number_rated: Number(req.body.number_rated),
                        name: req.body.name,
                        id : req.body.id_number,
                    })

                    user.save(function(err, result) {
                        if(err) {return res.json({err})}
                        res.json({user: result})
                    })
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
            
        }else{
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}

exports.requireContract = function (req, res, next) {
    postID = req.params.postID;
    tenantID = req.params.tenantID;
    landlordID = req.params.landlordID;

    User.findById(landlordID, function(err, landlord) {
        if (err) {return next(err);}

        message = {
            sender: tenantID,
            is_contract: true,
        }
        landlord.messages.push(message)
        landlord.save(function(err){
            if (err) {return next(err)}
        })
    })
}

exports.responseContract = function(req, res, next) {

}