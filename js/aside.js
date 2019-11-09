class Tan{
    constructor(newbox){
        this.box = newbox;
        this.but = null;//用这个方法实现了单例模式
    }
    //设置弹出框位置
    She(){
        this.box.style.display = "block";
        //要想获取offsetWidth display必须设置为block
        this.box.style.left = window.innerWidth/2 - this.box.offsetWidth/2 + 'px';
        this.box.style.top = window.innerHeight/2- this.box.offsetHeight/2 + 'px';
        //调用新创建的按钮
        this.tian();
    }
    //添加按钮
    tian(){
        this.but = document.createElement("button");
        this.but.innerHTML=" × ";
        this.but.style.height = 30 + 'px';
        this.but.style.width = 30 + 'px';
        this.but.style.background = "white";
        this.but.style.fontSize =30 + "px";
        this.but.style.border = 0;
        this.but.style.outline = "none";
        this.box.appendChild(this.but);
        this.box.style.display = "block";
        this.but.style.position = "absolute";
        this.but.style.top = 0;
        this.but.style.left = this.box.offsetWidth - this.but.offsetWidth + 'px';//
    }
    //点击隐藏显示，要让他先隐藏
    onclicks(){
        let that = this;
        this.but.onclick = function(){
            that.box.style.display = "none";
            oTotal.style.display = "none";      
        }
    }

}
let oBox = document.getElementById("box");
let oButs = document.getElementById("denglu");
let daBox = document.getElementById("total");
let s = new Tan(oBox);

// oButs.onclick = function(){
//     s.She();
//     s.onclicks();
//     oTotal.style.display = "block";
// }





//判断window窗口大小
let oTotal = document.getElementById("total");

oTotal.style.width = window.innerWidth + 'px';
oTotal.style.height = window.innerHeight + 'px';
oTotal.style.background = "black";

oTotal.style.zIndex = 888;
oTotal.style.position = "fixed";
oTotal.style.left=0;
oTotal.style.top=0;
oTotal.style.opacity = .7;
oTotal.style.display = "none";



	//登录判定
let oName = document.getElementById("usename");
let oPws = document.getElementById("usepws");
let oBut = document.getElementById("butD");
let oPople1 = document.getElementById("pople1");
let oPople = document.getElementById("pople");
oBut.onclick = function(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET","deng.php?username="+oName.value+"&userpass="+oPws.value);
	xhr.onreadystatechange = function(){
		if(xhr.status == 200 && xhr.readyState == 4){
            console.log(xhr.responseText);
            fun(xhr.responseText);
            // if (xhr.responseText == 1) { // 后端传递返回的数据为1 则为成功
            //     setCookie('username', oName, 7);
            //     setCookie('userpass', oPws, 7);
            // }
		}
	}
	xhr.send();
}
let ss=sessionStorage;
function fun(str){
	if(str == 0){
		alert("用户名或者密码错误");
	}else if(str == 1){
		// confirm("登录成功");
		oBox.style.display = "none";
        oTotal.style.display = "none"; 
        ss.name=oName.value;
        ss.pwd=oPws.value;
        oPople1.style.display = "none";
        oPople.style.display = "block";
    }
}
$(function(){
    oButs.onclick = function(){
        if(ss.name!=undefined){
            oTotal.style.display = "none";
            oBox.style.display = "none";
        } else {
            oTotal.style.display = "block";
            oBox.style.display = "block";
            s.She();
            s.onclicks();
        }
       
    }
    if(ss.name!=undefined){
        oPople1.style.display = "none"; 
        oPople.style.display = "block";
    }
$("#zhuceD").click(function(){
        ss.clear();
    })
})

// 登录的正则  汉字或者 电话号吗（没写）

//保存登录的账户密码----------------------------------------------------------
/* window.onload = function(){
    let flag = getCookie();
    if(flag){
        oPople.style.display = "block";
        oPople1.style.display = "none"; 
    }
}
//设置cookie 
function setCookie(key,value,day){
    let d = new Date();
    d.setDate(d.getDate() + day);
    //存cookie
    document.cookie = key + '=' + value + ';expires = ' + d;
}
//获取cookie
function getCookie(){
    let cookie = document.cookie;
    let flag = false;
    let newCookie = cookie.split('; ');
    for(let i = 0;i < newCookie.length;i++){
        let str = newCookie[i].split('=');
        if (str[1]) {
        return flag = true;// 存在则标记
        } 
    }
}*/




