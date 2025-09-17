package com.wavelabs.sb.request;

import java.util.List;

import com.wavelabs.sb.documents.SelectedColumns;

public class AddCustomVisibleColumn {

    private List<SelectedColumns> selectedColumns;

    public List<SelectedColumns> getSelectedColumns() {
        return selectedColumns;
    }

    public void setSelectedColumns(List<SelectedColumns> selectedColumns) {
        this.selectedColumns = selectedColumns;
    }

    public AddCustomVisibleColumn(List<SelectedColumns> selectedColumns) {
        this.selectedColumns = selectedColumns;
    }

    public AddCustomVisibleColumn(){
        super();
    }

    @Override
    public String toString() {
        return "AddCustomVisibleColumn [selectedColumns=" + selectedColumns + "]";
    }
    
}
