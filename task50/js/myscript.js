window.onload=function(){
	var mysurvey=document.getElementById("survey");
	var selectall=document.getElementById("selectall");
	var delall=document.getElementById("delall");
function rl(data){
	this.data=data;
}
rl.prototype={
	init:function(){
			for(var i=0;i<this.data.length;i++){
			//alert(this.data.length);
			var li=document.createElement("div");
			li.className="header";
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
			li.innerHTML="<div><label for=\"listq"+i+"\"><input name='listq' id=\""+i+"\" type=\"checkbox\">"+this.data[i].title+"</label></div><div>"+this.data[i].times+"</div><div style='color:"+color+";'>"+stat+"</div><div><button class=\"edit\">编辑</button><button class=\"del\">删除</button><button class=\"view\">查看问卷</button></div>";
			//li.innerHTML='<ul class="header"><label for=\"listq"+i+"\"><input name='listq' id=\"listq"+i+"\" type=\"checkbox\">"+this.data[i].title+"</label></div><div>"+this.data[i].times+"</div><div style='color:"+color+";'>"+stat+"</div><div><button class=\"edit\">编辑</button><button class=\"del\">删除</button><button class=\"view\">查看问卷</button></div>';
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
		var x=targetElem.parentNode.parentNode.children[0].children[0].children[0].id;

		storage.index=x;
		storage.do_data="edit";
		storage.ques=JSON.stringify(data[storage.index]);
	//	alert(storage.ques);
		//alert()
		location.href="new.html";
	}
}
//var chose=0;

var chose_del=document.getElementsByClassName("del");
for(var i=0;i<chose_del.length;i++){
	var index=i;
	chose_del[i].onclick=function(event){
		var event=event||window.event;
		var targetElem=event.target||event.srcElement;
		
		var x=targetElem.parentNode.parentNode.children[0].children[0].children[0].id;

		storage.index=x;
		//chose++;
		storage.do_data="del";
		data.splice(storage.index,1);
		changedata(1);
		location.href="index.html";
	}
}

var chose_view=document.getElementsByClassName("view");
for(var i=0;i<chose_view.length;i++){
	chose_view[i].onclick=function(event){
		var event=event||window.event;
		var targetElem=event.target||event.srcElement;
		var x=targetElem.parentNode.parentNode.children[0].children[0].children[0].id;

		storage.index=x;
		storage.do_data="view";
		storage.ques=JSON.stringify(data[storage.index]);
		location.href="view.html";
	}
}
var chose=0;
var flag=1;
var headers=document.getElementsByClassName("header");
selectall.onclick=function(){
	//alert("daq");
	if(flag){
		for(var i=0;i<headers.length;i++){
			headers[i].children[0].children[0].children[0].checked="checked";
		}
		flag=0;
		chose=headers.length;
	}else{
		selectall.checked=null;
		for(var i=0;i<headers.length;i++){
			headers[i].children[0].children[0].children[0].checked=null;
		}
		flag=1;
		chose=0;
	}
	
}

for(var i=0;i<headers.length;i++){
	headers[i].children[0].children[0].children[0].onclick=function(event){
		var event=event||window.event;
		var tElem=event.target||event.srcElement;
		//alert(tElem.checked);
		if(selectall.checked&&!tElem.checked){
			selectall.checked=null;
			flag=1;
		}
		if(tElem.checked){
			chose++;
			if(chose==headers.length){
				selectall.checked="checked";
			}
		}else if(!tElem.checked){
			chose--;
		}
			
	}
	
}
delall.onclick=function(){
	if(selectall.checked){
		data=[];
		changedata(1);
		location.href="index.html";
	}else{
		for(var i=0;i<chose_del.length;i++){
			if(chose_del[i].parentNode.parentNode.children[0].children[0].children[0].checked){
				var x=chose_del[i].parentNode.parentNode.children[0].children[0].children[0].id;
				storage.index=x;
				storage.do_data="del";
				data.splice(storage.index,1);
				changedata(1);
				
			}
		}
		location.href="index.html";
			
	}
}
	
};

