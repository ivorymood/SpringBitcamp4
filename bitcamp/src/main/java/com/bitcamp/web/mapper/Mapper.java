package com.bitcamp.web.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.bitcamp.web.domain.Admin;
import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Image;
import com.bitcamp.web.domain.Member;

@Repository
public interface Mapper {
	
		public void insertMember(Command cmd);
		public void updateMember(HashMap<?,?> map);
		public void deleteMember(Command cmd);
		
		public List<Member> selectAll(Command cmd);
		public Member selectByKeyword(HashMap<?,?> map);    
		public Member searchMemberById(HashMap<?,?> map);
		public Admin searchAdminById(HashMap<?,?> map);
		//일반 맵은 캐스팅실패가능성 떄문에 hashMap
		
		
		public void addImage(Image img);
		
		public Admin selectAdmin(Command cmd);
		
		public int count();
		public int selectCount(Command cmd);

		public int exist(Command cmd);
		
		public List<Board> articles(Command cmd);
		public void insertArticle(HashMap<?,?> map);
		
		public HashMap<String,String> searchAll(HashMap<String,String> map);
		
	}
