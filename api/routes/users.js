var express = require('express');
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

module.exports = router;
