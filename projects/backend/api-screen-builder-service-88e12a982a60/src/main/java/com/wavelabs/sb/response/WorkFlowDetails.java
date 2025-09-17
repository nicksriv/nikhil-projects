package com.wavelabs.sb.response;

import com.wavelabs.sb.enums.Status;

public class WorkFlowDetails {

	private String id;
	private String screenId;
	private String nextScreenId;
	private String previousScreenId;
	private int displayOrder;
	private String screenName;
	private Status status;

	public int getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}

	public String getScreenName() {
		return screenName;
	}

	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getScreenId() {
		return screenId;
	}

	public void setScreenId(String screenId) {
		this.screenId = screenId;
	}

	public String getNextScreenId() {
		return nextScreenId;
	}

	public void setNextScreenId(String nextScreenId) {
		this.nextScreenId = nextScreenId;
	}

	public String getPreviousScreenId() {
		return previousScreenId;
	}

	public void setPreviousScreenId(String previousScreenId) {
		this.previousScreenId = previousScreenId;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
