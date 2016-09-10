package utils;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class SystemUtils {
	private static final String PROP_FILE = "/system.properties"; 	//系统配置文件路径
	private static String staticPath = "";
	
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
	}

	public static String getStaticPath() {
		return staticPath;
	}

	public static void setStaticPath(String staticPath) {
		SystemUtils.staticPath = staticPath;
	}
	
	
}
