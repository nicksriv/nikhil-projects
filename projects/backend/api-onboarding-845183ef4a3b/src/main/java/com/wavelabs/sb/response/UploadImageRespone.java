package com.wavelabs.sb.response;

import org.springframework.core.io.Resource;

public class UploadImageRespone extends SuccessResponse {

    private Resource profileImage;

    public Resource getProfileImage() {
	return profileImage;
    }

    public void setProfileImage(Resource profileImage) {
	this.profileImage = profileImage;
    }

}
