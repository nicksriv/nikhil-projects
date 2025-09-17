package com.wavelabs.sb.response;

import java.util.List;

public class FiltersResponse {

    private String componentId;
    private String type;
    private List<String> values;
    private String hint;

    public String getComponentId() {
	return componentId;
    }

    public void setComponentId(String componentId) {
	this.componentId = componentId;
    }

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

    public List<String> getValues() {
	return values;
    }

    public void setValues(List<String> values) {
	this.values = values;
    }

    public String getHint() {
	return hint;
    }

    public void setHint(String hint) {
	this.hint = hint;
    }

}
