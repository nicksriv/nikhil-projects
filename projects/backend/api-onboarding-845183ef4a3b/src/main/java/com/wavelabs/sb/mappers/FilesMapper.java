package com.wavelabs.sb.mappers;

import java.time.Instant;

import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.enums.Status;

public class FilesMapper {

    public static Files getSaveFiles(String fileName,String filePath, FileType fileType, String createdBy, String userType) {
	Files file = new Files();
	file.setCreatedAt(Instant.now());
	file.setCreatedBy(createdBy);
	file.setFileType(fileType);
	file.setModifiedAt(Instant.now());
	file.setModifiedBy(createdBy);
	file.setModifiedUserType(userType);
	file.setName(fileName);
	file.setFilePath(filePath);
	file.setStatus(Status.ACTIVE);
	return file;
    }
}
