
var fs = require('fs')
var mongoose = require('mongoose')
var Post = require('../schema/post')
var Contract = require('../schema/contract')
var CommentController = require('./commentController')
var ContractController =require('./contractController')

exports.searchPost = function(req, res, next) {
    minPrice = (req.body.minPrice == undefined) ? 0 : req.body.minPrice;
    maxPrice = (req.body.maxPrice == undefined) ? 1000000000 : req.body.maxPrice;
    minSquare = (req.body.minSquare == undefined) ? 0 : req.body.minSquare;
    maxSquare = (req.body.maxSquare == undefined) ? 1000000000 : req.body.maxPrice
    district = (req.body.district == undefined) ? /(.*)?/ : `/${req.body.district}/`;

    Post.find({
        price: {$gte: minPrice},
        price: {$lte: maxPrice},
        square: {$gte: minSquare},
        square: {$lte: maxSquare},
        district: {$regex : district},
    })
        .sort([["price"]])
        .exec(function (err, posts) {
            if (err) {return next(err);}
            for (i = 0; i < posts.length; i++) {
                post = posts[i]
                for (j = 0; j < post.image.length; j++) {
                    pos = post.image[j].search('base64,')
                    ext = post.image[j].slice(21, pos+7)
                    
                    image = readFileBase64(post.image[j])
                    image = "data:image/" + ext + image
                    posts[i].image[j] = image
                }
            }
            res.send(posts)
        })
}

exports.createPost = async function(req, res, next) {
    postDetail = req.body.postDetail
    contractDetail = req.body.contractDetail 

    let imgPaths = []
    for (i = 0; i < postDetail.img.length; i++) {
        let imgPath = await getFileBase64(postDetail.img[i])
        imgPaths.push(imgPath)
    }

    contract_id = mongoose.Types.ObjectId()
    var contract = new Contract({
        _id : contract_id,

        // landlord_id : req.user._id,
        landlord_id : '5dfd6f33d6a08c3a711da14e', 

        /* Landlord Info*/
        landlordName: contractDetail.landlordName,
        landlordPhone: contractDetail.landlordPhone,
        landlordID: contractDetail.landlordID,
        landlordAddress: contractDetail.landlordAddress,

        /* Tenant Info */
        tenantName: contractDetail.tenantName,
        tenantPhone: contractDetail.tenantPhone,  
        tenantID: contractDetail.tenantID,
        tenantAdress: contractDetail.tenantAdress,

        /* Contract */
        address: contractDetail.address,
        feature: contractDetail.feature,
        square: contractDetail.square,
        price: contractDetail.price,
        timeStart: contractDetail.timeStart,
        time: contractDetail.time,

        rule: contractDetail.rule,
    })
    
    var post = new Post ({
        // landlord_id : req.user._id,ongoose
        landlord_id : '5dfd6f33d6a08c3a711da14e',
        contract_id : contract_id,

        square : Number(postDetail.square),
        price : Number(postDetail.price),
        district : postDetail.district,

        address : postDetail.address,
        phone : postDetail.phone,
        image : imgPaths,
        content : postDetail.content,

        availability : true,
        date : Date.now(),
    })

    
    
    post.save(function (err) {
        if (err) {return next(err);}
        contract.save(function(err){
            if (err) {return next(err)}
        })

        res.send({"post":post, "contract": contract})
    })
}

async function getFileBase64(img) {
    imgName = String(Date.now())
    pos = img.thumbUrl.search('base64,')

    imgPath = 'public/uploads/house/' + img.thumbUrl.slice(11, pos+7) + imgName
    img = img.thumbUrl.slice(pos+7)
    
    await fs.writeFile(imgPath, img, 'base64', function(err) {
        console.log(err);
        return 
    });
    return imgPath
}

exports.seeDetailPost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {return next(err);}
        
        images = []
        for (i = 0; i < post.image.length; i++) {
            pos = post.image[i].search('base64,')
            ext = post.image[i].slice(21, pos+7)
            
            image = readFileBase64(post.image[i])   
            image = "data:image/" + ext + image
            
            images.push(image)
        }
        post.image = images

        // comments = []
        // for (var i=0; i < post.comment_id.length; i++) {
        //     comment = CommentController.searchComment(post.comment_id[i])
        //     comments.push(comment)
        // }
    
        // res.send({"post": post, "comments": comments})
        res.send({"post": post})
    })
}

function readFileBase64(imgPath) {
    var bitmap = fs.readFileSync(imgPath);
    return new Buffer(bitmap).toString('base64');
}

exports.deletePost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {return next(err);}
        
        for (var i=0; i > length(post.comment_id); i++) {
            comment = CommentController.deleteComment(post.comment_id[i])
        }

        post.remove(function(err){
            if (err) {return next(err);}
            res.send(post)
        })
    })
}

exports.updatePost = function(req, res) {
    Post.findByIdAndUpdate(req.params.post_id, req.body, function(err, post) {
        if (err) {return next(err);}
        console.log(post);
        res.send(post);
    })
}

exports.getMainPage = function(req, res) {
    Post.find({}).limit(6)
        .sort([["Date"]])
        .exec(function (err, posts) {
            if (err) {return next(err);}
            console.log(posts);
            res.send(posts)
        })
}
