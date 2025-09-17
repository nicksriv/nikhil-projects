package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class StatesRequest {

    @NotBlank(message = "State is mandatory")
    private String state;

    @NotBlank(message = "City is mandatory")
    private String city;

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

}
