var express = require('express');
var router = express.Router();
var moment = require('moment');
var {savelist,getlistrange} = require('../lib/cache');
var request = require('request');
/* GET users listing. */
router.get('/voice', function(req, res, next) {
console.log("===================");
	res.send("nini, i have been thinking you for a long time , i love you");
});

router.post('/save', function(req, res, next) {
    if (!req.body){
        return res.send("failed!");
    }
    var msg = req.body;
    if (!msg.content){
        return res.send("content failed!");
    }
    msg.time = moment().format("YYYY-MM-DD HH:mm:ss");

    savelist('mdnlist',msg).then(function(data){
        console.log("save-record,",JSON.stringify(msg));
        res.send(msg);
    }).catch(function(err){
        res.send(err);
    });
});

router.post('/savesecret', function(req, res, next) {
    if (!req.body){
        return res.send("failed!");
    }
    var msg = req.body;
    if (!msg.content){
        return res.send("content failed!");
    }

    msg.time = moment().format("YYYY-MM-DD HH:mm:ss");

    savelist('secreatmndnlist',msg).then(function(data){
        console.log("save-record,",JSON.stringify(msg));
        res.send(msg);
    }).catch(function(err){
        console.log("save-err",err);
        res.send(err);
    });

    var url="https://oapi.dingtalk.com/robot/send?access_token=1cdb63721498b13b64ca13991937e55a6cae03d41befb7467c5861b1dbe37e0c";
    var requestData={
     "msgtype": "text",
     "text": {
         "content": msg.content
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
});



router.get('/query', function(req, res, next) {
    var start = req.query.start || 0;
    var stop = req.query.stop || -1
    getlistrange('mdnlist',start,stop).then(function(object){
        res.send(object);
    }).catch(function(err){
        res.send(err);
    })
});


router.get('/syncrecord', function(req, res, next) {

    var history = [
        {
            content: "晚安",
            time: "2017-08-28 01:58:07"
        },
        {
            content: "❤️",
            time: "2017-08-28 01:58:49"
        },
        {
            content: "醒啦！哇好惊喜！",
            time: "2017-08-28 06:53:10"
        },
        {
            content: "每天吃多点早饭 就不会低血糖了",
            time: "2017-08-28 09:22:58"
        },
        {
            content: "现在是中午，我吃完了饭，酒足饭饱之后就开始想lsn，早上去上班的时候晕晕的，就跑到哥哥那里装可怜，很成功！",
            time: "2017-08-28 12:33:24"
        },
        {
            content: "碰到一个装可怜的胖砸 没办法 谁让我……",
            time: "2017-08-28 12:47:54"
        },
        {
            content: "还在聚餐，心思都飘到哥哥身上了，大七夕的，想跟哥哥一起",
            time: "2017-08-28 19:29:11"
        },
        {
            content: "七夕还在外面浪！🤞🤞🤞🤞",
            time: "2017-08-28 19:46:19"
        },
        {
            content: "⁽⁽٩( ´͈ ᗨ `͈ )۶⁾⁾快说你爱我",
            time: "2017-08-28 19:48:11"
        },
        {
            content: "送你一朵花 🌹 ",
            time: "2017-08-28 07:49:36"
        },
        {
            content: "爱你爱你爱你❤️么么么",
            time: "2017-08-28 09:24:02"
        },
        {
            content: "mdn说今天不是很忙，看她会不会真的找我聊天",
            time: "2017-08-29 09:45:56"
        },
        {
            content: "看来她很忙 sad",
            time: "2017-08-29 16:49:27"
        },
        {
            content: "下午比较忙，没有怎么找哥哥，知道他一定在等我，心里甜甜哒！",
            time: "2017-08-29 18:56:38"
        },
        {
            content: "早上降温了，有种秋高气爽的感觉，lsn那里有没有很凉快咧",
	    time: "2017-08-30 07:47:12"
        },
        {
            content: "不想起来 8.33了",
            time: "2017-08-30 08:33:43"
        },
        {
            content: "今天mdn说她突破了自己",
            time: "2017-08-30 11:34:55"
        },
        {
            content: "哈哈哈想起昨晚上就后怕，从没在妈妈面前撒过绝不能被拆穿的谎",
            time: "2017-08-31 07:49:51"
        },
        {
            content: "lsn今天可能10点半上班吗",
            time: "2017-08-31 07:50:22"
        },
        {
            content: "🐙🐙🐙🐙🐙🐙🐙🐙",
            time: "2017-08-31 08:28:30"
        },
        {
            content: "你说要不要加一个上传照片",
            time: "2017-08-31 17:46:24"
        },
        {
            content: "不要加，那各种不忍直视的照片都发了，连不小清新",
            time: "2017-09-01 19:05:14"
        },
        {
            content: "mdn要去和别人约会看电影  我当然是选择原谅她👒",
            time: "2017-09-01 18:25:40"
        },
        {
            content: "哈哈哈哈哈头上一抹绿，真好看",
            time: "2017-09-02 00:29:39"
        }
    ];
    // for (var i=0;i<history.length;i++){
    //     savelist('mdnlist',history[i]).then(function(data){
    //         //    console.log("save-record,",JSON.stringify(msg));
    //         //    res.send(msg);
    //     }).catch(function(err){
    //         //    res.send(err);
    //     });
    // }

    res.send({});
});

module.exports = router;
