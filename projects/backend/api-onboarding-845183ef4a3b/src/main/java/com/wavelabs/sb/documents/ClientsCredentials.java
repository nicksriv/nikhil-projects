package com.wavelabs.sb.documents;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "client-credentials")
public class ClientsCredentials extends ModifierDocument {

    private String id;
    private String clientId;
    private String clientName;
    private String password;

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

    public String getClientName() {
	return clientName;
    }

    public void setClientName(String clientName) {
	this.clientName = clientName;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

}
