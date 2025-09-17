/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.exception;

import java.util.HashMap;

/**
 *
 * @author TS
 */
public class ErrorCodeConstant {

    private ErrorCodeConstant() {
    }

    protected static HashMap<String, String> responseData = new HashMap<>();

    public static final String FV500 = "FV500";
    public static final String FV400 = "FV400";
    public static final String FV401 = "FV401";
    public static final String FV403 = "FV403";

    // auth error
    public static final String FV0001 = "FV0001";
    public static final String FV0002 = "FV0002";
    public static final String FV0003 = "FV0003";
    public static final String FV0004 = "FV0004";
    public static final String FV0005 = "FV0005";
    public static final String FV0006 = "FV0006";
    public static final String FV0007 = "FV0007";
    public static final String FV0008 = "FV0008";
    public static final String FV0009 = "FV0009";
    public static final String FV0010 = "FV0010";
    public static final String FV0011 = "FV0011";

    // common error
    public static final String FVC001 = "FVC001";
    public static final String FVC002 = "FVC002";
    public static final String FVC003 = "FVC003";
    public static final String FVC004 = "FVC004";
    public static final String FVC005 = "FVC005";
    public static final String FVC006 = "FVC006";
    public static final String FVC007 = "FVC007";
    public static final String FVC008 = "FVC008";
    public static final String FVC009 = "FVC009";
    public static final String FVC010 = "FVC010";

    // freelancer error
    public static final String FVF001 = "FVF001";
    public static final String FVF002 = "FVF002";

    // vendor error
    public static final String FVV001 = "FVV001";
    public static final String FVV002 = "FVV002";
    public static final String FVV003 = "FVV003";
    public static final String FVV004 = "FVV004";
    public static final String FVV005 = "FVV005";
    public static final String FVV006 = "FVV006";
    public static final String FVV007 = "FVV007";
    public static final String FVV008 = "FVV008";

    //vendor user error
    public static final String FVU001 = "FVU001";

    // job error
    public static final String FVJ001 = "FVJ001";
    public static final String FVJ002 = "FVJ002";
    public static final String FVJ003 = "FVJ003";
    public static final String FVJ004 = "FVJ004";
    public static final String FVJ005 = "FVJ005";
    public static final String FVJ006 = "FVJ006";
    public static final String FVJ007 = "FVJ007";
    public static final String FVJ008 = "FVJ008";
    public static final String FVJ009 = "FVJ009";
    public static final String FVJ010 = "FVJ010";
    public static final String FVJ011 = "FVJ011";

    // client error
    public static final String FVCC01 = "FVCC01";

    // applicant error
    // candidate error
    // dispute error
    public static final String FVD001 = "FVD01";

    // skill error
    public static final String FVS001 = "FVS001";
    public static final String FVS002 = "FVS002";

    public static void setErrors() {
        //code , message

        //generic errors
        responseData.put(FV500, "Something unusual happend. Please wait we are working on it.");
        responseData.put(FV400, "Please check for the all required fields.");
        responseData.put(FV401, "Please login to continue");
        responseData.put(FV403, "You don't have permission to perform this action");

        // auth error
        responseData.put(FV0001, "Mobile number is not register with us");
        responseData.put(FV0002, "User is not active. Please contact support team");
        responseData.put(FV0003, "You have tried multiple time please try again after 15 min");
        responseData.put(FV0004, "OTP is invalid or expired");
        responseData.put(FV0005, "This mobile is already register with another account");
        responseData.put(FV0006, "This email is already register with another account");
        responseData.put(FV0007, "Mobile OTP is invalid or expired");
        responseData.put(FV0008, "Email OTP is invalid or expired");
        responseData.put(FV0009, "Mobile is not verified");
        responseData.put(FV0010, "Email is not verified");
        responseData.put(FV0011, "skill not added ");

        // common error
        responseData.put(FVC001, "all fields in address required");
        responseData.put(FVC002, "enter valid pincode of 6 digit");
        responseData.put(FVC003, "all fields in work is required");
        responseData.put(FVC004, "please enter start date less than end date");
        responseData.put(FVC005, "image is required");
        responseData.put(FVC006, "invalid image uploaded");
        responseData.put(FVC007, "document is required");
        responseData.put(FVC008, "invalid document uploaded");

        // freelancer error
        responseData.put(FVF001, "work id is not valid");
        responseData.put(FVF002, "This work is not belongs to you");

        // vendor error
        responseData.put(FVV001, "Vendor is not valid");
        responseData.put(FVV002, "VendorUser is not valid");
        responseData.put(FVV003, "Email is already exist in user");
        responseData.put(FVV004, "User is not belongs to you");
        responseData.put(FVV005, "invalid password");
        responseData.put(FVV006, "Old password is not valid");
        responseData.put(FVV007, "Vendor is not found");
        responseData.put(FVV008, "");

        //vendor user error
        responseData.put(FVU001, "Vendor user not found");

        // job error
        responseData.put(FVJ001, "job not found");
        responseData.put(FVJ002, "you are not allowed to view this job");
        responseData.put(FVJ003, "you have already applied to this job");
        responseData.put(FVJ004, "invalid job applicant provided");
        responseData.put(FVJ005, "You are not allowed to view this job");
        responseData.put(FVJ006, "invlaid job candidate");
        responseData.put(FVJ007, "Job should be in NEW stage to start");
        responseData.put(FVJ008, "Job should be in IN PROGRESS stage to submit");
        responseData.put(FVJ009, "Job application should be in NEW stage to cancel");
        responseData.put(FVJ010, "Job already assigned");
        responseData.put(FVJ011, "Job is already completed");

        // applicant error
        // candidate error
        // dispute error
        // client error
        responseData.put(FVCC01, "clientId not found");
        responseData.put(FVD001, "invalid dispute category");
    }

    public static String getErrorMessage(String errorCode) {
        setErrors();
        return responseData.get(errorCode);
    }
}
