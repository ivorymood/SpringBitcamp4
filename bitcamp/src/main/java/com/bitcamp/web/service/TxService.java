package com.bitcamp.web.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitcamp.web.domain.Command;
import com.bitcamp.web.mapper.Mapper;

@Service
public class TxService implements ITXService{
	@Autowired Mapper mapper;
	@Autowired Command cmd;
	
	/*@Override @Transactional	
	//트랜잭션 걸면 공인인증서 급으로 느려짐. 막하는것도 안좋음
	public Object withdraw(HashMap<?, ?> param) {
		// TODO Auto-generated method stub
		mapper.exist(cmd);
		mapper.insertMember(cmd);
		mapper.searchAdminById(param);
		return null;
	}//이렇게 하면 이 메소드만 트랜잭션이 걸림.
*/
	@Override
	public Object withdraw2(HashMap<?, ?> param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object withdraw(HashMap<?, ?> param) {
		// TODO Auto-generated method stub
		return null;
	}

}
