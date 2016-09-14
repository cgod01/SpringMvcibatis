package cgod.controller;

import java.io.File;
import java.io.FileInputStream;
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
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
	public void downloadFile(HttpServletResponse response,String filename){
//		boolean flag = false;
		try {
			System.out.println(filename);
			String downloadPath = SystemUtils.getUploadPath();
			File downloadFile = new File(downloadPath,filename);
			System.out.println(downloadFile.exists());
			if(!downloadFile.exists()){
//				downloadFile.createNewFile();
//				flag = true;
				response.setContentType("text/html");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write("<script>parent.callback('文件不存在!')</script>");
			} else {
				InputStream in = new FileInputStream(downloadFile);
				
				//设置字符编码的三种方式 权限依次减弱 
//				第一种方法只能用来设置out输出流中所采用的编码，但是它的优先权最高，可以覆盖后面两种方法中的设置；
//			      第二中方法可以设置out输出流中字符的编码方式，也可以设置浏览器接收到这些字符后以什么编码方式来解码，它的优先权低于第一种方法，  但高于第三种方法；
//			      第三种方法只能用来设置out输出流中字符的编码方式，但是它的优先权最低，在已经使用前两种方法中的一个设置了编码方式以后，它就被覆盖而不起作用了
				response.setCharacterEncoding("UTF-8");
//				response.setContentType("text/html;charset=UTF-8");
//				response.setLocale(new Locale("zh","CN"));
				
				//使客户端浏览器，区分不同种类的数据，并根据不同的MIME调用浏览器内不同的程序嵌入模块来处理相应的数据
				response.setContentType("multipart/form-data");
				//当Content-Type 的类型为要下载的类型时 , 这个信息头会告诉浏览器这个文件的名字和类型。
				response.setHeader("Content-Disposition", "attachment;filename="+new String(filename.getBytes(),"ISO8859-1"));
				
				//设置服务器向用户返回的数据长度
				response.setContentLength(in.available());
				//这个是向客户机添加一个时间值属性的响应头信息，比如那个缓存的响应头expires,防止数据被保存到浏览器缓存
//				response.setHeader("Cache-Control","no store");//HTTP 1.1
//				response.setHeader("Pragma","no store");//HTTP 1.0
//				response.setDateHeader("Expires",0);//在代理服务器端防止缓冲
				
				OutputStream out = response.getOutputStream();
				byte[] buffer = new byte[1024];
				int len = 0;
				while((len = in.read(buffer)) != -1) {
					out.write(buffer, 0, len);
				}
				out.close();
				out.flush();
				in.close();
//				if(flag){
//					downloadFile.delete();
//				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/export")
	@ResponseBody
	public void POIExport(HttpServletResponse response){
		List<MyModal> list = this.myservice.queryLogin(new MyModal());
		String[] attrNames = new String[]{"rybh","rymc","yhjb","sjbmbh","tam_uid"};
		String[] header = new String[]{"人员编号","人员名称","用户级别","上级部门编号","门户信息"};
		HSSFWorkbook work = this.myservice.POIExport(list,header,attrNames);
		String title = "cgod导出.xlsx";
		response.setContentType("application/msexcel");
		try {
			response.setHeader("Content-disposition", "attachment;filename="+new String(title.getBytes(),"iso8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		OutputStream out;
		try {
			out = response.getOutputStream();
			work.write(out);
			out.flush();
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
