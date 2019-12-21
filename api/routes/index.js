var express = require('express');
var router = express.Router();

var User = require('../controller/userController')

/* GET home page. */
router.post('/login', function(req, res, next) {
  console.log(req.body);
  
  res.render('index');
});

router.get('/listhome', function(req,res,next){
  res.render('resultListHome');
});

/* Đăng ký */
/* checked */
router.post('/register', User.registerUser)

/* Đăng nhập */
/* checked */
router.post('/loginUser', User.loginUser)

module.exports = router;
