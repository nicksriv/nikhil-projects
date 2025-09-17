package com.wavelabs.sb.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "row-wise-rules")
public class RowWiseRules extends ModifierDocument {

    @Id
    private String id;
    private String firstComponentId;
    private String secoundComponentId;
    private String hintName;
    private Rules typeOfRule;
    private String assignToComponentId;
    private String clientId;
    private String moduleId;
    private String subModuleId;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getFirstComponentId() {
	return firstComponentId;
    }

    public void setFirstComponentId(String firstComponentId) {
	this.firstComponentId = firstComponentId;
    }

    public String getSecoundComponentId() {
	return secoundComponentId;
    }

    public void setSecoundComponentId(String secoundComponentId) {
	this.secoundComponentId = secoundComponentId;
    }

    public String getHintName() {
	return hintName;
    }

    public void setHintName(String hintName) {
	this.hintName = hintName;
    }

    public Rules getTypeOfRule() {
	return typeOfRule;
    }

    public void setTypeOfRule(Rules typeOfRule) {
	this.typeOfRule = typeOfRule;
    }

    public String getAssignToComponentId() {
	return assignToComponentId;
    }

    public void setAssignToComponentId(String assignToComponentId) {
	this.assignToComponentId = assignToComponentId;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

}
