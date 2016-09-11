package utils;

import java.security.MessageDigest;

public class MD5Utils {
	public final static String getMD5(String ss) {
		char[] hexDigits = {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                'A', 'B', 'C', 'D', 'E', 'F'};
		try {
			byte[] strTrmp = ss.getBytes();
			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			//累计文摘更新
			mdTemp.update(strTrmp);
			//完成算法返回加密信息
			byte[] md = mdTemp.digest();
			int len = md.length;
			char str[] = new char[len*2];
			int k =0 ;
			for (int i = 0; i < len; i++) {
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(str);
		} catch (Exception e) {
			return null;
		}
	}
}
