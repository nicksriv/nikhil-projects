package com.wavelabs.sb.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort.Direction;

import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.enums.SiteType;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.FetchAllRequest;
import com.wavelabs.sb.request.FetchAllSitesRequest;
import com.wavelabs.sb.request.SiteOnboardingRequest;
import com.wavelabs.sb.request.SiteOnboardingUpdateRequest;
import com.wavelabs.sb.request.UploadSiteRequest;
import com.wavelabs.sb.response.SuccessResponse;

public class SiteDataBuilder {

    public static SiteOnboardingRequest getSiteOnboardingRequest() {
	SiteOnboardingRequest request = new SiteOnboardingRequest();
	request.setSiteId("test-site-id");
	request.setClientId("test-client-id");
	List<String> empIds  = new ArrayList<String>();
	empIds.add("EMP001");
	empIds.add("EMP002");
	request.setManagers(empIds);
	return request;
    }
    
    public static CreateSiteModel getCreateSiteModel() {
	CreateSiteModel model = new CreateSiteModel();
	model.setSiteOnboardingRequest(getSiteOnboardingRequest());
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	return model;
    }
    
    public static DeleteSiteModel getDeleteSiteModel() {
	DeleteSiteModel model = new DeleteSiteModel();
	model.setSiteId("test-site-id");
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	return model;
    }
    
    public static SiteOnboardingUpdateRequest getSiteOnboardingUpdateRequest() {
	SiteOnboardingUpdateRequest request = new SiteOnboardingUpdateRequest();

	List<String> empIds  = new ArrayList<String>();
	empIds.add("EMP001");
	empIds.add("EMP002");
	request.setName("test-site-name");
	request.setId("test-system-id");
	request.setClientId("test-client-id");
	request.setManagers(empIds);
	return request;
    }
    
    public static UpdateSiteModel getUpdateSiteModel() {
	UpdateSiteModel model = new UpdateSiteModel();
	model.setSiteOnboardingUpdateRequest(getSiteOnboardingUpdateRequest());
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	return model;
    }
    
    public static SuccessResponse getSuccessResponse() {
	SuccessResponse response = new SuccessResponse();
	response.setId("test-id");
	response.setMessage("test-success-message");
	return response;
    }
    
    public static SiteOnboardingDetails getSiteOnboardingDetails() {
	SiteOnboardingDetails details = new SiteOnboardingDetails();
	details.setAddress("address");
	details.setArea("Area");
	details.setCity("City");
	details.setClientId("test-client-id");
	details.setCountry("Country");
	details.setEmail("email@test");
	details.setId("test-system-id");
	details.setLatitude(109.376);
	details.setStatus(Status.ACTIVE);
	details.setType(SiteType.RETAILERS);
	details.setSiteId("test-site-id");
	List<String> empIds  = new ArrayList<String>();
	empIds.add("EMP001");
	empIds.add("EMP002");
	details.setManagers(empIds);
	return details;
    }
    
    public static UploadSiteRequest getSiteUploadRequest() {
	UploadSiteRequest request= new  UploadSiteRequest();
	request.setAddress("1 st");
	request.setArea("area");
	request.setCity("city");	
	request.setCountry("country");
	request.setEmail("email@email.com");
	request.setLatitude(30.998);
	request.setLongitude(23.889);
	String ids[]= {"EM001","EM002"};
	request.setManagers(Arrays.asList(ids));
	request.setName("name");
	request.setPhone("1234567890"); 
	request.setPin("123456");
	request.setSiteId("S123");
	request.setStatus(Status.ACTIVE);
	request.setType(SiteType.RETAILERS.toString());
	return request;
    }
    public static List<SiteOnboardingDetails> getSiteOnboardingDetailsList() {
    	List<SiteOnboardingDetails> list=new ArrayList<>();
    	SiteOnboardingDetails details = new SiteOnboardingDetails();
    	details.setAddress("address");
    	details.setArea("Area");
    	details.setCity("City");
    	details.setClientId("clientId");
    	details.setCountry("Country");
    	details.setEmail("email@test");
    	details.setId("test-system-id");
    	details.setLatitude(109.376);
    	details.setStatus(Status.ACTIVE);
    	details.setType(SiteType.RETAILERS);
    	details.setSiteId("test-site-id");
    	List<String> empIds  = new ArrayList<String>();
    	empIds.add("EMP001");
    	empIds.add("EMP002");
    	details.setManagers(empIds);
    	list.add(details);
    	return list;
        }
    
