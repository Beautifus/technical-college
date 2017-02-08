var v=new view();
var leftcon=document.getElementById("left");
var con=document.createElement("div");
con.className="composite";
con.innerHTML="composite";
var conChild=document.createElement("ul");
conChild.className="comchild";
conChild.id="conul";
conChild.innerHTML="<li>sequence</li><li>dom</li>";
con.appendChild(conChild);
leftcon.appendChild(con);
var conChilds=document.getElementById("conul").getElementsByTagName("li");
var src="";
var lineIn="lineIn",lineOut="lineOut";
function getp(event){
	var e=event||window.event;
		var scrollX=document.body.scrollLeft||document.documentElement.scrollLeft;
		var scrollY=document.body.scrollTop||document.documentElement.scrollTop;
		var x=e.clientX||e.clientX+scrollX;
		var y=e.clientY||e.clientY+scrollY;
		return {x:x,y:y};
}
function getPos(event){
		var e=event||window.event;
		var scrollX=document.body.scrollLeft||document.documentElement.scrollLeft;
		var scrollY=document.body.scrollTop||document.documentElement.scrollTop;
		var x=e.clientX||e.clientX+scrollX;
		x=x-wid;
		var y=e.clientY||e.clientY+scrollY;
		y=y-hei;
		return {x:x,y:y};
}
for(var i=0;i<conChilds.length;i++){
	//alert(conChilds[i].innerHTML);
	conChilds[i].onmousedown=function(event){
		var e=event||window.event;
		var targetEle=e.target||e.srcElement;
		var inhtml=targetEle.innerHTML;
		src=inhtml;
		var pos=getPos(e);
		divX=pos.x;
		divY=pos.y;
		var posx,posy;
		if(divX<0||divY<0){
			divX=0;
		}
		var d=v.drawCicle(cont,src,divX,divY); 
		document.onmousemove=function(event){
			var e=event||window.event;
			var pos=getPos(event);
			 posx=pos.x-divX;
			 posy=pos.y-divY;
		}
		document.onmouseup=function(ev){
			document.onmousemove=null; //将move清除
            document.onmouseup=null;
            draws.push({x:posx,y:posy,src:src,lineOut:[],});
            d.redraw(divX,divY,posx,posy);
			for(var i=0;i<draws.length;i++){
				var poss=draws[i];
				v.drawCicle(cont,poss.src,poss.x,poss.y);
			} 
			for(var i=0;i<draws.length;i++){
				var ps=draws[i];
				//alert(ps[lineIn].length);
				if(ps.lineIn){
					v.drawLine(cont,ps.lineIn.lx,ps.lineIn.ly,ps.lineIn.x,ps.lineIn.y);
				}
				if(ps.lineOut.length){
					for(var j=0;j<ps.lineOut.length;j++){
						var pp=ps.lineOut[j];
						v.drawLine(cont,pp.lx,pp.ly,pp.x,pp.y);
					}
					
				}
			}
		}
		return false;
	};	
}
mycanvas.onmousedown=function(event){
	var event=event||window.event;
	var pos=getPos(event);
	var k=-1,x=0,y=0,lx=0,ly=0,flag=0,key;
	for(var i=0;i<draws.length;i++){
		if(pos.x>=draws[i].x&&pos.x<=draws[i].x+40&&pos.y>=draws[i].y&&pos.y<=draws[i].y+40){
			k=i;
			x=draws[k].x;
			y=draws[k].y;
			break;
		}else if(pos.x>=draws[i].x-15&&pos.x<draws[i].x&&pos.y>=draws[i].y+10&&pos.y<=draws[i].y+30){
			flag=i;
			key="left";
			lx=draws[i].x-10;
			ly=draws[i].y+20;
			break;
		}else if(pos.x>draws[i].x+40&&pos.x<=draws[i].x+55&&pos.y>=draws[i].y+10&&pos.y<=draws[i].y+30){
			flag=i;
			key="right";
			lx=draws[i].x+50;
			ly=draws[i].y+20;
			break;
		}
	}

	mycanvas.onmousemove=function(event){
		var poss=getPos(event);
			x=poss.x;
			y=poss.y;
	}
	mycanvas.onmouseup=function(event){
			mycanvas.onmousemove=null; //将move清除
			mycanvas.onmouseup=null;
		if(k != -1){
	        draws[k].x=x;
	        draws[k].y=y;
	        if(draws[k].lineIn){ //xy为终点，lxly为起点；
	        	draws[k].lineIn.x=draws[k].x-10;//lx，ly为起点，x,y为终点，对于传入的线段中x，y会改变
	       		draws[k].lineIn.y=draws[k].y+20;
	       		var s=draws[k].lineIn.k;
	       	//	alert(draws[s].lineOut.length);
	       		for(var j=0;j<draws[s].lineOut.length;j++){
	       			draws[s].lineOut[j].x=draws[k].x-10;//lx，ly为起点，x,y为终点，对于传入的线段中x，y会改变
	       			draws[s].lineOut[j].y=draws[k].y+20;
	       		}
	       		
	        }
	        if(draws[k].lineOut.length){
	        	for(var j=0;j<draws[k].lineOut.length;j++){
	        		draws[k].lineOut[j].lx=draws[k].x+50;
	        		draws[k].lineOut[j].ly=draws[k].y+20;
	        		var p=draws[k].lineOut[j].k;
	        		draws[p].lineIn.lx=draws[k].x+50;
	        		draws[p].lineIn.ly=draws[k].y+20;
	        	}
	        }
			v.redraw();
			x=0,y=0,k=0;
			for(var i=0;i<draws.length;i++){
				var ps=draws[i];
				v.drawCicle(cont,ps.src,ps.x,ps.y);	
			} 
			for(var i=0;i<draws.length;i++){
				var ps=draws[i];
				//alert(ps[lineIn].length);
				if(ps.lineIn){
					v.drawLine(cont,ps.lineIn.lx,ps.lineIn.ly,ps.lineIn.x,ps.lineIn.y);
				}
				if(ps.lineOut.length){
					for(var j=0;j<ps.lineOut.length;j++){
						var pp=ps.lineOut[j];
						v.drawLine(cont,pp.lx,pp.ly,pp.x,pp.y);
					}
					
				}
			}
		}else if(lx!=0 && ly!=0){
			addLine(key,flag,lx,ly,x,y);	
		}
		
	}
}
function addLine(key,flag,lx,ly,x,y){
		var w=0,ff=false;
		switch(key){
				case "left":
					alert("不能产生");
					break;
				case "right":
					for(var i=0;i<draws.length;i++){
						if((x>=draws[i].x-15&&x<draws[i].x&&y>=draws[i].y+10&&y<=draws[i].y+30)||(x>=draws[i].x&&x<=draws[i].x+40&&y>=draws[i].y&&y<=draws[i].y+40)){
							x=draws[i].x-10;
							y=draws[i].y+20;
							v.drawLine(cont,lx,ly,draws[i].x-10,draws[i].y+20);
							//alert(i);
							w=i;
							ff=true;
							break;
						}
					}
					if(ff){
						draws[flag].lineOut.push({lx:lx,ly:ly,x:x,y:y,k:w});//xy为终点，lxly为起点；
						draws[w].lineIn={lx:lx,ly:ly,x:x,y:y,k:flag};//xy为终点，lxly为起点；x与y为
						break;
					}else{
						break;
					}
			}
}