/**
 * @summary createTable
 * @description �û���װdatatables,��dhtmlxgrid���,���ڿ���
 * @author Xu Yulei
 * 
 * @example 
 * var table = new createTable("tableId");
 * table.init();
 * table.load("url.json")
 */
function createTable(tableId,options){
	this.sTable = tableId;
	this.API = null;
	this.table = null;
	this.currentRowNum = 0;
	this.scrollY = true;
	this.scrollX = false;
	this.heaerFixed = false;
	this.multiline = false;
	this.columns = [];
	this.rowNumber = null;
	this.params = {
		_title:null,
		_rows_details:null,
		_columns:null,
		_col_align:null,
		_col_sorting:null,
		_col_types:null,
		_col_title:null,
		_table_paging:false
	};
	this.colSelect = {};
	this.colOptions = {};
	this.numberFixed = {};
	this.action = false;
	this.loadCallback = null;
	this.checkAllBtn = null;
	this.editer = false;
	this.data = {};
	this.options = options||{};
}
/**
 * ���ñ���
 * @param {string} text ��ʾ����
 * @example table.setTitle("ROWNM,rybh,rymc");
 * @default null
 * �����Կɲ�����
 */
createTable.prototype.setTitle = function(text){
	this.params._title = text;
}
/**
 * ������ͷ
 * @param str
 */
createTable.prototype.setHeader = function(str){
	this.parentDomain = $("#"+this.sTable).parent("div.table-domain");
	this.outTable = document.getElementById(this.sTable).outerHTML;
	var $thead = $("#"+this.sTable).find("thead");
	$thead.html(str);
}
/**
 * �����У�ͬ��̨Model�����ֶ�����Ӧ������Ϊ�գ���������
 * @param {string} str �ַ�����
 * @example table.setColumns("ROWNM,rybh,rymc");
 * @default not null
 * [CHBOX,��Ӷ�ѡ��]
 * [ROWNM,������ʾ���]
 */
createTable.prototype.setColumns = function(str){
	this.params._columns = str.split(",");
}
/**
 * �����и�����Ϣ��ͬ��̨Model�����ֶ�����Ӧ
 * @param {string|function} str �ַ�����|����
 * @example table.setRowsDetails("rybh,rymc");
 * @default null
 * �����Կɲ�����
 */
createTable.prototype.setRowsDetails = function(str){
	var that = this;
	if(typeof str == "string"){
		that.params._rows_details = str.split(",");
	}else if(typeof str == "function"){
		that.params._rows_details = str;
	}
}
/**
 * ���ö�Ӧ��λ��[����|����|����]
 * @param {string} str �ַ�����
 * @example table.setColAlign("-,<,>");
 * @default Ĭ�Ͼ���
 * �����Կɲ�����
 */
createTable.prototype.setColAlign = function(str){
	str = str.replace(/</img, "left").replace(/>/img, "right").replace(/-/img, "center");
	this.params._col_align = str.split(",");
}
/**
 * ���ö�Ӧ���Ƿ�����[true|'']
 * @param {string} str �ַ�����
 * @example table.setColSorting("true,,")
 * @default Ĭ�ϲ�����
 * �����Կɲ�����
 */
createTable.prototype.setColSorting = function(str){
	this.params._col_sorting = str.split(",");
}
/**
 * ���ö�Ӧ����������[ro|ch|ra|link]
 * @param {string} str �ַ�����
 * @example table.setColTypes("ch,link,ro");
 * @default ro
 * �����Կɲ�����
 */
createTable.prototype.setColTypes = function(str){
	var that = this;
	var strs = str.split(",");
	that.params._col_types = strs;
	for (var i = 0; i < strs.length; i++) {
		if(strs[i]=="pop"){
			that.colOptions[that.params._columns] = {};
		}
	}
	that.editer = true;
}
/**
 * ���ö�Ӧ���Ƿ����Title
 * @param {string} str �ַ�����
 * @example table.setColTitle("true,,true")
 */
createTable.prototype.setColTitle = function(str){
	this.params._col_title = str.split(",")
}
/**
 * ���ñ��Ϊ�̶���ͷ�������ô�ֱ�������߶�
 * @param {boolean} true|false
 * @default true
 */
createTable.prototype.setScrollY = function(bol){
	this.scrollY = bol;
}
/**
 * ����ˮƽ�������߶�
 * @param {boolean}||{number} true|false
 * @default true
 */
