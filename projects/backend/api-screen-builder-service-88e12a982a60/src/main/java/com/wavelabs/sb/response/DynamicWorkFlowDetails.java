package com.wavelabs.sb.response;

public class DynamicWorkFlowDetails {

    private String name;
    private String current;
    private String next;
    private String previous;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getCurrent() {
	return current;
    }

    public void setCurrent(String current) {
	this.current = current;
    }

    public String getNext() {
	return next;
    }

    public void setNext(String next) {
	this.next = next;
    }

    public String getPrevious() {
	return previous;
    }

    public void setPrevious(String previous) {
	this.previous = previous;
    }

}
