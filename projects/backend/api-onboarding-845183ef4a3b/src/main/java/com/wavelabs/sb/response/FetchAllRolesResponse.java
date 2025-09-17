package com.wavelabs.sb.response;

import java.util.List;

public class FetchAllRolesResponse {

    private List<RoleResponsewithUser> roles;
    private long total;

    public List<RoleResponsewithUser> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleResponsewithUser> roles) {
	this.roles = roles;
    }

    public long getTotal() {
	return total;
    }

    public void setTotal(long total) {
	this.total = total;
    }

}
