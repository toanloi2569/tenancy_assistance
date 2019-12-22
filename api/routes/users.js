var express = require('express');
var auth = require('../middleware/auth');
var router = express.Router();

var Post = require('../controller/postController')
var User = require('../controller/userController')
var Comment = require('../controller/commentController')
var Contract = require('../controller/contractController')

/* GET users listing. */
router.get('/',auth, Post.getMainPage)

/* Sinh hợp đồng */
router.post('/fillContract', auth, Contract.fillContract)

/* Lấy tất cả các contract trong db */
router.get('/getContracts', auth, Contract.getContracts)

/* Lấy thông tin chi tiết của 1 contract */
router.get('/checkContractAfterFill/:contract_id', auth, Contract.checkContractAfterFill)

/* Ký hợp đồng */
router.post('/sign/contract_id/:contract_id', auth, Contract.sign)

/* Lấy thông tin hợp đồng gốc của chủ nhà khi chưa ai điền thôn tin */
router.get('/fillContract/post_id/:post_id',auth, Contract.getContractInfo)

/* Gửi dữ liệu lên vchain */
router.post('/storeContractToBlockChain/contract_id/:contract_id/username/:username/password/:password', 
                auth, Contract.storeContractToBlockChain)

/* Lấy thông tin hợp đồng từ block chain */
router.get('/getContractFromBlockChain/idv_contract/:idv_contract',
                auth, Contract.getContractFromBlockChain)

/* Lấy thông tin để xác thực hợp đồng */
router.get('/getValidContract/idv_contract/:idv_contract', 
                auth, Contract.getValidContract)

/* Lấy sign đã decode để valid contract */
router.get('/validContract/signature/:signature/publicKey/:publicKey',
                auth, Contract.validContract)


/* Tìm kiếm post theo các tiêu chí : Giá cả, diện tích, quận, phường */
router.post('/searchPost', Post.searchPost)

/* Tạo 1 post mới */
/* checked */
router.post('/createPost', auth, Post.createPost)

/* Xem thông tin chi tiết 1 bài đăng qua id */
router.get('/detailPost/posts/:post_id',auth, Post.seeDetailPost)

/* Xóa 1 post */
router.post('/deletePost/posts/:post_id', auth, Post.deletePost)

/* Chính sửa post */
router.post('updatePost/posts/:post_id', auth, Post.updatePost)

/* Tạo bình luận mới */
router.post('createComment', auth, Comment.createComment)

/* Xóa bình luận */
router.post('deleteComment/comments/comment_id', auth, Comment.deleteComment)

/* Tìm kiếm bình luận qua id */
router.get('searchComment/comments/:comment_id', auth, Comment.searchComment)

/* Chính sửa bình luận */
router.post('updateComment/comments/:comment_id', auth, Comment.updateComment)

// router.post('/comment', User.comment)

// test dang nhap dang xuat
router.get('/auth', auth, function(req,res){
    const role = req.user.role; 
    res.status(200).send(role);})
router.post('/logoutUser', auth, User.logoutUser)
router.post('/logoutallUser', auth, User.logoutallUser)
router.get('/profileUser', auth, User.profileUser)

module.exports = router;
