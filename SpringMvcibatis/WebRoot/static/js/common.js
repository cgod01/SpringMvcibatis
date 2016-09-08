var baseYmlj = window.location.href.replace(basePath, "").split("?")[0];
var $allIbox = $(".ibox");
function setHeight(){
	$.each($allIbox,function(){
		setHeightAuto(this);
	})
}
if(parseInt(sfkzan)){
	try {
		$.getJSON(basePath+"/rest/common/loadAuth/"+gnbh,{},function(obj) {
			var data = obj.data;
			for ( var n in data) {
				data = data[n];
			}
			var anList;
			for( var m in data){
				if(baseYmlj.indexOf(data[m].ymlj)>-1){
					anList = data[m].list;
				}
			}
			if(anList){
				for (var i = 0; i < anList.length; i++) {
					$("#"+anList[i]).show();
				}
			}
			setHeight()
		});
	} catch (e) {
		// TODO: handle exception
	}
}else{
	$(".btn[data-auth]").show();
	setHeight();
}
/*$(".btn[data-auth]").show();*/


$(window).bind("resize",function(){
	/*$.each($allIbox,function(){
		setHeightAuto(this);
	})*/
	setHeight();
})
/**
 * 记录按钮日志
 */
$(".btn[data-log]").on("click",function(){
	if(this.id){
		var text = this.innerText||this.innerHTML;
		var _gnbh = gnbh||"";
		$.ajax({url:basePath+"/rest/common/SystemBtnOperLog",data:{"anid":this.id,"anmc":text.trim(),"ymlj":baseYmlj,"gnbh":_gnbh},async:true})
	}
})

function setHeightAuto(e){
	var ibox = $(e).closest(".ibox");
	var ibox_content = null;
	var child = ibox.find(">div");
	var top = 0;
	var bottom = 0;
	for (var i = 0; i < child.length; i++) {
		var _this = child[i];
		if(_this.className.indexOf("ibox-content")!=-1){
			ibox_content = _this;
			continue;
		}
		if(ibox_content){
			bottom += _this.offsetHeight;
		}else{
			top += _this.offsetHeight;
		}
	}
	if(ibox_content){
		ibox_content.style.top = top+"px";
		ibox_content.style.bottom = bottom+"px";
	}
}
/**
 * 获取下拉列表选中text
 */
$.fn.optionText = function(options){
	return this.each(function(){
		var child = this.children;
		for (var i = 0; i < child.length; i++) {
			if(child[i].innerHTML==options){
				child[i].selected = true;
				break;
			}
		}
	})
}

/**
 * 输入框字符限制
 */
$.fn.recordLength = function(len){
	return this.each(function(){
		var $this = $(this);
		$this.attr("maxLength",len).attr("placeholder","最多输入"+len+"个字符");
		var limit_num = $("<span class='limit-num'/>").text("0/"+len);
		limit_num.insertAfter($this);
		$this.keyup(function(){
			limit_num.text(this.value.length+"/"+len);
		})
	})
}

/**
 * 报表
 */
$.fn.loadReport = function(url){
	var loadDiv = $("<div class='report-loading'/>");
	this.html(loadDiv);
	var IFRAME = document.createElement("IFRAME");
	IFRAME.width = "100%";
	IFRAME.height = "100%";
	IFRAME.frameborder = "0";
	IFRAME.scrolling = "no";
	IFRAME.src = url;
	
	if (IFRAME.attachEvent){
		IFRAME.attachEvent("onload", function(){
			loadDiv.remove();
		});
	} else {
		IFRAME.onload = function(){
			loadDiv.remove();
		};
	}
	this.append(IFRAME);
	IFRAME = null;
}

setTimeout(function(){
	$("body").removeClass("pace-running");
},20000)