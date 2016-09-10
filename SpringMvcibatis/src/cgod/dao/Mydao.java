package cgod.dao;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class Mydao<MyModal> extends SqlMapClientDaoSupport{
	
	public List<MyModal> queryForList(String statement,Object parameterObj) {
		return this.getSqlMapClientTemplate().queryForList(statement, parameterObj);
	}
	
}
