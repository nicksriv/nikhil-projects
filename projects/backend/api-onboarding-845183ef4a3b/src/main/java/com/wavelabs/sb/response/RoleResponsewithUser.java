package com.wavelabs.sb.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class RoleResponsewithUser extends RoleResponse {

    private String users;

    public String getUsers() {
	return users;
    }

    public void setUsers(String users) {
	this.users = users;
    }

}
