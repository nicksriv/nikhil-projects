package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.StoreRequest;
import com.wavelabs.sb.response.StoreDetails;

public class StoreDataBuilder {

	public static StoreRequest getStoreRequest() {
		StoreRequest storeRequest = new StoreRequest();
		storeRequest.setAddress("Hyderabad, India");
		storeRequest.setManagerEmployeeId("EFB00231");
		storeRequest.setManagerName("Rakesh");
		storeRequest.setPhoneNumber("9848044223");
		storeRequest.setStoreId("STR001");
		return storeRequest;
	}

	public static StoreLocations getSaveStore_successResponse() {
		StoreLocations successResponse = new StoreLocations();
		successResponse.setId("614cb9c65c6a48475e7c3c8a");
		successResponse.setAddress("Hyderabad, India");
		successResponse.setClientId("Te0001");
		successResponse.setCreatedAt(Instant.now());
		successResponse.setDeleted(false);
		successResponse.setManagerEmployeeId("EFB00231");
		successResponse.setManagerName("Rakesh");
		successResponse.setModifiedAt(Instant.now());
		successResponse.setPhoneNumber("9848044223");
		successResponse.setStatus(Status.ACTIVE);
		successResponse.setStoreId("STR002");
		return successResponse;
	}

	public static List<StoreLocations> getStoreLocationsList() {
		List<StoreLocations> storeList = new ArrayList<>();
		storeList.add(getSaveStore_successResponse());
		storeList.add(getSaveStore_successResponse());
		return storeList;

	}

	public static List<StoreDetails> getStoreDetailsList() {
		List<StoreDetails> storeDetailsList = new ArrayList<StoreDetails>();
		StoreDetails storeDetails = new StoreDetails();
		storeDetails.setAddress("Hyd");
		storeDetails.setStoreId("STR001");
		storeDetails.setStoreManagerId("EFB00231");
		storeDetails.setStoreManagerMobile("9848044223");
		storeDetails.setStoreManagerName("Rakesh");
		storeDetailsList.add(storeDetails);
		return storeDetailsList;

	}

}
