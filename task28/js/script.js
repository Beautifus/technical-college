
window.onload=function(){
	var k=1;
	var addSat=$("adds");
	var container=$("container");
	var result=[];
	$("choice").style.display="none";
	var craft={
		power: '前进号',
		speed:3,
		consume:5,
		ener: "劲量型",
		addener:2,
		state:"停止",
	};
	var adapter={
		identifier:{
			"前进号":"0001",
			"奔腾号":"0010",
			"超越号":"0011",
			"劲量型":"0100",
			"光能型":"0101",
			"永久型":"0110",
		},
		state:{
			"飞行":"0001",
			"停止":"0010",
			"即将销毁":"1100",
		},
		remainener:"",

	}
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
	
function RmEventHandler(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
			alert("11");
		}else if(element.detachEvent){
			alert("22");
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	}
	//alert(eles_power.length);
	/*EventHandler($("choice"),"click",function(){
		powandEner();

	})*/
	var flag=0;
	var su;
	function powandEner(){
		var eles_power=document.getElementsByName("power");
		var eles_ener=document.getElementsByName("ener");
		for(var i=0;i<eles_power.length;i++){
			//alert(eles_power[i].checked)
			if(eles_power[i].checked==true){
				craft.power=eles_power[i].value;
				var str=eles_power[i].nextElementSibling.innerHTML;
				craft.speed=str.charAt(parseInt(str.indexOf("速率"))+2);
				craft.consume=str.charAt(parseInt(str.indexOf("能耗"))+2);
			}
		}
		for(var i=0;i<eles_ener.length;i++){
			if(eles_ener[i].checked==true){
				craft.ener=eles_ener[i].value;
				var str=eles_ener[i].nextElementSibling.innerHTML;
				craft.addener=str.charAt(parseInt(str.indexOf("速度"))+2);
			}
		}

	}
	function star(k){
		var newRail=document.createElement("div");
			newRail.id="planet_rail_"+k;
		var newDiv=document.createElement("div");
			newDiv.style.color="red";
		newDiv.innerHTML="<span style=\"color:red,font-size:10px\">"+k+"号"+"</span>"+"<span style=\"color:red\">100%</span>";
		newDiv.id="aircraft_"+k;
			//newDiv.
		newRail.appendChild(newDiv);
		$("content").appendChild(newRail);	
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
	var status,str;
	function render(craft_k,power,ener,state,remainener){
		if($("craft"+craft_k)){
			//state="建立";
			alert($("craft"+craft_k).children[3]);
			$("craft"+craft_k).children[3].innerHTML=state;
		}else{
			$("mytable").innerHTML+='<tr id="craft'+craft_k+'"><td>'+craft_k+'</td><td>'+power+'</td><td>'+ener+'</td><td>'+state+'</td><td>'+remainener+'</td>'+'</tr>';
		}
}
function addListen(){
	powandEner();
	var power,ener,state,craft_k,remainener;
$("isure").onclick=function(e){
	$("choice").style.display="none";
			power=craft.power;
		ener=craft.ener;
		state=craft.state;
		craft_k=$("choice").value;
		remainener=$("aircraft_"+craft_k).lastElementChild.innerHTML;
		render(craft_k,power,ener,state,remainener);
	//	alert(e.innerHTML);
		e.stopPropagation();
}
	
	$("icancle").onclick=function(e){
		$("choice").style.display="none";
		su="您选择默认设置";
		console.log(su);
		var craft_k=1;
			var pow=craft.power;
			
			var ene=craft.ener;
			// adapter.identifier;
			var stat=craft.state;
			var remainener=$("aircraft_"+craft_k).lastElementChild.innerHTML;
			e.stopPropagation();
		//render(craft_k,pow,ene,stat,remainener);
	}
	var childs1=getClassName("Button1");
	var childs2=getClassName("Button2");
	var childs3=getClassName("Button3");
	var control_eles=getClassName("Button");
	for(var i=0;i<control_eles.length;i++){
		control_eles[i].onclick=function(e){
		//EventHandler(control_eles[i],"click",function(e){
			var e = e || window.event;
			var targetElem=e.target||e.srcElement;
			var targetCon=targetElem.innerHTML;
			//alert(targetCon);
			var cls=targetElem.parentNode.className;
			var railIndex=cls.charAt(cls.length-1);
			//alert(cls+"   "+railIndex);
			setTimeout(function(){
				var newConsole=new Console();
				if(Math.random()>0.1){
					if(targetCon=="开始飞行"){
						targetElem.disabled=true;
						targetElem.nextElementSibling.disabled=false;
						targetElem.nextElementSibling.nextElementSibling.disabled=false;
						startFly(e);
						newConsole.init({currTime:currTime(),index:railIndex,command:"开始飞行",state:'success'});
						
					}else if(targetCon=="停止飞行"){
							targetElem.disabled=true;
							targetElem.previousSibling.disabled=false;
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
		}
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
	EventHandler(addSat,"click",function(e){
		e.stopPropagation();
		addNewSat();
		addListen();
	//	addNewline();
	});
	function getRandom(){
		return Math.floor(-Math.random()*10);
	}
	/*var rect={
		width:getWidth();
		height:getHeight();
	}*/

	var width=0;
	
	var craftTimer=[];
	var locationRec=[1,1,1,1];
	function startFly(e){

		var cls=e.target.parentNode.className;
		var p=e.target.parentNode.className.charAt(cls.length-1);
		craft.state="飞行";
			var ss="craft"+p;
			$(ss).children[3].innerHTML=craft.state;
		var fp="planet_rail_"+p;
		var flyp=$(fp);
		if(craftTimer[p-1]){
			clearInterval(craftTimer[p-1]);	
		}
		//alert(flyp);
		var ener;
		craftTimer[p-1]=setInterval(function(){
			//alert("haha");
			var count=locationRec[p-1];
			var energyText=flyp.firstElementChild.lastElementChild;
			var value=energyText.innerHTML.substring(0,energyText.innerHTML.length-1);
			value=parseInt(value);
			flyp.style.transform="rotate("+18*craft.speed*count+"deg)";
		//	alert(18*craft.speed*count);
			ener=value-(craft.consume);
			if(ener<=0){
				 ener=0;
				 e.target.disabled=false;
				 e.target.nextElementSibling.disabled=true;
				 var newConsole=new Console();
				newConsole.init({currTime:currTime(),index:p,command:"停止飞行",state:'success'});
				stopFly(e);

			}
			calEnergy(flyp,ener,p);
			count++;
			if(count>20){
				count=1;
			}
			locationRec[p-1]=count;
			
		},500);
	}
	function calEnergy(obj,value,p){
		var energyFig=obj.firstElementChild;
		var energyText=obj.firstElementChild.lastElementChild;
		energyFig.style.width=value/2+"%";
		energyFig.style.maxWidth="100px";
		energyText.innerHTML=value+"%";
		var ss="craft"+p;
		$(ss).children[4].innerHTML=$("aircraft_"+p).lastChild.innerHTML;
	}
	var addtime=[];
	function stopFly(e){
		var cls=e.target.parentNode.className;
		var p=cls.charAt(cls.length-1);
		craft.state="停止";
			 var ss="craft"+p;
			$(ss).children[3].innerHTML=craft.state;
		clearInterval(craftTimer[p-1]);
		 addtime[p-1]=setInterval(function(){
			var cls=e.target.parentNode.className;
			var p=e.target.parentNode.className.charAt(cls.length-1);
			var fp="planet_rail_"+p;
			var flyp=$(fp);
			var energyText=flyp.firstElementChild.lastElementChild;
			//alert(energyText.innerHTML);
			var value=energyText.innerHTML.substring(0,energyText.innerHTML.length-1);
			value=parseInt(value)+parseInt(craft.addener);
			if(value>=100){
				value=100;
				
			 	clearInterval(addtime[p-1]);
			 }

			calEnergy(flyp,value,p);
		},1000);
	}
	var fp,p,flyP;
	function deleFly(e){
		var cls=e.target.parentNode.className;
		p=cls.charAt(cls.length-1);
		craft.state="销毁";
			var ss="craft"+p;
			$(ss).children[3].innerHTML=craft.state;
		fp="planet_rail_"+p;
		flyP=$(fp);
	//	alert(flyP.innerHTML);
		//flyP.removeElementChild(flyP.firstElementChild);
		flyP.parentNode.removeChild(flyP);
		e.target.parentNode.remove(e.target);
		busyline[p-1]=false;
		craft.state="销毁";
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
				busyline[i]=true;
				$("choice").style.display="inline";
				$("isure").disabled=false;
				$("choice").value=parseInt(i)+1;
				star(parseInt(i)+1);
				break;
			}
		}
	}
}
	