createTable.prototype.setScrollX = function(width){
	this.scrollX = width;
}
createTable.prototype.setColEditer = function(bol){
	this.editer = bol;
}
/**
 * �Ƿ�����ѡ��
 * @param {boolean} bol true|false
 * @example table.enableMultiline(true);
 * @default false
 * �����Կɲ�����
 */
createTable.prototype.enableMultiline = function(bol){
	this.multiline = bol;
}

/**
 * �Ƿ�����ҳ[true|false|null]
 * @param {boolean} bol true|false
 * @example table.enablePaging(true);
 * @default false
 * �����Կɲ�����
 * nullΪ�ٷ�ҳ
 */
createTable.prototype.enablePaging = function(bol,pageLength){
	this.params._table_paging = bol;
	if(pageLength){
		this.options.pageLength = Number(pageLength);
	}
}
/**
 * ���õ�ǰ��select�����б�����
 * @param colName
 * @param data
 */
createTable.prototype.setColSelectValue = function(colName,options){
	var that = this;
	var defaults = {
		url:null,
		data:{},
		async:false,
		firstOpt:null,
		optKey:"xmbh",
		optVal:"xmmc"
	}
	var o;
	if(typeof options=="string"){
		defaults.url = options;
		options = {};
	}
	if(options.url){
		o = $.extend(defaults, options);
		$.ajax({
			type : 'GET',
			url : o.url,
			data : o.data,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			async : o.async,
			dataType : 'json',
			success : function(obj) {
				render(obj.data);
			}
		});
	}else{
		if(options instanceof Array){
			o = defaults;
			render(options);
		}else{
			var _ele = document.createElement("select");
			_ele.className= "form-control";
			for ( var n in options) {
				_ele.add(new Option(options[n],n))
			}
			that.colSelect[colName] = $(_ele);
			that.colOptions[colName] = options;
		}
	}
	
	function render(list){
		var _ele = document.createElement("select");
		_ele.className= "form-control";
		var selObj = {};
		if(o.firstOpt!=null){
			_ele.add(new Option(o.firstOpt,""))
			selObj[""] = o.firstOpt;
		}
		for (var i = 0; i < list.length; i++) {
			_ele.add(new Option(list[i][o.optVal],list[i][o.optKey]))
			selObj[list[i][o.optKey]] = list[i][o.optVal];
		}
		that.colSelect[colName] = $(_ele);
		that.colOptions[colName] = selObj;
	}
}
/**
 * ����������
 * @param colName
 * @param data
 */
createTable.prototype.setColOptions = function(colName,data){
	this.colOptions[colName] = data;
}

createTable.prototype.setNumberFixed = function(colName,num){
	this.numberFixed[colName] = num;
}

/**
 * ��ʼ�����
 * ��������
 */
