package com.wavelabs.sb.response;

import com.wavelabs.sb.enums.Operations;

public class CustomColumnsInfo {

    private String name;
    private String id;
    private Operations operation;
    private CustomOperationResponse first;
    private CustomOperationResponse second;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public CustomOperationResponse getFirst() {
	return first;
    }

    public void setFirst(CustomOperationResponse first) {
	this.first = first;
    }

    public CustomOperationResponse getSecond() {
	return second;
    }

    public void setSecond(CustomOperationResponse second) {
	this.second = second;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public Operations getOperation() {
	return operation;
    }

    public void setOperation(Operations operation) {
	this.operation = operation;
    }

}
