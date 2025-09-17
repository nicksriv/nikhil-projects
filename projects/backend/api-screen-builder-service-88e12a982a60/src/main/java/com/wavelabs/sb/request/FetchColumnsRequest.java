package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.NotBlank;

public class FetchColumnsRequest {

    @NotBlank(message = "Module Id  is required")
    private String moduleId;
    private List<String> submoduleIds;

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public List<String> getSubmoduleIds() {
	return submoduleIds;
    }

    public void setSubmoduleIds(List<String> submoduleIds) {
	this.submoduleIds = submoduleIds;
    }

}