createTable.prototype.init = function(){
	var that = this;
	var p_columns = [];
	var p_columnDefs = [];
	var _params = that.params;
	var array = _params._columns;
	var _sTable = $("#"+that.sTable);
	if(!array){
		return;
	}
	for (var i = 0; i < array.length; i++) {
		var _col_def = {};
		_col_def.targets = i;
		if(_params._col_sorting){
			that.options.ordering = true;
			_col_def.orderable = !!_params._col_sorting[i];
		}
		
		var _array = array[i];
		if(_array == "DETAILS"){
			p_columns.push({"class":"details","orderable":false,"data":null,"defaultContent":""})
		}else if(_array == "ROWNM"){
			p_columns.push({"class":"rownm","orderable":false,"data":null,"defaultContent":""})
			that.rowNumber = i;
		}else if(_array == "CHBOX"){
			p_columns.push({"orderable":false,"data":null,"defaultContent":""})
		}else if(_array == "ACTION"){
			p_columns.push({"orderable":false,"data":null,"defaultContent":""})
		}else{
			p_columns.push({data:_array})
		}
		
		_col_def.createdCell = function (td, cellData, rowData, row, col){
			var _col_name = array[col];
			var _col_align = _params._col_align;
			var _col_types = _params._col_types;
			var _col_title = _params._col_title;
			if(_col_name=="CHBOX"){
				td.innerHTML = "<span class='icheckbox_dataTable'>";
				td.align = "center";
				return;
			}
			if(_col_align){
				td.align = _col_align[col]?_col_align[col]:"center";
			}

			var _colFixed = that.numberFixed[_col_name];
			if(_colFixed){
				cellData = Number(cellData).toFixed(_colFixed);
				td.innerHTML = cellData;
			}
			
			if(_col_types){
				var _ele = that._setColType2Opj(col, rowData, cellData);
				if(_ele){
					td.innerHTML = "";
					td.appendChild(_ele); 
				}
				_ele = null;
			}
			if(_col_title){
				_col_title[col]&&(td.title=cellData);
			}
			
			/*
			if(that.asynUrl && col==0){
				td.innerHTML = "";
				$("<span/>",{"class":"plus"}).click(function(e){
					var _self = this;
					if(_self.className=="plus"){
						_self.className="minus";
					}else if(_self.className=="minus"){
						_self.className="plus";
					}
					if(e.stopPropagation) {
						e.stopPropagation();
					}else if (window.event) {
						window.event.cancelBubble = true; 
					}
					that.loadAsync4Tree(td);
				}).appendTo(td);
				$(td).append("<span>"+cellData+"</span>");
				
			}*/
		}
		p_columnDefs.push(_col_def);
	}
	//that.data.columns = array;
	that.options.columns = p_columns;
	that.options.columnDefs = p_columnDefs;
	if(_params._table_paging){
		that.options.serverSide = true;
	}else{
		if(_params._table_paging===false){
			that.options.serverSide = false;
			that.options.paging = false;
			that.options.info = false;
		}
	}
	
	if(that.scrollY){
		that.options.scrollY = "100%";
		_sTable.attr("width","100%");
		if(that.scrollX){
			_sTable.attr("width",that.scrollX);
			that.options.scrollX = true;
		}
	}else{
		that.options.scrollCollapse = false;
		that.options.autoWidth = false;
		that.options.paging = false;
		_sTable.parents("div.table-domain").addClass("scrollY");
	}
	
	
	/*that.initTable = $("#"+that.sTable).DataTable({
		paging:false,
		oClasses:{sRowEmpty:"dataTables_null"},
		language:{emptyTable:" ",infoEmpty:" "}
	});
	*/
	that._initDateTables();
}
createTable.prototype._initDateTables = function(){
	var that = this;
	//ȫѡ�¼�
	if(that.multiline){
		var $checkbox = $("<span/>",{"class":"icheckbox_dataTable"});
		$("#"+that.sTable+" th.checkAll").html($checkbox);
		$checkbox.click(function(){
			$(this).toggleClass("checked");
			that.setRowChecked("all", $(this).hasClass("checked"));
			if(that.troncheck){
				that.troncheck();
			}
		})
		that.checkAllBtn = $checkbox;
	}
	that.options.ajax = that._getAjaxPline("");
	that.options.drawCallback = function(settings){
		that.API = this.api();
		that._drawCallback(this.api());
	}
	that.table = $("#"+that.sTable).dataTable(that.options);
}
createTable.prototype._getAjaxPline = function(url,data){
	var that = this;
	data = data||{};
	if(that.params._table_paging){
		return $.fn.dataTable.pipeline({
			url:encodeURI(url),
			data:data
		})
	}else{
		return {
			url:encodeURI(url),
			data:data
		}
	}
}
/**
 * ���ر������
 * @param {string} url �����ַ
 * @param {function} callback ������ɻص����ɲ�����
 * @example table.load("/jsp/demo/list.json");
 * @default not null
 * ��������
 */
