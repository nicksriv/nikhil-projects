package com.wavelabs.sb.response;

public class SubModulesResponse extends ModuleAndSubResponse {

    private String mappedBy;
    private boolean hasApprovalOnTable;
    private boolean hasApprovalOnScreens;

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

}
