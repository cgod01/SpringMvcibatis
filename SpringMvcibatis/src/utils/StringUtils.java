package utils;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtils {
	public static final String toString(Object obj){
		if(obj == null) {
			return "";
		} else if(obj instanceof Date) {
			return StringUtils.DatetoString((Date)obj);
		} else if(obj instanceof Integer || obj instanceof Short || obj instanceof Long ){
			return obj.toString();
		} else if(obj instanceof Number){
			return StringUtils.NumbertoString((Number) obj,"#,##0.00");
		} else {
			return obj.toString();
		}
	}
	
	public static final String DatetoString(Date DateObj){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(DateObj);
	}
	
	public static final String NumbertoString(Number obj,String format){
		DecimalFormat df = new DecimalFormat();
		df.applyPattern(format);
		return df.format(obj);
	}
}
