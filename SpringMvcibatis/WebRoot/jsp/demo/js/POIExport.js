$("#exportBtn").on("click",function(){
	var e = document.createElement('a');
	document.body.appendChild(e);
	e.target="exportIframe";
	e.href=basePath+"/rest/cgod/export";
	e.click();
	document.body.removeChild(e);
//	AJAX.GET(basePath+"/rest/cgod/export",{});
});