package com.bitcamp.web.service;

import java.util.HashMap;

import org.springframework.stereotype.Component;

@Component
public interface ITXService {
	public Object withdraw(HashMap<?,?> param);
	public Object withdraw2(HashMap<?,?> param);
}
