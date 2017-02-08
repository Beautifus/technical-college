window.onload=function(){
	var mysurvey=document.getElementById("survey");
function rl(data){
	this.data=data;
}
rl.prototype={
	init:function(){
			for(var i=0;i<this.data.length;i++){
			//alert(this.data.length);
			var li=document.createElement("li");
			var stat;
			var color;
			if(data[i].stat=="0"){
				stat="发表中";
				color="red";
			}else if(data[i].stat=="1"){
				stat="未发表";
				color="";
			}else {
				stat="已过期";
				color="#ccc";
			}
			li.innerHTML="<div><label for=\"listq"+i+"\"><input name='listq' id=\"listq"+i+"\" type=\"checkbox\">"+this.data[i].title+"</label></div><div>"+this.data[i].times+"</div><div style='color:"+color+";'>"+stat+"</div><div><button class=\"edit\">编辑</button><button class=\"del\">删除</button><button class=\"view\">查看问卷</button></div>";
			mysurvey.appendChild(li);
		}
	}
	
}

var newrl=new rl(data);
newrl.init();

var chose_edit=document.getElementsByClassName("edit");
for(var i=0;i<chose_edit.length;i++){
	chose_edit[i].onclick=function(event){
		var event=event||window.event;
		var targetElem=event.target||event.srcElement;
		var cName=targetElem.className;
		storage.index=i-1;
		storage.do_data="edit";
		//alert(storage.index);
		storage.ques=JSON.stringify(data[storage.index]);
	//	alert(storage.ques);
		//alert()
		location.href="new.html";
	}
}
var chose_del=document.getElementsByClassName("del");
for(var i=0;i<chose_del.length;i++){
	chose_del[i].onclick=function(event){
		var event=event||window.event;
		var targetElem=event.target||event.srcElement;
		storage.index=i-1;
		storage.do_data="del";
		data.splice(storage.index,1);
		changedata(1);
		var s="listq"+storage.index;
		var inputs=document.getElementById(s);
		inputs.parentNode.parentNode.parentNode.removeChild(inputs.parentNode.parentNode);
		location.href="index.html";
	}
}
var chose_view=document.getElementsByClassName("view");
for(var i=0;i<chose_view.length;i++){
	chose_view[i].onclick=function(event){
		var event=event||window.event;
		var targetElem=event.target||event.srcElement;
		storage.index=i-1;
		storage.do_data="view";
		storage.ques=JSON.stringify(data[storage.index]);
		location.href="view.html";
	}
}
};

