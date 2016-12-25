/*

   
    如图，命令输入框由input变为textarea，可以允许输入多条指令，每一行一条
    textarea左侧有一列可以显示当前行数的列（代码行数列），列数保持和textarea中一致
    当textarea发生上下滚动时，代码行数列同步滚动
    能够判断指令是否合法，不合法的指令给出提示（如图）
    点击执行时，依次逐条执行所有命令
    对于GO，TRA以及MOV指令增加可以移动格子数量的参数，例如
        GO 3：向当前方向前进三格
        TRA TOP 2：向屏幕上方平移两格
        MOV RIG 4：方向转向屏幕右侧，向屏幕的右侧移动四格


*/
function $(obj){
	return document.getElementById(obj); 
}
var add=[];
function addss(){
	
	for(var i=0;i<10;i++){
		var newdiv=document.createElement("div");
		add.push(newdiv);
		newdiv.className="mydiv";
		add[i]=[];
		for(var j=0;j<10;j++){
			var newElement=document.createElement("div");
			add[i].push(newElement);
			newElement.className="ss";
			newdiv.appendChild(newElement);
		}
		$("container").appendChild(newdiv);
	}
	var newarea=document.createElement("textarea");
	newarea.id="control";
	newarea.cols="5";
	newarea.wrap="virtual";
	newarea.rows="15";
	var newbutton=document.createElement("button");
	newbutton.id="butt";
	var newul=document.createElement("ul");
	newul.id="myul";
	newbutton.innerHTML="执行";
	var newbutton2=document.createElement("button");
	newbutton2.id="clear";
	newbutton2.innerHTML="清除";
	var newbutton3=document.createElement("button");
	newbutton3.id="flush";
	newbutton3.innerHTML="刷新";
	newEleme=document.createElement("div");
	newEleme.id="buttons";
	$("controlView").appendChild(newarea);
	$("controlView").appendChild(newul);
	$("controlView").appendChild(newbutton);
	$("controlView").appendChild(newbutton2);
	$("controlView").appendChild(newbutton3);
	$("controlView").appendChild(newEleme);
	add[1][0].className+=" oBlack-0";
	/*
	$("control").onkeypress=function(){
		var str=$("control").value;
		var lists=str.split('\n');
		for(var j=0;j<lists.length;j++){
			var newli=document.createElement("li");
			newli.innerHTML=j+1;
			$("myul").appendChild(newli);
		}
	}
	*/
}
addss();
var numtime,testNum;
var settings={
		w:1,
		h:0,
		dir:0,
	}
var form=function(){}
form.prototype.maker=function(){
	var button=$("butt");
	var txt=$("control");
	var direction=["top","right","bottom","left"];
	var handler=function(valu){
		var reg=/[0-9]/;
		valu=rtrim(valu);
		var num=valu[valu.length-1];
		if(reg.test(num)){
			num=valu[valu.length-1];
			var value=alltrim(valu.slice(0,valu.length-1));
		}else{
			num=0;
			value=valu;
		}
		function alltrim(value){
			return value.replace(/(^\s*)|(\s*$)/g,"");
		}
		function rtrim(value){
			return value.replace(/(\s*$)/g,"");
		}
		//alert(value+ "haha"+num);
		var rotate=0;
		var ww=settings.w;
		var hh=settings.h;
		//num=parseInt(num)-1;
		switch(value){
			case "GO":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						GO();
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								GO();
								num--;
							}	
						},1000);
					}
				},1000);
					break;
			case "TUN LEF":
				testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TUN(value);
					}
				},100);	
				break;
			case "TUN RIG":
				testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TUN(value);
					}
				},100);
				break;	
			case "TUN BAC":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TUN(value);
					}
				},100);
				break;
			case "TRN LEF":
		 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TRA(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								TRA(value);
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
			case "TRN TOP":
		 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TRA(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								TRA(value);
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
			case "TRN RIG":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TRA(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								TRA(value);
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
				break;
			case "TRN BOT":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						TRA(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								TRA(value);
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
			case "MOV LEF":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						MOV(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								GO();
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
			case "MOV TOP":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						MOV(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								GO();
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
			case "MOV RIG":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						MOV(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								GO();
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
			case "MOV BOT":
				 testNum=setInterval(function(){
					if(!numtime){
						clearInterval(testNum);
						testNum=0;
						MOV(value);
						num--;
						numtime=setInterval(function(){
							if(parseInt(num)<=0){
								clearInterval(numtime);
								numtime=0;
							}else{
								GO();
								num--;
							}
						},1000);
					}
				},1000);
				//alert("g");
				break;
				alert("a");
		}
	}
			
	button.onclick=function(){
		var lists=$("control").value.split('\n');
		var k=0;
		var that=this;
		for(var i=0;i<k;i++){
				$("myul").children[i].style.background="silver";
		}
		action(lists,k);
	}
	function action(lists,k){
			var nums;
			if(nums){
				clearInterval(nums);
			}else{
				nums=setInterval(function(){
					if(!testNum&!numtime){
						clearInterval(nums);
						nums=0;
						handler(lists[k]);
						var l=parseInt(lists.length)-1;
						if(k==0){
							$("myul").children[0].style.background="silver";
						}else{
							$("myul").children[k-1].style.background="silver";
						}
						$("myul").children[k].style.background="red";
						//alert("k="+k);
						if((k+1) ==l){
							$("myul").children[k].style.background="silver";
						}else{
								var m=++k;
							action(lists,m);
						}
					}
					},1000);
			}
	}
	
	$("flush").onclick=function(){
		var ww=settings.w;
		var hh=settings.h;
		settings.w=1;
		settings.h=0;
		settings.dir=0;
		add[ww][hh].className="ss";
		ww=settings.w;
		hh=settings.h;
		add[ww][hh].className+=" oBlack-0";
	}
	
	$("clear").onclick=function(){
		$("control").value="";
		$("myul").innerHTML="";
	}

}
var controls=["GO","TUN LEF","TUN RIG","TUN BAC","TRN LEF","TRN TOP","TRN RIG","TRN BOT","MOV LEF","MOV TOP","MOV RIG","MOV BOT"];
var addButtons=function(){
	for(var i=0;i<12;i++){
		var newBut=document.createElement("button");
		newBut.innerHTML=controls[i];
		newBut.value=controls[i];
		newBut.onclick=function(){
			var that =this;
			if((that.value=="TUN LEF")||(that.value=="TUN RIG")||(that.value=="TUN BAC")){
				$("control").value+=that.value+" "+"\n";
			}else{
				$("control").value+=that.value+" 1"+"\n";
			}
			var lists=$("control").value.split('\n');
			var len=lists.length;
			//alert(len);
			var newli=document.createElement("li");
			newli.innerHTML=parseInt(len)-1;
			$("myul").appendChild(newli);
		}
		$("buttons").appendChild(newBut);
	}
}
addButtons();
form.prototype.maker();
