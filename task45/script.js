(function(window,undefined){
	function barel(){
		return new barel.prototype.init();
	}

	barel.prototype.init=function(){
		this.sourceImage=[];
		this.baseUrl = "http://placehold.it/";
		this.minHeight=200;
		this.loadNumber=10;
		this.createContainer();
		this.draw();		
	}
	barel.prototype.draw=function(){
		this.getImage();
		this.renderRow(this.getRow());
	}
	barel.prototype.getImage=function(){
		var _this=this;
		var width,height;
		//alert(_this.minHeight);
		for(var i=0;i<_this.loadNumber;i++){
			//alert(i);
			width=Math.floor(Math.random()*300+300);
			height=Math.floor(Math.random()*30+300);
			this.sourceImage.push({
				width:width,
				height:height,
				url: this.baseUrl + width + "x" + height + "/" + this.randomColor() + "/fff",
				ratio:width/height,
			})

		}
	}
	barel.prototype.randomColor=function(){
		var brand=Math.floor(Math.random()*0xFFFFFF).toString(16);
		if(brand.length===6){
			return brand;
		}else{
			return this.randomColor();
		}
	}
	barel.prototype.createContainer=function(){
            this.container = document.createElement("div");
            this.container.className = "rowphotoContainer";
            document.body.appendChild(this.container);
	}
	barel.prototype.getRow=function(){
		var height=this.minHeight,
		width=0,
		ratio,
		totalHeight,
		rows=[],
		startIndex=0,
		endIndex=0,
		i;
		for(var i=0;i<this.sourceImage.length;i++){
			this.sourceImage[i].height=height;
			this.sourceImage[i].width=height*this.sourceImage[i].ratio;
			width+=this.sourceImage[i].width;
			endIndex=i;
			if(width>this.container.clientWidth){
				totalWidth=width-this.sourceImage[i].width;
				ratio=height/totalWidth;
				totalheight=(this.container.clientWidth-(endIndex-startIndex-1)*8)*ratio;
				rows.push({
					start:startIndex,
					end:endIndex-1,
					height:totalheight,
				})
				width=this.sourceImage[i].width;
				startIndex=i;
			}
		}
		return rows;
	}
	barel.prototype.renderRow=function(rows){
		for(var i=0;i<rows.length;i++){
			rowDom=document.createElement("div");
			rowDom.style.height=rows[i].height+"px";
			rowDom.className="rowDom";
			for(var j=rows[i].start;j<=rows[i].end;j++){
				var rowbox=document.createElement("div");
				rowbox.className="rowbox";
				var img=document.createElement("img");
				img.style.height=rows[i].height;
				img.style.width=rows[i].height*this.sourceImage[j].ratio;
				img.src=this.sourceImage[j].url;
				rowbox.appendChild(img);
				rowDom.appendChild(rowbox);
			}
			this.container.appendChild(rowDom);
		}
	}
	barel.prototype.init.prototype=barel.prototype;
	window.barel=barel;
})(window,undefined);