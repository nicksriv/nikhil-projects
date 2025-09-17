package com.wavelabs.sb.common;

import java.util.Arrays;
import java.util.List;

public interface Constants {

    String SUCCESS = "Success";
    String FAILED = "Failed";
    String REGEX_CASE_INSENSITIVE = "i";
    String DATA_FETCHED_SUCCESSFULLY = "Data Fetched Successfully";
    String DATA_UPDATED_SUCCESSFULLY = "Data Updated Successfully";
    String DATA_CREATED_SUCCESSFULLY = "Data Created Successfully";
    String DATA_DELETED_SUCCESSFULLY = "Data Deleted Successfully";
    String NO_RECORD_FOUND = "No Record Found with given ID : ";
    String SUBMODULES_UPDATED_SUCCESSFULLY = "SubModule Updated Successfully";
    String SUBMODULE_DELETED_SUCCESSFULLY = " Sub Module deleted successfully";

    String WORK_FLOW_SAVED = "Work Flow Details Saved..!";
    String SCREEN_CREATED = "Screen created successfully.";
    String SCREEN_UPDATED = "Screen updated successfully.";
    String FEATURE_TEMPLATE_NOT_FOUND_WITH_THIS_ID = "feature template not found with this id::";
    String FEATURE_TEMPLATE_DETAILS_NOT_FOUND = "feature template details not found";
    String SUB_MODULE_SUCCESSFULLY_DELETED = "Sub module Successfully deleted...";
    String MODULE_CREATED = " Module Created Successfully";
    String MODULE_UPDATED = " Module updated successfully";
    String MODULE_DELETED = " Module deleted successfully";
    String SUB_MODULE_CREATED = " Sub Module Created Successfully";
    String FORM_DATA_SAVED = "Form data saved successfully";
    String FORM_DATA_UPDATED = "Form data saved successfully";
    String FORM_DATA_DELETED = "Form data deleted successfully";
    String EMPTY = "";
    String MODULE_ALREADY_CREATED = " Module already created for this client";
    String SUB_MODULE_ALREADY_CREATED = " SubModule already created for the module";
    String FEATURE_TEMPLATE_ALREADY_EXIST = " feature template details already created";
    String FEATURE_TEMPLATE_DELETED_SUCCESSFULLY = "Feature template deleted successfully";
    String FEATURE_TEMPLATE_CREATED_SUCCESSFULLY = "Feature template created successfully";
    String DATE_PATTERN = "dd-MM-yyyy";
    String WORKFLOW_CLONED_SUCCESSFULLY = "Workflow cloned successfully";

    String ACTIVE_CLIENT_NOT_FOUND = "Cient is not available / Not Active to proceed further";
    String ACTIVE_USER_NOT_FOUND = "User is not available / Not Active to proceed further";

    String ACCESS_FORBIDDEN = "You don't have an access to this api";
    String INVALID_TOKEN = "Invalid token";
    String UNAUTHORIZED = "UnAuthorized/Token Expired";
    String INVALID_PASSWORD = "Invalid Password";

    String USER_ID = "userId";
    String CLIENT_ID = "clientId";
    String ADMIN_ID = "adminId";
    String TYPE_OF_USER = "typeOfUser";
    String ADMIN_DETAILS_SAVED_SUCCESSFULLY = "Admin details saved successfully";
    
    String ADMIN = "Admin";
    String CLIENT = "Client";
    String USER = "User";
    String FREELANCER = "FREELANCER";
    String VENDOR = "VENDOR";
    String VENDOR_USER = "VENDOR_USER";
    String QUALITY_ASSURANCE = "QUALITY_ASSURANCE";
    
    String ADMIN_LOGIN_SUCCESSFULL = "Admin Successfully Logged In";
    String ID = "id";

    String LOGIN_SUCCESSFULL = "Client Successfully Logged In";
    String LOGOUT_SUCCESSFULL = "Logged out Successfully";
    String REPORT_HAS_BEEN_CREATED_SUCCESSFULLY = "Report has been created  Successfully";

    boolean TRUE = true;
    String REPORT_HAS_BEEN_DELETED_SUCCESSFULLY = "Report has been deleted Successfully";
    String RECORDS_FETCHED_SUCCESSFULLY = "Records fetched successfully";
    String NO_RECORDS_FOUND = "No records found";
    String CHART_HAS_BEEN_CREATED_SUCCESSFULLY = "Chart has been created Successfully";
    String CHART_HAS_BEEN_UPDATED_SUCCESSFULLY = "Chart has been updated Successfully";
    String ROLES_FETCHED_SUCCESSFULLY = "Roles fetched Successfully";
    String REPORTS = "Reports";
    String COLUMNS_INFORMATION_SAVED_SUCCESSFULLY = "Columns Information saved successfully";
    List<String> REPORT_FILTERS_ARRAY = Arrays.asList(new String[] { "SITE_ID", "DATE_RANGE" });
    String NO_EMPLOYEES_REPORTING = "There are no employees reporting to you to display the data";
    String CHARTS_PRIORITY_UPDATED = "Charts priority updated successfully";
    String INFINITY = "Infinity";
    String NA = "NA";
    String DATA_SAVED_SUCCESSFULLY = "Data has been submitted Successfully";
    String CUSTOM_COLUMNS_ADDED = "Custom Columns Updated Successfully ";
    String CUSTOM_COLUMNS_DELETED = "Custom Columns Deleted Successfully ";
    String REPORT_NOT_FOUND = "Report not found";
    String CHART_NOT_FOUND = "Chart not found";
    String SUBMODULE_NOT_FOUND = "Please Configure SubModule";
    String SELECTED_COLUMNS = "No Columns selected";
    String DATA_EMPTY = "Please fill the Custom Column data";
    String FAILED_TO_UPDATE_CUSTOM_COLUMNS = "Failed to update custom columns";
    String STRING_IS_PRESENT = "Please select only numeric values";
    String SELECT_SUB_MODULE = "Please select sub module";
    String MISSING_NAME = "Name is required";
    String MISSING_OPERATION = "Operation is required";
    String MISSING_FIRST_COLUMN = "First column is missing";
    String MISSING_FIRST_REFERENCE = "First reference is missing";
    String MISSING_FIRST_SUBMODULE = "First subModule is missing";
    String MISSING_SECOND_COLUMN = "Second column is missing";
    String MISSING_SECOND_REFERENCE = "Second reference is missing";
    String MISSING_SECOND_SUBMODULE = "Second subModule is missing";
    String FAILED_TO_GENERATE_EXCEL = "Failed to generate excel file";
}
