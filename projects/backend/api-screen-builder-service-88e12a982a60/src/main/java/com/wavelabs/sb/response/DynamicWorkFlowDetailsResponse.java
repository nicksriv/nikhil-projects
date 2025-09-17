package com.wavelabs.sb.response;

import java.util.List;

public class DynamicWorkFlowDetailsResponse {

    private List<DynamicWorkFlowDetails> workFlows;
    private String firstScreenName;
    private String mappedBy;
    private boolean hasApprovalOnTable;
    private boolean hasApprovalOnScreens;
    private String status;
    private String workflowId;

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

    public List<DynamicWorkFlowDetails> getWorkFlows() {
	return workFlows;
    }

    public void setWorkFlows(List<DynamicWorkFlowDetails> workFlows) {
	this.workFlows = workFlows;
    }

    public String getFirstScreenName() {
	return firstScreenName;
    }

    public void setFirstScreenName(String firstScreenName) {
	this.firstScreenName = firstScreenName;
    }

    public String getMappedBy() {
	return mappedBy;
    }

    public void setMappedBy(String mappedBy) {
	this.mappedBy = mappedBy;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getWorkflowId() {
	return workflowId;
    }

    public void setWorkflowId(String workflowId) {
	this.workflowId = workflowId;
    }

}
