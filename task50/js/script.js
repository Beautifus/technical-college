window.onload=function(){
	var addbut=document.getElementById("addbutton");
	var mytitle=document.getElementById("title");
	var mycon=document.getElementById("mycon");
	var mychoice=document.getElementById("choice");
	var sava=document.getElementById("sava");
	var publish=document.getElementById("publish");
	var mysurvey=document.getElementById("survey");
//var mytext=document.getElementById("text");
var strrr='<li><span>Q%s <input type="text" value="%t"></span></li><li><input type="%typle"name="ques%s"><input type="text" value="%q1"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q2"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q3"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q4"></li><li><button class="up">上移</button><button class="down">下移</button><button class="reuse">复用</button><button class="quesdel">删除</button></li>';
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
				if(questions[i].typle=="text"){
					var text='<li><span>Q'+(i+1)+'<input type="text" value="'+questions[i].text+'"></span></li><li><textarea rows="8" cols="40">'+questions[i].values+'</textarea></li><li><button class="up">上移</button><button class="down">下移</button><button class="reuse">复用</button><button class="quesdel">删除</button></li>';
					newul.innerHTML=text;

				}else{
					var s=strrr.replace(/%s/,i+1).replace(/%t/,questions[i].text).replace(/%typle/g,questions[i].typle).replace(/%q1/,questions[i].options[0]).replace(/%q2/,questions[i].options[1]).replace(/%q3/,questions[i].options[2]).replace(/%q4/,questions[i].options[3]);
					newul.innerHTML=s;
				}
				mycon.appendChild(newul);
			}
			k=questions.length+1;
		}
		up_click();
		storage.removeItem("ques");
		
	}
var str='<li><span>Q%s <input type="text"  id="text" value="这是一个问题"></span></li><li><input type="%q"name="ques%s" ><input type="text" value="第一个答案"></li><li><input type="%q"name="ques%s" placeholder="第二个答案"><input type="text" value="第二个答案"></li><li><input type="%q"name="ques%s" placeholder="第三个答案"><input type="text" value="第三个答案"></li><li><input type="%q"name="ques%s" placeholder="第四个答案"><input type="text" value="第四个答案"></li><li><button class="up">上移</button><button class="down">下移</button><button class="reuse">复用</button><button class="quesdel">删除</button></li>';
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
function check_k(node){
	var w=0;
	if(node){
		var x=node.children[0].children[0].innerHTML.indexOf("Q");
		var y=node.children[0].children[0].innerHTML.indexOf("<i");
		w=node.children[0].children[0].innerHTML.substring(x+1,y);
		w=parseInt(w);
		//alert(x+" "+y);
		//alert(node.children[0].children[0].innerHTML);
		w+=1;
	}else{
		w+=1;
	}
	return w;
	
}
function radioclick(){
	var k=check_k(mycon.children[mycon.children.length-1]);
	//alert(k);
	var s=str.replace(/%s/g,k).replace(/%q/g,"radio");
	var newul=document.createElement("ul");
	newul.className="ques";
	newul.innerHTML=s;
	mycon.appendChild(newul);
	input_click();
	up_click();
}
function multiclick(){
	var k=check_k(mycon.children[mycon.children.length-1]);
	var s=str.replace(/%s/g,k).replace(/%q/g,"checkbox");
	var newul=document.createElement("ul");
	newul.className="ques";
	newul.innerHTML=s;
	mycon.appendChild(newul);
	input_click();
	up_click();
}