    public static List<Object> listOfGetSiteOnboardingDetails() {
    	return Arrays.asList(getSiteOnboardingDetails());
        }
    
    public static FetchAllSitesRequest getPaginationFetchAllSitesRequest() {
    	FetchAllSitesRequest emptyFetchAllSitesRequest = getEmptyFetchAllSitesRequest();
    	emptyFetchAllSitesRequest.setPageNumber(Optional.empty());
    	emptyFetchAllSitesRequest.setSize(Optional.empty());
    	return emptyFetchAllSitesRequest;
        }
    public static FetchAllSitesRequest getEmptyFetchAllSitesRequest() {
    	return new FetchAllSitesRequest();
        }
    
    public static FetchAllSitesRequest getPaginationFetchAllSitesRequestDetails() {
    	FetchAllSitesRequest fetchAllSitesRequest = new FetchAllSitesRequest();
    	fetchAllSitesRequest.setPageNumber(Optional.empty());
    	fetchAllSitesRequest.setSize(Optional.empty());
    	fetchAllSitesRequest.setCity("city");
    	fetchAllSitesRequest.setClientId("client id");
    	fetchAllSitesRequest.setName("name");
    	fetchAllSitesRequest.setSiteId("site-id");
    	fetchAllSitesRequest.setFrom("12-12-2021");
    	fetchAllSitesRequest.setTo("12-12-2022");
    	fetchAllSitesRequest.setStatus("ACTIVE");
    	fetchAllSitesRequest.setState("state");
    	fetchAllSitesRequest.setType("type");
    	fetchAllSitesRequest.setPaginationRequired(true);
    	fetchAllSitesRequest.setSortOrder(Optional.of("asc"));
    	fetchAllSitesRequest.setSortBy(Optional.of(SitesColumnOrder.SITE_ID) );
    	return fetchAllSitesRequest;
        }
    
    public static FetchAllSitesRequest getPaginationFetchAllSitesRequestWithPageinationFalse() {
    	FetchAllSitesRequest fetchAllSitesRequest = new FetchAllSitesRequest();
    	fetchAllSitesRequest.setPaginationRequired(false);
    	return fetchAllSitesRequest;
        }
    
    public static FetchAllSitesRequest getPaginationFetchAllSitesRequestInvalidDate() {
    	FetchAllSitesRequest fetchAllSitesRequest = new FetchAllSitesRequest();
    	fetchAllSitesRequest.setFrom("2021-12-12");
    	fetchAllSitesRequest.setTo("2022-12-12");
    	return fetchAllSitesRequest;
        }

    public static SiteOnboardingUpdateRequest getSiteOnboardingUpdateRequestEmptyClientId() {
    	SiteOnboardingUpdateRequest request = new SiteOnboardingUpdateRequest();

    	List<String> empIds  = new ArrayList<String>();
    	empIds.add("EMP001");
    	empIds.add("EMP002");
    	request.setName("test-site-name");
    	request.setId("test-system-id");
    	request.setClientId("");
    	request.setManagers(empIds);
    	return request;
        }
        
        public static UpdateSiteModel getUpdateSiteModelEmptyClientId() {
    	UpdateSiteModel model = new UpdateSiteModel();
    	model.setSiteOnboardingUpdateRequest(getSiteOnboardingUpdateRequestEmptyClientId());
    	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
    	return model;
        }
}
