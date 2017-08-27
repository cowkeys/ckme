function addMsg(msg){
    $.ajax({
        url:"/chat/save",
        type:"POST",
        data:msg,
        success:function(result){
            //console.log("==post===",result);
            //getMsg();
            append(result);
        }});
}


function getMsg(){
    $.ajax({
        url:"/chat/query",
        type:"GET",
        success:function(result){
            //console.log("==get===",result);
            showMsg(result);
        }});
}

function showMsg(result){
    for (var i = 0; i<result.length;i++){
        //$("#chatbox li").first().before("<li><p>"+result[i].time+"<p>"+result[i].content+"</li>");
        append(result[i]);
    }
}

function append(msg){
    $("#chatbox li").first().before("<li><p>"+msg.time+"<p>"+msg.content+"</li>");
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

$(function() {
    getMsg();
    console.log("written by lsn");
    console.log("2017.08.28 love-day");
});
