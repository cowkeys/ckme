var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');


client.on("error", function(error) {
    console.log(error);
});

client.auth("myredis");


function savelist(key,msg){
    return new Promise(function(resolve, reject) {
        client.lpush(key, JSON.stringify(msg), function(err) {
            if (err) {
                console.log("savelist-err:",err);
                reject(err);
            }
            resolve({});
        })
    });
}

function getlistrange(key,start,stop){
    return new Promise(function(resolve, reject) {
        client.lrange(key,start,stop, function(err, object) {
            if (err){
                console.log("getlistrange-err:",err);
            }
            resolve(object);
        });
    });
}

module.exports = {
    savelist,
    getlistrange,
}
