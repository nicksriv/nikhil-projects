package com.wavelabs.sb.documents;

import java.util.List;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "report-configurations")
public class ReportConfigurations extends ModifierDocument {

    @Id
    private String id;
    private String clientId;
    private String name;
    @DBRef
    private List<RoleOnboardingDetails> roles;
    private List<String> filters;
    private List<CustomColumns> customColumns;
    @DBRef
    private Module module;
    @DBRef
    private List<SubModules> subModules;
    private String icon; 
    private List<SelectedColumns> selectedColumns;

    public List<SelectedColumns> getSelectedColumns() {
        return selectedColumns;
    }

    public void setSelectedColumns(List<SelectedColumns> selectedColumns) {
        this.selectedColumns = selectedColumns;
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

    public List<String> getFilters() {
	return filters;
    }

    public void setFilters(List<String> filters) {
	this.filters = filters;
    }

    public List<CustomColumns> getCustomColumns() {
	return customColumns;
    }

    public void setCustomColumns(List<CustomColumns> customColumns) {
	this.customColumns = customColumns;
    }

    public Module getModule() {
	return module;
    }

    public void setModule(Module module) {
	this.module = module;
    }

    public List<SubModules> getSubModules() {
	return subModules;
    }

    public void setSubModules(List<SubModules> subModules) {
	this.subModules = subModules;
    }

    public String getIcon() {
	return icon;
    }

    public void setIcon(String icon) {
	this.icon = icon;
    }

    public ReportConfigurations(String id, String clientId, String name, List<RoleOnboardingDetails> roles,
            List<String> filters, List<CustomColumns> customColumns, Module module, List<SubModules> subModules,
            String icon, List<SelectedColumns> selectedColumns) {
        this.id = id;
        this.clientId = clientId;
        this.name = name;
        this.roles = roles;
        this.filters = filters;
        this.customColumns = customColumns;
        this.module = module;
        this.subModules = subModules;
        this.icon = icon;
        this.selectedColumns = selectedColumns;
    }

    public ReportConfigurations(){
        super();
    }

    @Override
    public String toString() {
        return "ReportConfigurations [id=" + id + ", clientId=" + clientId + ", name=" + name + ", roles=" + roles
                + ", filters=" + filters + ", customColumns=" + customColumns + ", module=" + module + ", subModules="
                + subModules + ", icon=" + icon + ", SelectedColumns=" + selectedColumns + "]";
    }

}