createTable.prototype.load = function(url,obj,callback){

	if(url==null){
		alert("url not null!");return;
	}
	var that = this;
	
	var _data;
	var _callback;
	if(typeof obj=="object" || typeof obj=="string"){
		_data = obj;
		_callback = callback;
	}else if(typeof obj=="function"){
		_data = {};
		_callback = obj;
	}else{
		_data = {};
	}
	
	if(_callback){
		that.loadCallback = _callback;
	}else{
		that.loadCallback = null;
	}
	
	that.table.fnReloadAjax(that._getAjaxPline(url,_data));
}
createTable.prototype.loadAsync4Tree = function(td){
	var that = this;
	var p_tr = td.parentElement;
	AJAX.GET(that.asynUrl,{},function(){
		
	})
	
}
createTable.prototype.clear = function(){
	this.load("");
}
createTable.prototype._drawCallback = function(api){
	var that = this;
	if(that.table){
		that.table.api( true ).columns.adjust();
		if(that.rowNumber!=null){
			var start = 0;
			if(that.params._table_paging){
				start = api.ajax.params().start;
			}
			api.column(that.rowNumber).nodes().each( function (cell, i) {
				var __num = start+i+1;
				cell.innerHTML = __num;
				api.row(cell.parentElement).data()["ROWNM"] = __num;
			});
		}
		if(that.editer){
			$(api.rows().nodes()).addClass("editor");
		}
		that._setLisner(api);
		if(that.loadCallback){
			var _callback = that.loadCallback;
			that.loadCallback = null;

			//that.table.fnAdjustColumnSizing();
			_callback(api);
		}
	}
}
createTable.prototype._format = function(d){
	var that = this;
	var _details = that.params._rows_details;
	if(typeof _details=="function"){
		return _details(d);
	}else{
		return '<table cellpadding="0" cellspacing="0" class="tableDetails" width="100%">'+'<tr>'+__td(d)+'</tr></table>';
	}
	function __td(d){
		var _tdHTML = [];
		for (var i = 0; i < _details.length; i++) {
			var column = _details[i];
			_tdHTML.push("<td>"+d[column]+"</td>")
		}
		return _tdHTML.join("");
	}
}
createTable.prototype._setLisner = function(api){
	var that = this;
	var rows = api.rows("tr").nodes();
	if(!rows.length){
		return;
	}
	if(that.tronclick){
		$(rows).unbind("click");
		if(that.multiline){
			//�������¼�
			$(rows).click(function(e){
				var _start = that.currentRowNum;
				var _end = $.inArray(this,rows);
				var rowData = api.row(this).data();
				
				if($(this).hasClass("disabled")){
					return false;
				}
				if(e.ctrlKey){
					$(this).toggleClass('selected');
					that._setRowSelected(this,$(this).hasClass('selected'));
					that.currentRowNum = _end;
				}else if(e.shiftKey){
					clearSelRows();
					var i = _end>=_start?_start:_end;
					var _len = Math.abs(_end-_start)+i+1;
					for (; i < _len; i++) {
						that._setRowSelected(rows[i],true);
					}
				}else{
					that.currentRowNum = _end;
					clearSelRows();
					if(that._setRowSelected(this,true)){
						that.tronclick(rowData,this);
					};
				}
				if(that.troncheck){
					that.troncheck(rowData,this);
				}
			})
			$(rows).on("click","td:first-child",function(e){
				var parents= $(this).parent();
				parents.toggleClass('selected');
				var rowData = api.row(parents[0]).data();
				that._setRowSelected(parents[0],parents.hasClass('selected'));
				if(that.troncheck){
					that.troncheck(rowData,parents[0]);
				}
				if(e.stopPropagation) {
					e.stopPropagation();
				}else if (window.event) {
					window.event.cancelBubble = true; 
				}
			})
		}else{
			$(rows).click(function(e){
				clearSelRows();
				if(that._setRowSelected(this,true)){
					var rowData = api.row(this).data();
					that.tronclick(rowData);
				};
			})
		}
		function clearSelRows(){
			$(rows).each(function(i,e){
				that._setRowSelected(this,false);
			})
		}
	}
	
	//��ϸ
	if(that.params._rows_details){
		$("td.details",rows).click(function(){
			var tr = $(this).closest('tr');
			var row = api.row( tr );
			if(row.child.isShown()) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			}else {
				// Open this row
				row.child( that._format(row.data()) ).show();
				tr.addClass('shown');
			}
		})
		var th_details = $("#"+that.sTable+"_wrapper th.details");
		th_details.unbind("click");
		th_details.click(function(){
			$(this).toggleClass("shown");
			if($(this).hasClass("shown")){
				$(rows).each(function(){
					var row = api.row( this );
					row.child( that._format(row.data()) ).show();
					$(this).addClass('shown');
				})
			}else{
				$(rows).each(function(){
					var row = api.row( this );
					row.child.hide();
					$(this).removeClass('shown');
				})
			}
		})
	}
	
	//˫���¼�
	if(that.trondblclick){
		$(rows).dblclick(function(e) {
			if($(this).hasClass("disabled")){
				return false;
			}
			var rowData = api.row(this).data();
			that.trondblclick(rowData);
		})
	}
	
	var colName = that.params._columns;
	var colTypes = that.params._col_types;
	for (var m = 0; m < colName.length; m++) {
		var _col_name = colName[m];
		var _options = that.colOptions[_col_name];
		if(_col_name=="ACTION"){
			var _arr = _options;
			if(_arr && _arr.length>0){
				var html = [];
				for (var i = 0,len=_arr.length; i < len; i++) {
					var _action = _arr[i];
					html.push(["<a href='javascript:void(0)' class='action'",
						(_action.callback?" data-callback='"+_action.callback+"'":""),
						(_action.title?" title='"+_action.title+"'":""),
						">",
						(_action.icon?"<span class='"+_action.icon+"'></span>":""),
						(_action.text?_action.text:""),"</a>"
					].join(""))
				}
				
				$(rows).each(function(i,e){
					var row = $("td",this).eq(m);
					row.html(html.join(""));
					var rowData = api.row(this).data();
					row.find("a").click(function(e){
						var funName = $(this).attr("data-callback");
						if(funName){
							eval(funName)(rowData);
						}
					})
				})
			}
			continue;
		}
		if(_options){
			if(colTypes[m]=="pop"){
				_options.content = "loading..."
				_options.html = true;
				$(rows).each(function(i,e){
					var rowData = api.row(this).data();
					var el = $("[name="+_col_name+"]",this);
					el.popover(_options);
					el.on('shown.bs.popover', function(){
						var funName = eval(that.sTable+"_"+this.name)(rowData);
						var pop_cont = $("#"+$(this).attr("aria-describedby"));
						pop_cont.addClass("pop");
						pop_cont.find(".popover-content").html(funName);
					})
				})
				_options = null;
			}
		}
	}
}
/**
 * �����¼�
 * @param {function} createTable.tronclick
 * @example table.tronclick = function(row){}
 */
