$("#queryBtn").on("click",function(){
	$("#reportIframe").loadReport(basePath+"/ReportServer?reportlet=my_txt.cpt&__bypagesize__=false&sfrybh="+sfrybh+"&sfrymc="+sfrymc+"&ksrq="+ksrq+"&jsrq="+jsrq+"&lb="+lb+"&jzbz="+jzbz+"&gsbh="+gsbh+"&fgsbh="+fgsbh+"&sffsbh="+sffsbh+"&jsrq="+jsrq+"&cxrq="+cxrq+"&kqsf=1");
});