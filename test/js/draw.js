function drawCircle(ctx,x,y){
		ctx.lineWidth=1;
		ctx.fillStyle="#fff";
		//ctx.strokeStyle="#000";
		ctx.beginPath();
		ctx.moveTo(x+60,y);
		ctx.arc(x,y,60,0,2*Math.PI);
		ctx.fill();
		//ctx.stroke();
		ctx.closePath();
	}
	function drawPwdCircle(ctx,x,y){
		ctx.lineWidth=5;
		ctx.fillStyle="#f30";
		ctx.beginPath();
		ctx.moveTo(x+50,y);
		ctx.arc(x,y,50,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}
	function drawLine(ctx,x1,y1,x2,y2){
		ctx.lineWidth=3;
		ctx.fillStyle="#f30";
		ctx.strokeStyle="#f30";
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}