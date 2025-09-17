package com.wavelabs.sb.response;

import java.util.List;
import java.util.Map;

public class FutureTemplates {

	private String name;
	private String clientId;
	private String id;
	private List<Map<String, Object>> form;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<Map<String, Object>> getForm() {
		return form;
	}

	public void setForm(List<Map<String, Object>> form) {
		this.form = form;
	}

}
