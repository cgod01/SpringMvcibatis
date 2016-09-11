<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<div class="container-fluid full-height">
		<div class="ibox">
			<div class="ibox-form">
				<form class="form-horizontal" onsubmit = "return false">
					<div class="row">
						<div class="col-xs-4 col-lg-3">
							<div class="form-group">
								<label class="control-label col-xs-4" for="name">姓名</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" id="name" name="name">
								</div>
							</div>
						</div>
						<div class="col-xs-4 col-lg-3">
							<div class="form-group">
								<label class="control-label col-xs-4" for="password">密码</label>
								<div class="col-xs-8">
									<input type="text" class="form-control" id="password" name="password">
								</div>
							</div>
						</div>
						<div class="pull-right">
							<button type="button" class="btn btn-primary" id="queryBtn">查询</button>
						</div>
					</div>
				</form>
			</div>
			<div class="ibox-content">
				<div class="table-domain" id="table">
					<table class="dataTable" id="mytable" width="100%">
						<thead>
							<tr>
								<th>人员编号</th>
								<th>人员名称</th>
								<th>用户级别</th>
								<th>上级部门编号</th>
								<th>门户信息</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>