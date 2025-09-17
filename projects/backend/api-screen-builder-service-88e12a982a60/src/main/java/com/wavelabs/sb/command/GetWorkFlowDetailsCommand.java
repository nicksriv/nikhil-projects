package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.response.WorkFlowDetailsResponse;
import com.wavelabs.sb.services.WorkflowService;

@Service
public class GetWorkFlowDetailsCommand implements Command<String, ResponseEntity<WorkFlowDetailsResponse>> {

	@Autowired
	WorkflowService workflowService;

	@Override
	public ResponseEntity<WorkFlowDetailsResponse> execute(String request) {
		return ResponseEntity.status(HttpStatus.OK).body(workflowService.fetchWorkFlowDetails(request));
	}
}
