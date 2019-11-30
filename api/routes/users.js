var express = require('express');
var router = express.Router();

var Post = require('../controller/postController')
var User = require('../controller/userController')
var Comment = require('../controller/commentController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Đăng ký */
router.post('/register', User.registerUser)

/* Yêu cầu hợp đồng */
router.post('/requireContract/post/:postID/tenant/:tenantID/landlord/:landlordID', User.requireContract)

/* Sinh hợp đồng mẫu */
router.post('getTemplateContract')

/* Gửi hợp đồng kèm chữ ký */
router.post('/responseContract/post/:postID/tenant/:tenantID/landlord/:landlordID', User.responseContract)

/* Tìm kiếm post theo các tiêu chí : Giá cả, diện tích, quận, phường */
router.post('/searchPost', Post.searchPost)

/* Tạo 1 post mới */
router.post('/createPost', Post.createPost)

/* Xem thông tin chi tiết 1 bài đăng qua id */
router.get('/detailPost/posts/:postID', Post.seeDetailPost)

/* Xóa 1 post */
router.post('/deletePost/posts/:postID', Post.deletePost)

/* Chính sửa post */
router.post('updatePost/posts/:postID', Post.updatePost)

/* Tạo bình luận mới */
router.post('createComment', Comment.createComment)

/* Xóa bình luận */
router.post('deleteComment/comments/commentID', Comment.deleteComment)

/* Tìm kiếm bình luận qua id */
router.get('searchComment/comments/:commentID', Comment.searchComment)

/* Chính sửa bình luận */
router.post('updateComment/comments/:commentID', Comment.updateComment)

// router.post('/comment', User.comment)

module.exports = router;
