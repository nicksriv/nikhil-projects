package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "screen-work-flow")
public class ScreenWorkFlow extends ModifierDocument {

    @Id
    private String id;
    private String moduleId;
    private String clientId;
    @DBRef
    private List<ScreenFlows> screenFlows;
    private String subModuleId;
    @DBRef
    private List<RoleOnboardingDetails> roles;
    private boolean hasApprovalOnTable;
    private boolean hasApprovalOnScreens;
    private String mappedBy;

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

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public List<ScreenFlows> getScreenFlows() {
	return screenFlows;
    }

    public void setScreenFlows(List<ScreenFlows> screenFlows) {
	this.screenFlows = screenFlows;
    }

    public List<RoleOnboardingDetails> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleOnboardingDetails> roles) {
	this.roles = roles;
    }

}
