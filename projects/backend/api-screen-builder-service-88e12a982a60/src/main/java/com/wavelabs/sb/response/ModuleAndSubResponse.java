package com.wavelabs.sb.response;

import java.util.List;

public class ModuleAndSubResponse {

    private String name;
    private String id;
    private String icon;
    private String status;
    private List<RoleInfo> roles;
    private String workFlowId;
    private int rolesCount;
    private String iconMobile;
    private String moduleColor;

    public String getWorkFlowId() {
	return workFlowId;
    }

    public void setWorkFlowId(String workFlowId) {
	this.workFlowId = workFlowId;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getIcon() {
	return icon;
    }

    public void setIcon(String icon) {
	this.icon = icon;
    }

    public List<RoleInfo> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleInfo> roles) {
	this.roles = roles;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public int getRolesCount() {
	return rolesCount;
    }

    public void setRolesCount(int rolesCount) {
	this.rolesCount = rolesCount;
    }

    public String getIconMobile() {
	return iconMobile;
    }

    public void setIconMobile(String iconMobile) {
	this.iconMobile = iconMobile;
    }

    public String getModuleColor() {
	return moduleColor;
    }

    public void setModuleColor(String moduleColor) {
	this.moduleColor = moduleColor;
    }

}
