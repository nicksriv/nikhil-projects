package com.wavelabs.sb.response;

import java.util.ArrayList;
import java.util.List;

import com.wavelabs.sb.enums.Status;

public class LocationDetails {

    private String siteId;
    private String address;
    private Status status;
    private List<EmployeeInfo> managers;
    private String id;
    private List<String> dates = new ArrayList<>();
    private List<String> days = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getSiteId() {
	return siteId;
    }

    public void setSiteId(String siteId) {
	this.siteId = siteId;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
    }

    public List<EmployeeInfo> getManagers() {
	return managers;
    }

    public void setManagers(List<EmployeeInfo> managers) {
	this.managers = managers;
    }

    public List<String> getDays() {
        if (days == null) {
            return new ArrayList<>();
        }
        return days;
    }
    
    public void setDays(List<String> days) {
        this.days = days;
    }

    public List<String> getDates() {
        if (dates == null) {
            return new ArrayList<>();
        }
        return dates;
    }
    
    public void setDates(List<String> dates) {
        this.dates = dates;
    }
}

