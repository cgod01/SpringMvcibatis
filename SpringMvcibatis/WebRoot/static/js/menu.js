/**
 * 加载主页菜单
 * @auther XuYulei
 * 
 * 包含菜单数据、事件、缩放
 */

function MenuList(obj) {
	this.welcome = $(".welcome");
	this.sys_name = $("#sys_name");
	this.container = $("#side-menu");
	this.tab = $("#nav_tabs");
	this.content = $("#page-content");
	this.loading = $(".spinner");
	this.menuARR = {};
	this.firstMenu;
	this.num = 0;
	this.tabHistory = {};
	this.basePath = basePath||"";
	this.url_MENU = obj?obj.menu:"/rest/common/login/loadMenu";
	this.url_GZT = "/rest/common/addGzt";
	this.url_LIS = "/rest/common/addCzrz4Zy";
}

MenuList.prototype.init = function(){
	var that = this;
	that.load(function(data){
		try {
			var list = null;
			var xtmc = null;
			for (var n in data) {
				list = data[n][0].list;
				xtmc = data[n][0].xtmc;
			}
			if(xtmc){
				that.sys_name.html(xtmc)
			}
			that.loading.remove();
			that.appendMenu(list);
			that.metisMenu();
		} catch (e) {
			that.loading.html("未加载到任何数据");
		}
	});
}

