
/*
class 类名{
    //关键字
    constructor(){

    }
    let s = new 类名();
} 
*/


/*放大镜：放大倍数2倍

小图片 / 大图片 = 小窗口 / 大窗口


*/

class fang{
    constructor(newbox,newshaw,newshow){
        this.big = newbox;
        this.yin = newshaw;
        this.zhan = newshow;
    }
    //鼠标移动到元素上
    onmouseover(){
        let that = this;
        this.big.onmouseover = function(){
            that.yin.style.display = "block";
            that.zhan.style.display = "block";
            that.big.style.zIndex = "1000";//外加的
        }
    }

    //shu标从元素上一开
    onmouseout(){
        let that = this;
        this.big.onmouseout = function(){
            that.yin.style.display = "none";
            that.zhan.style.display = "none";
            that.big.style.zIndex = "1";//——————————————
        }
    }
    

    //鼠标被移动
    onmousemove(){
        let that = this;
        this.big.onmousemove = function(evt){
            let e = evt || event;
            //确保鼠标一直在小盒子中心
            let left = e.pageX - that.big.offsetLeft - that.yin.offsetWidth/2;
            let top = e.pageY - that.big.offsetTop - that.yin.offsetHeight/2;
            

            //定义边界
            let maxleft = that.big.offsetWidth - that.yin.offsetWidth;
            let maxtop = that.big.offsetHeight - that.yin.offsetHeight;

            if (left < 0) {
                left = 0;
            }
            if (left > maxleft) {
                left = maxleft; 
            }
            if (top < 0) {
                top = 0;
            }
            if (top > maxtop) {
                top = maxtop; 
            }

            //鼠标移动的位置
            that.yin.style.left = left + "px";
            that.yin.style.top = top + "px";  

            //给另一张放大的图片 进行定位
            that.zhan.style.backgroundPosition = `-${left*2}px -${top*2}px`;
        }
    }
    cha(){
        this.onmouseover();
        this.onmouseout();
        this.onmousemove();
    }
}

let oDeta = document.getElementById("deta1_one");
let oSmallBox = document.getElementById("smallBox");
let oShowBox = document.getElementById("showBox");

new fang(oDeta,oSmallBox,oShowBox).cha(); 


$(function(){
    let oImage1 = $("#image1");
    let oImage2 = $("#image2");
    let oDetas = $("#deta1_one")
    let oShowBoxs = $("#showBox")
    oImage1.click(function(){
        oDetas.css({"background-image":"url(img/in2.jpg)"});
        oShowBoxs.css({"background-image":"url(img/in2.jpg)"});
        oImage2.css({"border":"2px solid #CCC"});
        oImage1.css({"border":"2px solid #cf1c1b"});
    });
    oImage2.click(function(){
        oDetas.css({"background-image":"url(img/in3.jpg)"});
        oShowBoxs.css({"background-image":"url(img/in3.jpg)"});
        oImage1.css({"border":"2px solid #CCC"});
        oImage2.css({"border":"2px solid #cf1c1b"});
    })
})



/*$的使用， $('#app').style.background = "red";传过来的是字符串，所以要加双引号
  console.log($.innerHTML=123);
*/
/*
function $(str){//前面传过来的是字符串，所以要带双引号的
	if(str.charAt(0)=="#"){//charAt获取字符串中指定下标的字符
		return document.getElementById(str.substring(1));//获取字符串下标为1 之后的
	}else if(str.charAt(0)=="."){
        console.log(str.substring(1));
        return document.getElementsByClassName(str.substring(1));//class名
        
	}else{
		return document.getElementsByTagName(str);//标签名
    }
}

*/

/*
弹出框
   一个div
    let oBox = document.getElementById("box");

    按钮
    let oButs = document.getElementById("but");
    let s = new Tan(oBox);
    
    oButs.onclick = function(){
        s.She();
        // s.tian();
        s.onclick();
    }


    要想取得 offsetWidth 或 offsetHeight  必须让元素先显示
*/
class Tan{
    constructor(newbox){
        this.box = newbox;
        this.but = null;//用这个方法实现了单例模式  让按钮只有一个
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
        this.but.style.height = 20 + 'px';
        this.but.style.width = 30 + 'px';
        this.box.appendChild(this.but);
        this.box.style.display = "block";
        this.but.style.position = "absolute";
        this.but.style.left = this.box.offsetWidth - this.but.offsetWidth + 'px';//
    }
    //点击隐藏显示，要让他先隐藏
    onclick(){
        let that = this;
        this.but.onclick = function(){
            that.box.style.display = "none";
        }
        
    }
}

