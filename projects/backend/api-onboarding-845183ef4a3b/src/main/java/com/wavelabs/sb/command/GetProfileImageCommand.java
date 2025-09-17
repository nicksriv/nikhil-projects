package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.services.FileService;
import com.wavelabs.sb.services.UserProfileService;

@Component
public class GetProfileImageCommand implements Command<TokenPayLoadDetails, ResponseEntity<Resource>> {

    @Autowired
    UserProfileService userProfileService;

    @Autowired
    FileService fileService;

    @Override
    public ResponseEntity<Resource> execute(TokenPayLoadDetails request) {
	Files file = userProfileService.getProfile(request);
	Resource resource = userProfileService.getFile(file);
	HttpHeaders header = fileService.getHttp(file.getName());
	return ResponseEntity.ok().headers(header).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
    }

}
