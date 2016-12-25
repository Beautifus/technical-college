var ww=settings.w;
var hh=settings.h;
var GO=function(){
	var ww=settings.w;
	var hh=settings.h;
		if(settings.dir=="0"&&settings.w=="0"){
			alert("不能向上移动");
		}else if(settings.dir=="3"&&settings.h==0){
			alert("不能向左移动");
		}else if(settings.dir=="1"&&settings.h==9){
			alert("不能向右移动");
		}else if(settings.dir=="2"&&settings.w==9){
			alert("不能向下移动");
		}else{
			switch(settings.dir){
				case 0:
					add[ww][hh].className="ss";
					add[ww-1][hh].className+=" oBlack-0";
					settings.w=ww-1;
					settings.dir=0;
					break;
				case 2:
					add[ww][hh].className="ss";
					add[ww+1][hh].className+=" oBlack-2";
					settings.dir=2;
					settings.w=ww+1;
					break;
				case 3:
			 		add[ww][hh].className="ss";
					add[ww][hh-1].className+=" oBlack-3";
					settings.dir=3;
					settings.h=hh-1;
					break;
				case 1:
					add[ww][hh].className="ss";
					add[ww][hh+1].className+=" oBlack-1";
					settings.dir=1;
					settings.h=hh+1;
					break;
			}
						
		}
}
var TUN=function(str){
	var d=settings.dir;
	var ww=settings.w;
	var hh=settings.h;
	var dd;
	switch(str){
		case "TUN LEF":
			dd=(d+4-1)%4;
			break;
		case "TUN RIG":
			dd=(d+1)%4;
			break;
		case  "TUN BAC":
			dd=(d+4-2)%4;
			break;
	}
	settings.dir=dd;
	add[ww][hh].className="ss";
	add[ww][hh].className+=" oBlack-"+dd;
}
var TRA=function(str){
	var d=settings.dir;
	var ww=settings.w;
	var hh=settings.h;
	add[ww][hh].className="ss";
	switch(str){
		case "TRN LEF":
			if(settings.h==0){
				add[ww][hh].className+=" oBlack-"+d;
				alert("不能向左移动");
			}else{
				add[ww][hh-1].className+=" oBlack-"+d;
				settings.h=hh-1;
			}
			break;
		case "TRN TOP":
			if(settings.w=="0"){
				add[ww][hh].className+=" oBlack-"+d;
				alert("不能向上移动");
			}else{
				add[ww-1][hh].className+=" oBlack-"+d;
				settings.w=ww-1;
			}
			break;
		case "TRN RIG":
			if(settings.h==9){
				add[ww][hh].className+=" oBlack-"+d;
				alert("不能向右移动");
			}else{
				add[ww][hh+1].className+=" oBlack-"+d;
				settings.h=hh+1;
			}
			break;
		case "TRN BOT":
			if(settings.w==9){
				add[ww][hh].className+=" oBlack-"+d;
					alert("不能向下移动");
			}else{
					add[ww+1][hh].className+=" oBlack-"+d;
					settings.w=ww+1;
			}
			break;
		}
}
var MOV=function(str){
	var ww=settings.w;
	var hh=settings.h;
	//var num=n;
	add[ww][hh].className="ss";
	switch(str){
		case "MOV LEF":
				if(settings.h==0){
				    add[ww][hh].className+=" oBlack-"+3;
				    settings.dir=3;
					alert("不能向左移动");
				}else{
					var d=settings.dir;
					add[ww][hh-1].className+=" oBlack-"+3;
					settings.dir=3;
					settings.h=hh-1;
				}
			break;
		case "MOV TOP":
					if(settings.w==0){
						add[ww][hh].className+=" oBlack-"+0;
						settings.dir=0;
						alert("不能向上移动");
					}else{
						var d=settings.dir;
						add[ww-1][hh].className+=" oBlack-"+0;
						settings.dir=0;
						settings.w=ww-1;
					}
			break;
		case "MOV RIG":
					if(settings.h==9){
						add[ww][hh].className+=" oBlack-"+1;
						settings.dir=1;
						alert("不能向右移动");
					}else{
						var d=settings.dir;
						add[ww][hh+1].className+=" oBlack-"+1;
						settings.dir=1;
						settings.h=hh+1;
						//alert(settings.h);
					}		
			break;
		case "MOV BOT":
				if(settings.w==9){
						add[ww][hh].className+=" oBlack-"+2;
						settings.dir=2;
						alert("不能向下移动");
				}else{
					var d=settings.dir;
					add[ww+1][hh].className+=" oBlack-"+2;
					settings.dir=2;
					settings.w=ww+1;
				}
			break;
	}
}