//点击deng陆切换的那个
let userBtn = $('#boxDeng');//登录名
let phoneBtn  = $('#box_app'); // 电话

userBtn.click(function(){
	$('#use').css({"display":"block"});
	$('#duanxin').css({"display":"none"});
	$('#boxDeng').css({"color":"#cf1d1b"});
	$('#box_app').css({"color":"#000"});
})
phoneBtn.click(function(){
	$('#use').css({"display":"none"});
	$('#duanxin').css({"display":"block"});
	$('#box_app').css({"color":"#cf1d1b"});
	$('#boxDeng').css({"color":"#000"});
})

//点击注册，让他显示--------------------------------------------
let zhuBox = document.getElementById("zhuce");
let oZhuD = document.getElementById("zhuceD");
let oZhushou = document.getElementById("zhushou");
// let oZhushou = 13122824930;
let k = new Tan(zhuBox);

oZhuD.onclick = function(){
    k.She();
    k.onclicks();
    oTotal.style.display = "block";
    // 注册之后这块错了-----------------------
    // oPople1.style.display = "block";
    // oPople.style.display = "none";
}



//创建注册de 正则判断手机号
    let oHuoqu = document.getElementById("zhubut");
    let reg = /^1(8|5)\d{9}$/;
    oHuoqu.onclick = function(){
        //文本框的值只能在里面获取
        let oPshou = oZhushou.value;
        if(reg.test(oPshou) == true){
            console.log("对");
        }else{
            alert("手机输入错误");
        }
    }

//正则判断密码强弱---------------------------------------
//先用正则表达式 写出每类字符的格式
//纯字母
let regLetter = /^[a-zA-Z]+$/;
//纯数字
let regNum = /^\d+$/;
//纯特殊字符
let regChar = /^[!@#$]+$/;

//包含
let _regLetter = /[a-zA-Z]+/;
let _regNum = /\d+/;
let _regChar = /[!@#$]+/;

let oZhu_two4 = document.getElementById("zhu_two4");
let oZhu_two5 = document.getElementById("zhu_two5");
oZhu_two5.onclick = function(){
    let str1 = oZhu_two4.value;

    if(str1.length<6){
        alert("请重新输入密码");
    }else if(regLetter.test(str1)==true || regNum.test(str1)==true || regChar.test(str1)==true){
           //弱
        alert("请重新输入密码");
    }else if(_regLetter.test(str1)==true && _regNum.test(str1)==true && _regChar.test(str1)==true){
        alert("强");
    }else if(_regLetter.test(str1)==true && _regNum.test(str1)==true){
        alert("中");
    }else if(_regNum.test(str1)==true && _regChar.test(str1)==true){
        alert("中");
    }else if(_regLetter.test(str1)==true && _regChar.test(str1)==true){
        alert("中");
    }
}




//注册链接数据库-----------
//输入的验证码
let oZhu_two3 = document.getElementById("zhu_two3");


//随机数------------------------------------------
let oZhubut = document.getElementById("zhubut");
//把回调函数的值 赋给变量    并且两个等于的时候字符串会转成数字
let str2 = getColor();
oZhubut.onclick = function(){
    alert(str2);
}

function getColor(){
   //取得一个四位的随机数
    for(let i=0;i<4;i++){     
        var num = parseInt(Math.random()*8000+1000);
    }
    return num;
}


// //输入手机号
// let oZhushou = document.getElementById("zhushou");
//确认密码
// let oZhu_two5 = document.getElementById("zhu_two5");
//注册按钮
let oZhu_two7 = document.getElementById("zhu_two7");

oZhu_two7.onclick = function(){
    if(oZhu_two4.value == oZhu_two5.value && str2 == oZhu_two3.value){
        let xhr = new XMLHttpRequest();
        xhr.open("GET","zhu.php?userming="+oZhushou.value+"&usertrues="+oZhu_two5.value);

        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                fun1(xhr.responseText);
            }
        }
        xhr.send();
    }else{
        alert("验证码或密码不一致，请重新输入。");
    }
}
function fun1(str3){
    if(str3 == 0){
        confirm("注册成功"); 
        zhuBox.style.display = "none";
        oTotal.style.display = "none";
      
        s.She();
        s.onclicks();
        oTotal.style.display = "block";
       
    }else if(str3 == 1){
        confirm("已存在用户名");
    }
}



