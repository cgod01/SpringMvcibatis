var dataTables = ['dataTables.css', 'dataTables.js', 'dataTables.me.js'];
seajs.use(dataTables,function(){
	gridbox = new createTable('mytable');
	gridbox.setColumns("rybh,rymc,yhjb,sjbmbh,tam_uid");
//	gridbox.setColSorting(",,,true,true,true,true,true,true,true");
	gridbox.setColAlign("-,-,-,-,-");
//	gridbox.setColTypes(",,,,pop,ro,sl,sl,ed,date");
	//gridbox.setColTitle(",true,true");
//	gridbox.setScrollY(false);
	gridbox.init();
})

$(function(){
	setLister();
})

function setLister(){
	$("#queryBtn").on("click",function(){
		var name = $("#name").val();
		var password = $("#password").val();
		gridbox.load(basePath+"/rest/cgod/login",{name:name,password:password})
	})
}