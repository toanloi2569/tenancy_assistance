var express = require('express');
var auth = require('../middleware/auth');
var router = express.Router();

var Post = require('../controller/postController')
var User = require('../controller/userController')
var Comment = require('../controller/commentController')
var Contract = require('../controller/contractController')

/* GET users listing. */
router.get('/', Post.getMainPage)

/* Sinh hợp đồng */
router.post('/fillContract', Contract.fillContract)

/* Ký hợp đồng */
router.post('/sign/contract_id/:contract_id', Contract.sign)

/* Lấy thông tin hợp đồng */
router.get('/fillContract/contract_id/:contract_id', Contract.getContractInfo)

/* Gửi dữ liệu lên vchain */
// router.push('/storeContract/')


/* Tìm kiếm post theo các tiêu chí : Giá cả, diện tích, quận, phường */
router.post('/searchPost', Post.searchPost)

/* Tạo 1 post mới */
/* checked */
router.post('/createPost', Post.createPost)

/* Xem thông tin chi tiết 1 bài đăng qua id */
router.get('/detailPost/posts/:post_id', Post.seeDetailPost)

/* Xóa 1 post */
router.post('/deletePost/posts/:post_id', Post.deletePost)

/* Chính sửa post */
router.post('updatePost/posts/:post_id', Post.updatePost)

/* Tạo bình luận mới */
router.post('createComment', Comment.createComment)

/* Xóa bình luận */
router.post('deleteComment/comments/comment_id', Comment.deleteComment)

/* Tìm kiếm bình luận qua id */
router.get('searchComment/comments/:comment_id', Comment.searchComment)

/* Chính sửa bình luận */
router.post('updateComment/comments/:comment_id', Comment.updateComment)

// router.post('/comment', User.comment)

// test dang nhap dang xuat
router.post('/logoutUser', auth, User.logoutUser)
router.post('/logoutallUser', auth, User.logoutallUser)
router.get('/profileUser', auth, User.profileUser)

module.exports = router;
