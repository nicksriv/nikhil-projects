package com.wavelabs.sb.documents;

import java.util.ArrayList;
import java.util.List;

public class LocationMapping {

    private String userId;
    private String location;
    private List<String> days = new ArrayList<>();
    private List<String> dates = new ArrayList<>();

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
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
