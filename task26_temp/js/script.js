window.onload=function(){
	/*var canvas=document.getElementById("mycanvas");
	var ctx=canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle="red";
	ctx.translate(200,230);
	ctx.arc(0,0,50,0,2*Math.PI,false);
	ctx.closePath();
	ctx.fill();
	//ctx.endfill();
	*/

	var k=1;
	var addSat=$("adds");
	var container=$("container");

	var result=[];
function $(obj){
		return document.getElementById(obj);
	}
function EventHandler(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	}
var currTime=function(){
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth();
	var day=now.getDate();
	var hour=now.getHours();
	var minus=now.getMinutes();
	var second=now.getSeconds();
	var result=year+"年"+(month+1)+"月"+day+"日"+hour+"时"+minus+"分"+second+"秒";
	return result;
}
	var status;
function addListen(){
	var childs1=getClassName("Button1");
	var childs2=getClassName("Button2");
	var childs3=getClassName("Button3");
	var control_eles=getClassName("Button");
	for(var i=0;i<control_eles.length;i++){
		EventHandler(control_eles[i],"click",function(e){
			var e = e || window.event;
			var targetElem=e.target||e.srcElement;
			var targetCon=targetElem.innerHTML;
			//alert(targetCon);
			var cls=targetElem.parentNode.className;
			var railIndex=cls.charAt(cls.length-1);
			//alert(cls+"   "+railIndex);
			setTimeout(function(){
				var newConsole=new Console();
				if(Math.random()>0.3){
					if(targetCon=="开始飞行"){
						startFly(e);
						newConsole.init({currTime:currTime(),index:railIndex,command:"开始飞行",state:'success'});
						
					}else if(targetCon=="停止飞行"){
						newConsole.init({currTime:currTime(),index:railIndex,command:"停止飞行",state:'success'});
						stopFly(e);
					}else if(targetCon=="销毁"){
						newConsole.init({currTime:currTime(),index:railIndex,command:"被销毁",state:'success'});
						deleFly(e);
					}
				}else{
					if(targetCon=="开始起飞"){
						newConsole.init({currTime:currTime(),index:railIndex,command:"开始起飞",state:'failed'});
						//startFly(e);
					}else if(targetCon=="停止飞行"){
						newConsole.init({currTime:currTime(),index:railIndex,command:"停止飞行",state:'failed'});
					//	stopFly(e);
					}else if(targetCon=="销毁"){
						newConsole.init({currTime:currTime(),index:railIndex,command:"被销毁",state:'failed'});
					//	deleFly(e);
					}
				}
			},500);

		})
		/*EventHandler(childs1[i],"click",function(e){
			startFly(e);	
		});
		EventHandler(childs1[i],"dblclick",function(e){
				//alert("db");
				e.target.disabled=true;
		})
		EventHandler(childs2[i],"click",function(e){
			stopFly(e);
		});
		EventHandler(childs3[i],"click",function(e){
			deleFly(e);
		});*/
	}
}
var Console=function(){
	function Console(){};
	Console.prototype.init=function(children){
		this.children=children;
		this.publishCode();
	}
	var place;
	Console.prototype.publishCode=function(){
		var contentObj=$("console_content");
		var str='<div><span style="color:{color}">'+this.children.currTime+this.children.index+"号船"+this.children.command+"{place}"+"</span></div>";
		if(this.children.state=="success"){
			str=str.replace(/{color}/,"green");
			str=str.replace(/{place}/,"成功");
			contentObj.innerHTML+=str;
			contentObj.scrollTop=contentObj.scrollHeight;
		}else if(this.children.state=="failed"){
			str=str.replace(/{color}/,"red");
			str=str.replace(/{place}/,"失败");
			contentObj.innerHTML+=str;
			contentObj.scrollTop=contentObj.scrollHeight;
		}
	}
	return Console;
}();
	var busyline=[false,false,false,false];
	EventHandler(addSat,"click",function(){
		addNewSat();
		addListen();
	});
	function getRandom(){
		return Math.floor(-Math.random()*10);
	}
	/*var rect={
		width:getWidth();
		height:getHeight();
	}*/
	var width=0;
	function star(k){
		var newRail=document.createElement("div");
			newRail.id="planet_rail_"+k;
		var newDiv=document.createElement("div");
		newDiv.innerHTML="<span style=\"color:red\">"+k+"号"+"</span>"+"<span style=\"color:red\">100%</span>";
	//	alert(newDiv.innerHTML);
		newDiv.id="aircraft_"+k;
			//newDiv.
		newRail.appendChild(newDiv);
		$("content").appendChild(newRail);
	}
	var craftTimer=[];
	var locationRec=[1,1,1,1];
	function startFly(e){
		var cls=e.target.parentNode.className;
		var p=e.target.parentNode.className.charAt(cls.length-1);
		var fp="planet_rail_"+p;
		var flyp=$(fp);
		//alert(flyp.innerHTML);
		//alert(p);
		if(craftTimer[p-1]){
			clearInterval(craftTimer[p-1]);	
		}
		//alert(flyp);
		craftTimer[p-1]=setInterval(function(){
			//alert("haha");
			var count=locationRec[p-1];
			flyp.style.transform="rotate("+18*count+"deg)";
			var ener=100-5*count;
			calEnergy(flyp,ener);
			count++;
			if(count>20){
				count=1;
			}
			locationRec[p-1]=count;
		},500);
	}
	function calEnergy(obj,value){
		var energyFig=obj.firstElementChild;
		var energyText=obj.firstElementChild.lastElementChild;
		energyFig.style.width=value/2+"%";
		energyText.innerHTML=value+"%";
	}
	function stopFly(e){
		var cls=e.target.parentNode.className;
		var p=cls.charAt(cls.length-1);
		clearInterval(craftTimer[p-1]);
	}
	var fp,p,flyP;
	function deleFly(e){
		var cls=e.target.parentNode.className;
		p=cls.charAt(cls.length-1);
		fp="planet_rail_"+p;
		flyP=$(fp);
	//	alert(flyP.innerHTML);
		//flyP.removeElementChild(flyP.firstElementChild);
		flyP.parentNode.removeChild(flyP);
		e.target.parentNode.remove(e.target);
		busyline[p-1]=false;
	}
	function getClassName(name){
		if(document.getElementsByClassName){
			result=document.getElementsByClassName(name);
		}else{
			var all=document.getElementsByTagName("*");
		//	alert(all.length);
			for(var i=0;i<all.length;i++){
				var cls=all[i].className;
				for(var j=0;j<cls.length;j++){
					if(cls[j]==name){
						result.push(cls);
						break;
					}
				}
			}
		}
		return result;
	}
	function addNewSat(){
		for(var i=0;i<busyline.length;i++){
				//alert(busyline[i]);
			if(busyline[i]==false){
				
				var newDiv=document.createElement("div");
				newDiv.className+=" conSat_"+(parseInt(i)+1);
			//	alert(newDiv.className);
				newDiv.style.width=200;
				newDiv.style.height=20;
				var newInput=document.createElement("span");
				newInput.innerText=(parseInt(i)+1)+"号飞船下传的指令 : ";
				newInput.style.flex=2;
				var newButton1=document.createElement("button");
				newButton1.className="Button";
				newButton1.style.flex=1;
				newButton1.innerText="开始飞行";
				var newButton2=document.createElement("button");
				newButton2.className="Button";
				newButton2.style.flex=1;
				newButton2.innerText="停止飞行";
				var newButton3=document.createElement("button");
				newButton3.className="Button";
				newButton3.style.flex=1;
				newButton3.innerText="销毁";
				newDiv.appendChild(newInput);
				newDiv.appendChild(newButton1);
				newDiv.appendChild(newButton2);
				newDiv.appendChild(newButton3);
			//	newRail.appendChild(newDiv);
				container.appendChild(newDiv);	
				busyline[i]="true";
				star(parseInt(i)+1);
				break;	
			}
		}
	}
}
	