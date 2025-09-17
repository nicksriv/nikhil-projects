package com.wavelabs.sb.documents;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.wavelabs.sb.enums.Operations;

public class CustomColumns {

    private String id;
    @NotEmpty(message = "Name cannot be blank")
    private String name;

    @NotNull(message = "Operation cannot be null")
    private Operations operation;

    @NotNull(message = "First Column Details are empty")
    private CustomOperation first;

    @NotNull(message = "Second Column Details are empty")
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
        super();
    }

    @Override
    public String toString() {
        return "CustomColumns [id=" + id + ", name=" + name + ", operation=" + operation + ", first=" + first
                + ", second=" + second + "]";
    }

}
