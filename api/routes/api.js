var express = require('express');
var router = express.Router();

var New = require('../controller/postController')
var User = require('../controller/userController')
var Comment = require('../controller/commentController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/createPost', New.createPost)
router.post('/getPost', New.searchPost)
router.post('/updatePost', New.updatePost)
router.post('/deletePost', New.deletePost)


router.post('/createUser', User.createUser)
router.post('/getUser', User.getUser)
router.post('/updateUser', User.updateUser)
router.post('/deleteUser', User.deleteUser)

router.post('/createComment', Comment.createComment)
router.post('/getComment', Comment.getComment)