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

function initimg(){
    $("#upfile").change(function(evt){
        // $filePath=URL.createObjectURL(this.files[0]);
        // $('#preview').attr('src',$filePath);
    console.log("ini")
        var form = new FormData();
        form.append("file", this.files[0]);
        form.append("key", "mdn");
        form.append("fileName", this.files[0].name);
        form.append("bucketName", "cowkeys");
    
        var settings = {
            async: true,
            crossDomain: true,
//            url: "https://api.maduanni.xn--6qq986b3xl/common/api/common/v1/file",
            url: "http://api.maduanni.xn--6qq986b3xl/api/common/v1/file",
            method: "post",
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data: form
        }
        $.ajax(settings).done(function(response){
            var data=JSON.parse(response);
            console.log("xxx",data)
            $('#preview').attr('src',data.data);
        });
    });
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
    if (msg.img){
        $("#chatbox li").first().before("<li><p>"+msg.time+"</p><p>"+msg.content+"</p><img class=\"msgimg\" src=\""+msg.img+"\"/></li>");
    }else{
        $("#chatbox li").first().before("<li><p>"+msg.time+"</p><p>"+msg.content+"</p></li>");
    }
    
}

function nextappend(msg){
    if (msg.img){
        $("#chatbox li").last().after("<li><p>"+msg.time+"</p><p>"+msg.content+"</p><img class=\"msgimg\" src=\""+msg.img+"\"/></li>");
    }else{
        $("#chatbox li").last().after("<li><p>"+msg.time+"</p><p>"+msg.content+"</p></li>");
    }
    
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
        img:$('#preview').attr('src')
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

    initimg();
});
