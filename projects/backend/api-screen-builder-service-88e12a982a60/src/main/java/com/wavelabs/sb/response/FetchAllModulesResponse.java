package com.wavelabs.sb.response;

import java.util.List;

public class FetchAllModulesResponse {

    private List<ModuleResponse> modules;

    public List<ModuleResponse> getModules() {
	return modules;
    }

    public void setModules(List<ModuleResponse> modules) {
	this.modules = modules;
    }

}
