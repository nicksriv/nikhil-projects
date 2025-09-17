package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Bank;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.BankRepository;
import com.wavelabs.sb.response.BanksResponse;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class BankService {

    @Autowired
    BankRepository bankRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(BankService.class);

    /**
     * This method used to save banks
     * 
     * @param bankNames
     * @return BaseResponse
     */
    public BaseResponse saveBanks(List<String> bankNames, TokenPayLoadDetails details) {
	LOGGER.info("Save banks method started");
	List<Bank> banks = new ArrayList<>();
	bankNames.forEach(bankName -> {
	    if (StringUtils.isNotBlank(bankName)) {
		Bank bank = new Bank();
		bank.setCreatedAt(Instant.now());
		bank.setModifiedAt(Instant.now());
		bank.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		bank.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		bank.setCreatedUserType(details.getTypeOfUser());
		bank.setModifiedUserType(details.getTypeOfUser());
		bank.setName(bankName);
		bank.setStatus(Status.ACTIVE);
		banks.add(bank);
	    }

	});

	LOGGER.info("Saving banks list into database");
	bankRepository.saveAll(banks);
	BanksResponse banksResponse = new BanksResponse();
	banksResponse.setMessage(Constants.BANKS_CREATED);
	LOGGER.info("Save banks method ended");
	return banksResponse;
    }

    /**
     * This method used to fetch all banks
     * @return BanksResponse
     */
    public BanksResponse fetchAllBanks() {

	LOGGER.info("Fetch all banks method started");
	List<Bank> banks = bankRepository.findAllByStatus(Status.ACTIVE.toString());
	List<String> banksList = banks.stream().filter(Objects::nonNull).map(Bank::getName)
		.collect(Collectors.toList());
	BanksResponse banksResponse = new BanksResponse();
	banksResponse.setMessage(Constants.BANKS_DATA_FETCHED);
	banksResponse.setBanks(banksList.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList()));

	LOGGER.info("Fetch all banks method ended");
	return banksResponse;

    }
}
