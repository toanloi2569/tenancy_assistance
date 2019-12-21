
var fs = require('fs')

var Post = require('../schema/post')
var CommentController = require('./commentController')

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
            console.log(posts);
            res.send(posts)
        })
}

exports.createPost = async function(req, res, next) {
    let imgPaths = []
    for (i = 1; i < req.body.img.length; i++) {
        let imgPath = await getFileBase64(req.body.img[i])
        imgPaths.push(imgPath)
    }
    

    var post = new Post ({
        // landlord_id : req.user._id,
        landlord_id : '5dfd6f33d6a08c3a711da14e',

        square : Number(req.body.square),
        price : Number(req.body.price),
        district : req.body.district.join(),

        address : req.body.address,
        phone : req.body.phone,
        image : imgPaths,
        content : req.body.content,

        availability : true,
        date : Date.now(),
    })

    post.save(function (err) {
        if (err) {return next(err);}
        console.log("Luu thanh cong");
        res.send("Luu thanh cong")
    })
}

async function getFileBase64(img) {
    fileName = String(Date.now())
    fileName = 'public/uploads/house/' + fileName
    
    pos = img.thumbUrl.search('base64,')
    img = img.thumbUrl.slice(pos+7)
    
    await fs.writeFile(fileName, img, 'base64', function(err) {
        console.log(err);
        return 
    });
    return fileName
}

exports.seeDetailPost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {return next(err);}
        
        comments = []
        for (var i=0; i > length(post.comment_id); i++) {
            comment = CommentController.searchComment(post.comment_id[i])
            comments.push(comment)
        }

        res.send({"post": post, "comments": comments})
    })
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
