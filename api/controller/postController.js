
var Post = require('../schema/post')

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
        .exec(function (err, houses) {
            if (err) {return next(err);}
            // render
            console.log(houses);
            res.send(houses)
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

