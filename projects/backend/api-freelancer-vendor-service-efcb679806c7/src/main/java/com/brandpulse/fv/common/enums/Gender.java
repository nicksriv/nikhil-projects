/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.common.enums;

public enum Gender {
    MALE("MALE"), FEMALE("FEMALE"), OTHERS("OTHERS");

    private final String genderField;

    Gender(String genderField) {
        this.genderField = genderField;
    }

    public String getGenderField() {
        return genderField;
    }
}
