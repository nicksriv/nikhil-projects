package com.wavelabs.sb.documents;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clientId-moduleId-subModuleId-details")
public class ClientidModuleidSubmoduleidDetails extends BaseDocument {

    private String id;
    @DBRef
    private ClientOnboardingDetails clientId;
    @DBRef
    private Module moduleId;
    @DBRef
    private SubModules subModuleId;
    
    

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public ClientOnboardingDetails getClientId() {
	return clientId;
    }

    public void setClientId(ClientOnboardingDetails clientId) {
	this.clientId = clientId;
    }

    public Module getModuleId() {
	return moduleId;
    }

    public void setModuleId(Module moduleId) {
	this.moduleId = moduleId;
    }

    public SubModules getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(SubModules subModuleId) {
	this.subModuleId = subModuleId;
    }

}
