package com.wavelabs.sb.services;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.repositories.ScreenBuilderRepository;
import com.wavelabs.sb.response.UserDashboardResponse;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

@Service
public class ScreenBuilderService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScreenBuilderService.class);

    @Value("${screen.builder.baseurl}")
    private String screenBuilderBaseUrl;

    private ScreenBuilderRepository getScreenBuilderRepository(String token) {
	OkHttpClient.Builder userHttpClient;
	if (StringUtils.isNotBlank(token)) {
	    userHttpClient = new OkHttpClient.Builder().addInterceptor(new Interceptor() {
		@Override
		public Response intercept(Chain chain) throws IOException {
		    Request request = chain.request().newBuilder().addHeader("authorization", token).build();
		    return chain.proceed(request);
		}
	    });
	} else {
	    userHttpClient = new OkHttpClient.Builder();
	}
	Retrofit retrofit = new Retrofit.Builder().baseUrl(screenBuilderBaseUrl)
		.addConverterFactory(GsonConverterFactory.create())
		.client(userHttpClient.connectTimeout(10, TimeUnit.SECONDS).readTimeout(30, TimeUnit.SECONDS).build())
		.build();
	return retrofit.create(ScreenBuilderRepository.class);
    }

    public UserDashboardResponse fetchUserModules(String userId, String type) {
	LOGGER.info("fetchUserModules method started..!");
	ScreenBuilderRepository screenBuilderRepository = getScreenBuilderRepository(null);

	Call<UserDashboardResponse> callSync = screenBuilderRepository.getUserModules(userId, type);

	try {
	    retrofit2.Response<UserDashboardResponse> response = callSync.execute();
	    LOGGER.info("Getting response from rest call");
	    if (response.code() == 200 && response.isSuccessful()) {
		LOGGER.info("Success reaponse from screen builder service");
		return response.body();
	    } else {
		if (response.code() == 404) {
		    throw new ResourceNotFoundException(ErrorMessages.SCREEN_BUILDER_SERVICE_NOT_FOUND);
		} else {
		    throw new BadRequestException(ErrorMessages.SOMETHING_WENT_WRONG);
		}
	    }

	} catch (Exception exception) {
	    LOGGER.info("Exception occurred while calling email service, message:: {}", exception.getMessage());
	    throw new ResourceNotFoundException(ErrorMessages.SOMETHING_WENT_WRONG);
	}
    }

}
