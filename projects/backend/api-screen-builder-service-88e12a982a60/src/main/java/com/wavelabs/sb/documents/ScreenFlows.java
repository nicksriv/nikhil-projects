package com.wavelabs.sb.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "screen-flows")
public class ScreenFlows extends ModifierDocument {

    @Id
    private String id;
    private String moduleId;
    private String clientId;
    private String screenId;
    private String screenName;
    private String subModuleId;
    private String previousScreenId;
    private String nextScreenId;
    private String version;
    private int displayOrder;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
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

    public String getScreenId() {
	return screenId;
    }

    public void setScreenId(String screenId) {
	this.screenId = screenId;
    }

    public String getScreenName() {
	return screenName;
    }

    public void setScreenName(String screenName) {
	this.screenName = screenName;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getPreviousScreenId() {
	return previousScreenId;
    }

    public void setPreviousScreenId(String previousScreenId) {
	this.previousScreenId = previousScreenId;
    }

    public String getNextScreenId() {
	return nextScreenId;
    }

    public void setNextScreenId(String nextScreenId) {
	this.nextScreenId = nextScreenId;
    }

    public String getVersion() {
	return version;
    }

    public void setVersion(String version) {
	this.version = version;
    }

    public int getDisplayOrder() {
	return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
	this.displayOrder = displayOrder;
    }

}
