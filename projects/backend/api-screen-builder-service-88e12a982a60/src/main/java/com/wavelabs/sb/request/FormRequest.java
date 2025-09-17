package com.wavelabs.sb.request;

import java.util.Map;

import com.wavelabs.sb.model.TokenPayLoadDetails;

public class FormRequest {

    private String moduleId;
    private Map<String, Object> form;
    private String submoduleId;
    private String formId;
    private String worlflowId;
    private String mappedBy;
    private TokenPayLoadDetails details;

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public Map<String, Object> getForm() {
	return form;
    }

    public void setForm(Map<String, Object> form) {
	this.form = form;
    }

    public String getSubmoduleId() {
	return submoduleId;
    }

    public void setSubmoduleId(String submoduleId) {
	this.submoduleId = submoduleId;
    }

    public String getFormId() {
	return formId;
    }

    public void setFormId(String formId) {
	this.formId = formId;
    }

    public String getWorlflowId() {
	return worlflowId;
    }

    public void setWorlflowId(String worlflowId) {
	this.worlflowId = worlflowId;
    }

    public String getMappedBy() {
	return mappedBy;
    }

    public void setMappedBy(String mappedBy) {
	this.mappedBy = mappedBy;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

}
