<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="utils.SystemUtils"%>
<%@ page isELIgnored ="false"%><%--启用EL表达式--%>
<%
String staticPath = SystemUtils.getStaticPath();
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
request.setAttribute("staticPath", staticPath);
request.setAttribute("basePath", basePath);
%>
<script type="text/javascript">
	window.basePath = "${basePath }";
	window.staticPath = "${staticPath }";
	window.sessionid = "${pageContext.session.id}";
	var sfkzan = "${param.sfkzan}";
	var gnbh = "${param.gnbh}";
</script>