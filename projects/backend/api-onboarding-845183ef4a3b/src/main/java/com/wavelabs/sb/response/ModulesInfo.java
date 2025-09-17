package com.wavelabs.sb.response;

public class ModulesInfo {

    private String id;
    private String name;
    private String iconId;
    private String iconMobile;
    private long subModulesCount;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getIconId() {
	return iconId;
    }

    public void setIconId(String iconId) {
	this.iconId = iconId;
    }

    public String getIconMobile() {
	return iconMobile;
    }

    public void setIconMobile(String iconMobile) {
	this.iconMobile = iconMobile;
    }

    public long getSubModulesCount() {
	return subModulesCount;
    }

    public void setSubModulesCount(long subModulesCount) {
	this.subModulesCount = subModulesCount;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

}
