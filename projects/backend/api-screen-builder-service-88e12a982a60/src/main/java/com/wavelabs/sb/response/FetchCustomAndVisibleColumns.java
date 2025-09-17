package com.wavelabs.sb.response;

import java.util.List;

public class FetchCustomAndVisibleColumns {
    
    List<CustomResponse> data;

    public List<CustomResponse> getCustomResponses() {
        return data;
    }

    public void setCustomResponses(List<CustomResponse> data) {
        this.data = data;
    }

    public FetchCustomAndVisibleColumns(List<CustomResponse> data) {
        this.data = data;
    }

    public FetchCustomAndVisibleColumns(){
        super();
    }

    @Override
    public String toString() {
        return "FetchCustomAndVisibleColumns [data=" + "]";
    }
    
    
}
