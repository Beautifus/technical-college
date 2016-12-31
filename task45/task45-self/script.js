(function(window,undefined){
	function $(obj){
		return document.getElementById(obj);
	}
	function barel(){
		return new barel.prototype.init();
	}
	barel.prototype.getTop=function(obj){
		var actualTop=obj.offsetTop;
		var offParent=obj.offsetParent;
		while(offParent!=null){
			actualTop+=offParent.offsetTop;
			offParent=offParent.offsetParent;
		}
		return actualTop;
	}
	barel.prototype.init=function(){
		this.minHeight=200;
		this.sourceImage=[];
		this.loadNumber=20;
		this.baseUrl="http://placehold.it/";
		this.draw();
		var that=this;
		window.onscroll=function(){
			var lastHeight=that.getTop(that.lastRow);
			var cHeight=document.documentElement.clientHeight||document.body.clientHeight;
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			if((lastHeight+that.lastRow.clientHeight)<(cHeight+scrollTop)){
				that.draw();
			}
		}
	}
	barel.prototype.draw=function(){
		this.getImage();
		this.renderRows(this.getRow());
	}
	barel.prototype.getImage=function(){
		for(var i=0;i<this.loadNumber;i++){
			width=Math.floor(Math.random()*300+300);
			height=Math.floor(Math.random()*30+300);
			this.sourceImage.push({
				width:width,
				height:height,
				ratio:width/height,
				url:this.baseUrl+width+"x"+height+"/"+this.randomColor()+"/fff",
			})
		}
	}
	barel.prototype.randomColor=function(){
		var brand=Math.floor(Math.random()*0xFFFFFF).toString(16);
		if(brand.length==6){
			return brand;
		}else{
			return this.randomColor();
		}
	}
	barel.prototype.getRow=function(){
		var height=this.minHeight,
		width=0,
		ratio,
		totolwidth,
		totolheight,
		startIndex=0,
		endIndex=0,
		rows=[];
		for(var i=0;i<this.sourceImage.length;i++){
			this.sourceImage[i].height=height;
			this.sourceImage[i].width=height*this.sourceImage[i].ratio;
			width=width+this.sourceImage[i].width;
			endIndex=i;
			if(width>$("container").clientWidth){
				totolwidth=width-this.sourceImage[i].width;
				ratio=height/totolwidth;
				totolheight=($("container").clientWidth-(endIndex-startIndex-1)*8)*ratio;
				rows.push({
					start:startIndex,
					end:endIndex-1,
					height:totolheight,
				});
				width=this.sourceImage[i].width;
				startIndex=i;
			}

		}
		return rows;
	}
	barel.prototype.renderRows=function(rows){
		for(var i=0;i<rows.length;i++){
			//console.log(rows[i].height);
			var rowDom=document.createElement("div");
			rowDom.className="rowDom";
			//console.log(rows[i].height);
			rowDom.style.height=rows[i].height+"px";
			for(var j=rows[i].start;j<=rows[i].end;j++){
				var photo=document.createElement("div");
					photo.className="photo";
				var img=document.createElement("img");
				img.src=this.sourceImage[j].url;
				img.style.height=rows[i].height+"px";
				img.style.width=Math.floor(rows[i].height*this.sourceImage[j].ratio)+"px";
				photo.appendChild(img);
				rowDom.appendChild(photo);
			}
			if(i==rows.length-1){
				this.lastRow=rowDom;
			}
			$("container").appendChild(rowDom);
		}
	}
	barel.prototype.init.prototype=barel.prototype;
	window.barel=barel;
})(window,undefined);