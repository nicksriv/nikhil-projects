package com.wavelabs.sb.response;

public class ColumnsResponse {

    private String componentId;
    private String hint;
    private String type;
    private int order;

    public ColumnsResponse() {

    }

    public ColumnsResponse(String componentId, String hint, int order) {
	this.componentId = componentId;
	this.hint = hint;
	this.order = order;
    }


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

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

    public int getOrder() {
	return order;
    }

    public void setOrder(int order) {
	this.order = order;
    }

}
