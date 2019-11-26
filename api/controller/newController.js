var Comment = require("../schema/comment")

exports.createComment = function(req, res) {

    var comment = new Comment({
        user_id : req.body.user_id,
        content : req.body.content,
    })

    post.save(function (err) {
        if (err) return console.error(err);
        console.log("Luu thanh cong");
        res.send("Luu thanh cong")
    })
}