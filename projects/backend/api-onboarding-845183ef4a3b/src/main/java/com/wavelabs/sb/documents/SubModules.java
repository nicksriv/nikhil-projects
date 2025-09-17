package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sub-modules")
public class SubModules extends ModifierDocument {

    @Id
    private String id;
    private String name;
    @DBRef
    private List<RoleOnboardingDetails> roles;
    private String moduleId;
    private String clientId;
    private String iconUrl;
    private boolean deleted;

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public List<RoleOnboardingDetails> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleOnboardingDetails> roles) {
	this.roles = roles;
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

    public String getIconUrl() {
	return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
	this.iconUrl = iconUrl;
    }
}
