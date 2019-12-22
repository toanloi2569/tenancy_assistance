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

        if(user == null){ //Kiểm tra xem cmt đã được sử dụng chưa
            imgPath1 = await getFileBase64(req.body.img[0])
            imgPath2 = await getFileBase64(req.body.img[1])
            
            let [publicKey, privateKey] = await Key.generateKey(req.body.id_number)

            var form_data = new FormData()
            form_data.append("so_cmt", req.body.id_number)
            form_data.append("public_key", publicKey)
            form_data.append("anh_cmt_mat_truoc", fs.createReadStream(imgPath1))
            form_data.append("anh_cmt_mat_sau", fs.createReadStream(imgPath2))
            
            let authorization = await getAuthAdmin(settings.UsernameAdmin, settings.PasswordAdmin)
            await createUserForContract(req.body.username, req.body.password)
            await updateUserInfo(authorization, form_data).then(response => {
                let idv = response.data.id 
                createUserMongo(req, res, idv, privateKey, publicKey)  
            })
        }
        else {
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}

exports.profileUser = async function(req, res) {
    user = await User.findById(req.user._id).exec().catch(err => {return err})
    console.log(user);
    
    axios.get(settings.vChainPort + '/UserInfo/get?id='+user.idv)
            .then(vUser => {
                console.log(vUser.data);
                
                res.send({"user" : user, "vUser" : vUser.data})
            }).catch(err => {
                return err
            })
}

function createUserMongo(req, res, idv, privateKey, publicKey) {
    var user = new User ({
        username: req.body.username,
        password: req.body.password,

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        ID: req.body.id_number,
        role: req.body.role,

        idv: idv,
        privateKey: privateKey,
        publicKey: publicKey,
    })
    
    user.save(function(err) {
        console.log(user);
        
        if (err) console.log(err);
        
        console.log('Luu nguoi dung thanh cong');
        res.status(201).send(user)
    });  
}

async function getFileBase64(img) {
    imgName = String(Date.now())
    pos = img.search('base64,')

    imgPath = 'public/uploads/user/' + img.slice(11, pos+7) + imgName    
    img = img.slice(pos+7)
    
    await fs.writeFile(imgPath, img, 'base64', function(err) {
        console.log(err);
        return 
      });
    return imgPath
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
        "password" : password,
        "username" : username,
    }).then(res => {
        return res.data.authorization
    })
    .catch(err => {
        return err
    })
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
        const role = user.role
        const id = user.id
        res.status(200).send({id, role, token })
    } catch (error) {
        res.status(400).send(error)
        console.log("Error", error);
    }
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
        res.status(200).send("okkkkk")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}