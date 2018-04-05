package com.bitcamp.web.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Image;
import com.bitcamp.web.domain.Member;
import com.bitcamp.web.domain.Page;
import com.bitcamp.web.enums.ImageRepo;
import com.bitcamp.web.mapper.Mapper;
import com.bitcamp.web.service.ICountService;
import com.bitcamp.web.service.IGetService;
import com.bitcamp.web.service.IPostService;
import com.bitcamp.web.service.ISearchService;
import com.bitcamp.web.util.FileProxy;
import com.bitcamp.web.util.PageAdapter;


@RestController	//restful 방식
public class Controller {
	private static final Logger logger = LoggerFactory.getLogger(Controller.class);
	@Autowired Mapper mapper;
	@Autowired Command cmd;
	@Autowired Member user;
	@Autowired Page page;
	@Autowired PageAdapter adapter;
	@Autowired Board board;
	@Autowired Image image;
	@RequestMapping(value="/{type}/login", method=RequestMethod.POST, consumes="application/json")
	public Object login(@PathVariable String type, @RequestBody HashMap<String, String> param) {//pathvariable과 requestbody 혼용 가능하다
		Map<String, Object> map = new HashMap<>();
		logger.info("welcom   {}","Member!");
		logger.info("전달된 ID: {}", param.get("id"));
		logger.info("전달된 PW: {}", param.get("pass"));
		
		cmd = new Command();
		cmd.setType(type);//json에 넣어서 안하는 이유? restful 방식
		cmd.setData1(param.get("id"));
		cmd.setData2(param.get("pass"));
		int count =0;
		switch(type) {
		case "admin": 
			cmd.setCol1("admin_id");
			cmd.setCol2("admin_pass");
			count = new ICountService() {
				
				@Override
				public int execute(Command cmd) {
					return mapper.exist(cmd);
				}
			}.execute(cmd);
			map.put("success", count);
			if(count ==1) {
				map.put("admin", new ISearchService() {
					@Override
					public Object execute(HashMap<?, ?> param) {
						return mapper.searchAdminById(param);
					}
				}.execute(param));
			}
			System.out.println("관리자 로그인 성공여부: "+ count);
			break;
		case "member": 
			cmd.setCol1("id");
			cmd.setCol2("pass");
			count = new ICountService() {
				@Override
				public int execute(Command cmd) {
					return mapper.exist(cmd);
				}
			}.execute(cmd);
			map.put("success", count);
			if(count ==1) {
				map.put("user", new ISearchService() {
					@Override
					public Object execute(HashMap<?, ?> param) {
						return mapper.searchMemberById(param);
					}
				}.execute(param));  
			}
			//코드안에 껍질을 씌운것??? 급행지하철과 같은것????
			System.out.println("멤버 성공 여부: "+count );
			break;
		}
		return map;
	}
	@RequestMapping(value="/articles/{pageNum}", method=RequestMethod.GET)
	public Map<?,?> getArticles(@PathVariable String pageNum){
		logger.info("getArticles 들어옴 {}", "ENTERED");		
		Map<String, Object> map = new HashMap<>();
		/*return (List<?>) new IGetService() {
			
			@Override
			public Object execute(Command cmd) {
				return null;
			}
		}.execute(cmd);	//바로 리턴에! 엄청빠름. 람다
		 */	
		page.setPageNum(Integer.parseInt(pageNum));
		page.setBlockSize(5);
		page.setPageSize(5);
		page.setTotalCount(26);
		page = (Page) adapter.attr(page);
		cmd.setData1(page.getStartRow()+"");
		cmd.setData2(page.getEndRow()+"");
		map.put("list", (List<?>) new IGetService() {
											@Override
											public Object execute(Command cmd) {
												return mapper.articles(cmd);
											}
										}.execute(cmd)
				);
		map.put("page", page);
		return map;
	}
	@RequestMapping(value="/search/{type}/{data}", method=RequestMethod.GET)
	public Map<?,?> getArticle(@PathVariable("type") String type, @PathVariable("data") String data){
		Map<String,Object> map = new HashMap<>();
		Map<String,String> param = new HashMap<>();
		param.put("type", type);
		param.put("data", data);
		switch(type) {
		case "member":
			
			map.put("result", new ISearchService() {
				
				@Override
				public Object execute(HashMap<?, ?> param) {
					// TODO Auto-generated method stub
					return mapper.selectByKeyword(param);
				}
			}.execute((HashMap<?, ?>) param));
			//where절 문제 해결하면 케이스를 합칠수있다
			break;
		case "admin":
			map.put("result", new ISearchService() {
				
				@Override
				public Object execute(HashMap<?, ?> param) {
					// TODO Auto-generated method stub
					return mapper.selectByKeyword(param);
				}
			}.execute((HashMap<?, ?>) param));
			
			break;
		}
		System.out.println("type: "+type);
		return map;
	}
	
	@RequestMapping(value="/board/post/article", method=RequestMethod.POST, consumes="application/json")
	public void postArticle(@RequestBody HashMap<String, String> param){
		//consumes="application/json"<--getJson과 같은의미라 생략가능
		System.out.println("넘어온 ID: "+param.get("id"));
		System.out.println("넘어온 글제목: "+param.get("title"));
		System.out.println("넘어온 글내용: "+param.get("content"));
		new IPostService() {
			@Override
			public void execute(HashMap<?,?> param) {
				System.out.println("IPostService 들어옴");
				mapper.insertArticle(param);
			}
		}.execute(param);
	}
	@RequestMapping(value="/board/file/upload",
	           method=RequestMethod.POST)
	   public Map<?,?> fileupload(
	           MultipartHttpServletRequest request,
	           HttpSession session) throws IllegalStateException, IOException {
		//try catch 하지말고 throw. 스프링은 에러도 컨트롤러가 관리
	       Map<String, Object>map = new HashMap<>();
	       FileProxy pxy = new FileProxy();
	       Iterator<String> it = request.getFileNames();
	       if(it.hasNext()) {
	           MultipartFile file = request.getFile(it.next());
	           String rootPath = request.getSession().getServletContext().getRealPath("/");
	           String uploadPath = "resources/img/";
	           String filename = file.getOriginalFilename();
	           System.out.println("파일 네임"+filename);
	           image.setImageID(new SimpleDateFormat("yyMMdd_hhmmss_").format(new Date())+filename);
	           image.setFilename(filename);
	       }
	       String fileName =
	               pxy.getFile()
	               .getOriginalFilename();
	       System.out.println("업로드된div-fileupload 파일 : " + fileName);
	       String path = ImageRepo.UPLOAD_PATH.toString() + fileName;
	       File file = new File(path);
	       pxy.getFile().transferTo(file);
	       return map;
	   }

}
