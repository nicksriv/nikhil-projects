package com.wavelabs.sb.documents;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "screen")
public class Screen extends ModifierDocument {

    @Id
    private String id;
    private List<Map<String, Object>> form;
    private String moduleId;
    private String clientId;
    private String subModuleId;
    private String name;

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

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

}
