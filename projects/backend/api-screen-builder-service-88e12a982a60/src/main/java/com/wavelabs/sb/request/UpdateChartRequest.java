package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class UpdateChartRequest {

    @NotBlank(message = "Name is mandatory")
    @Pattern(message = "Name should contain alpha numeric only", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String name;

    @NotBlank(message = "Type is mandatory")
    @Pattern(message = "Type should contain alpha numeric only", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String type;

    @Pattern(message = "xAxis should contain alpha numeric only", regexp = "^[ A-Za-z0-9_#-/,]*$")
    @NotBlank(message = "xAxis is mandatory")
    private String xAxis;

    @Pattern(message = "yAxis should contain alpha numeric only", regexp = "^[ A-Za-z0-9_#-/,]*$")
    @NotBlank(message = "yAxis is mandatory")
    private String yAxis;

    private List<String> filters;
    private boolean switchRowsAndcolumns;
    private boolean showOnDesktop;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getxAxis() {
        return xAxis;
    }

    public void setxAxis(String xAxis) {
        this.xAxis = xAxis;
    }

    public String getyAxis() {
        return yAxis;
    }

    public void setyAxis(String yAxis) {
        this.yAxis = yAxis;
    }

    public List<String> getFilters() {
        return filters;
    }

    public void setFilters(List<String> filters) {
        this.filters = filters;
    }

    public boolean isSwitchRowsAndcolumns() {
        return switchRowsAndcolumns;
    }

    public void setSwitchRowsAndcolumns(boolean switchRowsAndcolumns) {
        this.switchRowsAndcolumns = switchRowsAndcolumns;
    }

    public boolean isShowOnDesktop() {
        return showOnDesktop;
    }

    public void setShowOnDesktop(boolean showOnDesktop) {
        this.showOnDesktop = showOnDesktop;
    }

}
