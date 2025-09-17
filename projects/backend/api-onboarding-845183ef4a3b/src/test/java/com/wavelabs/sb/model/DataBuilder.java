package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ClientCredentialsEmailRequest;
import com.wavelabs.sb.request.EditWorkflowAndThemeRequest;
import com.wavelabs.sb.request.FetchAllRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ClientOnboardingDetailsResponse;

public class DataBuilder {

    public static FetchAllRequest getEmptyFetchAllRequest() {
	return new FetchAllRequest();
    }

    public static FetchAllRequest getPaginationFetchAllRequest() {
	FetchAllRequest emptyFetchAllRequest = getEmptyFetchAllRequest();
	emptyFetchAllRequest.setPageNumber(Optional.empty());
	emptyFetchAllRequest.setSize(Optional.empty());
	return emptyFetchAllRequest;
    }

    public static FetchAllRequest getPaginationWithSortDetails() {
	FetchAllRequest paginationFetchAllRequest = getPaginationFetchAllRequest();
	paginationFetchAllRequest.setSortBy(Optional.of(ColumnOrder.AREA));
	paginationFetchAllRequest.setSortOrder(Optional.of("DESC"));
	return paginationFetchAllRequest;
    }

    public static List<Object> getClientOnboardingDetails() {
	return Arrays.asList(getClientOnboardingDetail());
    }

    public static ClientOnboardingDetails getClientOnboardingDetail() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setId("test-id");
	clientOnboardingDetails.setClientId("test-client-id");
	clientOnboardingDetails.setFirstName("Bharath");
	clientOnboardingDetails.setClientName("Big Bazar");
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	clientOnboardingDetails.setCreatedAt(Instant.now());
	clientOnboardingDetails.setClientCredentials(getClientCredentials());
	return clientOnboardingDetails;
    }

    private static ClientsCredentials getClientCredentials() {
	ClientsCredentials credentials= new ClientsCredentials();
	credentials.setCreatedAt(Instant.now());
	credentials.setId("id");
	credentials.setModifiedAt(Instant.now());
	credentials.setClientName("ClinetName");
	credentials.setPassword("password");
	credentials.setClientId("clientId");
	return credentials;
    }

    public static ClientCredentialsEmailRequest sendClientCredentialsEmailRequest() {
	ClientCredentialsEmailRequest clientCredentialsEmailRequest = new ClientCredentialsEmailRequest();
	clientCredentialsEmailRequest.setClientId("test-client-id");
	clientCredentialsEmailRequest.setSendTo("charanrajj@wavelabs.ai");
	clientCredentialsEmailRequest.setSubject("Subject");
	clientCredentialsEmailRequest.setTemplate("Hi");
	return clientCredentialsEmailRequest;
    };

	public static SuccessResponse getSuccessResponse() {
		SuccessResponse successResponse=new SuccessResponse();
		successResponse.setMessage(Constants.LOGOUT_SUCCESSFULL);
		return successResponse;
	}
    public static ClientOnboardingDetailsResponse getClientOnboardingDetailsResponse() {
	ClientOnboardingDetailsResponse clientCredentialsEmailRequest = new ClientOnboardingDetailsResponse();
	clientCredentialsEmailRequest.setClientId("test-client-id");
	return clientCredentialsEmailRequest;
    }
    public static AdminDetails adminDetails() {
      	 AdminDetails adminDetails=new AdminDetails();
      	 adminDetails.setAdminId("Admin-id");
      	 adminDetails.setId("id");
      	 adminDetails.setStatus(Status.ACTIVE);
      	AdminCredentials adminCredentials=new AdminCredentials();
      	adminCredentials.setAdminId("admin-id");
      	adminCredentials.setId("id");
      	adminCredentials.setPassword("password");
      	 adminDetails.setAdminCredentials(adminCredentials);
      	return adminDetails;
       }
       
      
       public static ClientOnboardingDetails getClientOnboardingDetailStatusIsInActive() {
       	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
       	clientOnboardingDetails.setId("test-id");
       	clientOnboardingDetails.setClientId("test-client-id");
       	clientOnboardingDetails.setFirstName("Bharath");
       	clientOnboardingDetails.setClientName("Big Bazar");
       	clientOnboardingDetails.setStatus(Status.INACTIVE);
       	clientOnboardingDetails.setCreatedAt(Instant.now());
       	clientOnboardingDetails.setClientCredentials(getClientCredentials());
       	return clientOnboardingDetails;
           }

       public static ClientOnboardingDetails getClientOnboardingDetailCredentialsIsNull() {
       	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
       	clientOnboardingDetails.setId("test-id");
       	clientOnboardingDetails.setClientId("test-client-id");
       	clientOnboardingDetails.setFirstName("Bharath");
       	clientOnboardingDetails.setClientName("Big Bazar");
       	clientOnboardingDetails.setStatus(Status.ACTIVE);
       	clientOnboardingDetails.setCreatedAt(Instant.now());
       	clientOnboardingDetails.setClientCredentials(null);
       	return clientOnboardingDetails;
           }
       
       public static ClientOnboardingDetails getClientOnboardingDetailWithProfileImage() {
       	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
       	clientOnboardingDetails.setId("id");
       	clientOnboardingDetails.setClientId("test-client-id");
       	clientOnboardingDetails.setFirstName("Bharath");
       	clientOnboardingDetails.setClientName("Big Bazar");
       	clientOnboardingDetails.setStatus(Status.ACTIVE);
       	clientOnboardingDetails.setCreatedAt(Instant.now());
       	clientOnboardingDetails.setClientCredentials(getClientCredentials());
       	Files file=new Files();
       	file.setId("id");
       	file.setName("file image");
       	file.setFileType(FileType.PROFILE);
       	file.setFileUUID("UUID");
       	clientOnboardingDetails.setProfileImage(file);
       	return clientOnboardingDetails;
           }
       
     
       public static Files getFiles() {
       	Files file=new Files();
       	file.setId("id");
       	file.setName("file image");
       	file.setFileType(FileType.PROFILE);
       	file.setFileUUID("UUID");
   		return file;
       }

    public static UpdatePrivilegesModel editWorkflowAndThemeRequest() {
	UpdatePrivilegesModel model= new UpdatePrivilegesModel();
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	EditWorkflowAndThemeRequest request= new EditWorkflowAndThemeRequest();
	request.setClientId("clientId");
	request.setEditTheme(false);
	request.setEditWorkFlow(false);
	model.setEditWorkflowAndThemeRequest(request);
	return model;
    }
   }


