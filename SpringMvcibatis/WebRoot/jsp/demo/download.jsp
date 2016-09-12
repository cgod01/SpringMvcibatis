<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>下载</title>  
</head>  
<body>  
	<div class="container-fluid full-height">
		<div class="ibox">
			<div class="ibox-form">
				<form target="downloadIframe" id="downloadForm" class="form-horizontal" enctype="multipart/form-data" method="post">
					<div class="row" id="downloaddiv">
						<div class="col-xs-4">
							<div class="form-group">
								<label class="control-label col-xs-4">最简单的文件下载</label>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="pull-right">
							<button type="button" class="btn btn-primary" id="downloadBtn">下载</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<iframe name="downloadIframe" id="downloadIframe" style="display:none"></iframe>
</body>  
</html>  