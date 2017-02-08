window.onload=function(){
var mytitle=document.getElementById("title");
var mycon=document.getElementById("mycon");
//var mytext=document.getElementById("text");
var strrr='<li><span>Q%s <input type="text" value="%t"></span></li><li><input type="%typle"name="ques%s"><input type="text" value="%q1"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q2"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q3"></li><li><input type="%typle"name="ques%s" ><input type="text" value="%q4"></li>';
	var k=1;
	if(storage.ques){

		//alert(storage.questions);
		var que=JSON.parse(storage.ques);
		var title=que.title;
		var questions=que.question;
		//alert(questions);
			//{typle:"radio",text:"你好呀",options:["好得很","并不","非常不行","还可以"]},
			mytitle.value=title;
			//alert(questions.length);
		if(questions.length){
			for(var i=0;i<questions.length;i++){
				
				var newul=document.createElement("ul");

				newul.className="ques";
				//alert(questions[i].typle);
				var s=strrr.replace(/%s/,i+1).replace(/%t/,questions[i].text).replace(/%typle/g,questions[i].typle).replace(/%q1/,questions[i].options[0]).replace(/%q2/,questions[i].options[1]).replace(/%q3/,questions[i].options[2]).replace(/%q4/,questions[i].options[3]);
				newul.innerHTML=s;
				mycon.appendChild(newul);
			}
			k=questions.length+1;
		}
		storage.removeItem("ques");
		
	}
};