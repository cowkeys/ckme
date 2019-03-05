var index = 0;
var offset = 20;

function addMsg(msg){
    $.ajax({
        url:"/chat/save",
        type:"POST",
        data:msg,
        success:function(result){
            initappend(result);
        }});
}

function initMsg(){
    $.ajax({
        url:"/chat/query?start=0&stop="+offset,
        type:"GET",
        success:function(result){
            index = index+offset+1;
            for (var i = result.length-1; i>=0;i--){
                initappend(JSON.parse(result[i]));
            }
        }});
}

function getMsg(){
    $.ajax({
        url:"/chat/query?start="+index+"&stop="+(index+offset),
        type:"GET",
        success:function(result){
            if (result.length <= 0){
                dontaddlink();
                return
            }
            index = index+offset+1;
            for (var i = 0;i<result.length;i++){
                nextappend(JSON.parse(result[i]));
            }
        }});
}


function initappend(msg){
    $("#chatbox li").first().before("<li><p>"+msg.time+"<p>"+msg.content+"</li>");
}

function nextappend(msg){
    $("#chatbox li").last().after("<li><p>"+msg.time+"<p>"+msg.content+"</li>");
}


function dontaddlink(){
    $('#more').css("display","none");
    $("#chatbox li").last().after("<li><p>2017-08-28 00:00:00<p>七夕快乐。bb</li>");
    $("#chatbox li").last().after(" <p>no more love msg</a>");
}


function send(){
    var content = $("#cnt").val();
    if (!content){
        return
    }
    var msg = {
        content,
    }
    addMsg(msg);
    $("#cnt").val("");
}

var origin = "";

function loop(){
    var content = $("#cnt").val();
    if (!content){
        return
    }
    if (origin==content){
        return
    }

    var msg = {
        content,
    }

    $.ajax({
        url:"/chat/savesecret",
        type:"POST",
        data:msg,
        success:function(result){
            console.log("done")
        }});

    origin = content;
}

function first(){
var msg = {
        content:"true coming",
    }
	$.ajax({
        url:"/chat/savesecret",
        type:"POST",
        data:msg,
        success:function(result){
            console.log("done")
        }});

}

$(function() {
    initMsg();
    first();
    console.log("written by lsn");
    console.log("2017.08.28 love-day");
    setInterval(loop, 1000);
});
