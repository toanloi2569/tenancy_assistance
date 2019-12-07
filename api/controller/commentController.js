var Comment = require("../schema/comment")

exports.createComment = function(req, res, next) {
    var comment = new Comment({
        user_id : req.body.user_id,
        content : req.body.content,
    })

    comment.save(function (err) {
        if (err) {return next(err);}
        console.log("Luu thanh cong");
        res.send("Luu thanh cong")
    })
}

exports.searchComment = function(req, res, next) {
    Comment.findById(req.params.commentID, function(err, comment){
        if (err) {return next(err);}
        return (comment)
    })
}

exports.deleteComment = function(req, res, next) {
    Comment.findByIdAndDelete(req.params.commentID, function(err, comment) {
        if (err) {return next(err);}
        console.log(comment)
        res.send(comment);
    })
}

exports.updateComment = function(req, res, next) {
    Comment.findByIdAndUpdate(req.params.commentID, req.params, function(err, comment) {
        if (err) {return next(err);}
        console.log(comment);
        res.send(comment);
    })
}