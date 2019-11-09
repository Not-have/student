<?php
	header("Content-type:text/html;charset=utf-8");
	//获取请求的数值
	$name = $_GET["userming"];
	$pass = $_GET["usertrues"];
	//创建链接
	$conn = mysql_connect("localhost","root","root");
	//xuan则数据库
	mysql_select_db("stu");
	//查询数据库
	$result1 = mysql_query("select * from student where stuName = '$name' ",$conn);
	$rows1 = mysql_num_rows($result1);


	if($rows1 == 0){
		$sqlstr = "insert into student(stuName,stuPws) values('$name','$pass')";//
		mysql_query($sqlstr, $conn);
		echo "0";
	}else if($rows1 == 1){
		echo "1";
	}
	
	mysql_close($conn);
?>