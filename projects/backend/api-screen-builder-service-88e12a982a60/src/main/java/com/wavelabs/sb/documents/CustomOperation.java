package com.wavelabs.sb.documents;

import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CustomOperation {

    @NotEmpty(message = "Reference cannot be blank")
    private String reference;

    @NotEmpty(message = "Column cannot be blank")
    private String column;
    
    @NotEmpty(message = "SubModule cannot be blank")
    private String subModule;

    // This is used for internal operation please don't remove this variable.
    @JsonIgnore
    private String uuid;

    public String getUuid() {
	return uuid;
    }

    public void setUuid(String uuid) {
	this.uuid = uuid;
    }

    public String getReference() {
	return reference;
    }

    public void setReference(String reference) {
	this.reference = reference;
    }

    public String getColumn() {
	return column;
    }

    public void setColumn(String column) {
	this.column = column;
    }

    public String getSubModule() {
	return subModule;
    }

    public void setSubModule(String subModule) {
	this.subModule = subModule;
    }

}
