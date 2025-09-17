package com.wavelabs.sb.documents;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles-master")
public class Roles extends ModifierDocument {

	private String id;
	private String clientId;
	private String role;
	private boolean deleted;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String list) {
		this.role = list;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

}
