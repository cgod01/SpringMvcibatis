package utils;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class SystemUtils {
	private static final String PROP_FILE = "/system.properties"; 	//系统配置文件路径
	private static String staticPath = "";
	private static String uploadPath="";
	
	static {
		Properties prop = new Properties();
		InputStream inp;
		inp = SystemUtils.class.getResourceAsStream(PROP_FILE);
		try {
			prop.load(inp);
		} catch (IOException e) {
			e.printStackTrace();
		}
		staticPath = prop.getProperty("static_path")+"/SpringMvcibatis";
		uploadPath = prop.getProperty("upload_path");
	}

	public static String getStaticPath() {
		return staticPath;
	}

	public static void setStaticPath(String staticPath) {
		SystemUtils.staticPath = staticPath;
	}

	public static String getUploadPath() {
		return uploadPath;
	}

	public static void setUploadPath(String uploadPath) {
		SystemUtils.uploadPath = uploadPath;
	}
	
}
