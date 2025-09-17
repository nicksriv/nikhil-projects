package com.wavelabs.sb.common;

import java.util.Arrays;
import java.util.List;

public interface CollectionConstants {

    String _ID = "_id";
    String ID = "id";
    String TABLE_ENDING = "-Details";
    String DELETED = "deleted";
    String CREATED_BY = "createdBy";
    String MODIFIED_BY = "modifiedBy";
    String CREATED_AT = "createdAt";
    String MODIFIED_AT = "modifiedAt";
    String STATUS = "status";
    String HYPHEN = "-";
    String UNDERSCORE = "_";

    String FROM_DATE_COMPONENTID = "07AB7E2C-25DE-43F2-8C3D-80BF17024132";
    String FROM_DATE_HINT = "from";
    String FROM_DATE_TYPE = "Date_Picker";
    String TO_DATE_COMPONENTID = "08AB7E2C-25DE-43F2-8C3D-80BF17024140";
    String TO_DATE_HINT = "to";
    String TO_DATE_TYPE = "Date_Picker";
    String STATUS_COMPONENTID = "17AB7E2C-25DE-43F2-8D3D-80BF17024131";
    String STATUS_HINT = "status";
    String STATUS_TYPE = "Dropdown";
    List<String> STATUS_VALUES = Arrays.asList(new String[] { "ACTIVE", "INACTIVE" });
    String WORKFLOW_ID = "workflowId";
    String JOB_ID = "jobId";

    List<String> COLUMNS = Arrays.asList(
	    new String[] { _ID, DELETED, CREATED_BY, MODIFIED_BY, CREATED_AT, MODIFIED_AT, STATUS, WORKFLOW_ID });
    String USER_TYPE = "userType";
    String USER_ID = "userId";
    String USER_SUB_ID = "userSubId";

    String EMPLOYEE_ID = "employeeId";
    String EMP_ID = "Emp Id";
    String USER_NAME = "userName";
    String ROLE = "role";
    String ROLES = "roles";
    String CREATED_DATE = "Created Date";
    String DATE = "date";
    String REPORTS = "Reports";
    String APPROVED = "approved";
    String DROPDOWN = "Dropdown";
    String STATIC_EMPLOYEE_ID = "static_employeeId";
    String STATIC_USER_NAME = "static_userName";
    String STATIC_ROLE = "static_role";
    String PREVIOUSLY_APPROVED = "previouslyApproved";
    String NAME = "Name";
    String EMP_NAME = "Emp Name";
    String EMP_ROLE = "Emp Role";
    String EDITABLE = "editable";
    String TIME = "Time";
    String CHECK_LIST = "Check_List";

}
