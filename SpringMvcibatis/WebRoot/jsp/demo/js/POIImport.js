$("#importBtn").on("click",function(){
	//上传1有了下面的方法2，配置了multipartResolver之后就没法再用这个方法
//	$("#uploadForm").attr("action",basePath+"/rest/cgod/uploadFile");
	//上传2 需要注册MultipartResolver类
	$("#importForm").attr("action",basePath+"/rest/cgod/import");
	$("#importForm").submit();
});

$("#addBtn").on("click",function(){
	$("#importdiv").append(getDiv());
});

function getDiv(){
	var returndiv = '<div class="col-xs-4">'+
						'<div class="form-group">'+
							'<label class="control-label col-xs-4">最简单的文件上传</label>'+
							'<div class="col-xs-8">'+
								 '<input type="file" name="fileimport"/>'+  
							'</div>'+
						'</div>'+
					'</div>';
	return returndiv;
}

function callback(msg){
	if(msg == "success") {
		toastr.info("上传成功！");
	} else {
		toastr.info("上传失败！");
	}
}