package cgod.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import utils.SystemUtils;

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
	
	/**
	 * 最原始的上传方法(和下面的multipartResolver冲突，配置了multipartResolver类就没法再用这个原始的方法)
	 * common-io;common-upload
	 * @param request
	 * @param response
	 */
	@RequestMapping("/uploadFile")
	@ResponseBody
	public void uploadFile(HttpServletRequest request,HttpServletResponse response){
		boolean flag = true;
		//1.创建一个diskfileItenFactory工厂
		DiskFileItemFactory df = new DiskFileItemFactory();
		//2.创建一个上传文件解析器
		ServletFileUpload sf = new ServletFileUpload(df);
		//解决上传中文乱码的问题
		sf.setHeaderEncoding("UTF-8");
		//设置内存的临界值大小
		df.setSizeThreshold(1024*500);//500k
		File linshi = new File("E:\\myupload");
		df.setRepository(linshi);//如果上传的文件总的大小超过了500k,会存到这个临时文件夹中
		sf.setSizeMax(1024*1024*5);//总的文件大小不能超过5m
		
		try {
			List<FileItem> items = sf.parseRequest(request);
			for (FileItem fileItem : items) {
				//如果是一个一般的表单域，打印信息
				if(fileItem.isFormField()){
					String name = fileItem.getFieldName();
					String value = fileItem.getString("utf-8");
					System.out.println(name+":"+value);
				}
				//如果是文件域，这保存到指定的目录
				else {
					String filename = fileItem.getName();
					long filesize = fileItem.getSize();
					System.out.println(filename);
					System.out.println(filesize);
					
					if(filename != null && !"".equals(filename)){
						InputStream in = fileItem.getInputStream();
						String uploadfileName = "E:\\myupload\\"+filename;
						File uploadFile = new File(uploadfileName);
						OutputStream out = new FileOutputStream(uploadFile);
						byte[] buffer = new byte[1024];
						int len = 0;
						while((len = in.read(buffer)) != -1) {
							out.write(buffer, 0, len);
						}
						out.close();
						in.close();
					}
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
			flag = false;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			flag = false;
		} catch (IOException e) {
			e.printStackTrace();
			flag = false;
		}
		try {
			if(flag) {
				response.setContentType("text/html");
				response.getWriter().write("<script>callback('successs')</script>");
			} else {
				response.setContentType("text/html");
				response.getWriter().write("<script>callback('error')</script>");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * MultipartFile上传，需要配置multipartResolver类
	 * 一点个要添加responsebody注解，不然会报错
	 * @param files
	 */
	@RequestMapping("/MultipartFileUpload")
	@ResponseBody
	public void MultipartFileUpload(@RequestParam(value="fileupload") List<MultipartFile> files,HttpServletResponse response) {
		boolean flag = true;
		for (MultipartFile multipartFile : files) {
			long size = multipartFile.getSize();
			if(size != 0) {
				try {
					String filename = multipartFile.getOriginalFilename();
					System.out.println(filename);
					String uploadPath = SystemUtils.getUploadPath();
					String fullPath = uploadPath+"/"+filename;
					File uploadDiv = new File(uploadPath);
					System.out.println(uploadDiv.exists());
					if(!uploadDiv.exists()){
						uploadDiv.mkdirs();
					}
					File uploadPathDiv = new File(fullPath);
					OutputStream out = new FileOutputStream(uploadPathDiv);
					InputStream in = multipartFile.getInputStream();
					
					byte[] buffer = new byte[1024];
					int len = 0;
					while((len = in.read(buffer)) != -1) {
						out.write(buffer,0,len);
					}
					
					out.close();
					in.close();
					
				} catch (IOException e) {
					e.printStackTrace();
					flag = false;
				}
			}
		}
		try {
			if(flag) {
				response.setContentType("text/html");
				response.getWriter().write("<script>parent.callback('success')</script>");
			} else {
				response.setContentType("text/html");
				response.getWriter().write("<script>parent.callback('error')</script>");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/downloadFile")
	@ResponseBody
	public void downloadFile(){
//		String downloadfilePath = "E:\\myupload\";
	}
}
