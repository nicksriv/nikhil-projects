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
    String NO_RECORD_FOUND = "No Record Found with given ID ";
    String CLIENT_CREDENTIALS_GENERATED_SUCCESSFULLY = "Access privileges have been set for the ";
    String CLIENT_MODULE_DETAILS_NOT_FOUND = "Client Module Details Not found in Request to OnBoardClient ";
    String CLIENT_ROLES_DETAILS_NOT_FOUND = "Client Roles not found in request";
    String MODULE_ID_NOT_FOUND = "Cant find any Module under given ID ";
    String CLIENT_ONBOARDED = "client has been onboarded already";
    String ACTIVE_CLIENT_NOT_FOUND = "Client is not available / Not Active to proceed further";
    String ACTIVE_VENDOR_NOT_FOUND = "Vendor is not available / Not Active to proceed further";
    String CLIENT_DETAILS_UPDATED_SUCCESSFULLY = "Client has been updated ";
    String CLIENT_DELETED_SUCCESSFULLY = "Client is deleted successfully";
    String CREDENTIALS_NOT_FOUND = "Client not yet onboarded successfully";
    String CREDENTIALS_NOT_FOUND_VENDOR = "Vendor not yet onboarded successfully ";
    String PASSWORD_CHANGE_SUCCESS = "Password changed successfully";
    String PASSWORD_CANNOT_BE_CHANGED = "Old password and New password cannot be same, Please try with a new password";
    String NO_PERSONAL_EMAIL_FOUND = "Please add a Personal Email for : ";
    String QA_CREDENTIALS_NOT_FOUND ="QA not yet onboarded successfully";

    String PASSWORD_CHANGED_SUBJECT = "Brand Pulse Account Password Changed";
    String SHARE_CREDENTIALS_SUBJECT = " Brand Pulse Account Details";

    String EMAIL_TEMPLATES_PATH = "/email-templates/";
    String CHANGE_CLIENT_PASSWORD_FILE_NAME = "change-client-password.ftlh";
    String CHANGE_USER_PASSWORD_FILE_NAME = "change-user-password.ftlh";
    String SHARE_CLIENT_CREDENTIALS_FILE_NAME = "share-client-credentials.ftlh";
    String SHARE_VENDOR_CREDENTIALS_FILE_NAME = "share-vendor-credentials.ftlh";
    String CHANGE_VENDOR_PASSWORD_FILE_NAME = "change-vendor-password.ftlh";
    String SHARE_USER_CREDENTIALS_FILE_NAME = "share-user-credentials.ftlh";
    String EMAIL_TEMPLATE_NOT_FOUND = "Sending Email Failed : Template Not Found";
    String CANNOT_SEND_EMAIL = "Sending Email Failed : Mail (SMPT / Authentication) configuration Failed";
    String FROM_EMAIL = "brandpulse.mailers@v5global.com";
    String CREDENTIALS_SHARED_SUCCESSFULLY = "Credentials sent successfully";
    String USER_ONBOARDING_CREDENTIALS = "User Onboarding credentials";

    String DATABASE_ERROR = "Database Operation Failed";
    String MODULES_UPDATED = "Modules have been updated to the ";
    String CLIENT_NOT_FOUND = "Client not found with id: ";
    String EMAIL_ALREADY_TAKEN = "Email is Already Existed";
    String DUPLICATE_CLIENT_NAME = "client Name is already Taken.";
    String BANKS_DATA_FETCHED = "Banks data fetched successfully..!";
    String BANKS_CREATED = "Banks created successfully..!";

    String USER_CREATED = "user basic details are saved..!";
    String USER_LOCATIONS_UPDATED_SUCCESSFULLY = "user locations updated successfully";
    String USER_LOCATION_MAPPING_UPLOADED_SUCCESSFULLY = "User Location mapping uploaded successfully";
    String USER_EMPLOYEE_DETAILS_SAVED = "User Employment details are saved..!";
    String USER_BANK_DETAILS_SAVED = "User bank details are saved..!";
    String USER_UPDATED = "User basic details are updated..!";
    String USER_DELETED_SUCCESSFULLY = "User is deleted successfully";
    String STATES_DATA_FETCHED = "States fetched successfully..!";
    String CITIES_DATA_FETCHED = "Cities fetched successfully..!";
    String STATES_DATA_CREATED = "States created successfully..!";
    String USER_ONBOARDED = "User already onboarded";

    String SPECIFIER = "-";
    String USERS_DATA_UPLOADED = "Users data uploaded..!";
    String CLENT_OR_ACTIVE_CLIENT_NOT_FOUND = "client is Not Available/Not Active to proceed further";

    String USER_CREDENTIALS_NOT_FOUND = "User not yet onboarded successfully";
    String ACTIVE_USER_NOT_FOUND = "User is not available / Not Active to proceed further";
    String CLIENT_LOGO_NOT_FOUND = "ClientLogo Not Found with given ID: ";
    String CLIENT_BACKGROUND_IMAGE_NOT_FOUND = "Client Background Image Not Found with given ID: ";
    String COLON = ":";
    String JPG = "jpg";
    String JPEG = "jpeg";
    String PNG = "png";
    String MP4 = "mp4";
    String IMAGE_UPLOADED_SUCCESSFULLY = "Image uploaded successfully..!";
    String FILE_UPLOADED_SUCCESSFULLY = "File uploaded successfully..!";
