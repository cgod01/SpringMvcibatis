<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>导出</title>  
</head>  
<body>
	<div class="container-fluid full-height">
		<div class="ibox">
			<div class="ibox-form">
				<form class="form-horizontal">
					<div class="row">
						<div class="pull-right">
							<button class="btn btn-primary" id="exportBtn" type="button">导出</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<iframe id="exportIframe" style="display:none"></iframe>
</body>
</html>