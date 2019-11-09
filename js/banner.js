
//1、类（属性和方法）：轮播图
class Banner{
    //构造函数
    constructor(boxDom,obj){
        this.boxDom = boxDom;
        this.boxImg = null;//所有图片标签的容器
        this.ul = null;//所有li标签的容器
        this.left = null;
        this.right = null;
        let defaultObj = {
            imgs:["img/1.jpg","img/2.jpg"],
            as:["#","#"],
            width:400,
            height:300,
            timeSpace:1000,
            index:0,
            douSize : 10,
            douIsCircle:true,
            douColor:"pink",
            douHighColor:"red"
        };
        for(let key  in defaultObj){//key = imgs;
            if(obj[key]!=undefined){ //obj["imgs"]
                this[key] = obj[key];
            }else{
                this[key] = defaultObj[key]; 
            }
        }

        this.myTimer = null;
        this.render();
        this.autoPlay();
        this.addEvent();
    }

    //方法：
    //渲染（创建所有的dom元素）
    render(){
        //1、创建图片及其容器
        //1)、容器
        this.boxImg = document.createElement("div");
        this.boxImg.style.cssText = ` 
            position: absolute;
            width: 100%;
            height: 100%;`;
        this.boxDom.appendChild(this.boxImg);
        //2)、图片
        let num = this.imgs.length;
        for(let i=0;i<num;i++){
            let aDom = document.createElement("a");
            aDom.href = this.as[i];
            aDom.style.cssText = `
                opacity:0;
            `;
            this.boxImg.appendChild(aDom);
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
            `;
            if(i==0){
                aDom.style.opacity = 1;
            }
            aDom.appendChild(imgDom);
        }
        //2、创建豆豆及其容器
        //1)、容器
        this.ul = document.createElement("ul");
        this.ul.style.cssText = `
            width: 90px;
            height: 10px;
            position: absolute;
            top: 419px;
            left: 50%;
            margin-left: -45px;
            list-style: none;
            z-index: 1;
        `;
        this.boxDom.appendChild(this.ul);
        //2)、li
        for(let i=0;i<num;i++){
            let li = document.createElement("li");
            li.style.cssText = `
                float: left;
                margin:0 4px;
                width:${this.douSize}px;
                height: ${this.douSize}px;
                background-color: ${this.douColor};
            `;
            if(this.douIsCircle){
                li.style.borderRadius = "50%";
            }
            if(i==0){
                li.style.backgroundColor = this.douHighColor;
            }
            this.ul.appendChild(li);
        }

        //创建左箭头
        this.left = document.createElement("div");
        this.left.style.cssText = `
            width: 27px;
            height: 44px;
            position: absolute;
            top: 50%;
            left: 10px;
            right: auto;
            cursor: pointer;
            margin-top: -22px;
            background: url(img/left.png) no-repeat;
            background-size: 100%;
        `;
        this.boxDom.appendChild(this.left);
        //创建右箭头
        this.right = document.createElement("div");
        this.right.style.cssText = `
            width: 27px;
            height: 44px;
            position: absolute;
            top: 50%;
            right: 10px;
            left: auto;
            cursor: pointer;
            margin-top: -22px;
            background: url(img/right.png) no-repeat;
            background-size: 100%;
        `;
        this.boxDom.appendChild(this.right);
    }

    //自动播放
    //1、自动播放（每隔一定时间换一张图片）
    autoPlay(){
        this.myTimer = setInterval(() => {
            //一、处理数据
            //1、
            let outIndex = this.index;
            this.index++;//1
            //2、
            if(this.index>this.imgs.length-1){
                this.index=0;
            }
            //二、改变外观
            let imgDoms = this.boxImg.children;
            fadeInOut(imgDoms[this.index],imgDoms[outIndex],this.timeSpace/3);
            let liDoms = this.ul.children;
            liDoms[this.index].style.backgroundColor = this.douHighColor;
            liDoms[outIndex].style.backgroundColor = this.douColor;
        }, 5000);
    }

    //2、停止播放
    // stop(){
    //     window.clearInterval(this.myTimer);
    // }

    //4、跳转到指定图片
    goImg(transOrd){
        //一、处理数据    
        let outIndex = this.index;
        this.index = transOrd;

        if(this.index>this.imgs.length-1){
            this.index=0;
        }

        //二、改变外观
        if(outIndex!=this.index){
            let imgDoms = this.boxImg.children;
            fadeInOut(imgDoms[this.index],imgDoms[outIndex],this.timeSpace/3);
            let liDoms = this.ul.children;
            liDoms[this.index].style.backgroundColor = this.douHighColor;
            liDoms[outIndex].style.backgroundColor = this.douColor;
        }
        
    }

    addEvent(){
        //2、鼠标移入，停止播放
        // this.boxDom.onmouseover = ()=>{
        //     this.stop();
        // }
    
        //3、鼠标离开继续播放 
        // this.boxDom.onmouseout = ()=>{
        //     this.autoPlay();
        // }
        
        //4、点击豆豆跳转到对应的图片上。
        let liDoms = this.ul.children;
        for(let i=0;i<liDoms.length;i++){
            liDoms[i].onclick = ()=>{
                this.goImg(i);
            }
        }

        this.left.onclick = ()=>{
            let i=this.index;
            i--;
            if(i<0){
                i=liDoms.length-1;
            }
            this.goImg(i);
        }

        this.right.onclick = ()=>{
            let i=this.index;
            i++;
            if(i>liDoms.length){
                i=0;
            }
            this.goImg(i);
        }
    }
}


// window.onload = function(){
//     new Banner(
//         $("#lunbo"),
//         {
//             imgs:["img/lunbo1.jpg","img/lunbo2.jpg","img/lunbo3.jpg","img/lunbo4.jpg","img/lunbo5.jpg"],
//             as:["http://www.baidu.com","http://www.weibo.com","http://www.jc2006.com/","http://www.bshare.cn/","https://gitee.com/"],
//             douSize:10,
//             douColor:"#ccc",
//             douHighColor:"#fff"
//         }
//     );
// }