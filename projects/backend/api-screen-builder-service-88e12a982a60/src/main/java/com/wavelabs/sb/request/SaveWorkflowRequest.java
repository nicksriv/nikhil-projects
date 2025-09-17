package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.wavelabs.sb.enums.Status;

public class SaveWorkflowRequest {

    private List<ScreenFlowsRequest> workflows;
    private String submoduleId;
    @NotBlank(message = "module id is required")
    private String moduleId;

    @NotBlank(message = "cleint id is required")
    private String clientId;
    private String id;
    private boolean hasApprovalOnTable;
    private boolean hasApprovalOnScreens;
    private String mappedBy;
    private List<String> roleIds;

    private Status status;

    public String getMappedBy() {
	return mappedBy;
    }

    public void setMappedBy(String mappedBy) {
	this.mappedBy = mappedBy;
    }

    public boolean isHasApprovalOnTable() {
	return hasApprovalOnTable;
    }

    public void setHasApprovalOnTable(boolean hasApprovalOnTable) {
	this.hasApprovalOnTable = hasApprovalOnTable;
    }

    public boolean isHasApprovalOnScreens() {
	return hasApprovalOnScreens;
    }

    public void setHasApprovalOnScreens(boolean hasApprovalOnScreens) {
	this.hasApprovalOnScreens = hasApprovalOnScreens;
    }

    public List<ScreenFlowsRequest> getWorkflows() {
	return workflows;
    }

    public void setWorkflows(List<ScreenFlowsRequest> workflows) {
	this.workflows = workflows;
    }

    public String getSubmoduleId() {
	return submoduleId;
    }

    public void setSubmoduleId(String submoduleId) {
	this.submoduleId = submoduleId;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public List<String> getRoleIds() {
	return roleIds;
    }

    public void setRoleIds(List<String> roleIds) {
	this.roleIds = roleIds;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
