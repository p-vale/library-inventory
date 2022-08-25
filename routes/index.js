var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Local Library' })
  res.redirect('/catalog'); // 302 status
});

module.exports = router;
