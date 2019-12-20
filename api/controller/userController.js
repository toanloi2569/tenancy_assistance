var User = require('../schema/user')
var Key = require('../controller/keyController')
var FormData = require('form-data');
var bcrypt = require('bcrypt');
var axios = require('axios');
var fs = require('fs');
var settings = require('../config/setting')
const { generateKeyPair } = require('crypto');


exports.registerUser = function(req, res, next){    

    User.findOne({email: req.body.email, role: Number(req.body.role)}, async function(err, user){
        console.log(user);
        
        if(user == null){ //Kiểm tra xem cmt đã được sử dụng chưa
            pathImg1 = await getFileBase64(req.body.img[1])
            pathImg2 = await getFileBase64(req.body.img[2])
            
            let [publicKey, privateKey] = await Key.generateKey(req.body.id_number)

            var form_data = new FormData()
            form_data.append("so_cmt", req.body.id_number)
            form_data.append("public_key", publicKey)
            form_data.append("anh_cmt_mat_truoc", fs.createReadStream(pathImg1))
            form_data.append("anh_cmt_mat_sau", fs.createReadStream(pathImg2))
            
            let authorization = await getAuthAdmin(settings.UsernameAdmin, settings.UsernameAdmin)
            await createUserForContract(req.body.username, req.body.password)
            await updateUserInfo(authorization, form_data).then(response => {
                let idv = response.data.id 
                createUserMongo(req, res, idv)  
            })
        }
        else {
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}

function createUserMongo(req, res, idv) {
    var user = new User ({
        user_name: req.body.username,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
        id : req.body.id_number,
        idv: idv,
    })
    
    user.save(function(err) {
        console.log(user);
        
        if (err) console.log(err);
        
        console.log('Luu nguoi dung thanh cong');
        res.status(201).send(user)
    });  
}

async function getFileBase64(img) {
    fileName = String(Date.now())
    fileName = 'public/uploads/' + fileName

    img = img.thumbUrl
    img = img.replace('data:image/jpg;base64,','')
    img = img.replace('data:image/jpeg;base64,','')
    img = img.replace('data:image/png;base64,','')
    img = img.replace('data:image/tiff;base64,','')
    img = img.replace('data:image/bmp;base64,','')
    
    await fs.writeFile(fileName, img, 'base64', function(err) {
        console.log(err);
        return 
      });
    return fileName
}

function updateUserInfo(authorization, form_data) {
    return axios.post(
        settings.vChainPort + "/UserInfo/create",
        form_data, {
            headers: {
                Authorization : authorization,
                'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
                }
        }).catch(err => {
            console.log(err);
        })
}

function createUserForContract(username, password) {
    return axios.post(settings.vChainPortContract + '/user', {
        "password" : password,
        "role" : "USER",
        "username" : username,
    }).then(res => {
        console.log(res.data);  
    })
    .catch(function(error){
        return error
    })
}

function getAuthAdmin(username, password) {
    return axios.post(settings.vChainPort + '/authentication', {
        "password" : settings.PasswordAdmin,
        "username" : settings.UsernameAdmin,
    }).then(res => {
        return res.data.authorization
    })
    .catch(err => {
        return err
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

exports.loginUser = async function(req, res) {
    //Login a registered user
    try {
        var { username, password } = req.body
        var user = await User.findByCredentials(username, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        var token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
        console.log("err");
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