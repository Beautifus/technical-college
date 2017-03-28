	function getPos(event){
		var touch=event.touches[0];
		x=touch.pageX;
		y=touch.pageY;
		x=x-wid;
		y=y-hei;
		return {x:x,y:y};
	}
	var events={
		handleEvent:function(event){
			switch(event.type){
				case "touchstart":this.start(event);break;
				case "touchmove":this.move(event);break;
				case "touchend":this.end(event);break;
			}
		},
		start:function(event){
			event.preventDefault();
			pos=getPos(event);
			downck=checked(pos);
			pos.x=downck.x;
			pos.y=downck.y;
			records.push(downck.w);
			mycanvas.addEventListener("touchmove",this,false);
			mycanvas.addEventListener("touchend",this,false);
		},
		move:function(event){
			if(downck.w>=0){
				movepos=getPos(event);
				overck=checked(movepos);
				render();
				drawLine(ctx,pos.x,pos.y,movepos.x,movepos.y);
				if(overck.w>=0&&records[records.length-1]!=overck.w){
					records.push(overck.w);
					lines.push({x1:pos.x,y1:pos.y,x2:overck.x,y2:overck.y});
					pos.x=overck.x;
					pos.y=overck.y;
				}
			}	   
		},
		end:function(event){
				mycanvas.removeEventListener("touchmove",this,false);
				mycanvas.removeEventListener("touchend",this,false);
				if(downck.w<0){
					records=[];
					lines=[];
					render();
				}else if(downck.w>=0){
					var uppos={};
					uppos.x=event.changedTouches[0].pageX;
					uppos.y=event.changedTouches[0].pageY;
					var ck=checked(uppos);
					render();
					if(ck.w<0){
						ck.w=records[records.length-1];
						render();
					}else{
						drawLine(ctx,pos.x,pos.y,ck.x,ck.y);
						lines.push({x1:pos.x,y1:pos.y,x2:ck.x,y2:ck.y});
					}
					if(records[records.length-1]!=ck.w){
						records.push(ck.w);
					}
					if(records.length<5){
						radios.querySelector("p").innerHTML="密码太短，至少需要5个点";
						lines=[];
						records=[];
						render();
					}else if(radios.querySelectorAll("input")[0].checked){
						var t=setTimeout(function(){
							clearTimeout(t);
							if(!mypassword.length){
								for(var i=0;i<records.length;i++){
									mypassword[i]=records[i];
								}
								radios.querySelector("p").innerHTML="请再次输入手势密码";	
							}else{
								var pwdflag=validate(mypassword,records);
								if(pwdflag){
									changedata(1);
									radios.querySelector("p").innerHTML="密码设置成功";
									mypassword=[];
								}else{
									radios.querySelector("p").innerHTML="两次输入的不一致,重新绘制";
									mypassword=[];
								}	
							}
							lines=[];
							records=[];
							render();
						},1000);
					}else if(radios.querySelectorAll("input")[1].checked){
						var t=setTimeout(function(){
							clearTimeout(t);
							changedata(0);
							var flag=validate(mypassword,records);
							if(flag){
								radios.querySelector("p").innerHTML="密码正确！";
							}else{
								radios.querySelector("p").innerHTML="输入的密码不正确";
							}
							lines=[];
							records=[];
							render();
						},1000);
					}
				}
		}
		
	}
	function canvasopera(tar){
			mycanvas.addEventListener("touchstart",events,false);
	}
	function validate(mypassword,records){
		if(mypassword.length!=records.length){
			return false;
		}else{
			var flag=true;
			for(var i=0;i<mypassword.length;i++){
				if(mypassword[i]!=records[i]){
					flag=false;
					break;
				}
			}
		}
		return flag;
	}
	function render(){
		ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
		for(var i=0;i<circles.length;i++){
			drawCircle(ctx,circles[i].x,circles[i].y);
		}
		for(var i=0;i<records.length;i++){
			drawPwdCircle(ctx,circles[records[i]].x,circles[records[i]].y);
		}
		for(var j=0;j<lines.length;j++){
			drawLine(ctx,lines[j].x1,lines[j].y1,lines[j].x2,lines[j].y2);
		}
	}
	function checked(pos){
		var w=-1;
		for(var i=0;i<circles.length;i++){
			if(circles[i].x-30<=pos.x&&pos.x<=circles[i].x+30){
				if(circles[i].y-30<=pos.y&&pos.y<=circles[i].y+30){
					w=i;
					pos.x=circles[i].x;
					pos.y=circles[i].y;
					break;
				}
			}
		}
		return {w:w,x:pos.x,y:pos.y};
	}
	canvasopera("set");