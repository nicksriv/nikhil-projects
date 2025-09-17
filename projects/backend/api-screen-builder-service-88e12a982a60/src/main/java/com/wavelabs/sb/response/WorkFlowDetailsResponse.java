package com.wavelabs.sb.response;

import java.util.List;

import com.wavelabs.sb.enums.Status;

public class WorkFlowDetailsResponse {

    private List<WorkFlowDetails> workFlows;
    private String submoduleId;
    private String clientId;
    private String moduleId;
    private String workflowId;
    private List<RoleInfo> roles;
    private boolean hasApprovalOnTable;
    private boolean hasApprovalOnScreens;
    private String mappedBy;
    private Status status;

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

    public String getMappedBy() {
	return mappedBy;
    }

    public void setMappedBy(String mappedBy) {
	this.mappedBy = mappedBy;
    }

    public List<WorkFlowDetails> getWorkFlows() {
	return workFlows;
    }

    public void setWorkFlows(List<WorkFlowDetails> workFlows) {
	this.workFlows = workFlows;
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

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getWorkflowId() {
	return workflowId;
    }

    public void setWorkflowId(String workflowId) {
	this.workflowId = workflowId;
    }

    public List<RoleInfo> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleInfo> roles) {
	this.roles = roles;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
