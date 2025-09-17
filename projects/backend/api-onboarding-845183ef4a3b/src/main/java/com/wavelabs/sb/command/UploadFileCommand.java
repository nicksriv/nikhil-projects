package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.UploadFilesRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.FileService;

@Component
public class UploadFileCommand implements Command<UploadFilesRequest, SuccessResponse> {

    @Autowired
    FileService fileService;

    @Override
    public SuccessResponse execute(UploadFilesRequest request) {

	return fileService.uploadFile(request);

    }
}
