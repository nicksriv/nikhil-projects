package com.wavelabs.sb.response;

import java.util.List;

public class ListResponse<T> extends BaseResponse {

	private List<T> data;

	private long size;

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

}
