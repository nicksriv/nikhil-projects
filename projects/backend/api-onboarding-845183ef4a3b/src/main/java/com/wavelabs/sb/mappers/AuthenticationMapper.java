package com.wavelabs.sb.mappers;

import java.time.Instant;

import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.enums.Status;

public class AuthenticationMapper {

    private AuthenticationMapper() {
    }


	public static AuthenticationAuditingDetails toEntity(String token, String userId,String typeOfUser,String ipAddress,String userAgent,String loginId) {
		AuthenticationAuditingDetails entity=new AuthenticationAuditingDetails();
		entity.setUserName(userId);
		entity.setStatus(Status.ACTIVE);
		entity.setLoginAt(Instant.now());
		entity.setTypeOfUser(typeOfUser);
		entity.setToken(token);
		entity.setIpAddress(ipAddress);
		entity.setLastAccessed(Instant.now());
		entity.setUserAgent(userAgent);
		entity.setLoginId(loginId);
		return entity;
	}
}
