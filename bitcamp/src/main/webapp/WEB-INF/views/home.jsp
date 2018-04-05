<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="<%=application.getContextPath() %>"/>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Document</title>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="${ctx}/resources/css/style.css" />
	<link rel="stylesheet" href="${ctx}/resources/css/magnific-popup.css"> 
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="${ctx}/resources/js/app.js"></script>    
    <script src="${ctx}/resources/js/jquery.magnific-popup.js"></script> 
    <script type="${ctx}/resources/js/cookie.js"></script>
    <!-- //쿠키호출  -->  
</head>
<body>
	<div id="header"></div>
	<div id="wrapper"></div>
	</body>
<script>
app.init('${ctx}'); 
</script>
</html>