var index = 0;
var offset = 20;
var show = 0;
var tag = "story";

function addMsg(msg){
    $.ajax({
        url:"/chat/save",
        type:"POST",
        data:msg,
        success:function(result){
            initappend(result);
        }});
}

function test(){
    $("#xx").css("display","block");
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
            url: "https://api.maduanni.xn--6qq986b3xl/api/common/v1/file",
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

function getImageWidth(url,callback){
    var img = new Image();
    img.src = url;
    // 如果图片被缓存，则直接返回缓存数据
    if(img.complete){
        callback(img.width, img.height);
    }else{
        img.onload = function(){
            callback(img.width, img.height);
        }
    }
}

function initb(){
    $("h1").click(function(){
        console.log("xx")
        show++;
        if (show == 10){
            test();
        }else{

        }
    })

    $("#tag label").click(function(){
        $(this).css("font-size","20px");
        $(this).siblings("label").css("font-size","12px");
        tag = $(this).text();
        console.log(tag);
    })


    $("#chatbox").on("click","img",function(){
        var _this = this
        getImageWidth($(_this).attr("src"),function(w,h){

            console.log({width:w,height:h});
            console.log($(_this).css("width"));
            console.log(w+"px")
            if ($(_this).css("width") == "200px"){
                $(_this).css("width",w+"px");
            }else{
                $(_this).css("width","200px");
            }
           
            //$(this).css("width",w+"px")
        });
    })
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

function getLabel(msg){
    if (msg.label){
        return `<label class="`+msg.label+`">`+msg.label+`</label>`
    }
    
    return ""
}


function initappend(msg){
    if (msg.img){
        $("#chatbox li").first().before("<li><p class=\"timep\">"+msg.time+getLabel(msg)+"</p><pre>"+msg.content+"</pre><img class=\"msgimg\" src=\""+msg.img+"\"/></li>");
    }else{
        $("#chatbox li").first().before("<li><p class=\"timep\">"+msg.time+getLabel(msg)+"</p><pre>"+msg.content+"</pre></li>");
    }
    
}

function nextappend(msg){
    if (msg.img){
        $("#chatbox li").last().after("<li><p class=\"timep\">"+msg.time+"</p><pre>"+msg.content+"</pre><img class=\"msgimg\" src=\""+msg.img+"\"/></li>");
    }else{
        $("#chatbox li").last().after("<li><p class=\"timep\">"+msg.time+"</p><pre>"+msg.content+"</pre></li>");
    }
    
}


function dontaddlink(){
    $('#more').css("display","none");
    // $("#chatbox li").last().after("<li><p>2017-08-28 00:00:00<p>七夕快乐。bb</li>");
    $("#chatbox li").last().after(" <p>no more msg</a>");
}


function send(){
    var content = $("#cnt").val();
    if (!content){
        return
    }
    var msg = {
        content,
        img:$('#preview').attr('src'),
        label:tag
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
        content:"true comming.",
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
    initb();
    first();
    console.log("written by lsn");
    console.log("cowkeys");
    //setInterval(loop, 1000);

    initimg();
});
