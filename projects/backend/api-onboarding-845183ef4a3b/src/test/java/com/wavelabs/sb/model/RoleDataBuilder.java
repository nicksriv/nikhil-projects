package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Roles;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.RoleOnboardingRequest;
import com.wavelabs.sb.request.UpdateRoleRequest;
import com.wavelabs.sb.response.RolesResponse;
import com.wavelabs.sb.response.SuccessResponse;

public class RoleDataBuilder {

    public static Roles getSaveRole_successResponse() {
	Roles roles = new Roles();
	roles.setClientId("client-id");
	roles.setCreatedAt(Instant.now());
	roles.setDeleted(false);
	roles.setId("614d79f33f1d4026be53d232");
	roles.setModifiedAt(Instant.now());
	roles.setRole("Merchandizers");
	roles.setStatus(Status.ACTIVE);
	return roles;
    }

    public static List<Roles> getRolesList() {
	List<Roles> rolesList = new ArrayList<>();
	rolesList.add(getSaveRole_successResponse());
	rolesList.add(getSaveRole_successResponse());
	rolesList.add(getSaveRole_successResponse());
	return rolesList;
    }

    public static RolesResponse getRolesResponse() {
	RolesResponse rolesResponse = new RolesResponse();
	rolesResponse.setRoles(Arrays.asList("Merchandizers", "Auditors"));
	return rolesResponse;
    }

    public static RoleOnboardingRequest getCreateRoleRequest() {
	RoleOnboardingRequest request = new RoleOnboardingRequest();
	request.setClientId("clientId");
	request.setDescription("Description");
	request.setName("Role");
	request.setStatus(Status.ACTIVE.toString());
	return request;
    }
    
    public static CreateRoleModel getCreateRoleModel() {
	CreateRoleModel model = new CreateRoleModel();
	model.setRoleOnboardingRequest(getCreateRoleRequest());
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	return model;
    }

    public static UpdateRoleRequest getUpdateRoleRequest() {
	UpdateRoleRequest request = new UpdateRoleRequest();
	request.setDescription("Description");
	request.setName("Role");
	request.setId("roleId");
	request.setStatus(Status.ACTIVE);
	return request;
    }
    
    public static UpdateRoleModel getUpdateRoleModel() {
	UpdateRoleModel model = new UpdateRoleModel();
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	model.setUpdateRoleRequest(getUpdateRoleRequest());
	return model;
    }
    

    public static RoleOnboardingDetails getRoleOnboarding() {
	RoleOnboardingDetails details = new RoleOnboardingDetails();
	details.setClientId("clientId");
	details.setDeleted(false);
	details.setDescription("Description");
	details.setRole("Role");
	details.setId("roleId");
	return details;
    }

    public static List<RoleOnboardingDetails> getRoleOnboardingList() {
	List<RoleOnboardingDetails> rolesList = new ArrayList<>();
	RoleOnboardingDetails details = new RoleOnboardingDetails();
	details.setClientId("clientId");
	List<RoleModules> modules = new ArrayList<>();
	RoleModules module = new RoleModules();
	module.setId("moduleId");
	module.setName("ModuleName");
	module.setStatus(Status.ACTIVE);
	modules.add(module);
	details.setModule(modules);
	details.setRole("Role");
	details.setDeleted(false);
	rolesList.add(details);
	return rolesList;
    }

    public static List<Module> getModules() {
	List<Module> modules = new ArrayList<>();
	Module module = new Module();
	module.setId("moduleId");
	module.setName("ModuleName");
	module.setStatus(Status.ACTIVE);
	modules.add(module);
	return modules;
    }

    public static List<SubModules> getSubModules() {
	List<SubModules> modules = new ArrayList<>();
	SubModules module = new SubModules();
	module.setId("subModuleId");
	module.setModuleId("moduleId");
	module.setName("ModuleName");
	module.setStatus(Status.ACTIVE);
	modules.add(module);
	return modules;
    }

    public static SuccessResponse getSuccessResponse() {
	SuccessResponse response = new SuccessResponse();
	response.setId("id");
	response.setMessage("message");
	return response;
    }
     public static RoleOnboardingDetails roleOnboardingDetails() {
    	 RoleOnboardingDetails details=new RoleOnboardingDetails();
    	 details.setId("site id");
    	 details.setRole("SiteManager");	 
		return details;
    	 
     }
     public static RoleOnboardingRequest getCreateRoleRequestWithSITE_MANAGER_ROLE() {
 		RoleOnboardingRequest request = new RoleOnboardingRequest();
 		request.setClientId("clientId");
 		request.setDescription("Description");
 		request.setName("Site Manager");
 		request.setStatus(Status.ACTIVE.toString());
 		return request;
 	    }
  public static CreateRoleModel getCreateRoleModelWithSITE_MANAGER_ROLE() {
 		CreateRoleModel model = new CreateRoleModel();
 		model.setRoleOnboardingRequest(getCreateRoleRequestWithSITE_MANAGER_ROLE());
 		model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
 		return model;
 	    }

  public static UpdateRoleRequest getUpdateRoleRequestWithSITE_MANAGER_ROLE() {
		UpdateRoleRequest request = new UpdateRoleRequest();
		request.setDescription("Description");
		request.setName("Site Manager");
		request.setId("roleId");
		request.setStatus(Status.ACTIVE);
		return request;
	    }
	    
	    public static UpdateRoleModel getUpdateRoleModelWithSITE_MANAGER_ROLE() {
		UpdateRoleModel model = new UpdateRoleModel();
		model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
		model.setUpdateRoleRequest(getUpdateRoleRequestWithSITE_MANAGER_ROLE());
		return model;
	    }

	    public static UpdateRoleRequest getUpdateRoleRequestWithAdminRole() {
			UpdateRoleRequest request = new UpdateRoleRequest();
			request.setDescription("Description");
			request.setName("Admin");
			request.setId("roleId");
			request.setStatus(Status.ACTIVE);
			return request;
		    }
		    
		    public static UpdateRoleModel getUpdateRoleModelWithAdminRole() {
			UpdateRoleModel model = new UpdateRoleModel();
			model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
			model.setUpdateRoleRequest(getUpdateRoleRequestWithAdminRole());
			return model;
		    }
		    
		    public static RoleOnboardingDetails getRoleOnboardingWithSITE_MANAGER_ROLE() {
		    	RoleOnboardingDetails details = new RoleOnboardingDetails();
		    	details.setClientId("clientId");
		    	details.setDeleted(false);
		    	details.setDescription("Description");
		    	details.setRole("site manager");
		    	details.setId("roleId");
		    	return details;
		        }
		    public static RoleOnboardingDetails getRoleOnboardingWithADMIN_ROLE() {
		    	RoleOnboardingDetails details = new RoleOnboardingDetails();
		    	details.setClientId("clientId");
		    	details.setDeleted(false);
		    	details.setDescription("Description");
		    	details.setRole("admin");
		    	details.setId("roleId");
		    	return details;
		        }
}
