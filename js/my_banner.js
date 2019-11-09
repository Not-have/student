class Banner{
    constructor(newImg,newLi){
        //index是决定图片和点的位置的
        this.index = 0;
        this.oImg = newImg;//他是由外部传进来的
        this.oLi = newLi;
        //给添加第一张背景图
        this.oImg.style.backgroundImage = "url(img/"+this.index+".jpg)";
        //把第一个li变红
        this.oLi[this.index].style.backgroundColor = "red";
    }

    //背景图片
    setImage(){
        this.oImg.style.backgroundImage = "url(img/"+this.index+".jpg)";
    }

    //设置li此时背景颜色的状态
    setLi(){
        for(let i=0; i<this.oLi.length; i++){
             //当i=this.index时 让其 为红色
            if(i == this.index){
                this.oLi[i].style.backgroundColor = "red";
            }else{
                this.oLi[i].style.backgroundColor = "black";
            }
        }
    }
    //点击下一个 按钮
    setright(){
        this.index++;
        //bu用写大于其他的，让他 等等与 长度 就行了
        if (this.index == this.oLi.length) {
            this.index=0;
        }


        this.setImage();
        this.setLi();
    }
    //点及 左边的按钮
    setleft(){
        this.index--;
        if (this.index == 0) {
            //xia标和长度是不一样的，当长度是10的时候，下标是0~9
            this.index=this.oLi.length-1;

        }

        this.setImage();
        this.setLi();
    }

    //进行按钮事件 绑定
    shijian(){
        let butright=document.getElementById("right");
        let butleft=document.getElementById("left");
        //加一个
        let that=this;

        //点击谁的时候，就调用他，例如点击右边，就调用setright()
        butright.onclick=function(){
            that.setright();
        }
        butleft.onclick=function(){
            that.setleft();
        }   

        //shezhi定时器
        let oImg=document.getElementById("oImg");
        let time=null;
        oImg.onmouseover=function(){
            clearInterval(time);
        }
        oImg.onpointerout=function(){   
            time=setInterval(function(){
               
                that.setright();
            },1000);
        }

    }
    //添加li的事件
    bindLi(){
        let that = this;
        for(let i=0; i<this.oLi.length; i++){
            this.oLi[i].onclick = function(){
                that.index = i;
                that.setImage();
                that.setLi();
            }
        }
    }
}

let oImg = document.getElementById("oImg");
let oLi = $("#iconBox").children();

let banner = new Banner(oImg,oLi);

banner.shijian();
banner.bindLi();