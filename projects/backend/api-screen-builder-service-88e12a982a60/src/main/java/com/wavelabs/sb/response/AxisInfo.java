package com.wavelabs.sb.response;

public class AxisInfo {

    private String componentId;
    private String hint;

    public String getComponentId() {
	return componentId;
    }

    public void setComponentId(String componentId) {
	this.componentId = componentId;
    }

    public String getHint() {
	return hint;
    }

    public void setHint(String hint) {
	this.hint = hint;
    }

    public AxisInfo(String componentId, String hint) {
	this.componentId = componentId;
	this.hint = hint;
    }

    public AxisInfo() {

    }

}
