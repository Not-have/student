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
        let goodDan = btn.parentNode.parentNode.previousElementSibling.firstElementChild;//firstElementChild 意思是第一个孩子元素
        //找到小计（方法同上）
        let goodXiao = btn.parentNode.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
        //修改小计，把单价和数量穿过去
        goodXiao.innerHTML = this.XiaoJI(oGoodsNum.innerHTML,goodDan.innerHTML)

        //调用总数和单价
        this.ZongShangPin();
        this.ZongQianShu();
    }

    //减少shngpin
    Goodreduce(btn){
        //取得按钮的后一个元素（即是减号后面的那个）
        let oGoodsNum = btn.nextElementSibling;
        //修改数量，不允许减的小于0
        if(oGoodsNum.innerHTML>0){
            oGoodsNum.innerHTML = oGoodsNum.innerHTML - 1;
            //找到单价
            let goodDan = btn.parentNode.parentNode.previousElementSibling.firstElementChild;
            //找到小计
            let goodXiao = btn.parentNode.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
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
        // trDel.remove();
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





/*
    //添加商品（即添加商品内容）
    addBut(btn){   //这个要改成商品的名字
        //排除商品名一样的，不让其加入
        let waresname = document.getElementsByClassName("setname");
        //定义一个空数组,（即不一样的商品名到放在这）
        let array = [];
        //循环原始数组
        for(let i in waresname){
            //判断当前元素在新数组中有没有
            for(let j=0;array.length;j++){
                if(arr2[j]==arr[i]){
                    //有的话 调用加数量
                    Goodadd();
                    break;
                }
            }
            if(j==array.length){
                array.push(waresname[i]);
            }
        }
        console.log(array);


        //获取新增商品单价
        oNewPrice = btn.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;

        //在table下创建新行
        let oT = document.getElementById("table1");

        // 获取table下de所有tr标签--------
        // let oTr = ot.firstElementChild.children;
    }

*/



    //事件绑定
    event(){
        //获得绑定事件
        let oBut = document.getElementsByTagName("button");
        let that = this;
        for(let i=0;i<oBut.length;i++){
            if(i%2 == 0){
                oBut[i].onclick = function(){
                    console.log(that);
                    that.Goodreduce(this);
                }
            }else{
                oBut[i].onclick = function(){
                    that.Goodadd(this);
                }
            } 
        }
        //删除
        let oDel = document.getElementsByClassName("del");
        for(let i=0;i<oDel.length;i++){
            oDel[i].onclick = function(){
                that.Delete(this);
            }
        }
    }

}

let oShop = new Cart();
oShop.event();