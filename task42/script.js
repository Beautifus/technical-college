(function(){
	var months=["Jaunary","February","March","April","May","June","July","August","September","October","November","December"];
	function $(obj){
		return document.getElementById(obj);
	}
	function getCountDays(year,mon,day){
		var curDate=new Date(year,mon,day);
		var curMonth=curDate.getMonth();
		curDate.setMonth(curMonth+1);
		curDate.setDate(0);
		return curDate.getDate();
	}
	//console.log(getCountDays(2016,10,3));
	function inits(){
		var _this=this;
		this.mon=$("month").value;
		this.year=$("year").value;
		this.k=0;
		for(var i=0;i<months.length;i++){
			if(this.mon==months[i]){
				this.k=i;
				break;
			}
		}
		this.date=new Date();
		//date.setFullYear(2016,11,1);
		this.date.setFullYear(this.year,this.k,1);
		//console.log(this.date);
		this.week=this.date.getDay();
		_this.day=1;
		$("viewwin").value=_this.year+"年"+months[_this.k]+"月"+_this.day+"日";
		//console.log(this.week);
		this.clicked={
				first:1,
				second:"",
				num:1,
			}
			
	}
	inits.prototype.createTbody=function(){
		$("tbody").innerHTML="";
		var _this=this;
		_this.preMonlastday=new Date(_this.date.getTime()-24*60*60*1000).getDate();
		var tr1=document.createElement("tr");
		var html1="";
		//console.log(this.week);
		for(var i=0;i<_this.week;i++){
			//alert(_this.week);
			html1+='<td style="opacity:0.6">'+(parseInt(_this.preMonlastday)-_this.week+1+i)+"</td>";
		}
		var d=1;
		var init=1;
		for(var i=0;i<6;i++){
			var tr=document.createElement("tr");
			var html="";
			for(var j=0;j<7;j++){
				if(i==0){
					html1+="<td>"+d+"</td>";
					d++;
					j+=(_this.week-2);
				}else{
					if(d<=getCountDays(_this.year,_this.k,1)){
						html+="<td>"+d+"</td>";
						d++;
					}else{
						html+='<td style="opacity:0.6">'+init+"</td>";
						init+=1;
					}
				}
			}
			if(i==0){
				tr1.innerHTML=html1;
				$("tbody").appendChild(tr1);
			}else{
				tr.innerHTML=html;
				$("tbody").appendChild(tr);
			}
		}
		
	

	}
	inits.prototype.fresh=function(){
		var m=$("viewwin").value.indexOf("月");
		var dd=$("viewwin").value.indexOf("日");
		var day=$("viewwin").value.slice(m+1,dd);
		var tds=document.getElementsByTagName("td");
		for(var j=0;j<tds.length;j++){
			if(tds[j].innerHTML==day){
				tds[j].style.background="green";
				break;
			}
		}
	}
	inits.prototype.events=function(){
		var _this=this;
		document.onclick=function(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
			var targetId=target.id;
			switch(targetId){
				case "viewwin":
				case "rili":
					$("calendar").style.display="block";
					break;
				case "monthdown":
				case "left":
					$(targetId).onclick=function(event){
						$("month").value=months[--_this.k];
						_this.mon=$("month").value;
						_this.createTbody();
						$("viewwin").value=_this.year+"年"+months[_this.k]+"月"+_this.day+"日";
						_this.fresh();

					}
					break;
				case "monthup":
					$(targetId).onclick=function(event){
						$("month").value=months[++_this.k];
						_this.mon=$("month").value;
						_this.createTbody();
						$("viewwin").value=_this.year+"年"+months[_this.k]+"月"+_this.day+"日";
						_this.fresh();

					}
					break;
				case "yearup":
				case "right":
					$(targetId).onclick=function(event){
						$("year").value=parseInt($("year").value)+1;
						_this.year=$("year").value;
						_this.createTbody();
						$("viewwin").value=_this.year+"年"+months[_this.k]+"月"+_this.day+"日";
						_this.fresh();
					}
					break;
				case "yeardown":
					$(targetId).onclick=function(event){
						$("year").value=parseInt($("year").value)-1;
						_this.year=$("year").value;
						_this.createTbody();
						$("viewwin").value=_this.year+"年"+months[_this.k]+"月"+_this.day+"日";
						_this.fresh();
					}
					break;
				default:
					break;
			}
			_this.timechoose();
		}
		inits.prototype.timechoose=function(){
			var tds=document.getElementsByTagName("td");
			if($("someday").checked){
				for(var j=0;j<tds.length;j++){
					if(tds[j].style.opacity!="0.6"){
						tds[j].style.background="white";
					}
				}
				_this.fresh();
				for(var i=0;i<tds.length;i++){
					if(tds[i].style.opacity!="0.6"){
						tds[i].onclick=function(event){
							var event=event||window.event;
							var target=event.target||event.srcElement;
							for(var j=0;j<tds.length;j++){
								if(tds[j].style.opacity!="0.6"){
									tds[j].style.background="white";
								}
							}
							target.style.background="green";
							_this.day=target.innerHTML;
							$("viewwin").value=_this.year+"年"+months[_this.k]+"月"+_this.day+"日";
							$("calendar").style.display="none";
							_this.clicked.first=target.innerHTML;
							_this.clicked.num=1;
						}
					}
				}
			}else if($("moreday").checked){
				for(var i=0;i<tds.length;i++){
					tds[i].onclick=function(event){
						var event=event||window.event;
						var target=event.target||event.srcElement;
						if(_this.clicked.num==0){	
							for(var j=0;j<tds.length;j++){
								if(tds[j].style.opacity!="0.6"){
									tds[j].style.background="white";
								}
							}
							target.style.background="green";
							_this.clicked.num++;
							_this.clicked.first=target.innerHTML;
						}else if(_this.clicked.num==1){
							target.style.background="green";
							_this.clicked.second=target.innerHTML;
							var minus=_this.clicked.second-_this.clicked.first;
							if(Math.abs(minus)<=7){
								var str=_this.year+"年"+months[_this.k]+"月{first}日~"+_this.year+"年"+months[_this.k]+"月{second}日";
								if(minus<0){
									str=str.replace(/{first}/,_this.clicked.second).replace(/{second}/,_this.clicked.first);
									$("viewwin").value=str;
									alert("您选择的是"+str);
									$("calendar").style.display="none";
								}else{
									str=str.replace(/{first}/,_this.clicked.first).replace(/{second}/,_this.clicked.second);
									$("viewwin").value=str;
									alert("您选择的是"+str);
									$("calendar").style.display="none";
								}
								_this.clicked={
										first:"",
										second:"",
										num:0,
								}
							}else{
								alert("时间段需要设置在7天以内，请重新选择");
								target.style.background="white";
							}
						}
					}

				}
			}
		}
		
	}
	var initobj=new inits();
	initobj.createTbody();
	initobj.events();
	initobj.fresh();
})();