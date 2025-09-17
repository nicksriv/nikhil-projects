package com.wavelabs.sb.repositories;

import com.wavelabs.sb.response.UserDashboardResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ScreenBuilderRepository {

    @GET("users/{id}/modules")
    public Call<UserDashboardResponse> getUserModules(@Path(value = "id") String id, @Query("type") String type);


}
