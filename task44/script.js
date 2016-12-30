(function(){
	function $(obj){
		return document.getElementById(obj);
	}
	
	function lays(){
		this.cTop=[
			{
				clientTop:0,
				clientLeft:0,
			},
			{
				clientTop:0,
				clientLeft:210,
			},
			{
				clientTop:0,
				clientLeft:420,
			},
			{
				clientTop:0,
				clientLeft:630,
			}
			];
	}
	var getAttribute=function(obj,key){
		return obj.currentStyle?obj.currentStyle[key]:window.getComputedStyle(obj,null)[key];
	}
	lays.prototype.init=function(){
		var _this=this;
		for(var i=0;i<8;i++){
			//console.log("a");
			_this.adds(i,lays.photos[i]);
			
		}
	}
	lays.prototype.checkFlag=function(){
		var _this=this;
		var max=_this.cTop[0].clientTop;
		var k=0;
		for(var j=1;j<_this.cTop.length;j++){
			if(max<_this.cTop[j].clientTop){
				min=_this.cTop[j].clientTop;
				k=j;
			}
		}
		var cHeight=_this.cTop[k].clientTop;
		var cliHeight=document.documentElement.clientHeight||document.body.clientHeight;
		var scroll=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		var scrollHeight=cliHeight+scroll;
		//console.log(cHeight);
		//console.log(cliHeight);
		//console.log(document.body.scrollHeight);
		if(cHeight<scrollHeight){
			return true;
		}else{
			return false;
		}	
	}
	lays.prototype.adds=function(i,srcs){
			var _this=this;
			var img=document.createElement("img");
			img.className="pic"+(i+1);
			var min=_this.cTop[0].clientTop;
			var k=0;
			for(var j=1;j<_this.cTop.length;j++){
				if(min>_this.cTop[j].clientTop){
					min=_this.cTop[j].clientTop;
					k=j;
				}
			}
			img.src=srcs;
			$("content").appendChild(img);
			img.style.position="absolute";
			img.style.top=min+"px";
			img.style.left=_this.cTop[k].clientLeft+"px";
			var height=getAttribute(img,"height").slice(0,getAttribute(img,"height").length-2);
			_this.cTop[k].clientTop=parseInt(min)+parseInt(height)+10;	
			var width=getAttribute(img,"width").slice(0,getAttribute(img,"width").length-2);
			document.scrollTop=document.scrollHeight;
			//_this.cTop[k].clientLeft=parseInt(_this.cTop[k].clientLeft)+parseInt(width);
			//alert(img.style.top+" left "+img.style.left);
	}
	var lays=new lays();
	lays.photos=['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg'];
	lays.init();
	window.onscroll=function(){
		if(lays.checkFlag()){
			ajax('pic.json',function(data){
				var data=eval(data);
				//console.log(data[0]);
				for(var i=0;i<data.length;i++){
					lays.adds(i,data[i]);
				}
			},function(){
				alert('json文件加载失败');
			})
		}
	}
	
})();