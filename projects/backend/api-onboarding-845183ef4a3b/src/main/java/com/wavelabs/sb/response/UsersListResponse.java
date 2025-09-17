package com.wavelabs.sb.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsersListResponse extends BaseResponse {

	private List<UserDetails> data;
	private int size;

	public List<UserDetails> getData() {
		return data;
	}

	public void setData(List<UserDetails> data) {
		this.data = data;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
	

}
