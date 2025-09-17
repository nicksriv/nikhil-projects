package com.wavelabs.sb.request;

import java.util.ArrayList;
import java.util.List;

import com.wavelabs.sb.documents.SelectedColumns;

public class AddReportRequest {

    private String parentModuleId;
    private List<String> roleIds;
    private List<String> submoduleIds;
    private List<String> filter;
    private String status;
    private List<SelectedColumns> columns =  new ArrayList<>();

    public String getParentModuleId() {
        return parentModuleId;
    }

    public void setParentModuleId(String parentModuleId) {
        this.parentModuleId = parentModuleId;
    }

    public List<String> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<String> roleIds) {
        this.roleIds = roleIds;
    }

    public List<String> getSubmoduleIds() {
        return submoduleIds;
    }

    public void setSubmoduleIds(List<String> submoduleIds) {
        this.submoduleIds = submoduleIds;
    }

    public List<String> getFilter() {
        return filter;
    }

    public void setFilter(List<String> filter) {
        this.filter = filter;
    }

    public String getStatus() {
        return status;
    }
 
    public void setStatus(String status) {
        this.status = status;
    }

    public List<SelectedColumns> getColumns() {
        return columns;
    }

    public void setColumns(List<SelectedColumns> columns) {
        this.columns = columns;
    }

    public AddReportRequest(String parentModuleId, List<String> roleIds, List<String> submoduleIds, List<String> filter,
            String status, List<SelectedColumns> columns) {
        this.parentModuleId = parentModuleId;
        this.roleIds = roleIds;
        this.submoduleIds = submoduleIds;
        this.filter = filter;
        this.status = status;
        this.columns = columns;
    }

    @Override
    public String toString() {
        return "AddReportRequest [parentModuleId=" + parentModuleId + ", roleIds=" + roleIds + ", submoduleIds="
                + submoduleIds + ", filter=" + filter + ", status=" + status + ", columns=" + columns + "]";
    }

    public AddReportRequest(){
        super();
    }
    
}
