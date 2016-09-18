package utils;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class DebugRequestBeforeController implements Filter{
	private static final Log log = LogFactory.getLog(DebugRequestBeforeController.class);
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		String ip = req.getHeader("x_forwarded_for");
		String path = req.getRequestURI();
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getHeader("http_client_ip");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getRemoteAddr();
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getHeader("HTTP_X_FORWARDED_FOR");
		}
		// 如果是多级代理，那么取第一个ip为客户ip
		if (ip != null && ip.indexOf(",") != -1) {
			ip = ip.substring(ip.lastIndexOf(",") + 1, ip.length()).trim();
		}
		if("127.0.0.1".equals(ip)){
			ip = InetAddress.getLocalHost().getHostAddress();
		}
		log.debug("RemoteIp: " + ip);
		log.debug("RequestURI: " + path);
		Enumeration<String> parameters = req.getParameterNames();
		while(parameters.hasMoreElements()){
			String key = parameters.nextElement();
			String[] values = req.getParameterValues(key);
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < values.length; i++) {
				sb.append(values[i]).append(",");
			}
			log.debug("Parameter: " + key);
			log.debug("Value(s) : " + sb.toString());
		}
		log.debug("Cookie_value…………………………………………………………………………………………");
		Cookie[] cookies=req.getCookies();
		if(cookies!=null){
			for(Cookie c:cookies){
				String key=c.getName();
				String value=c.getValue();
				log.debug("Parameter: " + key);
				log.debug("Value(s) : " + value);
			}
		}
		String iv_user = req.getHeader("iv-user");
		log.debug("Header_iv-user:"+iv_user);
		chain.doFilter(request, response);
	}
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}
}
