package com.wavelabs.sb.response;

import java.util.List;

public class ClientModAndSubModResponse {

    private List<Modules> modules;
    private long size;

    public ClientModAndSubModResponse(List<Modules> modules, long size) {
        this.modules = modules;
        this.size = size;
    }

    public ClientModAndSubModResponse(long size, List<Modules> modules) {
	super();
	this.modules = modules;
	this.size = size;
    }

    public List<Modules> getModules() {
	return modules;
    }

    public void setModules(List<Modules> modules) {
	this.modules = modules;
    }

    public long getSize() {
	return size;
    }

    public void setSize(long size) {
	this.size = size;
    }

}
