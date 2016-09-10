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
		"jquery.js": "static/js/jquery-2.1.1.js",
		"ajax.js": "static/js/ajax.js",
		//bootstrap
		"bootstrap.js": "static/js/bootstrap.min.js",
		//Pace
		"pace.js": "static/js/pace.min.js",
		//metisMenu
		"metisMenu.js": "static/js/jquery.metisMenu.js",
		//slimscroll
		"slimscroll.js": "static/js/jquery.slimscroll.min.js",
		//toastr
		"toastr.css": "static/css/toastr.min.css",
		"toastr.js": "static/js/toastr.min.js",
		//sweetalert
		"sweetalert.css": "static/css/sweetalert.css",
		"sweetalert.js": "static/js/sweetalert.min.js",
		//TABLE
		"dataTables.css":"static/css/jquery.dataTables.css",
		"dataTables.js":"static/js/jquery.dataTables.js",
		"dataTables_s.js":"static/js/jquery.dataTables_s.js",
		"dataTables.me.js":"static/js/dataTables.me.js",
		//"dataTables.css":"static/base/js/plugins/dataTables_copy/dataTables.bootstrap.min.css",
		//"dataTables.js":"static/base/js/plugins/dataTables_copy/jquery.dataTables.min.js",
		//"dataTables.me.js":"static/base/js/plugins/dataTables_copy/dataTables.bootstrap.min.js",
		//ZTREE
		"ztree.css":"static/css/style.css",
		"ztree.js":"static/js/jquery.ztree.min.js",
		//DateTimepicker
		"datetimepicker.css":"static/css/bootstrap-datetimepicker.css",
		"datetimepicker.js":"static/js/bootstrap-datetimepicker.js",
		//daterangepicker
		"daterangepicker.css":"static/css/daterangepicker-bs3.css",
		"daterangepicker.js":"static/js/daterangepicker.js",
		//clockpicker
		"clockpicker.css":"static/css/clockpicker.css",
		"clockpicker.js":"static/js/jquery-clockpicker.min.js",
		//layDate
		"laydate.css":"static/css/laydate.css",
		"laydate.js":"static/js/laydate.js",
		//FormValidate
		"validate.js":"static/js/jquery.validate.js",
		//ajaxSelect
		"ajaxSelect.js":"static/js/jquery.ajaxselect.js",
		//chosenSelect
		"chosen.css":"static/css/chosen.css",
		"chosen.js":"static/js/chosen.jquery.js",
		//slimscroll
		"slimscroll.js":"static/js/jquery.slimscroll.min.js",
		//exportexcel
		"exportExcel.js":"static/js/jquery.exportexcel.js",
		//uploadify.css
		"uploadify.css":"static/css/uploadify.css",
		"uploadify.js":"static/js/jquery.uploadify.js",
		//uploadify.css
		"uploadifive.css":"static/css/uploadifive.css",
		"uploadifive.js":"static/js/jquery.uploadifive.js",
		//selectsearch
		"selectsearch.css":"static/css/select.css",
		"selectsearch.js":"static/js/jquery.selectseach.js",
		//highcharts
		"highcharts.js":"static/js/highcharts.js",
		"highcharts-more.js":"static/js/highcharts-more.js",
		//spin
		"spin.js":"static/js/jquery.spin.js",
		//qrcode
		"qrcode.js":"static/js/jquery.qrcode-0.12.0.min.js",
		//qrcode
		"summernote.css":"static/css/summernote.css",
		"summernote.js":"static/js/summernote.min.js",
		//base
		"common.js":"static/js/common.js",
		"include.js":"static/js/include.js",
		"ywgl.js":"static/js/ywgl.js",
		//menu
		"menu.js":"static/js/menu.js"
	},
	charset: 'utf-8'
})