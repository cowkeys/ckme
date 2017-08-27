var express = require('express');
var router = express.Router();
var moment = require('moment');
/* GET users listing. */
var chat = [];
router.post('/save', function(req, res, next) {
    if (!req.body){
        return res.send("failed!");
    }
    var msg = req.body;
    if (!msg.content){
        return res.send("content failed!");
    }
    msg.time = moment().format("YYYY-MM-DD hh:mm:ss");
    chat.push(msg);
    console.log("save-record,",msg);
    res.send(msg);
});

router.get('/query', function(req, res, next) {
  res.send(chat);
});

module.exports = router;