//    Site Management

    String SITE_ADDED = "Site added successfully";
    String SITE_UPDATED = "Site details updated successfully";
    String SITE_NOT_FOUND = "Site not found with given ID : ";
    String SITE_DELETED = "Site deleted successfully";
    String SITE_MANAGER_ROLE = "Site Manager";
    String SITE_ID_ALREADY_MAPPED = "Site Id already mapped to other Site";
    String SITE_NOT_FOUND_ACTIVE_DELETED = "Active Site Not found / Not available with site ID : ";

    // Role Management
    String ROLE_CREATED_SUCCESSFULLY = " Role Created Successfully";
    String ROLE_UPDATED_SUCCESSFULLY = " Role Updated Successfully";
    String ROLE_DELETED_SUCCESSFULLY = "Role deleted successfully";

    // User Profile - Authentication

    String PASSWORD_CHANGED_SUCCESSFULLY = "Password changed successfully";
    String PROFILE_UPDATE_SUCCESS = "Profile Information updated successfully";
    String PASSWORD = "V5Global";
    String INVALID_PASSWORD = "Invalid Password";
    String LOGIN_SUCCESSFULL = "Client Successfully Logged In";
    String LOGOUT_SUCCESSFULL = "Logged out Successfully";
    String INVALID_TOKEN = "Invalid token";

    String ADMIN = "Admin";
    String CLIENT = "Client";
    String USER = "User";
    String FREELANCER = "FREELANCER";
    String VENDOR = "VENDOR";
    String VENDOR_USER = "VENDOR_USER";
    String QUALITY_ASSURANCE = "QUALITY_ASSURANCE";
    
    String SESSION_EXPIRED = "Session Expired";

    String UNAUTHORIZED = "UnAuthorized/Token Expired";
    String USER_LOGIN_SUCCESSFULL = "User Successfully Logged In";

    String USER_ID = "userId";
    String CLIENT_ID = "clientId";
    String ADMIN_ID = "adminId";
    String TYPE_OF_USER = "typeOfUser";
    String EMPTY = "";
    String ADMIN_DETAILS_SAVED_SUCCESSFULLY = "Admin details saved successfully";
    String ADMIN_LOGIN_SUCCESSFULL = "Admin Successfully Logged In";
    String ID = "id";

    String THEME_SAVED_SUCCESS = "Theme created successfully";
    String ACTIVE_THEME_NOT_FOUND = "Theme Not Found / Not Active : Please update theme details";
    String ACCESS_FORBIDDEN = "You don't have an access to this api";
    //String DEFAULT_PRIMARY_COLOR = "#50BEB6";
    String DEFAULT_PRIMARY_COLOR = "#2C3E93";
    String DEFAULT_MENU_COLOR = "#F4EBE1";
    String DEFAULT_FONT = "SF Pro Display";
    String ADMIN_ROLE = "Admin Role";
    String ADMIN_USER_NOT_FOUND = "Admin user is not available / Not Active to proceed further";
    String RECORDS_FETCHED_SUCCESSFULLY = "Records fetched successfully";
    String NO_RECORDS_FOUND = "No records found";
    String DEFAULT_COUNTRY = "India";
    String SLASH = "/";
    String LOGOS = "logos";
    String PROFILE_IMAGES = "profiles";
    String FILE_UPLOAD_BASE_PATH = "/var/";
    // String FILE_UPLOAD_BASE_PATH = "D://v5-global/files/";
    String DOT = ".";
    String FILES = "files";

    String DOCUMENTS = "documents";

    List<String> FILE_EXTENSION = Arrays.asList(PNG, JPEG, JPG, MP4);
    List<String> DOC_FILE_EXTENSION = Arrays.asList("pdf", "xls", "xlsx", "doc", "docx", "odt");
    String SUCCESS_RESPONSE_FROM_SCREEN_BUILDER_SERVICE = "Success response from ";
    String SITES_COUNT = "Sites Count";
    String USERS_COUNT = "Users Count";
    String CLIENTS_COUNT = "Clients Count";
    String VENDORS_COUNT = "Vendor Count";
    String FREELANCER_COUNT = "Freelancer Count";
    String DISPUTE_COUNT = "Dispute Count";
    String QUALITY_ASSURANCE_COUNT ="Quality Assurance Count";

    String MONTH = "month";
    String YEAR = "year";
    String _ID = "_id";

    String LOCALHOST_IPV4 = "127.0.0.1";
    String LOCALHOST_IPV6 = "0:0:0:0:0:0:0:1";
    
    String GOOGLE_MAP_AUTHKEY = "googleMapAuthKey";
    String FIREBASE_AUTH_KEY = "firebaseAuthKey";

    List<String> WEEK_DAYS = Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY");

    //Quality Assurance 
    String QUALITY_ASSURANCE_LOGIN_SUCCESSFULL ="QualityAssurance Successfully logged In";
    String ACTIVE_QUALITY_ASSURANCE_NOT_FOUND ="Active QualityAssurance not found";
}
