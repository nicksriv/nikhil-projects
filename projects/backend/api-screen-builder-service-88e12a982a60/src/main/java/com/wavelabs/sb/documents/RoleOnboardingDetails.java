package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "role-onboarding")
public class RoleOnboardingDetails extends ModifierDocument {

    @Id
    private String id;
    private String clientId;
    private String role;
    private String description;
    private List<RoleModules> module;

    public List<RoleModules> getModule() {
	return module;
    }

    public void setModule(List<RoleModules> module) {
	this.module = module;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getRole() {
	return role;
    }

    public void setRole(String role) {
	this.role = role;
    }

    public String getDescription() {
	return description;
    }

    public void setDescription(String description) {
	this.description = description;
    }

    @Override
    public boolean equals(Object role) {

	if (!(role instanceof RoleOnboardingDetails)) {
	    return false;
	}
	RoleOnboardingDetails newRrole = (RoleOnboardingDetails) role;

	return newRrole.getId().equalsIgnoreCase(this.getId());
    }
    
    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
