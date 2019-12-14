var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
  console.log(req.body);
  
  res.render('index');
});

router.get('/listhome', function(req,res,next){
  res.render('resultListHome');
});

module.exports = router;