createTable.prototype.tronclick = function(){};
createTable.prototype.troncheck = null;
/**
 * ˫���¼�
 * @param {function} createTable.trondblclick
 * @example table.trondblclick = function(row){}
 */
createTable.prototype.trondblclick = function(){};
/**
 * ��ȡѡ����,��ѡ��
 * @{boolean} true ����row����
 * default false
 * @returns {object} rowObject
 */
createTable.prototype.getSelectedRow = function(rows){
	return this._getSelectedRow(false,rows);
};
/**
 * ��ȡѡ��������
 * @{boolean} true ����row����
 * default false
 * @returns {object} rowsObject
 */
createTable.prototype.getSelectedRows = function(rows){
	return this._getSelectedRow(true,rows);
};
/**
 * ��ȡ�����е�����,���ض���
 * @{boolean} true ����row����
 * default false
 * return �������
 */
createTable.prototype.getAllRows = function(isRow){
	var api = this.API;
	var rows = api.rows();
	var nodes = rows.nodes();
	var datas = rows.data();
	this._setRowData(nodes,datas);
	if(isRow){
		return nodes;
	}else{
		return datas;
	}
}

createTable.prototype.getAllRow = function(){
	return this.API.rows().nodes();
}

createTable.prototype.getAllRowData = function(){
	return this.API.rows().data();
}

createTable.prototype.getEditorRow = function(){
	var nodes = this.API.rows("tr.editor").nodes();
	if(nodes.length){
		return nodes;
	}else{
		return null;
	}
}
createTable.prototype.getEditorRowData = function(){
	var that = this;
	var types = that.params._col_types;
	var columns = that.params._columns;
	var data_type = {
		"ed":"input",
		"edd":"input",
		"date":"input",
		"sl":"select",
		"ch":"input[type=checkbox]",
		"ra":"input[type=radio]"
	}
	if(types){
		var rows = that.API.rows("tr.editor");
		var nodes = rows.nodes();
		var datas = rows.data();
		$(nodes).each(function(m,e){
			var tds = $("td",this);
			for (var i = 0; i < types.length; i++) {
				var _col_name = columns[i];
				var _f_type = data_type[types[i]];
				if(_f_type){
					datas[m][_col_name] = tds.find(_f_type+"[name="+_col_name+"]").val();
				}
			}
		})
		return datas;
	}else{
		return null;
	}
}
createTable.prototype._getSelectedRow = function(isMul,isRow){
	var api = this.API;
	var rows = api.rows("tr.selected");
	var nodes = rows.nodes();
	var datas = rows.data();
	this._setRowData(nodes,datas);
	
	if(isRow){
		if(isMul){
			return nodes || 0;
		}else{
			return nodes[0] || 0;
		}
	}else{
		if(isMul){
			return datas || 0;
		}else{
			return datas[0] || 0;
		}
	}
};


/**
 * ��ȡѡ����NODE����
 * @returns
 */
createTable.prototype.getSelectRow = function(bol){
	return this._getSelectRow(bol);
};
createTable.prototype.getSelectRows = function(){
	return this._getSelectRow(true);
};
/**
 * ��ȡѡ������
 */
