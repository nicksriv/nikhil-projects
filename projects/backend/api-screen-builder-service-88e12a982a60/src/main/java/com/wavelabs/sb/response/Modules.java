package com.wavelabs.sb.response;

import java.util.List;

public class Modules extends ModuleAndSubResponse {

    private List<SubModulesResponse> subModules;    

    public List<SubModulesResponse> getSubModules() {
	return subModules;
    }

    public void setSubModules(List<SubModulesResponse> subModules) {
	this.subModules = subModules;
    }
    
}
