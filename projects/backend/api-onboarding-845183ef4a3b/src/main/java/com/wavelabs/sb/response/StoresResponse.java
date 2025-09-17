package com.wavelabs.sb.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class StoresResponse extends BaseResponse {

	private List<StoreDetails> stores;

	public List<StoreDetails> getStores() {
		return stores;
	}

	public void setStores(List<StoreDetails> stores) {
		this.stores = stores;
	}

}
