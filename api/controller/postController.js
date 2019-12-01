
var Post = require('../schema/post')
var CommentController = require('./commentController')

exports.searchPost = function(req, res, next) {
    minPrice = (req.body.minPrice == undefined) ? 0 : req.params.minPrice;
    maxPrice = (req.body.maxPrice == undefined) ? 1000000000 : req.params.maxPrice;
    minSquare = (req.body.minSquare == undefined) ? 0 : req.params.minSquare;
    district = (req.body.district == undefined) ? /(.*)?/ : `/${req.params.district}/`;
    ward = (req.body.ward == undefined) ? /(.*)?/ : `/${req.params.ward}/`;

    Post.find({
        price: {$gte: minPrice},
        price: {$lte: maxPrice},
        square: {$gte: minSquare},
        district: {$regex : district},
        ward : {$regex : ward},
    })
        .sort([["price"]])
        .exec(function (err, posts) {
            if (err) {return next(err);}
            console.log(posts);
            res.send(posts)
        })
}

exports.createPost = function(req, res) {

    comment_id = req.body.comment_id
    comment_id = (comment_id == undefined) ? null : comment_id.split(',')

    var post = new Post ({
        landlord_id : req.body.landlord_id,
        comment_id : comment_id,
        square : Number(req.body.square),
        price : Number(req.body.price),
        district : req.body.district,
        ward : req.body.ward,
        address : req.body.address,
        phone : req.body.phone,
        image : (req.body.image == undefined) ? null : req.body.image,
        content : req.body.content,
        availability : Boolean(req.body.availability),
        date : Date(req.body.date),
    })

    post.save(function (err) {
        if (err) {return next(err);}
        console.log("Luu thanh cong");
        res.send("Luu thanh cong")
    })
}

exports.seeDetailPost = function(req, res) {
    Post.findById(req.params.postID, function(err, post) {
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
    Post.findById(req.params.postID, function(err, post) {
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
    Post.findByIdAndUpdate(req.params.postID, req.body, function(err, post) {
        if (err) {return next(err);}
        console.log(post);
        res.send(post);
    })
}
