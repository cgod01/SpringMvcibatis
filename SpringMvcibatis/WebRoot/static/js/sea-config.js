(function(path){
	if(!path){
		var sc = document.getElementsByTagName('script');
		for (var i = 0; i < sc.length; i++) {
			if(sc[i].src.indexOf("sea")!=-1){
				var src = sc[i].src.split("/");
				var host = src[0]+"//"+src[2];
				window.staticPath = host;
				break;
			};
		}
	}
})(staticPath)

seajs.config({  // µ÷ÊÔÄ£Ê½
	debug: true,
	base: staticPath+"/",
	alias: {
		//Main
		"jquery.js": "static/base/js/jquery-2.1.1.js",
		"ajax.js": "static/base/js/ajax.js",
		//bootstrap
		"bootstrap.js": "static/base/js/bootstrap.min.js",
		//Pace
		"pace.js": "static/base/js/plugins/pace/pace.min.js",
		//metisMenu
		"metisMenu.js": "static/base/js/plugins/metisMenu/jquery.metisMenu.js",
		//slimscroll
		"slimscroll.js": "static/base/js/plugins/slimscroll/jquery.slimscroll.min.js",
		//toastr
		"toastr.css": "static/base/css/plugins/toastr/toastr.min.css",
		"toastr.js": "static/base/js/plugins/toastr/toastr.min.js",
		//sweetalert
		"sweetalert.css": "static/base/css/plugins/sweetalert/sweetalert.css",
		"sweetalert.js": "static/base/js/plugins/sweetalert/sweetalert.min.js",
		//TABLE
		"dataTables.css":"static/base/css/plugins/dataTables/jquery.dataTables.css",
		"dataTables.js":"static/base/js/plugins/dataTables/jquery.dataTables.js",
		"dataTables_s.js":"static/base/js/plugins/dataTables/jquery.dataTables_s.js",
		"dataTables.me.js":"static/base/js/plugins/dataTables/dataTables.me.js",
		//"dataTables.css":"static/base/js/plugins/dataTables_copy/dataTables.bootstrap.min.css",
		//"dataTables.js":"static/base/js/plugins/dataTables_copy/jquery.dataTables.min.js",
		//"dataTables.me.js":"static/base/js/plugins/dataTables_copy/dataTables.bootstrap.min.js",
		//ZTREE
		"ztree.css":"static/base/css/plugins/ztree/style.css",
		"ztree.js":"static/base/js/plugins/ztree/jquery.ztree.min.js",
		//DateTimepicker
		"datetimepicker.css":"static/base/css/plugins/datapicker/bootstrap-datetimepicker.css",
		"datetimepicker.js":"static/base/js/plugins/datapicker/bootstrap-datetimepicker.js",
		//daterangepicker
		"daterangepicker.css":"static/base/css/plugins/daterangepicker/daterangepicker-bs3.css",
		"daterangepicker.js":"static/base/js/plugins/daterangepicker/daterangepicker.js",
		//clockpicker
		"clockpicker.css":"static/base/css/plugins/clockpicker/clockpicker.css",
		"clockpicker.js":"static/base/js/plugins/clockpicker/jquery-clockpicker.min.js",
		//layDate
		"laydate.css":"static/base/css/plugins/laydate/laydate.css",
		"laydate.js":"static/base/js/plugins/laydate/laydate.js",
		//FormValidate
		"validate.js":"static/base/js/plugins/validate/jquery.validate.js",
		//ajaxSelect
		"ajaxSelect.js":"static/base/js/plugins/chosen/jquery.ajaxselect.js",
		//chosenSelect
		"chosen.css":"static/base/css/plugins/chosen/chosen.css",
		"chosen.js":"static/base/js/plugins/chosen/chosen.jquery.js",
		//slimscroll
		"slimscroll.js":"static/base/js/plugins/slimscroll/jquery.slimscroll.min.js",
		//exportexcel
		"exportExcel.js":"static/base/js/plugins/exportExcel/jquery.exportexcel.js",
		//uploadify.css
		"uploadify.css":"static/base/css/plugins/uploadify/uploadify.css",
		"uploadify.js":"static/base/js/plugins/uploadify/jquery.uploadify.js",
		//uploadify.css
		"uploadifive.css":"static/base/css/plugins/uploadifive/uploadifive.css",
		"uploadifive.js":"static/base/js/plugins/uploadifive/jquery.uploadifive.js",
		//selectsearch
		"selectsearch.css":"static/base/css/plugins/selectsearch/select.css",
		"selectsearch.js":"static/base/js/plugins/selectsearch/jquery.selectseach.js",
		//highcharts
		"highcharts.js":"static/base/js/plugins/highcharts/highcharts.js",
		"highcharts-more.js":"static/base/js/plugins/highcharts/highcharts-more.js",
		//spin
		"spin.js":"static/base/js/plugins/spin/jquery.spin.js",
		//qrcode
		"qrcode.js":"static/base/js/plugins/qrcode/jquery.qrcode-0.12.0.min.js",
		//qrcode
		"summernote.css":"static/base/css/plugins/summernote/summernote.css",
		"summernote.js":"static/base/js/plugins/summernote/summernote.min.js",
		//base
		"common.js":"static/nmyx/common/dist/js/common.js",
		"include.js":"static/nmyx/common/dist/js/include.js",
		"ywgl.js":"static/nmyx/ywgl/js/ywgl.js",
		//menu
		"menu.js":"static/nmyx/common/dist/js/menu.js"
	},
	charset: 'utf-8'
})