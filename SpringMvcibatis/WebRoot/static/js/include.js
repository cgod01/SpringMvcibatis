/**
 * INClUDE
 */
define(function(require, exports){
	/**
	 * SSGS
	 */
	exports.SELECT = {
		SSGS : function(ids,flag,callback){
			if(!ids){
				alert("营业网点级联下拉未设置所属对象")
				return;
			}
			
			var ssgs_temp_data = {};
			
			var slobj_ssgs = document.getElementById(ids[0]);
			var slobj_ssfgs = document.getElementById(ids[1]);
			var slobj_ssyyz = document.getElementById(ids[2]);
			
			if(slobj_ssfgs){
				slobj_ssgs.onchange = function(){
					if(slobj_ssfgs){
						slobj_ssfgs.length = 0;
					}
					if(slobj_ssyyz){
						slobj_ssyyz.length = 0;
					}
					if(this.value){
						ajaxload_ssgs(slobj_ssfgs,basePath+"/rest/common/queryFgsListSelect",{"sjbh":this.value});
					}
				}
			}
			
			if(slobj_ssyyz){
				slobj_ssfgs.onchange = function(){
					if(slobj_ssyyz){
						slobj_ssyyz.length = 0;
					}
					if(this.value){
						ajaxload_ssgs(slobj_ssyyz,basePath+"/rest/common/queryYyzListSelect",{"sjbh":this.value});
					}
				}
			}
			
			function ajaxload_ssgs(selObj,url,data,fun){
				data = $.extend({"yydw":"01"}, data);
				
				var _key = selObj.id + data.sjbh;
				var _list = ssgs_temp_data[_key]||AJAX.GET(url,data);
				
				render(_list);
				function render(list){
					selObj.length=0;
					for (var s_j = 0; s_j < list.length; s_j++) {
						selObj.appendChild(new Option(list[s_j]["qymc"],list[s_j]["qybh"]))
					}
					if(list.length==1){
						$(selObj).change()
					}
					ssgs_temp_data[_key] = list;
				}
			}
			ajaxload_ssgs(slobj_ssgs,basePath+"/rest/common/queryGsListSelect",flag?{"flag":"1"}:null);
			
			if(callback){
				var _rel_data = {};
				for (var i = 0; i < ids.length; i++) {
					_rel_data[ids[i]] = document.getElementById(ids[i]).value;
				}
				callback(_rel_data)
			}
		}
	}
})