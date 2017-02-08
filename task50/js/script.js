window.onload=function(){
	//alert("a");
	var addbut=document.getElementById("addbutton");
var mytitle=document.getElementById("title");
var mycon=document.getElementById("mycon");
var mychoice=document.getElementById("choice");
var sava=document.getElementById("sava");
var publish=document.getElementById("publish");
var mysurvey=document.getElementById("survey");
//var mytext=document.getElementById("text");
var strrr='<li><span>Q%s <input type="text" value="%t"></span></li><li><input type="%typle"name="ques%s"><input type="text" value="%q1"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q2"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q3"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q4"></li>';
	var k=1;
	if(storage.ques){

		//alert(storage.questions);
		var que=JSON.parse(storage.ques);
		var title=que.title;
		var questions=que.question;
		//alert(questions);
			//{typle:"radio",text:"你好呀",options:["好得很","并不","非常不行","还可以"]},
			mytitle.value=title;
			//alert(questions.length);
		if(questions.length){
			for(var i=0;i<questions.length;i++){
				
				var newul=document.createElement("ul");

				newul.className="ques";
				//alert(questions[i].typle);
				var s=strrr.replace(/%s/,i+1).replace(/%t/,questions[i].text).replace(/%typle/g,questions[i].typle).replace(/%q1/,questions[i].options[0]).replace(/%q2/,questions[i].options[1]).replace(/%q3/,questions[i].options[2]).replace(/%q4/,questions[i].options[3]);
				newul.innerHTML=s;
				mycon.appendChild(newul);
			}
			k=questions.length+1;
		}
		storage.removeItem("ques");
		
	}
var str='<li><span>Q%s <input type="text"  id="text" value="这是一个问题"></span></li><li><input type="%q"name="ques%s" ><input type="text" value="第一个答案"></li><li><input type="%q"name="ques%s" placeholder="第二个答案"><input type="text" value="第二个答案"></li><li><input type="%q"name="ques%s" placeholder="第三个答案"><input type="text" value="第三个答案"></li><li><input type="%q"name="ques%s" placeholder="第四个答案"><input type="text" value="第四个答案"></li>';
addbut.onclick=function(event){
	if(mychoice.children.length==0){
		var newdiv=document.createElement("div");
		newdiv.className="choice";
		var newspan1=document.createElement("span");
		newspan1.innerHTML="O 单选题";
		newspan1.className="spanchoice";
		newspan1.onclick=radioclick;
		newdiv.appendChild(newspan1);

		var newspan2=document.createElement("span");
		newspan2.innerHTML="[] 多选题";
		newspan2.className="spanchoice";
		newspan2.onclick=multiclick;
		newdiv.appendChild(newspan2);

		var newspan3=document.createElement("span");
		newspan3.innerHTML="F 文本题";
		newspan3.className="spanchoice";
		newspan3.onclick=textclick;
		newdiv.appendChild(newspan3);

		mychoice.appendChild(newdiv);
	}
	
}
function radioclick(){
	var s=str.replace(/%s/g,k).replace(/%q/g,"radio");
	k++;
	var newul=document.createElement("ul");
	newul.className="ques";
	newul.innerHTML=s;
	mycon.appendChild(newul);
	input_click();
}
function multiclick(){
	var s=str.replace(/%s/g,k).replace(/%q/g,"checkbox");
	k++;
	var newul=document.createElement("ul");
	newul.className="ques";
	newul.innerHTML=s;
	mycon.appendChild(newul);
	input_click();
}
function textclick(){
	var newul=document.createElement("ul");
	newul.className="ques";
	newul.innerHTML='<li><span>Q'+k+'<input type="text" value="这是一个问题"></span></li>';
	var newli=document.createElement("li");

	var newtext=document.createElement("textarea");
	newtext.className=""
	newtext.cols="40";
	newtext.rows="8";
	newli.appendChild(newtext);
	newul.appendChild(newli);
	mycon.appendChild(newul);
	input_click();
}
var ss='<li>%s</li><li>%time</li><li>%status</li><li><span class="edit">编辑</span><span class="del">删除</span><span class="view">查看问卷</span></li>'
var s='<li>';
function input_click(){
	var inputs=document.getElementsByTagName("input");
//alert(inputs.length);
var value="";
for(var i=0;i<inputs.length;i++){
	inputs[i].onfocus=function(event){
		//alert("gg");
		var event=event||window.event;
		var targetElem=event.target||event.srcElement;
		value=targetElem.value;
		targetElem.value="";
	}
	inputs[i].onblur=function(event){
			//alert("fa");
			var event=event||window.event;
			var targetElem=event.target||event.srcElement;
			var val=targetElem.value;
			if(val==""){
				targetElem.value=value;
			}
		}
}
}
input_click();
var quess=document.getElementsByTagName("ul");
sava.onclick=function(event){
	//storage.do="save";
	var event=event||window.event;
	var targetElem=event.target||event.srcElement;
	var type=targetElem.id;
	if(type=="save"||type=="publish"){
		var length=data.length;
	var d={};
		d.title=mytitle.value;
		if(type=="save"){
			d.stat="1";
		}else if(type=="publish"){
			d.stat="0";
		}
		d.question=[];
		var l=0;
		//alert(quess[0].children[1].type)
	for(var i=0;i<quess.length;i++){
		var mytext=quess[i].querySelector("span input");
		//alert(mytext);
		var ssd='{"typle":"%typ","text":"'+mytext.value+'","options":["'+quess[i].children[1].children[1].value+'","'+quess[i].children[2].children[1].value+'","'+quess[i].children[3].children[1].value+'","'+quess[i].children[4].children[1].value+'"]}';
		var s=ssd.replace(/%typ/,quess[i].children[1].children[0].type);
		//alert(quess[i].children[1].children[0].type);
		s=JSON.parse(s);         //注意这里 ：往数组中不能添加字符串。。。。
		d.question[l++]=s;	
	}
	
	if(storage.do_data=="edit"){
			data[storage.index]=d;
			storage.removeItem("do_data");
		}else{
			data[length]=d;
		}
	changedata(1);
	location.href="index.html";
	}
	
}
};
