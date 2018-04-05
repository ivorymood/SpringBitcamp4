package com.bitcamp.web.enums;

import java.io.File;

public enum ImageRepo {
	UPLOAD_PATH{
		@Override
		public String toString() {
			return "C:"+File.separator+"Users" 
					+File.separator+"1027"
					+File.separator+"git"
					+File.separator+"SpringBitcamp"
					+File.separator+"Bitcamp"
					+File.separator+"src"
					+File.separator+"main"
					+File.separator+"webapp"
					+File.separator+"resources"
					+File.separator+"img/";
			

			//경로 설정법이 윈도우와 리눅스가 다름. 서버는 다 리눅스임 (정부빼고..아직까진..)
			//"Data" + File.separator + "Tweet.txt"
		}
	}
}
