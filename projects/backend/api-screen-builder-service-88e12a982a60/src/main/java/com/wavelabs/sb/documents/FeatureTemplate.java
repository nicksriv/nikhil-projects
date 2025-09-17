package com.wavelabs.sb.documents;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feature-template")
public class FeatureTemplate extends ModifierDocument {

    @Id
    private String id;
    private List<Map<String, Object>> form;
    private String name;
    private String clientId;

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
