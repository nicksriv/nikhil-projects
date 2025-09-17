package com.wavelabs.sb.response;

import java.util.List;

public class FetchAllModAndSubModResponse {

    private List<Modules> modules;
    private long size;

    public FetchAllModAndSubModResponse(long size, List<Modules> modules) {
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
