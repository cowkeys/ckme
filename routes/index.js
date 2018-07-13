var express = require('express');
var router = express.Router();
var request = require('request');

function dingding(content) {
var url="https://oapi.dingtalk.com/robot/send?access_token=1cdb63721498b13b64ca13991937e55a6cae03d41befb7467c5861b1dbe37e0c";
    var requestData={
     "msgtype": "text",
     "text": {
         "content": content
     }};
request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: requestData
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // 请求成功的处理逻辑
    }
});
}
/* GET home page. */
router.get('/', function(req, res, next) {
  dingding("她来了");
  res.render('index', { title: 'Express' });
});

module.exports = router;
