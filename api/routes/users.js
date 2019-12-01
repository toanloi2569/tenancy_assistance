var express = require('express');
const auth=require('../middleware/auth');
var router = express.Router();

var New = require('../controller/postController')
var User = require('../controller/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/searchPost', New.searchPost)
router.post('/createPost', New.createPost)

router.post('/createUser', User.createUser)

router.post('/registerUser', User.registerUser)
router.post('/loginUser', User.loginUser)
router.post('/logoutUser', auth, User.logoutUser)
router.post('/logoutallUser', auth, User.logoutallUser)
router.get('/profileUser', auth, User.profileUser)

module.exports = router;
