//this.view=this.view || {},
function view(){
}
view.prototype.redraw=function(x,y,w,z){
	cont.clearRect(0,0,mycanvas.width,mycanvas.height);
	//alert(draws.length);
	
}
view.prototype.drawCicle=function(v,src,x,y){
		v.fillStyle="white";
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,10);
		v.arcTo(x+40,y+40,x,y+40,10);
		v.arcTo(x,y+40,x,y,10);
		v.arcTo(x,y,x+40,y,10);
		//v.strokeRect(x,y,20,20);
		v.fill();
		v.closePath();
		//this.drawPic(v,x,y);
		this.drawleft(v,x,y);
		this.drawRight(v,x,y);
		switch(src){
			case "sequence":
				this.drawseq(v,x,y);
				break;
			case "dom":
				this.drawdom(v,x,y);
				break;
		}
		return this;
	}
	view.prototype.drawseq=function(v,x,y){
		v.beginPath();
		v.strokeStyle="red";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawdom=function(v,x,y){
		v.beginPath();
		v.strokeStyle="black";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawleft=function(v,x,y){
		v.fillStyle="white";
		v.beginPath();
		v.arc(x-5,y+20,10,Math.PI/180*300,Math.PI/180*60,true);
		v.fill();
		v.closePath();
	}
	view.prototype.drawRight=function(v,x,y){
		v.fillStyle="white";
		v.beginPath();
		v.arc(x+45,y+20,10,Math.PI/180*240,Math.PI/180*160,false);
		v.fill();
		v.closePath();
	}
	view.prototype.drawLine=function(v,x,y,w,z){
		//alert("ha");
		v.strokeStyle="blue";
		v.beginPath();
		v.moveTo(x,y);
		v.lineTo(w,z);
		v.stroke();
		v.closePath();
	}
var v=new view();
var wid=document.getElementById("content").offsetLeft;
var hei=document.getElementById("content").offsetTop;
var contents=document.getElementById("content");


