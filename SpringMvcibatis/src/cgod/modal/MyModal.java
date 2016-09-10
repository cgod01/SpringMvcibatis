package cgod.modal;

import utils.MD5Utils;

/**
 * @author cgammxrry
 *
 */
public class MyModal {
	private String name;
	private String password;
	private String rybh;
	private String rymc;
	private String sjbmbh;
	private String yhjb;
	private String tam_uid;
	private String dldm;
	private String dlkl;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		if("".equals(password) || password == null) {
			this.password = password;
		} else {
			this.password = MD5Utils.getMD5(password);
		}
	}
	public String getRybh() {
		return rybh;
	}
	public void setRybh(String rybh) {
		this.rybh = rybh;
	}
	public String getRymc() {
		return rymc;
	}
	public void setRymc(String rymc) {
		this.rymc = rymc;
	}
	public String getSjbmbh() {
		return sjbmbh;
	}
	public void setSjbmbh(String sjbmbh) {
		this.sjbmbh = sjbmbh;
	}
	public String getYhjb() {
		return yhjb;
	}
	public void setYhjb(String yhjb) {
		this.yhjb = yhjb;
	}
	public String getTam_uid() {
		return tam_uid;
	}
	public void setTam_uid(String tam_uid) {
		this.tam_uid = tam_uid;
	}
	public String getDldm() {
		return dldm;
	}
	public void setDldm(String dldm) {
		this.dldm = dldm;
	}
	public String getDlkl() {
		return dlkl;
	}
	public void setDlkl(String dlkl) {
		this.dlkl = dlkl;
	}
	
}
