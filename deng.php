<?php
	header("Content-type:text/html;charset=utf-8");
	//获取请求的数值
	$name = $_GET["username"];
	$pass = $_GET["userpass"];
	//创建链接
	$conn = mysql_connect("localhost","root","root");
	//xuan则数据库
	mysql_select_db("stu");
	//查询数据库
	$result = mysql_query("select * from student where stuName = '$name' and stuPws='$pass' ",$conn);
	$rows =  mysql_num_rows($result);
	
	

	if($rows == 0){
		echo "0"; //登录失败
	}else if($rows == 1){
		echo "1";//登录成功
	} 
	
	mysql_close($conn);
?>