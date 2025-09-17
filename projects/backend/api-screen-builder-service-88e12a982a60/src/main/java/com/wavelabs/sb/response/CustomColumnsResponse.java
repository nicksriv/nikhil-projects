package com.wavelabs.sb.response;

import java.util.List;

import com.wavelabs.sb.documents.CustomColumns;


public class CustomColumnsResponse {
    
    private List<CustomColumns> customColumns;
    

    public List<CustomColumns> getCustomColumns() {
        return customColumns;
    }

    public void setCustomColumns(List<CustomColumns> customColumns) {
        this.customColumns = customColumns;
    }

    public CustomColumnsResponse(List<CustomColumns> customColumns) {
        this.customColumns = customColumns;
    }

    @Override
    public String toString() {
        return "CustomColumnsResponse [customColumns=" + customColumns + "]";
    }
    
    
    
}
