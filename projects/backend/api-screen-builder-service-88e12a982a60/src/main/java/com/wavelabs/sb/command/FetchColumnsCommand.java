package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.FetchColumnsRequest;
import com.wavelabs.sb.response.FetchColumnsResponse;
import com.wavelabs.sb.services.ColumnsAndFiltersService;

@Component
public class FetchColumnsCommand implements Command<FetchColumnsRequest, ResponseEntity<FetchColumnsResponse>> {
 
    @Autowired
    ColumnsAndFiltersService columnsAndFiltersService;

    public ResponseEntity<FetchColumnsResponse> execute(FetchColumnsRequest request) {
	return ResponseEntity.status(HttpStatus.OK).body(columnsAndFiltersService.fetchAllColumns(request));
    }

}
