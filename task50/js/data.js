var storage=window.localStorage;
var data=[{
	title:"第二个问卷",
	times:"2017/02/07",
	stat:"0",
	//0:发表中
	//1:未发表
	//2.已过期
	question:[
		{typle:"radio",text:"你好呀",options:["好得很","并不","非常不行","还可以"]},

	]
}];
changedata(0);
function changedata(a){
	//0:将storage转换成data
	//1:将data转换为storage
	if(a==0&&storage.questions){
		//var a=JSON.parse(storage.questions);
		//storage.questions=JSON.stringify(a);
		data=JSON.parse(storage.questions);
		//storage.clear();
	}else if(a==1){
		storage.questions=JSON.stringify(data);
	}else if(a==0&&!storage.questions){
		storage.questions=JSON.stringify(data);
	}
}
/*
		var data=storage["data"];
		var da=JSON.stringify(d);
		//alert(data[data.length-1]);
		var str=data.substring(0,data.length-1);
		str=str+","+da+"]";
		storage["data"]=str;
		alert(storage["data"]);
}
*/
