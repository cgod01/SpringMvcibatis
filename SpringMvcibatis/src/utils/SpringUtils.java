package utils;

import org.springframework.context.ApplicationContext;

public class SpringUtils {
	private static ApplicationContext ct = null;
	
	public SpringUtils() {
		// TODO Auto-generated constructor stub
	}
	
	public static Object getBean(String beanName) {
		return ct.getBean(beanName);
	}
	
	public static <T> T getBean(Class<T> cl) {
		return ct.getBean(cl);
	}

	public static ApplicationContext getCt() {
		return ct;
	}

	public static void setCt(ApplicationContext ct) {
		SpringUtils.ct = ct;
	}
	
}
