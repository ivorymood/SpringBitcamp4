<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="<%=application.getContextPath() %>"/>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="${ctx}/resources/js/app.js"></script>
</head>
<body>
<div id="wrapper">
	<h1>
		Hello world!  
	</h1>
	<button id="btn">ㅁㅁㅁㅁ</button>
	<P>  The time on the server is ${serverTime}. </P>
</div>
</body>
</html>
<script>
$('#btn').on('click', function(){
	
app.init('${ctx}');
<%-- alert('<%=request.getContextPath()%>'); --%>
});


</script>
