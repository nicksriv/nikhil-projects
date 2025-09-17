package com.wavelabs.sb.request;

import com.wavelabs.sb.enums.Status;

public class ScreenFlowsRequest {

    private String id;
    private String previousSceenId;
    private String nextScreenId;
    private String screenId;
    private Status status;
    private String screenName;
    private int displayOrder;

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

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }
    
    

}
