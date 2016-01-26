
//提示信息成功或者失败
function tipmessage(message,id){
	$("#msgContainer").append("<div class='tipmessage' id='"+id+"'><span>"+message+"</span></div>");
	$("#"+id).animate({opacity:1},300);
	$("#msgContainer").show();
 	setTimeout(function(){$("#"+id).animate({opacity:0},300);setTimeout(function(){$("#"+id).remove();$("#msgContainer").hide();},100);},2000); 
}
//提示信息带图片
function tipmessage1(message,id){
	$("#loadingContainer").append("<div class='tipmessage' id='"+id+"'><span><img src='img/loading.gif'><br/>"+message+"</span></div>");
	$("#loadingContainer").show();
	$("#"+id).animate({opacity:1},300);
}
//改变提示内容，需要首先使用tipmessage1，结束时调用closetipmessage1
function changeTipmessage(message,id){
	$("#"+id).remove();
	$("#loadingContainer").append("<div class='tipmessage' id='"+id+"'><span><img src='img/loading.gif'><br/>"+message+"</span></div>");
	$("#loadingContainer").show();
	$("#"+id).animate({opacity:1},300);
}
function closetipmessage1(id){
	setTimeout(function(){$("#"+id).animate({opacity:0},300);setTimeout(function(){$("#"+id).remove();
	//if($("#loadingContainer").childNodes.length <= 0){
		$("#loadingContainer").hide();
	//}
	},100);},2000);
	
}