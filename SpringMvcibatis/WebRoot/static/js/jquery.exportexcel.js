/*!
 exportExcel
 by XuYulei
 Version 1.0.0
 */
(function($) {
	$.fn.exportExcel = function(url,data,isTure){
		var $this = this;
		var id = $this.attr("id");
		$('body').append('<iframe id="'+id+'_exportIframe" name="'+id+'_exportIframe" style="width:0;height:0;display:none"></iframe>');
		$this.click(function(){
			if(typeof isTure == "function" && !isTure()){
				return;
			}
			var sbUrl = "",sbData = "";
			if(typeof url=="function"){
				sbUrl = url();
			}else{
				sbUrl = url;
			}
			if(data){
				if(typeof data=="function"){
					sbData = data();
				}else{
					sbData = data;
				}
				if(typeof sbData=="object"){
					var arr = [];
					for ( var n in sbData) {
						arr.push(n+"="+sbData[n]);
					}
					sbData = arr.join("&");
				}
				//sbData = encodeURI(sbData);
			}
			sbUrl = sbUrl + (sbUrl.indexOf("?")==-1 ? "?" :(sbData?"&":""));
			
			$("#"+id+"_exportIframe").attr("src",sbUrl+sbData);
		})
	}
	
	/**
	 * {"code":0,"title":"文件上传中...","text":"成功导入300条，共890条","width":"40%"}
	 */
	
	$.fn.importExcel = function(url,data,callback){
		
		var _finished = true;
		var tid;
		
		if(url){
			return this.each(function(){
				var _this = $(this);
				var id = this.id;
				
				var upload_iframe = $('<iframe/>',{"name":"upload_iframe"}).css({"display":"none"});
				
				var upload_form = $('<form/>',{"name":"upload_form","method":"post","action":url,"enctype":"multipart/form-data","target":"upload_iframe"}).css({"display":"none"});
				$("<input/>",{"id":"attachment","name":"attachment","type":"file"}).change(function(){
					var filepath = this.value;
					var fileType = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);
					if(fileType=="xls" || fileType=="xlsx"){
						showState();
						upload_form.submit();
					}else{
						swal('文件格式不正确');
						upload_form[0].reset();
					}
				}).appendTo(upload_form);
				var upload_pregress = 
					'<div class="sweet-overlay" id="progress" style="display:block;">'+
						'<div class="sweet-alert" style="display: block; margin-top: -50px;">'+
							'<h2>正在导入文件...</h2>'+
							'<div class="progress">'+
								'<div class="progressBar"><span></span></div>'+
							'</div>'+
							'<p></p>'+
						'</div>'+
					'</div>';
				$("body").append(upload_iframe);
				$("body").append(upload_form);
				
				_this.click(function(){
					$("#attachment").click();
				})
				
				function showState(){
					$("body").append(upload_pregress);
				}
				
				window.hideState = function(state,data){
					$("#progress").remove();
					if(state===true){
						swal("数据导入完成")
					}else if(state===false){
					}else{
						swal(state);
					}
					if(callback){
						callback(state,data);
					}
				}
			});
		}else{
			return this.each(function(){
				var _this = $(this);
				var id = this.id;
				
				var upload_iframe = $('<iframe/>',{"name":"upload_iframe"}).css({"display":"none"});
				
				var upload_form = $('<form/>',{"name":"upload_form","method":"post","action":basePath+"/upload.do","enctype":"multipart/form-data","target":"upload_iframe"}).css({"display":"none"});
				$("<input/>",{"id":"attachment","name":"attachment","type":"file"}).change(function(){
					var filepath = this.value;
					var fileType = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);
					if(fileType=="xls" || fileType=="xlsx"){
						showState();
						upload_form.submit();
					}else{
						swal('文件格式不正确');
						upload_form.reset();
					}
				}).appendTo(upload_form);
				
				var upload_pregress = 
					'<div class="sweet-overlay" id="progress" style="display:block;">'+
						'<div class="sweet-alert" style="display: block; margin-top: -50px;">'+
							'<h2>正在上传文件...</h2>'+
							'<div class="progress">'+
								'<div class="progressBar"><span></span></div>'+
							'</div>'+
							'<p></p>'+
						'</div>'+
					'</div>';
				$("body").append(upload_iframe);
				$("body").append(upload_form);
				
				
				var progress,progsBar,percent,title,text;
				
				_this.click(function(){
					$("#attachment").click();
				})
				
				function showState(){
					_finished = false;
					
					$("body").append(upload_pregress);
					progress = $("#progress");
					progsBar = $("#progress .progressBar");
					percent = $("#progress .progressBar span");
					title= $("#progress h2");
					text= $("#progress p");
					
					tid = setInterval(requestStatus, 200);
				}
				
				function requestStatus() {
					if (_finished) {
						clearInterval(tid);
						return;
					}
					
					$.get(basePath+"/upload.do", function(data) {
						var ss = data.split("|")
						var code = ss[0];
						
						progsBar.css({"width":ss[1]+"%"});
						percent.text(ss[1]+"%");
						title.text(ss[2]);
						text.text(ss[3]);
						
						if(code=="finish" || code=="error"){
							_finished = true;
							clearInterval(tid);
							setTimeout(function(){
								progress.remove();
								swal(ss[2],ss[3]);
							},1000)
						}
					})
				}
			})
		}
	}
})(jQuery)

function exportExcel(options){
	var o = $.extend({
		url:basePath+"/jsp/common/exportexcel/preiframeexcel.jsp",
		name:"未命名",
		content:null,
		data:null,
		callback:null
	}, options);
	if(o.content){
		var table= $(o.content).clone(true)[0];
		var dummy = new Date().getTime();
		var url = o.url+"?name="+encodeURI(o.name);
		var iframe = document.getElementById("exportExcel_iframe");
		if(!iframe){
			iframe = document.createElement("IFRAME");
			iframe.id = "exportExcel_iframe";
			iframe.style.display = "none";
			iframe.table = table;
			document.body.appendChild(iframe);
		}
		iframe.src=url;
	}else{
		
	}
}