/*
//购物车
class Cart{
    constructor(){

    }

    //获得购物车商品
    ZongShangPin(){
        //获得每样商品 得到一个数组(zai下面增加商品那 会用)
        let oGoodsNum = document.getElementsByClassName("goods-num");
        //定义一个变量来存放商品
        let goodsNum = 0;
        for(let i=0;i<oGoodsNum.length;i++){
            goodsNum += Number(oGoodsNum[i].innerHTML);
        }

        //获取商品总数标签
        let oGoodsTotalNum = document.getElementById("goods-total-num");
        //jiang获取的数值赋值给最后总商品数
        oGoodsTotalNum.innerHTML = goodsNum;
    }

    //计算所有商品花的钱数
    ZongQianShu(){
        //取得小计的数字
        let oGoodsPrice = document.getElementsByClassName("goods-single-price");
        //给一个空，放总钱数
        let goodsPrice =0;
        //遍历数字将商品价格相加
         for(let i=0;i<oGoodsPrice.length;i++){
             goodsPrice +=Number(oGoodsPrice[i].innerHTML)
         }
         //取得花费的总钱数
         let oGoodsTotalPrice = document.getElementById("goods-total-price");
         //总共的钱数等于上面的总计
         oGoodsTotalPrice.innerHTML = goodsPrice;
    }

    //小计（商品个数 * 单价）
    XiaoJI(num,price){
        return num*price;
    }

    //增加商品
    Goodadd(btn){
        //取得按钮的前的一个元素(即找到数量)
        let oGoodsNum = btn.previousElementSibling;//(上)前一个同胞元素
        //给前一个元素中的span加1（修改数量）
        oGoodsNum.innerHTML = + oGoodsNum.innerHTML + 1;
        //获取他的父元素的上一个元素的第一个孩子元素（即单价）
        let goodDan = btn.parentNode.previousElementSibling.firstElementChild;//firstElementChild 意思是第一个孩子元素
        //找到小计（方法同上）
        let goodXiao = btn.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
        //修改小计，把单价和数量穿过去
        goodXiao.innerHTML = this.XiaoJI(oGoodsNum.innerHTML,goodDan.innerHTML)

        //调用总数和单价
        this.ZongShangPin();
        this.ZongQianShu();
    }

    //减少shngpin
    Goodreduce(btn){
        //取得按钮的后一个元素（即是减号后面的那个）
        let oGoodsNum = but.nextElementSibling;
        //修改数量，不允许减的小于0
        if(oGoodsNum.innerHTML>0){
            oGoodsNum.innerHTML = oGoodsNum.innerHTML - 1;
            //找到单价
            let goodDan = btn.parentNode.previousElementSibling.firstElementChild;
            //找到小计
            let goodXiao = btn.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
            //修改小计
            goodXiao.innerHTML = this.XiaoJI(oGoodsNum.innerHTML,goodDan.innerHTML);

            //调用总数和单价
            this.ZongShangPin();
            this.ZongQianShu();
        }
    }

    //删除商品

    Delete(btn){
        //获取删除按钮的父元素的父元素，即tr
        let trDel = btn.parentNode.parentNode;
        //删除那一行
        trDel.remove();
        //
        let r = confirm("您确认要输出吗？");
        if(r == true){
            trDel.remove();
        }else{
            return;
        }
        this.ZongShangPin();
        this.ZongQianShu();
    }
    //添加事件（即添加商品内容）



    //事件绑定
    event(){
        //获得绑定事件
        oBut = document.getElementsByTagName("button");
        let that = this;
        for(let i=0;i<oBut.length;i++){
            if(i%2 == 0){
                oBut[i].onclick = function(){
                    console.log(that);
                    that.Goodreduce(this);
                    console.log(that.Goodreduce(this));
                }
            }else{
                oBut[i].onclick = function(){
                    that.Goodadd(this);
                }
            } 
        }
        //删除
        let oDel = getElementsByClassName("del");
        for(let i=0;i<oDel.length;i++){
            oDel[i].onclick = function(){
                that.Delete(this);
            }
        }
    }

}

let oShop = new Cart();
oShop.event();
*/