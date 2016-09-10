package cgod.controller;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cgod.modal.MyModal;
import cgod.service.MyService;

@Controller
@RequestMapping("/cgod")
public class MyController {
	@Autowired
	private MyService myservice;
	
	private String renderJsonFlist(List<MyModal> list,String[] attrNames){
		JSONObject returnObj = new JSONObject();
		JSONArray arr = new JSONArray();
		if(list.size() == 0 || list == null) {
			returnObj.put("data", arr);
			return returnObj.toString();
		}
		for (MyModal m : list) {
			BeanWrapper bw = new BeanWrapperImpl(m);
			JSONObject o = new JSONObject();
			if(attrNames.length > 0 || attrNames != null) {
				for (String s : attrNames) {
					Object value = bw.getPropertyValue(s);
					if(value == null || "null".equals(value)){
						value = "";
					}
					o.put(s, value);
				}
			}
			arr.add(o);
		}
		returnObj.put("data", arr);
		return returnObj.toString();
	}
	
	@RequestMapping("login")
	@ResponseBody
	public Object login(MyModal myModal){
		List<MyModal> list = this.myservice.queryLogin(myModal);
		return this.renderJsonFlist(list,new String[]{"rybh","rymc","sjbmbh","yhjb","tam_uid"});
	}
}
