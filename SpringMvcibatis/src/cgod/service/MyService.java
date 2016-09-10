package cgod.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import cgod.dao.Mydao;
import cgod.modal.MyModal;

@Service
public class MyService {
	@Autowired
	@Qualifier("mydao")
	private Mydao<MyModal> mydao;

	public List<MyModal> queryLogin(MyModal myModal) {
		List<MyModal> list = this.mydao.queryForList("MyModal.queryLogin", myModal);
		return list;
	}
}
