package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.ColumnsAndFiltersResponse;
import com.wavelabs.sb.services.ColumnsAndFiltersService;

@Service
public class FetchColumnsAndFiltersCommand implements Command<FormRequest, ResponseEntity<ColumnsAndFiltersResponse>> {

    @Autowired
    ColumnsAndFiltersService  filtersService;
    
    @Override
    public ResponseEntity<ColumnsAndFiltersResponse> execute(FormRequest request) {
	
	return ResponseEntity.status(HttpStatus.OK).body(filtersService.fetechColumnsAndFilters(request));
    }

}
