var User = require('../schema/user')
var FormData = require('form-data');
var axios = require('axios');
var fs = require('fs');
var settings = require('../config/setting')


exports.registerUser = async function(req, res, next){    

    await User.findOne({name: req.body.name, role: Number(req.body.role)}, async function(err, user){
        if(user === null){ //Kiểm tra xem cmt đã được sử dụng chưa
            
            // var form_data = new FormData()
            // form_data.append("so_cmt", req.body.id_number)
            // form_data.append("public_key", req.body.public_key)
            // form_data.append("anh_cmt_mat_truoc", fs.createReadStream(req.files.img1[0].path))
            // form_data.append("anh_cmt_mat_sau", fs.createReadStream(req.files.img2[0].path))

            // let authorization;
            // // await createUser(req.body.username, req.body.password)
            // // await new Promise(resolve => setTimeout(resolve, 3000));
            // await getAuth(req.body.username, req.body.password)
            //     .then(res=>{
            //         authorization = res.data.authorization;
            //     })
            
            // var req_to_Vchain = {
            //     method: "post",
            //     url: settings.vChainPort + "/userInfor/create",
            //     headers: {
            //         // 'Content-type': 'multipart/form-data',
            //         // Accept : 'multipart/form-data',
            //         Authorization : authorization,
            //     },
            //     data: form_data
            // }

            // console.log(req_to_Vchain);
            // await new Promise(resolve => setTimeout(resolve, 3000));

            // axios(req_to_Vchain)
            //     .then(function(response){
                        createUserMongo(req, res)
                    
                // })
                // .catch(function (err) {
                //     console.log(err);
                // });

        }else{
            res.json({err: 'Chung minh thu da duoc dung'})
        }
    })
}

function createUserMongo(req, res) {
    var user = new User ({
        user_name: req.body.username,
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
        console.log('Luu nguoi dung thanh cong');
    })
    const token = user.generateAuthToken()
    
    
}

function createUser(username, password) {
    return axios.post(settings.vChainPort + '/user', {
        "password" : password,
        "role" : "USER",
        "username" : username
    })
    .catch(function (error) {
        return error
    });
}

function getAuth(username, password) {
    return axios.post(settings.vChainPort + '/authentication', {
        "password" : password,
        "username" : username,
    })
    .catch(function(error) {
        return error
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
        const { username, password } = req.body
        const user = await User.findByCredentials(username, password)
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