package com.wavelabs.sb.services;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.mappers.ClientOnboardingMapper;
import com.wavelabs.sb.mappers.StoreMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.request.StoreRequest;
import com.wavelabs.sb.response.StoreDetails;

@Service
public class StoreService {

    @Autowired
    StoreRepository storeRepository;

    public StoreLocations saveStoreDetails(StoreRequest request, String clientId, TokenPayLoadDetails details) {
	return storeRepository.save(StoreMapper.toEntity(request, clientId, details));
    }

    public List<StoreDetails> fetchStoresByClientId(String clientId) {
	return ClientOnboardingMapper.getStoresResponse(getStoreLocations(clientId));
    }

    private List<StoreLocations> getStoreLocations(String clientId) {
	return storeRepository.findByClientId(clientId);
    }

    public List<StoreLocations> isStoreIdMapped(String storeId, String clientId) {
	List<StoreLocations> response = getStoreLocations(clientId);
	List<String> storeIdList = response.stream().filter(Objects::nonNull).map(StoreLocations::getStoreId)
		.collect(Collectors.toList());

	if (storeIdList.contains(storeId)) {
	    throw new BadRequestException(
		    "Store with ID " + storeId + " is already mapped to Client with ID : " + clientId);
	}
	return response;
    }

}
