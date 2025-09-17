package com.wavelabs.sb.services;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Bank;
import com.wavelabs.sb.model.ClientDetailsDataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.repositories.BankRepository;
import com.wavelabs.sb.response.BanksResponse;
import com.wavelabs.sb.response.BaseResponse;

@RunWith(MockitoJUnitRunner.class)
public class BankServiceTest {

    @InjectMocks
    private BankService bankService;

    @Mock
    private BankRepository bankRepository;

    @Test
    @DisplayName("test saveBanks")
    public void testSaveBanks() {
	BaseResponse response = bankService.saveBanks(ClientDetailsDataBuilder.getBanksRequest(),
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals(Constants.BANKS_CREATED, response.getMessage());
    }

    @Test
    @DisplayName("test fetchAllBanks success response")
    public void fetchAllBanks() {
	List<Bank> banksList = new ArrayList<>();
	banksList.add(ClientDetailsDataBuilder.getDummyBank());
	List<String> banks = new ArrayList<String>();
	banks.add("State bank of India");
	when(bankRepository.findAllByStatus(Mockito.any())).thenReturn(banksList);
	BanksResponse response = bankService.fetchAllBanks();
	assertNotNull(response);
	assertEquals(banks, response.getBanks());
	assertEquals(Constants.BANKS_DATA_FETCHED, response.getMessage());
    }

}
