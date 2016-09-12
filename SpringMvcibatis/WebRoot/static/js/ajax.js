var AJAX = {};
AJAX.ajax = function(url, data, type, callback) {
	var _data = data || {};
	var _async = true;
	var _result = null;
	if(typeof callback=="function"){
		_async = true;
	}else{
		_async = !!callback;
		callback = null;
	}
	$.ajax({
		type : type,
		url : url,
		data : data,
		cache :false,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		async : _async,
		dataType : 'json',
		error : function(data, transport) {
			if(data.status==518){
				alert("系统超时, 请重新登录.");
			}else{
				//showErrorMsg(data.responseText)
				toastr.error('数据异常,请联系运维人员.');
			}
		},
		success : function(obj) {
			var data = obj.data;
			if(data===true){
				toastr.success('操作成功');
			}else if(data===false){
				toastr.error('操作失败!');
			}
			if(!_async){
				_result = data;
			}else{
				if (callback) {
					callback(data);
				}
			}
		}
	});
	if(_result!=null){
		return _result;
	}
}

/**
 * 查看
 */
AJAX.GET = function(url, data, callback) {
	return this.ajax(url, data, 'GET', callback);
}

/**
 * 创建
 */
AJAX.POST = function(url, data, callback) {
	return this.ajax(url, data, 'POST', callback);
}
/**
 * 批量提交
 */
AJAX.BATCH = function(url, data, callback){
	$.ajax({
		type : "POST",
		url : url,
		data : data,
		contentType : "application/json; charset=utf-8",
		async : true,
		dataType : 'json',
		error : function(data, transport) {
			//showErrorMsg(data.responseText)
			toastr.error('数据异常,请联系运维人员.');
		},
		success : function(obj) {
			var msg = obj.data;
			if (callback) {
				callback(msg);
			}
		}
	});
}

/**
 * 返回字符串
 */
AJAX.getString = function(url, data){
	var result;
	$.ajax({
		type : 'GET',
		url : url,
		data : data,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		async : false,
		cache :false,
		error : function(data, transport) {
			if(data.status==518){
				alert("系统超时, 请重新登录.");
			}else{
				swal({
					title:"",
					text:"<div style='text-align:left'>"+data.responseText+"</div>",
					html:true,
					type:"error"
				})
			}
		},
		dataType : 'json',
		success : function(obj) {
			result = obj.data;
		}
	});
	return result;
}

/**
 * 显示错误信息
 * 遮罩层
 * @param msg 错误信息
 */
function showErrorMsg(msg){
	if(msg){
		$("body").append('<div class="error-overlay"><div class="msg-content"><div class="close" onclick="$(\'.error-overlay\').remove()">&times;</div><div>'+msg+'</div></div></div>')
	}
}
