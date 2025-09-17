package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.SaveWorkflowModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.WorkflowService;

@Service
public class SaveWorkflowCommand implements Command<SaveWorkflowModel, SuccessResponse> {
    
    @Autowired
    WorkflowService workflowService;

    @Override
    public SuccessResponse execute(SaveWorkflowModel model) {
	
	return workflowService.saveWorkflow(model);
    }

}