function textclick(){
	var k=check_k(mycon.children[mycon.children.length-1]);
	var newul=document.createElement("ul");
	newul.className="ques";
	newul.innerHTML='<li><span>Q'+k+' <input type="text" value="这是一个问题"></span></li><li><textarea cols="40" rows="8"></textarea></li><li><button class="up">上移</button><button class="down">下移</button><button class="reuse">复用</button><button class="quesdel">删除</button></li>';

/*	var newli=document.createElement("li");
	var newtext=document.createElement("textarea");
	newtext.className="text";
	newtext.rows="8";
	newtext.cols="40";
	newli.appendChild(newtext);
	newul.appendChild(newli);

	var newli2=document.createElement("li");
	newli2.innerHTML='<li><button class="up">上移</button><button class="down">下移</button><button class="reuse">复用</button><button class="quesdel">删除</button></li>';
	
	newul.appendChild(newli2);*/
	mycon.appendChild(newul);
	input_click();
	up_click();
}
var ss='<li>%s</li><li>%time</li><li>%status</li><li><span class="edit">编辑</span><span class="del">删除</span><span class="view">查看问卷</span></li>'
var s='<li>';
function input_click(){
	var inputs=document.getElementsByTagName("input");
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
		if(quess[i].querySelector("li textarea")){
			var tex='{"typle":"text","text":"'+mytext.value+'","values":"'+quess[i].children[1].children[0].value+'"}';
			tex=JSON.parse(tex);
			d.question[l++]=tex;
		}else{
			var ssd='{"typle":"%typ","text":"'+mytext.value+'","options":["'+quess[i].children[1].children[1].value+'","'+quess[i].children[2].children[1].value+'","'+quess[i].children[3].children[1].value+'","'+quess[i].children[4].children[1].value+'"]}';
			var s=ssd.replace(/%typ/,quess[i].children[1].children[0].type);
			s=JSON.parse(s);         //注意这里 ：往数组中不能添加字符串。。。。
			d.question[l++]=s;
		}
			
	}
	if(storage.do_data=="edit"){
			data[storage.index]=d;
			storage.removeItem("do_data");
		}else{
			data[length]=d;
			storage.removeItem("do_data");
		}
	changedata(1);
	location.href="index.html";
	}
	
}
function update_num(node,w){
	var w=w;
	var node=node;
	while(node.nextSibling){
		w++;
		node=node.nextSibling;
		var k=check_k(node)-1;
		var value=node.querySelector("span input").value;
		node.children[0].children[0].innerHTML=node.children[0].children[0].innerHTML.replace(k,w);
		node.querySelector("span input").value=value;
	}
}
//DOM没有提供insertAfter()方法
function insertAfter(newElement, targetElement){
var parent = targetElement.parentNode;
if (parent.lastChild == targetElement) {
// 如果最后的节点是目标元素，则直接添加。因为默认是最后
parent.appendChild(newElement);
}
else {
parent.insertBefore(newElement, targetElement.nextSibling);
//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
}
}
function up_click(){
	var ups=document.getElementsByClassName("up");
	var downs=document.getElementsByClassName("down");
	var reuses=document.getElementsByClassName("reuse");
	var quesdels=document.getElementsByClassName("quesdel");
	for(var i=0;i<ups.length;i++){
		ups[i].onclick=function(event){
			var event=event||window.event;
			var targetElem=event.target||event.srcElement;
			var parentul=targetElem.parentNode.parentNode;
			var w1=check_k(parentul);
				w1-=1;
			if(parentul.previousSibling){
				var presibling=parentul.previousSibling;
				var w2=check_k(presibling);
				w2-=1;
				var v1=parentul.querySelector("span input").value;
				var v2=presibling.querySelector("span input").value;
				parentul.children[0].children[0].innerHTML=parentul.children[0].children[0].innerHTML.replace(w1,w2);
				presibling.children[0].children[0].innerHTML=presibling.children[0].children[0].innerHTML.replace(w2,w1);
				parentul.querySelector("span input").value=v1;
				presibling.querySelector("span input").value=v2;
				mycon.insertBefore(parentul,presibling);
			}
			input_click();
			}
		downs[i].onclick=function(event){
			var event=event||window.event;
			var targetElem=event.target||event.srcElement;
			var parentul=targetElem.parentNode.parentNode;
				var w1=check_k(parentul);
				w1-=1;
				var nextsibling=parentul.nextSibling;
				var w2=check_k(nextsibling);
					w2-=1;
				var v1=nextsibling.querySelector("span input").value;
						v2=parentul.querySelector("span input").value;
						nextsibling.children[0].children[0].innerHTML=nextsibling.children[0].children[0].innerHTML.replace(w2,w1);
						parentul.children[0].children[0].innerHTML=parentul.children[0].children[0].innerHTML.replace(w1,w2);
						nextsibling.querySelector("span input").value=v1;
						parentul.querySelector("span input").value=v2;
				insertAfter(parentul,nextsibling);
			input_click();
		}
		reuses[i].onclick=function(event){
			var event=event||window.event;
			var targetElem=event.target||event.srcElement;
			var parentul=targetElem.parentNode.parentNode;
			var node=document.createElement("ul");
				node.className="ques";
			var k=check_k(parentul);
			if(parentul.querySelector("textarea")){
				var text='<li><span>Q'+k+'<input type="text" value="'+parentul.children[0].querySelector("span input").value+'"></span></li><li><textarea rows="8" cols="40">'+parentul.children[1].children[0].values+'</textarea></li><li><button class="up">上移</button><button class="down">下移</button><button class="reuse">复用</button><button class="quesdel">删除</button></li>';
				node.innerHTML=text;
			}else{
				var s=strrr.replace(/%s/,k).replace(/%t/,parentul.children[0].querySelector("span input").value).replace(/%typle/g,parentul.children[1].children[0].type).replace(/%q1/,parentul.children[1].children[1].value).replace(/%q2/,parentul.children[2].children[1].value).replace(/%q3/,parentul.children[3].children[1].value).replace(/%q4/,parentul.children[4].children[1].value);
					node.innerHTML=s;
			}
			if(parentul.nextSibling){
				var nextsibling=parentul.nextSibling;
				if(nextsibling==null){
					//mycon.appendChild(parentul);
					mycon.appendChild(node);
				}else{
				mycon.insertBefore(node,nextsibling);
				}
			}else{
				mycon.appendChild(node);
			}
			update_num(parentul.nextSibling,k);
			input_click();
			up_click();
		}
		quesdels[i].onclick=function(event){
			var event=event||window.event;
			var targetElem=event.target||event.srcElement;
			var parentul=targetElem.parentNode.parentNode;
			var ppnode=parentul.parentNode;
			var k=check_k(parentul);
			update_num(parentul,k-2);
			var p=ppnode.removeChild(parentul);
			
			input_click();
			up_click();
		}
	}
}

};
