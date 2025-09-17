package com.wavelabs.sb.enums;

public enum Gender {
    MALE("MALE"), FEMALE("FEMALE"), OTHERS("OTHERS");

    private String gender;

    Gender(String gender) {
	this.gender = gender;
    }

    public String getGender() {
	return gender;
    }

    public void setGender(String gender) {
	this.gender = gender;
    }

}
