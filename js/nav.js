$(function(){
    $(".nav1_one li a").hover(function(){
        $(this).css({color:"red"});
    },function(){
		$(this).css({color:"#333333"});
    });
    
    // 要显示的
    let myTimer = 0;
	let liDom = $(".nav1_one").children();
	for(let i=0;i<liDom.length;i++){
		liDom[i].setAttribute("index",i);
		
		liDom.eq(i).mouseover(function(){
			if($(".nav_one").eq(i).css("display")=="block"){
				liDom.eq(i+1).mouseover(function(){
					$(".nav_one").eq(i+1).show();
				})
			}else{
				$(".nav_one").eq(i).stop().slideDown(1000);
			}
		});
		liDom.eq(i).mouseout(function(){
			myTimer = setTimeout(function(){
				if($(".nav_one").eq(i+1).css("display")=="block" || $(".nav_one").eq(i-1).css("display")=="block"){
					$(".nav_one").eq(i).hide();
				}else{
					$(".nav_one").eq(i).stop().slideUp(500);
				}
				clearInterval(myTimer);
			},10)
		});
		$(".nav_one").mouseout(function(){
		    $(this).stop().hide();
		});
		$(".nav_one").mouseover(function(){
			clearInterval(myTimer);
		    $(this).stop().show();
		});
	}
    // $(".nav1_one li").eq(0).hover(function(){
    //     $(this).parent().parent().parent().next().children().slideDown("1500");
    // },function(){
    //     $(this).parent().parent().parent().next().children().slideUp("1000");
    // });
     

    

})