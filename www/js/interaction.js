
//提示信息成功或者失败
function tipmessage(message,id){
	$(document.body).append("<div class='tipmessage' id='"+id+"'><span>"+message+"</span></div>");
	$("#"+id).animate({opacity:1},300);
	setTimeout(function(){$("#"+id).animate({opacity:0},300);setTimeout(function(){$("#"+id).remove();},100);},2000);
}
//提示信息带图片
function tipmessage1(message,img,id){
	$(document.body).append("<div class='tipmessage' id='"+id+"'><span>"+img+message+"</span></div>");
	$("#"+id).animate({opacity:1},300);

}

function closetipmessage1(id){
	setTimeout(function(){$("#"+id).animate({opacity:0},300);setTimeout(function(){$("#"+id).remove();},100);},2000);
}