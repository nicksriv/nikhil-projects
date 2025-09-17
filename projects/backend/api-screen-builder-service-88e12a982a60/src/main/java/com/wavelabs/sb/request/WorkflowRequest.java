package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

import com.wavelabs.sb.enums.Status;

public class WorkflowRequest {

    private String id;
    
    @NotBlank(message = "previous screen id is mandatory")
    private String previousSceenId;
    
    @NotBlank(message = "next screen id is mandatory")
    private String nextScreenId;
    
    @NotBlank(message = "screen id is mandatory")
    private String screenId;
    
    private Status status;
    
    @NotBlank(message = "screen name is mandatory")
    private String screenName;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getPreviousSceenId() {
	return previousSceenId;
    }

    public void setPreviousSceenId(String previousSceenId) {
	this.previousSceenId = previousSceenId;
    }

    public String getNextScreenId() {
	return nextScreenId;
    }

    public void setNextScreenId(String nextScreenId) {
	this.nextScreenId = nextScreenId;
    }

    public String getScreenId() {
	return screenId;
    }

    public void setScreenId(String screenId) {
	this.screenId = screenId;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getScreenName() {
	return screenName;
    }

    public void setScreenName(String screenName) {
	this.screenName = screenName;
    }

}
