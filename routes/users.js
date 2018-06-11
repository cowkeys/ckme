var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/voice', function(req, res, next) {
  res.send('nini, i have been thinking you for a long time , i love you');
});

module.exports = router;
