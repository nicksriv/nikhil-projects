package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.CloneModulesModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.WorkflowService;

@Service
public class CloneModulesCommand implements Command<CloneModulesModel, SuccessResponse> {
    
    @Autowired
    WorkflowService workflowService;

    @Override
    public SuccessResponse execute(CloneModulesModel model) {
	
	return workflowService.cloneModuleWorkflow(model);
    }

}
