package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "screen-fields")
public class ScreenFields extends ModifierDocument {

    @Id
    private String id;
    private String componentId;
    private String componentHint;
    private boolean filterable;
    private String componentType;
    private List<String> componentValues;
    private boolean visibleontable;
    private String screenId;
    private String moduleId;
    private String subModuleId;
    private String clientId;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getComponentId() {
	return componentId;
    }

    public void setComponentId(String componentId) {
	this.componentId = componentId;
    }

    public String getComponentHint() {
	return componentHint;
    }

    public void setComponentHint(String componentHint) {
	this.componentHint = componentHint;
    }

    public boolean isFilterable() {
	return filterable;
    }

    public void setFilterable(boolean filterable) {
	this.filterable = filterable;
    }

    public String getComponentType() {
	return componentType;
    }

    public void setComponentType(String componentType) {
	this.componentType = componentType;
    }

    public List<String> getComponentValues() {
	return componentValues;
    }

    public void setComponentValues(List<String> componentValues) {
	this.componentValues = componentValues;
    }

    public boolean isVisibleontable() {
	return visibleontable;
    }

    public void setVisibleontable(boolean visibleontable) {
	this.visibleontable = visibleontable;
    }

    public String getScreenId() {
	return screenId;
    }

    public void setScreenId(String screenId) {
	this.screenId = screenId;
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
