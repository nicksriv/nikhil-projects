package com.wavelabs.sb.mappers;

import java.time.Instant;
import java.util.List;

import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.ScreenFlows;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ModuleCloneRequest;
import com.wavelabs.sb.request.SaveWorkflowRequest;
import com.wavelabs.sb.request.ScreenFlowsRequest;
import com.wavelabs.sb.response.DynamicWorkFlowDetails;

public class ScreenWorkflowMapper {

    public static ScreenWorkFlow getScreenWorkFlow(ScreenWorkFlow screenWorkFlow, SaveWorkflowRequest request,
	    List<RoleOnboardingDetails> roles) {
	if (screenWorkFlow == null) {
	    screenWorkFlow = new ScreenWorkFlow();
	    screenWorkFlow.setCreatedAt(Instant.now());
	}
	screenWorkFlow.setClientId(request.getClientId());
	screenWorkFlow.setModifiedAt(Instant.now());
	screenWorkFlow.setModuleId(request.getModuleId());
	screenWorkFlow.setStatus(request.getStatus() == null ? Status.ACTIVE : request.getStatus());
	screenWorkFlow.setSubModuleId(request.getSubmoduleId());
	screenWorkFlow.setRoles(roles);
	screenWorkFlow.setHasApprovalOnScreens(request.isHasApprovalOnScreens());
	screenWorkFlow.setHasApprovalOnTable(request.isHasApprovalOnTable());
	screenWorkFlow.setMappedBy(request.getMappedBy());
	return screenWorkFlow;
    }

    public static ScreenFlows getScreenFlows(ScreenFlows screenFlow, ScreenFlowsRequest request,
	    SaveWorkflowRequest workflowRequest, String createdByModifiedBy) {
	if (screenFlow == null) {
	    screenFlow = new ScreenFlows();
	    screenFlow.setCreatedAt(Instant.now());
	}
	screenFlow.setCreatedBy(createdByModifiedBy);
	screenFlow.setModifiedBy(createdByModifiedBy);
	screenFlow.setClientId(workflowRequest.getClientId());
	screenFlow.setModifiedAt(Instant.now());
	screenFlow.setModuleId(workflowRequest.getModuleId());
	screenFlow.setNextScreenId(request.getNextScreenId());
	screenFlow.setPreviousScreenId(request.getPreviousSceenId());
	screenFlow.setScreenId(request.getScreenId());
	screenFlow.setScreenName(request.getScreenName());
	screenFlow.setDisplayOrder(request.getDisplayOrder());
	screenFlow.setStatus(request.getStatus());
	screenFlow.setSubModuleId(workflowRequest.getSubmoduleId());
	return screenFlow;

    }

    public static ScreenFlows getScreenFlows(ScreenFlows screenFlow, ModuleCloneRequest request, String submoduleId, String createdByModifiedBy) {
	ScreenFlows newScreenFlow = new ScreenFlows();
	newScreenFlow.setCreatedAt(Instant.now());
	newScreenFlow.setClientId(request.getClientId());
	newScreenFlow.setModifiedAt(Instant.now());
	newScreenFlow.setCreatedBy(createdByModifiedBy);
	newScreenFlow.setModifiedBy(createdByModifiedBy);
	newScreenFlow.setModuleId(request.getParentModuleId());
	newScreenFlow.setDisplayOrder(screenFlow.getDisplayOrder());
	newScreenFlow.setStatus(Status.ACTIVE);
	newScreenFlow.setSubModuleId(submoduleId);
	return newScreenFlow;

    }

    public static DynamicWorkFlowDetails getDynamicWorkFlowDetails(ScreenFlows screenFlow) {
	DynamicWorkFlowDetails details = new DynamicWorkFlowDetails();
	details.setName(screenFlow.getScreenName());
	details.setCurrent(screenFlow.getScreenId());
	details.setNext(screenFlow.getNextScreenId());
	details.setPrevious(screenFlow.getPreviousScreenId());
	return details;
    }
}
