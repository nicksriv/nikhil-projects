package com.wavelabs.sb.response;

import com.wavelabs.sb.enums.Status;

public class ReportCustomColumnResponse {
    
    private String columnId;

    private String columnName;
    private String columnType;

    private String subModuleId;

    private Status status;

    private String type;
    
    public String getColumnId() {
        return columnId;
    }
    public void setColumnId(String columnId) {
        this.columnId = columnId;
    }
    public String getColumnName() {
        return columnName;
    }
    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }
    public String getColumnType() {
        return columnType;
    }
    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }
    public String getSubModuleId() {
        return subModuleId;
    }
    public void setSubModuleId(String subModuleId) {
        this.subModuleId = subModuleId;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public ReportCustomColumnResponse(String columnId, String columnName, String columnType, String subModuleId,
            Status status, String type) {
        this.columnId = columnId;
        this.columnName = columnName;
        this.columnType = columnType;
        this.subModuleId = subModuleId;
        this.status = status;
        this.type = type;
    }

     public ReportCustomColumnResponse(){
        super();
     }
    @Override
    public String toString() {
        return "ReportCustomColumnResponse [columnId=" + columnId + ", columnName=" + columnName + ", columnType="
                + columnType + ", subModuleId=" + subModuleId + ", status=" + status + ", type=" + type + "]";
    }
    
     
}
