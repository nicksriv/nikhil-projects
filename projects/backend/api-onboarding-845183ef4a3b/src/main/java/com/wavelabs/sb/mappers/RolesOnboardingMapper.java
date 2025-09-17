package com.wavelabs.sb.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.response.FetchAllRolesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.RoleModuleResponse;
import com.wavelabs.sb.response.RoleResponse;
import com.wavelabs.sb.response.RoleResponsewithUser;

public class RolesOnboardingMapper {

    public static FetchAllRolesResponse getFetchAllRolesResponse(PaginationResponse<RoleOnboardingDetails> response,
	    Map<String, Integer> userCountMap) {
	FetchAllRolesResponse fetchAllRolesResponse = new FetchAllRolesResponse();
	List<RoleResponsewithUser> roleResponseList = new ArrayList<>();
	response.getData().stream().forEach(role -> {
	    RoleResponsewithUser roleResponse = new RoleResponsewithUser();
	    roleResponse.setDescription(role.getDescription());
	    roleResponse.setId(role.getId());
	    roleResponse.setModules(getModuleresponse(role.getModule()));
	    roleResponse.setName(role.getRole());
	    roleResponse.setStatus(role.getStatus() != null ? role.getStatus().toString() : null);
	    roleResponse.setUsers(Integer.toString(userCountMap.get(role.getId())));
	    roleResponseList.add(roleResponse);
	});
	fetchAllRolesResponse.setRoles(roleResponseList);
	fetchAllRolesResponse.setTotal(response.getSize());
	return fetchAllRolesResponse;
    }

    private static List<RoleModuleResponse> getModuleresponse(List<RoleModules> moduleList) {
	List<RoleModuleResponse> list = new ArrayList<>();
	if (moduleList != null) {
	    moduleList.stream().forEach(module -> {
		if (!module.isDeleted()) {
		    RoleModuleResponse roleModuleResponse = new RoleModuleResponse();
		    roleModuleResponse.setId(module.getId());
		    roleModuleResponse.setName(module.getName());
		    list.add(roleModuleResponse);
		}
	    });
	}
	return list;
    }

    public static RoleResponse getRoleResponse(RoleOnboardingDetails response) {
	RoleResponse roleResponse = new RoleResponse();
	roleResponse.setDescription(response.getDescription());
	roleResponse.setId(response.getId());
	roleResponse.setModules(getModuleresponse(response.getModule()));
	roleResponse.setName(response.getRole());
	roleResponse.setStatus(response.getStatus().name());
	return roleResponse;
    }

    public static FetchAllRolesResponse getFetchAllRolesResponse(PaginationResponse<RoleOnboardingDetails> response) {
	FetchAllRolesResponse fetchAllRolesResponse = new FetchAllRolesResponse();
	List<RoleResponsewithUser> roleResponseList = new ArrayList<>();
	response.getData().stream().forEach(role -> {
	    RoleResponsewithUser roleResponse = new RoleResponsewithUser();
	    roleResponse.setId(role.getId());
	    roleResponse.setName(role.getRole());
	    roleResponseList.add(roleResponse);
	});
	fetchAllRolesResponse.setRoles(roleResponseList);
	System.out.println(roleResponseList.toString());
	fetchAllRolesResponse.setTotal(response.getSize());
	return fetchAllRolesResponse;
    }

}
