/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.exception;

import java.util.HashMap;

/**
 *
 * @author TS
 */
public class ErrorCodeConstant {

    private ErrorCodeConstant() {
    }

    protected static HashMap<String, String> responseData = new HashMap<>();

    public static final String J500 = "J500";
    public static final String J400 = "J400";
    public static final String J401 = "J401";
    public static final String J403 = "J403";

    // common error
    public static final String JC001 = "JC001";
    public static final String JC002 = "JC002";
    public static final String JC003 = "JC003";
    public static final String JC004 = "JC004";
    public static final String JC005 = "JC005";
    public static final String JC006 = "JC006";
    public static final String JC007 = "JC007";
    public static final String JC008 = "JC008";
    public static final String JC009 = "JC009";
    public static final String JC010 = "JC010";
    public static final String JC011 = "JC011";
    public static final String JC012 = "JC012";
    public static final String JC013 = "JC013";
    public static final String JC014 = "JC014";
    public static final String JC015 = "JC015";
    public static final String JC016 = "JC016";
    public static final String JC017 = "JC017";
    public static final String JC018 = "JC018";
    public static final String JC019 = "JC019";
    public static final String JC020 = "JC020";
    public static final String JC021 = "JC021";

    // job error
    public static final String JJ001 = "JJ001";
    public static final String JJ002 = "JJ002";
    public static final String JJ003 = "JJ003";
    public static final String JJ004 = "JJ004";
    public static final String JJ005 = "JJ005";
    public static final String JJ006 = "JJ006";
    public static final String JJ007 = "JJ007";
    public static final String JJ008 = "JJ008";
    public static final String JJ009 = "JJ009";
    public static final String JJ010 = "JJ010";
    public static final String JJ011 = "JJ011";
    public static final String JJ012 = "JJ012";
    public static final String JJ013 = "JJ013";
    public static final String JJ014 = "JJ014";
    public static final String JJ015 = "JJ015";
    public static final String JJ016 = "JJ016";
    public static final String JJ017 = "JJ017";
    public static final String JJ018 = "JJ018";
    public static final String JJ019 = "JJ019";
    public static final String JJ020 = "JJ020";
    public static final String JJ021 = "JJ021";

    // applicant error
    public static final String JA001 = "JA001";
    public static final String JA002 = "JA002";

    // candidate error
    public static final String JCC001 = "JCC001";
    public static final String JCC002 = "JCC002";
    public static final String JCC003 = "JCC003";
    public static final String JCC004 = "JCC004";

    // qa error
    public static final String JQ001 = "JQ001";

    public static final String JU001 = "JU001";

    public static void setErrors() {
        // code , message

        // generic errors
        responseData.put(J500, "Something unusual happend. Please wait we are working on it.");
        responseData.put(J400, "Please check for the all required fields.");
        responseData.put(J401, "Please login to continue");
        responseData.put(J403, "You don't have permission to perform this action");

        // common error
        responseData.put(JC001, "all fields in address required");
        responseData.put(JC002, "enter valid pincode of 6 digit");
        responseData.put(JC003, "all fields in work is required");
        responseData.put(JC004, "please enter start date less than end date");
        responseData.put(JC005, "image is required");
        responseData.put(JC006, "invalid image uploaded");
        responseData.put(JC007, "document is required");
        responseData.put(JC008, "invalid document uploaded");
        responseData.put(JC009, "failed to generate excel");
        responseData.put(JC010, "enter valid latitude and longitude");
        responseData.put(JC011, "enter valid clientId");
        responseData.put(JC012, "job is not associated with client");
        responseData.put(JC013, "invalid skills added");
        responseData.put(JC014, "invalid job candidate");
        responseData.put(JC015, "Payment amount exceeds the earned amount. Please enter a valid payment amount");
        responseData.put(JC016, "Approve remark should not be empty");
        responseData.put(JC017, "Rating should not be empty");
        responseData.put(JC018, "Description should not be empty");
        responseData.put(JC019, "Candidate note should not be empty");
        responseData.put(JC020, "Candidate rejection note is required");
        responseData.put(JC021, "Client not present");

        // jobs error
        responseData.put(JJ001, "Job title is required");
        responseData.put(JJ002, "Job short description is required");
        responseData.put(JJ003, "Job description is required");
        responseData.put(JJ004, "Highlights is required");
        responseData.put(JJ005, "Deliverables is required");
        responseData.put(JJ006, "Skills are required to attach with job");
        responseData.put(JJ007, "Experience level is required");
        responseData.put(JJ008, "Job type is required");
        responseData.put(JJ009, "Project type is required");
        responseData.put(JJ010, "GPS is required");
        responseData.put(JJ011, "Job timing details required");
        responseData.put(JJ012, "Billing details required");
        responseData.put(JJ013, "Invalid draft json");
        responseData.put(JJ021, "Cannot mark job complete as candidate status is not closed");

        // applicant error
        responseData.put(JA001, "Applicant not found");
        responseData.put(JA002, "Applicant is not at required stage");

        // candidate error
        responseData.put(JCC001, "Candidate not found");
        responseData.put(JCC002, "Amount is already marked paid");
        responseData.put(JCC003, "Candidate stage should be closed to pay amount");
        responseData.put(JCC004, "Candidate is not at required stage");

        responseData.put(JQ001, "QA not found");
        responseData.put(JU001, "User not found");
    }

    public static String getErrorMessage(String errorCode) {
        setErrors();
        return responseData.get(errorCode);
    }
}