MenuList.prototype.load = function(callback) {
	var that = this;
	$.getJSON(that.basePath+that.url_MENU+"?_"+new Date(),function(data){
		callback(data.data);
	})
}
MenuList.prototype.appendMenu = function(list){
	var obj = this.container;
	var that = this;
	var _num1 = true,_num2 = true,_num3 = true;
	// MENU1
	factorialMenu(obj,list,1);
	
	function factorialMenu(obj,list,num){
		if(num>=4){
			return;
		}else{
			for (var i = 0; i < list.length; i++) {
				var _list = list[i];
				var _sfqy = _list.sfqy=="1"?true:false;
				if(!_sfqy){
					continue;
				}
				var _id = _list.gnbh;
				var _name = _list.menu_text;
				var _url = _list.menu_url;
				var _sc = !!parseInt(_list.wdgztbz);
				var _child = _list.list;
				var _hasChild = _list.menu_lb=="1"?true:false;
				var _icon = _list.tblj;
				var menu = [];
				if(_url){
					_list.menu_url = that.basePath+_url;
					that.menuARR[_id] = _list;
				}
				menu.push('<li id="'+_id+'">');
				menu.push('<a href="javascript:void(0)"'+(_url?' class="link"':'')+'>');
				if(num==1){
					menu.push('<i class="glyphicon '+(_icon?_icon:"glyphicon-th")+'"></i><span class="nav-label">'+_name+'</span>');
				}else{
					menu.push(_name);
				}
				
				if(_hasChild){
					menu.push('<span class="glyphicon glyphicon-chevron-left"></span></a><ul class="nav collapse'+'" id="p_'+_id+'"></ul></li>');
					obj.append(menu.join(""));
					factorialMenu($("#p_"+_id),_child,num+1);
				}else{
					menu.push('<span title="加入我的工作台" class="glyphicon glyphicon-star'+(_sc?" sc":"")+'"></span></a></li>');
					obj.append(menu.join(""));
				}
			}
		}
	}
}
MenuList.prototype.metisMenu = function(){
	var that = this,_this = that.container;
	_this.mouseover(function(){
		var e = $(this);
		e.removeClass("disabled");
	})
	_this.find("li").has("ul.collapse").children("a").on("click", function(d) {
		var e = $(this), p = e.parent("li"), c = p.children("ul");
		d.preventDefault();
		if($("body").hasClass("mini-navbar")){
			return;
		}
		if(p.hasClass("active")){
			p.removeClass("active");
		}else{
			p.addClass("active");
			p.siblings().removeClass("active");
		}
	})
	_this.find("li a.link").on("click", function(d) {
		that.welcome.css("z-index","1");
		var e = $(this), p = e.parent("li"), c = p.children("ul");
		p.siblings().removeClass("active");
		_this.find("li a.link").parent("li").removeClass("active");
		p.addClass("active");
		//if(p.parents("li")[0]){
		//	p.parents("li").siblings().removeClass("active");
		//	p.parents("li").addClass("active");
		//}
		var c_menu = that.menuARR[p[0].id];
		that.addTab(c_menu);
	})
	_this.find("li a.link span.glyphicon-star").on("click", function(e) {
		var $this = $(this);
		var _gnbh = $this.parents("li")[0].id;
		var _gnmc = $this.parent().text();
		var flag = "0";
		if($this.hasClass("sc")){
			flag = "1";
		}
		$.getJSON(that.basePath+that.url_GZT,{id:_gnbh,name:_gnmc,flag:flag},function(res){
			if(res.data=="1"){
				$this.toggleClass("sc");
			}
		});
		e = e||window.event;
		if(e.stopPropagation) {
			e.stopPropagation();
		}else if (window.event) {
			window.event.cancelBubble = true; 
		}
	})
	
	_this.find("li a.link span.glyphicon-remove").on("click", function(e) {
		var $this = $(this);
		var _gnbh = $this.parents("li")[0].id;
		var _gnmc = $this.parent().text();
		var parentLi = $("#"+_gnbh);
		if(parentLi.siblings().length){
			parentLi.remove();
		}else{
			$this.parents("li").remove();
		}
		$.getJSON(that.basePath+that.url_GZT,{id:_gnbh,name:_gnmc,flag:"1"},function(res){
			if(res.data=="1"){
			}
		});
		e = e||window.event;
		if(e.stopPropagation) {
			e.stopPropagation();
		}else if (window.event) {
			window.event.cancelBubble = true; 
		}
	})
	
	that.tab.find("li.home").click(function(){
		that.tab.find("li").removeClass("active");
		that.content.find("iframe").removeClass("active");
		that.content.find("div.home").addClass("active");
	})
}
MenuList.prototype.addTab = function(c_menu){
	var that = this,_tab = that.tab;
	var menu_id = c_menu.gnbh;
	var menu_name = c_menu.menu_text;
	var menu_url = c_menu.menu_url;
	if($("#tab_"+menu_id)[0]){
		that.showMenu(menu_id);
		return;
	}
	if(_tab.find("li").length>=6){
		var del_id = _tab.find("li")[0].id.replace("tab_","");
		that.removeMenu(del_id)
	}
	var LI = document.createElement("LI");
	LI.id = "tab_"+menu_id;
	LI.className = "active";
	LI.title = menu_name;
	LI.innerHTML = "<label>"+menu_name+"</label>";
	LI.onclick = function(){
		if($(this).hasClass("active")){
			return;
		}
		that.showMenu(menu_id);
	}
	LI.ondblclick = function(){
		that.removeMenu(menu_id);
		that.setTabHistory(menu_id,true)
	}
	var SPAN_m = document.createElement("SPAN");
	SPAN_m.className = "glyphicon glyphicon-remove";
	SPAN_m.onclick = function(e){
		e = e||window.event;
		that.removeMenu(menu_id);
		if(e.stopPropagation) {
			e.stopPropagation();
		}else if (window.event) {
			window.event.cancelBubble = true; 
		}
	}
	var SPAN_r = document.createElement("SPAN");
	SPAN_r.className = "glyphicon glyphicon-refresh";
	SPAN_r.onclick = function(e){
		e = e||window.event;
		that.refreshMenu(menu_id);
		if(e.stopPropagation) {
			e.stopPropagation();
		}else if (window.event) {
			window.event.cancelBubble = true; 
		}
	}
	LI.appendChild(SPAN_m);
	LI.appendChild(SPAN_r);
	_tab.find("li.active").removeClass("active");
	_tab.append(LI);

	that.addContent(c_menu);
	that.readLister(menu_id,menu_name);
}
MenuList.prototype.addContent = function(c_menu){
	var that = this,_content = that.content;
	var menu_id = c_menu.gnbh;
	var sfkzan = c_menu.sfkzan;
	var menu_url = c_menu.menu_url;
	var menu_param = c_menu.menu_param?("&"+c_menu.menu_param):"";
	var IFRAME = document.createElement("IFRAME");
	IFRAME.id = "iframe_"+menu_id;
	IFRAME.className = "active";
	IFRAME.width = "100%";
	IFRAME.height = "100%";
	IFRAME.frameborder = "0";
	IFRAME.scrolling = "auto";
	if(menu_url.indexOf("?")!=-1){
		menu_url += "&";
	}else{
		menu_url += "?";
	}
	IFRAME.src = menu_url+"gnbh="+menu_id+"&sfkzan="+(sfkzan?sfkzan:"")+menu_param;
	//_content.find("iframe.active").removeClass("active");
	_content.find("iframe.active").removeClass("active");
	_content.append(IFRAME);
	that.setTabHistory(menu_id);
}
MenuList.prototype.showMenu = function(c_id){
	var that = this,_this = that.container;
	that.setTabHistory(c_id);
	$("#tab_"+c_id).addClass("active").siblings().removeClass("active");
	$("#iframe_"+c_id).addClass("active").siblings().removeClass("active");
}
MenuList.prototype.setTabHistory = function(c_id,isDel){
	var that = this;
	var _obj = that.tabHistory;
	if(isDel){
		delete _obj[c_id];
		return;
	}
	var _num = that.num++;
	_obj[c_id] = _num;
}
MenuList.prototype.removeMenu = function(c_id){
	var that = this;
	that.setTabHistory(c_id,true);
	$("#tab_"+c_id).remove();
	$("#iframe_"+c_id).remove();
	var maxNum = 0;
	var current;
	for ( var n in that.tabHistory) {
		if(that.tabHistory[n]>=maxNum){
			maxNum = that.tabHistory[n];
			current = n;
		};
	}
	if(current){
		that.showMenu(current);
	}else{
		that.welcome.css("z-index","10");
	}
	//this.showMenu(that.tabHistory[that.tabHistory.length-1]);
}
MenuList.prototype.refreshMenu = function(c_id,param){
	var iFrame = $("#iframe_"+c_id)[0];
	param = param?("&"+param):"";
	iFrame.src = iFrame.src+param;
}
MenuList.prototype.readLister = function(id,name){
	$.ajax({url:this.basePath+this.url_LIS,data:{"gnbh":id,"gnmc":name},async:true})
	//console.log("OPEN MENU："+name+"["+id+"]，dateTime:"+new Date().toString())
}
MenuList.prototype.createTab = function(o){
	var that = this;
	that.welcome.css("z-index","1");
	if(typeof o=="string"){
		o = that.menuARR[o];
		that.addTab(o);
	}else{
		if(that.menuARR[o.gnbh]){
			that.addTab(that.menuARR[o.gnbh]);
			if(o.menu_param){
				that.refreshMenu(o.gnbh,o.menu_param);
			}
		}else{
			that.menuARR[o.id] = o;
			that.addTab(o);
		}
	}
}
MenuList.prototype.closeTab = function(menu_id){
	this.removeMenu(menu_id);
	this.setTabHistory(menu_id,true)
}


