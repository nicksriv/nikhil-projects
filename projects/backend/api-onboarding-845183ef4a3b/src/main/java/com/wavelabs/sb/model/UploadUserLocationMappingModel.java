package com.wavelabs.sb.model;

import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.enums.LocationMappingFileType;

public class UploadUserLocationMappingModel {

    private MultipartFile file;
    private LocationMappingFileType fileType;
    private TokenPayLoadDetails details;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public LocationMappingFileType getFileType() {
        return fileType;
    }

    public void setFileType(LocationMappingFileType fileType) {
        this.fileType = fileType;
    }

    public TokenPayLoadDetails getDetails() {
        return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
        this.details = details;
    }
}
