/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.common.enums;

public enum Gender {
    MALE("MALE"), FEMALE("FEMALE"), OTHERS("OTHERS");

    private String genderFeild;

    Gender(String genderFeild) {
	this.genderFeild = genderFeild;
    }

    public String getgenderFeild() {
	return genderFeild;
    }
}
