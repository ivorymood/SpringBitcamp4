package com.bitcamp.web.domain;

import org.springframework.stereotype.Component;

@Component
public class Page {
	int  pageNum, totalCount, pageSize, blockSize, 
	startRow, endRow, pageStart, pageEnd, totalPage;
	
	boolean prevBlock, nextBlock;
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = (totalCount%pageSize==0) ? totalCount/pageSize : (totalCount/pageSize)+1;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getBlockSize() {
		return blockSize;
	}
	public void setBlockSize(int blockSize) {
		this.blockSize = blockSize;
	}
	public int getStartRow() {
		return startRow;
	}
	public void setStartRow(int startRow) {
		this.startRow = (pageSize*(pageNum-1))+1;
	}
	public int getEndRow() {
		return endRow;
	}
	public void setEndRow(int endRow) {
		this.endRow = pageSize*pageNum;
	}
	public boolean isPrevBlock() {
		return prevBlock;
	}
	public void setPrevBlock(boolean prevBlock) {
		this.prevBlock = (pageStart != 1) ;
	}
	public boolean isNextBlock() {
		return nextBlock;
	}
	public void setNextBlock(boolean nextBlock) {
		this.nextBlock = (totalPage != pageEnd);
	}
	public int getPageStart() {
		return pageStart;
	}
	public void setPageStart(int pageStart) {
		
		this.pageStart = (((pageNum-1)/blockSize)*blockSize) +1;
	}
	public int getPageEnd() {
		return pageEnd;
	}
	public void setPageEnd(int pageEnd) {
		this.pageEnd = (totalPage>blockSize) ? ((pageNum==totalPage) ?  totalPage : (((pageNum-1)/blockSize) + 1) * blockSize)  : totalPage; 
	}
}
