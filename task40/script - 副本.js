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
		this.mon=$("month").value;
		this.year=$("year").value;
	}
	var inits=funciton(){
		var mon=
		var year=
		var k=0;
		for(var i=0;i<months.length;i++){
			if(mon==months[i]){
				k=i;
				break;
			}
		}
		var date=new Date();
		//date.setFullYear(2016,11,1);
		date.setFullYear(year,k,1);
		console.log(date);
		var week=date.getDay();
		var preMonlastday=new Date(date.getTime()-24*60*60*1000).getDate();
		this.createTbody();
	};
	inits.prototype.createTbody=function(){
		var tr1=document.createElement("tr");
		var html1="";
		for(var i=0;i<week;i++){
			html1+='<td style="opacity:0.6">'+(parseInt(preMonlastday)-week+1+i)+"</td>";
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
					j+=(week-2);
				}else{
					if(d<=getCountDays(year,k,1)){
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
})();