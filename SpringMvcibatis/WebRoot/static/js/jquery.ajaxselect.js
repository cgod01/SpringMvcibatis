/*!
 ajax-select,a Select Box for jQuery
 by XuYulei
 Version 1.0.0
 */
var SCData = {};//selectCacheData,下拉数据缓存
(function($) {
	$.fn.ajaxSelect = function(options){
		var defaults = {
			url:null,
			data:null,
			firstOpt:null,
			cache:null,
			optKey:"xmbh",
			optVal:"xmmc",
			onChange:null,
			callback:null
		}
		if(typeof options=="string"){
			defaults.url = options;
			options = {};
		}
		var o = $.extend(defaults, options);
		return this.each(function(){
			var _this = this;
			var _id = _this.id;
			
			if(SCData[_id]){
				render(SCData[_id]);
			}else if(typeof o.url == "string"){
				AJAX.GET(o.url,o.data,function(list){
					render(list);
					if(o.cache===true){
						SCData[_id] = list;
					}else if(o.cache===false){
						
					}else{
						if((_id && !o.data && o.url.indexOf("?")<0)){
							SCData[_id] = list;
						}
					}
				})
			}else if(o.url instanceof Array){
				render(o.url);
			}
			
			function render(list){
				_this.length = 0;
				if(o.firstOpt!=null){
					_this.add(new Option(o.firstOpt,""));
				}
				if(list.length){
					for (var i = 0; i < list.length; i++) {
						_this.add(new Option(list[i][o.optVal],list[i][o.optKey]))
					}
					if(o.value){
						_this.value = o.value;
					}
				}
				if(o.onChange){
					var events = $._data(_this,"events") 
					if(events && events["change"]){
						
					}else{
						$(_this).on("change",function(){
							o.onChange(this.value);
						})
					}
				}
				if(o.callback){
					o.callback($(_this));
				}
			}
		})
	}
})(jQuery)