createTable.prototype.getSelectRowData = function(bol){
	return this._getSelectRow(bol,true);
};
createTable.prototype.getSelectRowsData = function(bol){
	return this._getSelectRow(true,true);
};
createTable.prototype._getSelectRow = function(bol,data){
	var api = this.API;
	var rows = api.rows("tr.selected");
	var nodes = rows.nodes();
	var datas = rows.data();
	this._setRowData(nodes,datas);
	var rowObj;

	if(data){
		if(bol){
			return datas;
		}else{
			return datas[0];
		}
	}else{
		if(bol){
			return nodes;
		}else{
			return nodes[0];
		}
	}
};
/**
 * �����л�ȡ������
 */
createTable.prototype.getRowData = function(e){
	var api = this.API;
	if(typeof e == "number"){
		return api.rows().data()[e];
	}else{
		return api.row(e).data();
	}
}
createTable.prototype.getRowAttr = function(e,name){
	var api = this.API;
	if(typeof e == "number"){
		return api.rows().data()[e][name];
	}else{
		return api.row(e).data()[name];
	}
}
createTable.prototype.setRowAttr = function(e,name,data){
	var api = this.API;
	if(typeof e == "number"){
		api.rows().data()[e][name] = data;
	}else{
		api.row(e).data()[name] = data;
	}
}


/**
 * ���ÿɱ༭������ֵ
 */
createTable.prototype._setRowData = function(rows,datas){
	var types = this.params._col_types;
	if(types && this.editer){
		var columns = this.params._columns;
		var upDateCol = [];
		for (var m = 0; m < types.length; m++) {
			var _type = types[m];
			if(_type=="ed" || _type=="sl" || _type=="ch" || _type=="ra"){
				upDateCol.push(m);
			}
		}
		
		$(rows).each(function(i,e){
			var _tds = $(this).find("td");
			for (var j = 0; j < upDateCol.length; j++) {
				var _col = upDateCol[j];
				var _type = types[_col];
				if(types[_col]=="ed" || types[_col]=="date" || types[_col]=="edd"){
					_type = "input";
				}else if(types[_col]=="sl"){
					_type = "select";
				}else if(types[_col]=="ch"){
					_type = ":checkbox";
				}else if(types[_col]=="ra"){
					_type = ":radio";
				}
				datas[i][columns[_col]] = _tds.eq(_col).find(_type).val();
			}
		})
	}
}
/**
 * ɾ������
 * @param {number|string} ����������ID
 * �Ƿ�ҳӦ��
 */
createTable.prototype.deleteRow = function(rowId){
	var that = this,_table = that.table;
	if(typeof rowId=='number'){
		_table.fnDeleteRow(rowId);
	}else{
		var _s_rows = _table.$('tr').filter(function(i){
			return _table.fnGetData(this).id==rowId;
		})
		$.each(_s_rows,function(){
			_table.fnDeleteRow(this);
		});
	}
	that.API = that.table.api();
}
/**
 * ɾ������ѡ����
 * �Ƿ�ҳӦ��
 */
createTable.prototype.deleteSelectedRow = function(){
	this.API.rows('tr.selected').remove().draw(false);
}

/**
 * �����
 * @param {object},{"a":"1","b":"2"} ����
 * @param {boolean},true ��ӳɹ����Զ����������һ��
 */
createTable.prototype.addRow = function(data,callback){
	var that = this;
	var api = that.API;
	var rows = api.rows().nodes();
	$(rows).each(function(i,e){
		that._setRowSelected(this,false);
	})
	api.row.add(data).draw(false);
	var row_new = api.rows().nodes();
	var this_row = row_new[row_new.length-1];
	
	if(that.params._col_types){
		that.setRowEditor(this_row);
	}
	//$(this_row).addClass("editor");
	that.setRowSelected("last");

	if(callback){
		callback(api,this_row);
	}
}
/**
 * ������checkboxѡ��
 * @param {number},�к�
 * @param {boolean},true/false ѡ��/δѡ��
 */
createTable.prototype.setRowChecked = function(index,bol){
	var that = this;
	var api = that.API;
	var rows = api.rows("tr").nodes();
	var data = api.rows("tr").data();
	bol = !!bol;
	if(typeof index == "number"){
		that._setRowSelected(rows[index],bol);
	}else if(typeof index == "string"){
		if(index=="all"){
			$(rows).each(function(){
				that._setRowSelected(this,bol);
			})
		}
	}
}
/**
 * ������ѡ��
 * @param {number},�к�
 * @param {boolean},true/false ѡ��/δѡ��
 */