function MenuList4Mk(){
	MenuList.call(this,{
		menu:"/rest/common/login/loadMyWorkes"
	});
}

MenuList4Mk.prototype = new MenuList();

MenuList4Mk.prototype.init = function(){
	var that = this;
	that.load(function(data){
		//try {
			var list = null;
			for (var n in data) {
				list = data[n];
			}
			that.loading.remove();
			that.appendMenu(list);
			that.metisMenu();
		//} catch (e) {
			that.loading.html("未加载到任何数据");
		//}
	});
}

MenuList4Mk.prototype.appendMenu = function(list){
	var that = this;
	var obj = that.container;
	// MENU1
	var menu1 = [];
	for (var i = 0; i < list.length; i++) {
		var _list = list[i];
		var _id = _list.xtbh;
		var _name = _list.xtmc;
		var _xturl = _list.xturl;
		var _icon = _list.tblj;
		menu1.push('<li id="'+_id+'">');
		menu1.push('<a href="javascript:void(0)">');
		menu1.push('<i class="glyphicon '+(_icon?_icon:"glyphicon-th")+'"></i><span class="nav-label">'+_name+'</span>');
		menu1.push('<span class="glyphicon glyphicon-chevron-left"></span></a>');
		
		
		var child = _list.list;
		var menu2 = [];
		menu2.push('<ul class="nav collapse'+'" id="p_'+_id+'">');
		for (var j = 0,len=child.length; j < len; j++) {
			var _child = child[j];
			var _gnbh = _child.gnbh;
			var _gnmc = _child.menu_text;
			_child.menu_url = _xturl+_child.menu_url;
			that.menuARR[_gnbh] = _child;
			menu2.push('<li id="'+_gnbh+'">');
			menu2.push('<a href="javascript:void(0)" class="link">');
			menu2.push(_gnmc);
			menu2.push('<span title="移除我的工作台" class="glyphicon glyphicon-remove"></span></a></li>');
		}
		menu2.push("</ul>");
		menu1.push(menu2.join(""));
		menu1.push("</li>")
	}
	obj.append(menu1.join(""));
}

function setSlimScroll(){
	$('#side-menu').slimScroll({
		height : '100%',
		railOpacity : 0.9,
		railVisible: true,
		railColor: '#000000',
		opacity: 0.9,
		color: '#019e73',
		wheelStep:"2px"
	});
}

function setNavSlide(bol){
	$('#nmyx_wrapper>nav>div').hide();
	if(bol){
		$("body").addClass("mini-navbar");
	}else{
		$("body").toggleClass("mini-navbar");
	}
	if($("body").hasClass("mini-navbar")){
		$('#side-menu').slimscroll({
			destroy : true
		}).attr("style","");
		$(".slimScrollBar,.slimScrollRail").remove();
	}else{
		setSlimScroll();
	}
	
	// For smoothly turn on menu
	setTimeout(function() {
		$('#nmyx_wrapper>nav>div').fadeIn(500);
	}, 100);
}


(function(){
	setSlimScroll();
	$("#menuBtn").click(function(){
		setNavSlide();
	})
	/*
	$(window).bind("resize", function() {
		if ($(this).width() < 993) {
			$('body').addClass('mini-navbar')
		} else {
			$('body').removeClass('mini-navbar')
		}
	});*/
})()
