package com.wavelabs.sb.request;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.wavelabs.sb.documents.CustomColumns;

public class CustomColumnsConfigurations {

    @NotNull(message = "Columns are mandatory")
    private List<CustomColumns> customColumns = new ArrayList<>();

    public List<CustomColumns> getCustomColumns() {
        return customColumns;
    }

    public void setCustomColumns(List<CustomColumns> customColumns) {
        this.customColumns = customColumns;
    }

    public CustomColumnsConfigurations(@NotNull(message = "Columns are mandatory") List<CustomColumns> customColumns) {
        this.customColumns = customColumns;
    }

    public CustomColumnsConfigurations(){
        super();
    }

    @Override
    public String toString() {
        return "CustomColumnsConfigurations [customColumns=" + customColumns + "]";
    }

    
    
}