createTable.prototype.setRowSelected = function(index,isClick){
	var that = this;
	var api = that.API;
	var rows = api.rows("tr").nodes();
	if(typeof index == "number"){
		if(isClick){
			$(rows[index]).click();
		}else{
			that._setRowSelected(rows[index],true);
		}
	}else if(typeof index == "string"){
		if(index=="last"){
			if(isClick){
				$(rows[rows.length-1]).click();
			}else{
				that._setRowSelected(rows[rows.length-1],true);
			}
			var divBodyEl = api.settings()[0].nTable.parentElement;
			divBodyEl.scrollTop = divBodyEl.scrollHeight;
		}
	}
}
/**
 * ������ѡ�л���δѡ��
 * {object} e �ж���
 * {boolean} bol �Ƿ�ѡ��
 * {boolean} clear �Ƿ��������
 */
createTable.prototype._setRowSelected = function(row,bol){
	if($(row).hasClass("disabled")){
		return false;
	}
	
	if(bol){
		$(row).addClass("selected");
	}else{
		$(row).removeClass("selected");
		$(row).removeClass("warning");
	}
	
	if(!bol&&this.multiline){
		this.checkAllBtn.removeClass("checked");
	}
	return true;
	
	/*var checkbox = row.firstChild.firstChild;
	if(checkbox){
		checkbox.checked = bol;
	}*/
}

createTable.prototype._setColType2Opj = function(col,rowData,cellData,rowedi){
	var that = this;
	var _params = that.params;
	var _col_name = _params._columns[col];
	var _options = that.colOptions[_col_name];
	var _col_types = _params._col_types[col];
	var _ele;
	
	if(that.editer || rowedi){
		switch (_col_types) {
			case "link":
				_ele = document.createElement("A");
				_ele.name = _col_name;
				_ele.href = "javascript:void(0)";
				_ele.onclick = function(e){
					eval(that.sTable+"_"+_col_name)(rowData);
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else if (window.event) { 
						window.event.cancelBubble = true; 
					}
				}
				_ele.innerHTML = cellData;
				break;
			case "pop":
				_ele = document.createElement("A");
				_ele.name = _col_name;
				_ele.className = "pop";
				_ele.href = "javascript:void(0)";
				_ele.innerHTML = cellData;
				_ele.onclick = function(e){
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else if (window.event) { 
						window.event.cancelBubble = true; 
					}
				}
				break;
			case "ch":
				if(_col_name=="CHBOX")return;
				_ele = document.createElement("input");
				_ele.type = "checkbox";
				_ele.name = that.sTable+"_checkbox";
				_ele.checked = !!cellData;
				_ele.onclick = function(e){
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else if (window.event) { 
						window.event.cancelBubble = true; 
					}
				}
				break;
			case "ra":
				_ele = document.createElement("input");
				_ele.type="radio";
				_ele.name = that.sTable+"_radio";
				_ele.checked = !!parseInt(cellData);
				break;
			case "ed":
				_ele = document.createElement("input");
				_ele.className= "form-control";
				_ele.type="text";
				_ele.value = cellData;
				_ele.name = _col_name;
				break;
			case "edd":
				_ele = document.createElement("div");
				_ele.className= "has-feedback";
				var _input = document.createElement("input");
				_input.type = "text";
				_input.className = "form-control";
				_input.value = cellData;
				_input.name = _col_name;
				_input.setAttribute("readonly","readonly");
				_input.onclick = function(e){
					var fun = eval(that.sTable+"_"+_col_name);
					if(fun){
						fun(rowData,this);
					}
				}
				var _span = document.createElement("span");
				_span.className = "glyphicon glyphicon-share-alt form-control-feedback";
				_ele.appendChild(_input);
				_ele.appendChild(_span);
				break;
			case "sl":
				_ele = that.colSelect[_col_name].clone()[0];
				_ele.name = _col_name;
				_ele.value = cellData;
				_ele.onchange = function(e){
					try {
						var fun = eval(that.sTable+"_"+_col_name);
						if(fun){
							fun(rowData,this);
						}
					} catch (e) {
					}
				}
				break;
			case "date":
				_ele = document.createElement("div");
				_ele.className= "has-feedback";
				var _input = document.createElement("input");
				_input.type = "text";
				_input.className = "form-control";
				_input.name = _col_name;
				_input.value = cellData;
				_input.setAttribute("readonly","readonly");
				var _span = document.createElement("span");
				_span.className = "glyphicon glyphicon-calendar form-control-feedback";
				$(_input).datetimepicker(_options);
				_ele.appendChild(_input);
				_ele.appendChild(_span);
				break;
			default:
				break;
		}
	}else{
		switch (_col_types) {
			case "pop":
				_ele = document.createElement("A");
				_ele.name = _col_name;
				_ele.className = "pop";
				_ele.href = "javascript:void(0)";
				_ele.innerHTML = cellData;
				_ele.onclick = function(e){
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else if (window.event) { 
						window.event.cancelBubble = true; 
					}
				}
				break;
			case "ch":
				if(_col_name=="CHBOX")return;
				_ele = document.createElement("input");
				_ele.type = "checkbox";
				_ele.name = that.sTable+"_checkbox";
				_ele.checked = !!cellData;
				_ele.onclick = function(e){
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else if (window.event) { 
						window.event.cancelBubble = true; 
					}
				}
				break;
			case "sl":
				_ele = document.createElement("span");
				_ele.name = _col_name;
				_ele.innerHTML = _options[cellData];
				break;
			case "ra":
				_ele = document.createElement("input");
				_ele.type="radio";
				_ele.name = that.sTable+"_radio";
				_ele.checked = !!parseInt(cellData);
				break;
			default:
				break;
		}
	}
	return _ele;
}

