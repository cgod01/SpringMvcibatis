$("#downloadBtn").on("click",function(){
	var filename = "政策扶持电价汇总表的执行方案及操作说明1.doc";
	//下载只能是超链接，还有表单提交
	var e = document.createElement('a');
	document.body.appendChild(e);
	e.target="downloadIframe";
	e.href=basePath+"/rest/cgod/downloadFile?filename="+filename;
	e.click();
	document.body.removeChild(e);
});

function callback(msg) {
	toastr.info(msg);
}