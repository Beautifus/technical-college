var storage=window.localStorage;
var mypassword=[];
changedata(0);
function changedata(a){
	//0:将storage转换成mypassword
	//1:将mypassword转换为storage
	if(a==0&&storage.pwd){
		for(var i=0;i<storage.pwd.length;i++){
			mypassword[i]=storage.pwd[i];
		}
	}else if(a==1){
		storage.setItem("pwd",mypassword.join(""));
	}else if(a==0&&!storage.pwd){
		storage.setItem("pwd",mypassword.join(""));
	}
}