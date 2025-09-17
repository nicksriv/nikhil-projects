package com.wavelabs.sb.mappers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.request.CreateAdminRequest;
import com.wavelabs.sb.response.ReportingOrTeamInfo;

public class AdminMapper {

    private AdminMapper() {
    }

    public static AdminDetails getAdmin(CreateAdminRequest adminRequest, AdminDetails adminDetails) {
	BeanUtils.copyProperties(adminRequest, adminDetails);
	adminDetails.setDateofBirth(UserOnboardingMapper.getDate(adminRequest.getDob()));
	adminDetails.setGender(
		adminRequest.getGender() != null ? Gender.valueOf(adminRequest.getGender().toUpperCase()) : null);
	adminDetails.setCreatedAt(Instant.now());
	adminDetails.setModifiedAt(Instant.now());

	return adminDetails;
    }

    public static String getNumber(String orderId) {
	return String.format("%0" + orderId.length() + "d", Integer.parseInt(orderId) + 1);
    }

    public static AdminDetails setAdminId(AdminDetails adminDetails, String adminId) {
	if (adminId == null) {
	    String clientId = Constants.ADMIN.toUpperCase() + "0001";
	    adminDetails.setAdminId(clientId);
	} else {
	    String numberOnly = adminId.replaceAll("[^0-9]", "");
	    String finalNumber = AdminMapper.getNumber(numberOnly);
	    String data = Constants.ADMIN.toUpperCase() + finalNumber;
	    adminDetails.setAdminId(data);
	}
	return adminDetails;
    }

    public static AdminCredentials getAdminCredentials(String adminId, String password) {
	AdminCredentials adminCredentials = new AdminCredentials();
	adminCredentials.setAdminId(adminId);
	adminCredentials.setPassword(password);
	adminCredentials.setCreatedAt(Instant.now());
	adminCredentials.setModifiedAt(Instant.now());
	return adminCredentials;
    }

    public static List<ReportingOrTeamInfo> getTeams(List<AdminDetails> admins) {
	List<ReportingOrTeamInfo> teamInfos = new ArrayList<>();
	admins.forEach(admin -> {
	    ReportingOrTeamInfo data = new ReportingOrTeamInfo();
	    data.setName(admin.getFullName());
	    data.setEmployeId(admin.getAdminId());
	    data.setProfileid(admin.getProfileImage() != null ? admin.getProfileImage().getId() : null);
	    teamInfos.add(data);
	});
	return teamInfos;
    }
}
