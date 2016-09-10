<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator"%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<%@ include file="/jsp/resource.jsp" %>
		<link rel="stylesheet" type="text/css" href="${staticPath }/static/css/bootstrap-theme.css" />
		<title><decorator:title default="MySpringMVCibatis"></decorator:title></title>
		<decorator:head></decorator:head>
	</head>
	<body class="<decorator:getProperty property="body.class" />">
		<decorator:body></decorator:body>
		<script type="text/javascript" src="${staticPath }/static/js/jquery-2.1.1.js"></script>
		<script type="text/javascript" src="${staticPath }/static/js/sea.js" id="seajsnode"></script>
		<script type="text/javascript" src="${staticPath }/static/js/sea-config.js"></script>
		<script type="text/javascript">
			seajs.use("pace.js");
			seajs.use("ajax.js");
			seajs.use(["common.js","bootstrap.js"], function(b) {
				var resURL = "<%=request.getRequestURL()%>";
				var fileName = resURL.substring(resURL.lastIndexOf("\/")+1, resURL.lastIndexOf("\.")>0?resURL.lastIndexOf("\."):resURL.length);
				try{
					var tag = document.createElement("SCRIPT");
					tag.src="js/"+fileName+".js";
					document.body.appendChild(tag);
				}catch(e){
					alert(e)
				}
			});
			seajs.use(["toastr.css","toastr.js"]);
			seajs.use(["sweetalert.css","sweetalert.js"]);
		</script>
	</body>
</html>
