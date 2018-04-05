package com.bitcamp.web.domain;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
@Lazy
public class Command{
	protected String type, col1, col2, data1, data2;
	//상속잡을 생각이니까 protected ㅇㅇ
}
