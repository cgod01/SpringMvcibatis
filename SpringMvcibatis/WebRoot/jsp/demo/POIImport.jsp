<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>导入</title>  
</head>  
<body>  
	<div class="container-fluid full-height">
		<div class="ibox">
			<div class="ibox-form">
				<form target="importIframe" id="importForm" class="form-horizontal" enctype="multipart/form-data" method="post">
					<div class="row" id="importdiv">
						<div class="col-xs-4">
							<div class="form-group">
								<label class="control-label col-xs-4">最简单的文件上传</label>
								<div class="col-xs-8">
									 <input type="file" name="fileimport"/>  
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="pull-right">
							<button type="button" class="btn btn-primary" id="addBtn">添加</button>
							<button type="button" class="btn btn-primary" id="importBtn">上传</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<iframe name="importIframe" id="importIframe" style="display:none"></iframe>
</body>  
</html>  