/**
 * �����з���
 * @param {number|array} columns �������±�
 * @param {boolean} bol true|false
 */
createTable.prototype.setColumnVisible = function(columns,bol){
	var that = this;
	var api = that.API;
	if(typeof columns=="number"){
		api.column(columns).visible(bol);
	}else if(typeof columns=="object"){
		for (var i = 0; i < columns.length; i++) {
			api.column(columns[i]).visible(bol);
		}
	}
}

/**
 * �ƶ�ѡ����λ�ã����ƻ�������
 * @param {number} num 1|-1
 */
createTable.prototype.setRowIndex = function(num){
	var that = this;
	var api = that.API;
	var rows = api.rows("tr.selected");
	if(typeof num=="number"){
		var row = rows[0];
		if(row){
			var index = api.row(row).index();
			var max = api.rows().data().length;  
			
			var moveIndex = index+num;
			if(moveIndex<0 || moveIndex>=max){
				return;
			}else{
				var data = api.data();
				api.clear();
				data.splice(moveIndex, 0, data.splice(index, 1)[0]);
				api.rows.add(data).draw();
				that.setRowChecked(moveIndex,true);
			}
		}
	}else{
		
	}
}

createTable.prototype.getColumns = function(){
	return this.params._columns;
}
/**
 * ������ͷ
 * @param str
 */
createTable.prototype._removeHeader = function(str){
	$("#"+this.sTable+" thead").html("");
}
/**
 * ���ٱ��
 */
createTable.prototype.destroy = function(){
	$("#"+this.sTable).dataTable({"destroy":true});
	if(this.parentDomain){
		this.parentDomain.html(this.outTable);
	}
}
/**
 * ���õ�ǰ���ö�
 * @param row {object} �ж���api.rows("tr").nodes();
 */
createTable.prototype.scrollIntoView = function(row){
	var divBodyEl = this.API.settings()[0].nTable.parentElement;
	divBodyEl.scrollTop = row.offsetTop;
}

/**
 * ���õ�ǰ�пɱ༭
 * @param row
 */
createTable.prototype.setRowEditor = function(row,fun){
	var that = this;
	var api = that.table.api();
	that.API = api;
	var nodes = [];
	var _params = that.params;
	if(row && (typeof row=="object")){
		nodes.push(row)
	}else{
		var rows = api.rows("tr.selected");
		nodes = rows.nodes();
	}
	$(nodes).each(function(i,e){
		$(this).addClass("editor");
		var rowData = api.row(this).data();
		var tds = $("td",this);
		for (var j = 0; j < tds.length; j++) {
			var td = tds[j];
			var cellData = rowData[_params._columns[j]];
			var _ele = that._setColType2Opj(j,rowData,cellData,true);
			if(_ele){
				td.innerHTML = "";
				td.appendChild(_ele); 
			}
			_ele = null;
		}
		if(typeof row=="function"){
			row(this)
		}
		if(typeof fun=="function"){
			fun(this)
		}
	})
}

createTable.prototype.setAsyncUrl = function(url){
	this.asynUrl = url;
}


