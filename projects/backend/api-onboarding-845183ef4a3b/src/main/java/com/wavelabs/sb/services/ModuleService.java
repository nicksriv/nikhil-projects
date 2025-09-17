package com.wavelabs.sb.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.mappers.ModuleMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.ModulesRepository;
import com.wavelabs.sb.request.ModuleRequest;
import com.wavelabs.sb.response.ModulesResponse;

@Service
public class ModuleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ModuleService.class);
    
    @Autowired
    ModulesRepository moduleRepository;

    public Modules saveModuleDetails(ModuleRequest request, TokenPayLoadDetails details) {
	LOGGER.info("save Module Details : begin");
	Modules entity = ModuleMapper.toEntity(request, details);
	LOGGER.info("saving Module Details...");
	return moduleRepository.save(entity);
    }

    public List<ModulesResponse> fetchAllModules() {
	LOGGER.info("fetch All Modules : begin");
	List<Modules> modulesList = moduleRepository.findAll();
	List<ModulesResponse> modulesReponse = new ArrayList<>();
	modulesList.forEach(module -> {
	    modulesReponse.add(ModuleMapper.buildModuleResponse(module));
	});
	LOGGER.info("fetch All Modules : end");
	return modulesReponse;
    }

    // Fetch modules by list of IDs, will be useful later
//	public PaginationResponse<ModulesResponse> fetchAllModulesByIds(List<String> ids) {
//		PaginationResponse<ModulesResponse> baseResponse = new PaginationResponse<>();
//		List<Module> modulesList = moduleRepository.findAllWithIds(ids);
//		if (!modulesList.isEmpty()) {
//			List<ModulesResponse> modulesReponse = new ArrayList<>();
//			modulesList.forEach(module -> {
//				modulesReponse.add(ModuleMapper.buildModuleResponse(module));
//			});
//			baseResponse.setData(modulesReponse);
//			baseResponse.setSize(Long.parseLong(String.valueOf(modulesList.size())));
//			baseResponse.setMessage(Constants.DATA_FETCHED_SUCCESSFULLY);
//		} else {
//			throw new EntityNotFoundException("No Records Found");
//		}
//		return baseResponse;
//	}
}
