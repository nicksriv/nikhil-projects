package com.wavelabs.sb.request;

import com.wavelabs.sb.enums.Operations;

public class CustomColumns {

    private String id;
    private String name;
    private Operations operation;
    private CustomOperation first;
    private CustomOperation second;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CustomOperation getFirst() {
        return first;
    }

    public void setFirst(CustomOperation first) {
        this.first = first;
    }

    public CustomOperation getSecond() {
        return second;
    }

    public void setSecond(CustomOperation second) {
        this.second = second;
    }

    public Operations getOperation() {
        return operation;
    }

    public void setOperation(Operations operation) {
        this.operation = operation;
    }

    public CustomColumns(String id, String name, Operations operation, CustomOperation first, CustomOperation second) {
        this.id = id;
        this.name = name;
        this.operation = operation;
        this.first = first;
        this.second = second;
    }

    public CustomColumns() {
    }

    
}
