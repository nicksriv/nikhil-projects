package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchAllFormsModel;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.ColumnsAndFiltersResponse;
import com.wavelabs.sb.response.FormsResponse;
import com.wavelabs.sb.services.ColumnsAndFiltersService;
import com.wavelabs.sb.services.ExcelService;
import com.wavelabs.sb.services.FormDataService;

@Component
public class DownloadFormDataCommand implements Command<FetchAllFormsModel, ResponseEntity<Resource>> {

    @Autowired
    FormDataService formDataService;

    @Autowired
    ColumnsAndFiltersService columnsAndFiltersService;

    @Override
    public ResponseEntity<Resource> execute(FetchAllFormsModel request) {
	FormsResponse data = formDataService.fetchAllForms(request,false);
	FormRequest formRequest = new FormRequest();
	formRequest.setModuleId(request.getRequest().getModuleId());
	formRequest.setSubmoduleId(request.getRequest().getSubModuleId());
	formRequest.setMappedBy(request.getRequest().getMappedBy());
	ColumnsAndFiltersResponse columns = columnsAndFiltersService.fetechColumnsAndFilters(formRequest);

	String filename = "BulkUpload.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.getFormDataExcel(columns.getColumns(),data));
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

}
