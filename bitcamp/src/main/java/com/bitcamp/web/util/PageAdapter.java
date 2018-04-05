package com.bitcamp.web.util;

import org.springframework.stereotype.Component;

import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Page;

@Component
public class PageAdapter {
	
	public Object attr(Page page) {
		//page.setTotalCount(boardService.count());
		page.setTotalPage(0);
		page.setPageStart(0);
		page.setPageEnd(0);
		page.setPrevBlock(false);
		page.setNextBlock(false);
		page.setStartRow(0);
		page.setEndRow(0);
		/*cmd= new Command();	//cmd청소한 것
		cmd.setPaging(page);*/
		return page;
	}
}
