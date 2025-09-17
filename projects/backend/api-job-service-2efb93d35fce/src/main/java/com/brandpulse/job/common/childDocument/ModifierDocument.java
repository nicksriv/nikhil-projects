package com.brandpulse.job.common.childDocument;

public class ModifierDocument extends BaseDocument {

    private String createdBy;
    private String modifiedBy;
    private String createdUserType;
    private String modifiedUserType;

    public String getCreatedUserType() {
	return createdUserType;
    }

    public void setCreatedUserType(String createdUserType) {
	this.createdUserType = createdUserType;
    }

    public String getModifiedUserType() {
	return modifiedUserType;
    }

    public void setModifiedUserType(String modifiedUserType) {
	this.modifiedUserType = modifiedUserType;
    }

    public String getCreatedBy() {
	return createdBy;
    }

    public void setCreatedBy(String createdBy) {
	this.createdBy = createdBy;
    }

    public String getModifiedBy() {
	return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
	this.modifiedBy = modifiedBy;
    }

}
