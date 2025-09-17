package com.wavelabs.sb.request;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotBlank;

public class SaveFeatureTemplateRequest {

    private List<Map<String, Object>> form;
    
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Client ID is mandatory")
    private String clientId;

    public List<Map<String, Object>> getForm() {
	return form;
    }

    public void setForm(List<Map<String, Object>> form) {
	this.form = form;
    }

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

}
