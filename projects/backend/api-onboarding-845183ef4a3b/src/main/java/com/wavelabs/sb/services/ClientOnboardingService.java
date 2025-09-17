package com.wavelabs.sb.services;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.documents.ProfileImage;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ClientOnboardingMapper;
import com.wavelabs.sb.mappers.RoleMapper;
import com.wavelabs.sb.model.ColumnOrder;
import com.wavelabs.sb.model.CreateClientModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdatePrivilegesModel;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.FilesRepository;
import com.wavelabs.sb.repositories.ModulesRepository;
import com.wavelabs.sb.repositories.ProfileImageRepository;
import com.wavelabs.sb.repositories.QualityAssuranceRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.ClientModuleRequest;
import com.wavelabs.sb.request.ClientOnboardingRequest;
import com.wavelabs.sb.request.ClientOnboardingUpdateRequest;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.EditWorkflowAndThemeRequest;
import com.wavelabs.sb.request.FetchAllRequest;
import com.wavelabs.sb.response.AssignedQualityAssuranceResponse;
import com.wavelabs.sb.response.ClientCredentialsResponse;
import com.wavelabs.sb.response.ClientOnboardingDetailsResponse;
import com.wavelabs.sb.response.FetchAllClientResponse;
import com.wavelabs.sb.response.ModuleIdResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.ApiUtil;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class ClientOnboardingService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ClientOnboardingService.class);

    @Autowired
    QualityAssuranceRepository qualityAssuranceRepository;

    @Autowired
    ClientOnboardingRepository clientOnBoardingRepository;

    @Autowired
    ModulesRepository moduleDataRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    ClientCredentialsRepository clientCredentialsRepository;

    @Autowired
    UserOnboardingRepository userOnBoardingRepository;

    @Autowired
    SiteOnboardingRepository siteOnboardingRepository;

    @Autowired
    ProfileImageRepository profileImageRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    EmailService emailService;

    @Autowired
    AesEncryption aesEncryption;

    @Autowired
    ThemeService themeService;

    @Autowired
    FilesRepository filesRepository;

    /**
     *
     * @param clientOnboardingRequest
     * @return
     * @throws Exception
     */
    public ClientOnboardingDetails saveClientDetails(CreateClientModel model) {
        LOGGER.info("Saving Client deatils method started");
        ClientOnboardingRequest clientOnboardingRequest = model.getClientOnboardingRequest();
        TokenPayLoadDetails tokenPayLoadDetails = model.getTokenPayLoadDetails();
        clientOnboardingRequest.setClientName(isClientNameValid(clientOnboardingRequest.getClientName()));
        getClientAvailableStatus(clientOnboardingRequest);
        findExistedMailId(clientOnboardingRequest.getAdmin().getEmail());
        ClientOnboardingDetails clientOnboardingDetails = null;
        Optional<ClientOnboardingDetails> maxClientId = null;
        String maxNumber = clientOnBoardingRepository.max();
        if (maxNumber != null) {
            maxClientId = clientOnBoardingRepository.findById(maxNumber);
        }
        clientOnboardingDetails = ClientOnboardingMapper.saveClientEntity(clientOnboardingRequest, maxClientId,
                tokenPayLoadDetails);
        if (!StringUtils.isBlank(clientOnboardingRequest.getLogoId())) {
            Optional<Files> logo = filesRepository.findById(clientOnboardingRequest.getLogoId());
            if (logo.isPresent()) {
                clientOnboardingDetails.setLogo(logo.get());
            } else {
                LOGGER.error("Saving Client deatils : Entity Not Found - Client Logo Not found");
                throw new EntityNotFoundException(
                        Constants.CLIENT_LOGO_NOT_FOUND + clientOnboardingRequest.getLogoId());
            }
        }
        if (!StringUtils.isBlank(clientOnboardingRequest.getBackgroundImageId())) {
            Optional<Files> backgroundImage = filesRepository.findById(clientOnboardingRequest.getBackgroundImageId());
            if (backgroundImage.isPresent()) {
                clientOnboardingDetails.setBackgroundImage(backgroundImage.get());
            } else {
                LOGGER.error("Saving Client deatils : Entity Not Found - Client Background Image Not found");
                throw new EntityNotFoundException(
                        Constants.CLIENT_BACKGROUND_IMAGE_NOT_FOUND + clientOnboardingRequest.getBackgroundImageId());
            }
        }
        if (clientOnboardingDetails.getClientCredentials() == null) {
            ClientsCredentials clientsCredentials = ClientOnboardingMapper.getClientCredentials(clientOnboardingDetails,
                    aesEncryption.encrypt(Constants.PASSWORD));
            clientsCredentials.setCreatedAt(Instant.now());
            clientsCredentials.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
            clientsCredentials.setModifiedAt(Instant.now());
            clientsCredentials.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
            clientsCredentials.setCreatedUserType(tokenPayLoadDetails.getTypeOfUser());
            clientsCredentials.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
            clientCredentialsRepository.save(clientsCredentials);
            clientOnboardingDetails.setClientCredentials(clientsCredentials);
        }
        ClientOnboardingDetails saved = clientOnBoardingRepository.save(clientOnboardingDetails);
        roleOnboardingRepository
                .save(RoleMapper.getRoleWithAdmin(saved.getId(), Constants.ADMIN, Constants.ADMIN_ROLE));
        themeService.createDefaultThemeForClient(saved.getId(), model.getTokenPayLoadDetails());
        LOGGER.info("Saving Client deatils method ended");
        return clientOnboardingDetails;
    }

    private String isClientNameValid(String clientName) {
        String clientNameTrimmed = clientName.trim();
        if (clientNameTrimmed.length() < 2) {
            throw new BadRequestException(ErrorMessages.CLIENT_NAME_NOT_VALID);
        }
        return clientNameTrimmed;
    }

    /**
     *
     * @param clientId
     * @param clientModuleRequest
     * @return
     * @throws ResourceNotFoundException
     */
    public ClientOnboardingDetails updateClientModules(String clientId, TokenPayLoadDetails details,
            @Valid List<ClientModuleRequest> clientModuleRequest) {

        LOGGER.info("updating Client modules method started");
        Optional<ClientOnboardingDetails> clientOnboardingDetailsOptional;
        ClientOnboardingDetails clientOnboardingDetails = null;
        List<Modules> modulesList = new ArrayList<>();
        clientOnboardingDetailsOptional = getClientDetailsForModulesAndRoles(clientId);
        if (clientOnboardingDetailsOptional.isPresent()) {
            List<Modules> modules = moduleDataRepository.findAll();
            clientModuleRequest.forEach(moduleId -> {
                Optional<Modules> moduleDetails = modules.stream().filter(module -> {
                    return module.getId().equals(moduleId.getId());
                }).findFirst();
                if (moduleDetails.isPresent()) {
                    modulesList.add(moduleDetails.get());
                }
            });
            clientOnboardingDetails = ClientOnboardingMapper.updateAndSaveClientEntity(modulesList,
                    clientOnboardingDetailsOptional.get(), details);
            clientOnBoardingRepository.save(clientOnboardingDetails);
        } else {
            LOGGER.error("updating Client modules : Entity Not found Exception");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
        }
        LOGGER.info("updating Client modules method ended");
        return clientOnboardingDetails;
    }

    /**
     *
     * @param clientId
     * @param clientRolesRequest
     * @return
     * @throws ResourceNotFoundException
     */
//    public ClientOnboardingDetails updateClientRoles(String clientId,
//	    @Valid List<ClientRolesRequest> clientRolesRequest) throws ResourceNotFoundException {
//	LOGGER.info("updating Client roles method started");
//	Optional<ClientOnboardingDetails> clientOnboardingDetailsOptional = null;
//	ClientOnboardingDetails clientOnboardingDetails = null;
//	ClientsCredentials clientsCredentials = null;
//	if (clientId != null && clientRolesRequest != null) {
//	    clientOnboardingDetailsOptional = getClientDetailsForModulesAndRoles(clientId);
//	    if (clientOnboardingDetailsOptional.isPresent()) {
//		List<ClientRolesRequest> clientRolseList = new ArrayList<>();
//		List<Modules> modules = moduleDataRepository.findAll();
//		clientRolesRequest.forEach(rolesDetails -> {
//		    Optional<Modules> moduleDetails = modules.stream().filter(module -> {
//
//			return module.getId().equals(rolesDetails.getModuleId());
//		    }).findFirst();
//		    if (moduleDetails.isPresent()) {
//			ClientRolesRequest clientRolesrequest = ClientOnboardingMapper
//				.getRolesDetails(moduleDetails.get(), rolesDetails);
//			clientRolseList.add(clientRolesrequest);
//		    }
//		});
//		Optional<ClientsCredentials> clientsCredentialsDetails = clientCredentialsRepository
//			.findByClientId(clientOnboardingDetailsOptional.get().getClientId());
//		if (!clientsCredentialsDetails.isPresent()) {
//		    clientsCredentials = ClientOnboardingMapper
//			    .getClientCredentials(clientOnboardingDetailsOptional.get());
//		    clientsCredentials = clientCredentialsRepository.save(clientsCredentials);
//		    clientOnboardingDetailsOptional.get().setClientCredentials(clientsCredentials);
//		}
//		clientOnboardingDetails = ClientOnboardingMapper.updateClientRolesToEntity(clientRolseList,
//			clientOnboardingDetailsOptional.get());
//		clientOnBoardingRepository.save(clientOnboardingDetails);
//	    } else {
//		LOGGER.error("updating Client roles : Entity Not found Exception");
//		throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
//	    }
//	} else {
//	    LOGGER.error("updating Client roles : Resource Not Found Exception");
//	    throw new ResourceNotFoundException(clientId + " " + Constants.CLIENT_MODULE_DETAILS_NOT_FOUND);
//	}
//	LOGGER.info("updating Client roles method ended");
//	return clientOnboardingDetails;
//    }
    /**
     * This method is used to update the client Details
     *
     * @param clientId
     * @param clientOnboardingUpdateRequest
     * @return
     * @throws ResourceNotFoundException
     */
    public ClientOnboardingDetails clientDetailsUpdate(String clientId,
            ClientOnboardingUpdateRequest clientOnboardingUpdateRequest, TokenPayLoadDetails details)
            throws ResourceNotFoundException {
        LOGGER.info("client Details Update method started");
        ClientOnboardingDetails clientOnboardingDetails = null;

        Optional<ClientOnboardingDetails> clientOnboardingDetailsOptional = getClientDetailsForModulesAndRoles(
                clientId);
        if (clientOnboardingDetailsOptional.isPresent() && !clientOnboardingDetailsOptional.get().isDeleted()) {
            Optional<ClientOnboardingDetails> isDuplicateClinetNameFound = clientOnBoardingRepository
                    .findByClientNameIgnoreCaseAndDeletedAndIdNot(clientOnboardingUpdateRequest.getClientName(), false,
                            clientId);
            if (isDuplicateClinetNameFound.isPresent()) {
                LOGGER.error("get Client Available Status : Resource Not Found Exception");
                throw new ResourceNotFoundException(
                        clientOnboardingUpdateRequest.getClientName() + " " + Constants.CLIENT_ONBOARDED);
            }

            Optional<ClientOnboardingDetails> clientDetails = clientOnBoardingRepository
                    .findByEmailIgnoreCaseAndDeletedAndIdNot(clientOnboardingUpdateRequest.getAdmin().getEmail(), false,
                            clientId);
            if (clientDetails.isPresent()) {
                LOGGER.error("get Client Available Status : Resource Not Found Exception");
                throw new ResourceNotFoundException(
                        clientOnboardingUpdateRequest.getAdmin().getEmail() + " " + Constants.EMAIL_ALREADY_TAKEN);
            }

            clientOnboardingDetails = ClientOnboardingMapper.updateClientDetailsToEntity(clientOnboardingUpdateRequest,
                    clientOnboardingDetailsOptional.get(), details);
            if (clientOnboardingDetails.getLogo() != null
                    && StringUtils.isBlank(clientOnboardingUpdateRequest.getLogoId())) {
                clientOnboardingDetails.setLogo(null);
            }
            if (!StringUtils.isBlank(clientOnboardingUpdateRequest.getLogoId())
                    && (clientOnboardingDetails.getLogo() == null || !clientOnboardingUpdateRequest.getLogoId()
                    .equals(clientOnboardingDetails.getLogo().getId()))) {
                Optional<Files> logo = filesRepository.findById(clientOnboardingUpdateRequest.getLogoId());
                if (logo.isPresent()) {
                    clientOnboardingDetails.setLogo(logo.get());
                } else {
                    LOGGER.error("client Details Update : Entity Not Found Exception - Client Logo Not Found");
                    throw new EntityNotFoundException(
                            Constants.CLIENT_LOGO_NOT_FOUND + clientOnboardingUpdateRequest.getLogoId());
                }
            }
            if (!StringUtils.isBlank(clientOnboardingUpdateRequest.getBackgroundImageId())
                    && (clientOnboardingDetails.getBackgroundImage() == null || !clientOnboardingUpdateRequest
                    .getBackgroundImageId().equals(clientOnboardingDetails.getBackgroundImage().getId()))) {
                Optional<Files> backgroundImage = filesRepository
                        .findById(clientOnboardingUpdateRequest.getBackgroundImageId());
                if (backgroundImage.isPresent()) {
                    clientOnboardingDetails.setBackgroundImage(backgroundImage.get());
                } else {
                    LOGGER.error("Saving Client deatils : Entity Not Found - Client Background Image Not found");
                    throw new EntityNotFoundException(Constants.CLIENT_BACKGROUND_IMAGE_NOT_FOUND
                            + clientOnboardingUpdateRequest.getBackgroundImageId());
                }
            }
            clientOnBoardingRepository.save(clientOnboardingDetails);

            LOGGER.info("client Details Update method ended");
            return clientOnboardingDetails;
        } else {
            LOGGER.error("client Details Update : Client Not Found");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
        }
    }

    /**
     *
     * @param clientOnboardingRequest
     * @return
     * @throws ResourceNotFoundException
     */
    private Optional<ClientOnboardingDetails> getClientAvailableStatus(ClientOnboardingRequest clientOnboardingRequest)
            throws EntityNotFoundException, ResourceNotFoundException {
        LOGGER.info("get Client Available Status method started");
        Optional<ClientOnboardingDetails> clientDetails = clientOnBoardingRepository
                .findByClientNameIgnoreCaseAndDeleted(clientOnboardingRequest.getClientName(), false);
        if (clientDetails.isPresent()) {
            LOGGER.error("get Client Available Status : Resource Not Found Exception");
            throw new ResourceNotFoundException(
                    clientOnboardingRequest.getClientName() + " " + Constants.CLIENT_ONBOARDED);
        }
        LOGGER.info("get Client Available Status method ended");
        return clientDetails;
    }

    private List<String> findExistedMailId(String newEmail) throws EntityNotFoundException, ResourceNotFoundException {
        LOGGER.info("find Existed MailId method started");
        List<String> email = clientOnBoardingRepository.findByEmailId(newEmail);
        if (!email.isEmpty()) {
            LOGGER.error("find Existed MailId : Resource Not Found Exception");
            throw new ResourceNotFoundException(newEmail + " " + Constants.EMAIL_ALREADY_TAKEN);
        }
        LOGGER.info("find Existed MailId method return");
        return email;
    }

    public Optional<ClientOnboardingDetails> getClientDetailsForModulesAndRoles(String clientId) {
        LOGGER.info(" into getClientDetailsForModulesAndRoles client by ID");
        return clientOnBoardingRepository.findById(clientId);
    }

    public PaginationResponse<ClientOnboardingDetails> fetchAll(FetchAllRequest fetchAllRequest) {
        LOGGER.info("fetch All Clients method Started");
        List<ClientOnboardingDetails> fetchAllClients = mongoTemplate
                .find(getQuery(fetchAllRequest, fetchAllRequest.isPaginationRequired()), ClientOnboardingDetails.class);
        PaginationResponse<ClientOnboardingDetails> clientOnboardingDetails = new PaginationResponse<>();
        clientOnboardingDetails.setData(fetchAllClients);
        clientOnboardingDetails.setMessage("Records fetched successfully");
        long count = mongoTemplate.count(getQuery(fetchAllRequest, false), ClientOnboardingDetails.class);
        clientOnboardingDetails.setSize(count);
        LOGGER.info("fetch All Clients method ended");
        return clientOnboardingDetails;
    }

    private Query getQuery(FetchAllRequest fetchAllRequest, boolean pagination) {
        LOGGER.info("get Query method started");
        Query query = new Query();
        Order order = new Sort.Order(getSortOrder(fetchAllRequest.getSortOrder()),
                getColumn(fetchAllRequest.getSortBy()));
        query.with(Sort.by(order));
        if (pagination) {
            query.with(Pageable.ofSize(getValue(fetchAllRequest.getSize(), 10))
                    .withPage(getValue(fetchAllRequest.getPageNumber(), 0)));

        }
        List<Criteria> filterQuery = getFilterQuery(fetchAllRequest);
        if (!filterQuery.isEmpty()) {
            Criteria andQuery = new Criteria();
            andQuery.andOperator(filterQuery);
            query.addCriteria(andQuery);
        }
        LOGGER.info("get Query method ended");
        return query;
    }

    public ClientOnboardingDetailsResponse fetchClientById(String clientId) {
        LOGGER.info("fetch Client By Id method started");
        Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository.findById(clientId);
        if (clientById.isPresent()) {
            ClientOnboardingDetails clientOnboardingDetails = clientById.get();
            LOGGER.info("fetch Client By Id method ended");
            return ClientOnboardingMapper.clientOnboardingResponseMapper(clientOnboardingDetails);
        } else {
            LOGGER.error("fetch Client By Id : Entity Not Found Exception");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
        }
    }

    public ClientOnboardingDetailsResponse fetchClientByClientId(String clientId) {
        LOGGER.info("fetch Client By Client Id method started");
        Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository.findByClientId(clientId);
        if (clientById.isPresent()) {
            ClientOnboardingDetails clientOnboardingDetails = clientById.get();
            LOGGER.info("fetch Client By Client Id method ended");
            return ClientOnboardingMapper.clientOnboardingResponseMapper(clientOnboardingDetails);
        } else {
            LOGGER.error("fetch Client By Client Id : Entity Not Found");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
        }
    }

    public List<ModuleIdResponse> fetchModulesByClientId(String clientId) {

        LOGGER.info("fetch Modules By Client Id method started");
        Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository.findById(clientId);
        List<ModuleIdResponse> moduleIdsResponse = new ArrayList<>();
        if (clientById.isPresent()) {
            ClientOnboardingDetails clientOnboardingDetails = clientById.get();
            if (clientOnboardingDetails.getModules() != null && !clientOnboardingDetails.getModules().isEmpty()) {
                clientOnboardingDetails.getModules().forEach(module -> {
                    ModuleIdResponse moduleId = new ModuleIdResponse();
                    moduleId.setId(module.getId());
                    moduleIdsResponse.add(moduleId);
                });
            }
//	    if (!moduleIdsResponse.isEmpty()) {
            LOGGER.info("fetch Modules By Client Id method ended");
            return moduleIdsResponse;
//	    } else {
//		LOGGER.error("fetch Modules By Client Id : Entity not found exception - No Modules Found");
//		throw new EntityNotFoundException("No Modules found for given Client ID : " + clientId);
//	    }
        } else {
            LOGGER.error("fetch Modules By Client Id : Entity not found exception - Client not found");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
        }
    }

    private Integer getValue(Optional<Integer> value, Integer defaultValue) {
        LOGGER.info("in get Value Method");
        return value != null && value.isPresent() ? value.get() : defaultValue;
    }

    private Direction getSortOrder(Optional<String> sortOrder) {
        LOGGER.info("in get Sort Order Method");
        return sortOrder != null && sortOrder.isPresent() && sortOrder.get().equalsIgnoreCase("ASC") ? Direction.ASC
                : Direction.DESC;
    }

//    public List<ClientPrivilegesResponse> fetchPrivilegesByClientId(String clientId) {
//	LOGGER.info("fetch Privileges By Client Id Method started");
//	Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository.findById(clientId);
//	List<ClientPrivilegesResponse> privilegesList = new ArrayList<>();
//	if (clientById.isPresent()) {
//	    ClientOnboardingDetails clientOnboardingDetails = clientById.get();
//	    if (clientOnboardingDetails.getClientRoles() != null
//		    && !clientOnboardingDetails.getClientRoles().isEmpty()) {
//		clientOnboardingDetails.getClientRoles().forEach(clientRole -> {
//		    privilegesList.add(ClientOnboardingMapper.privilegesResponseMapping(clientRole));
//		});
//	    }
//	    if (privilegesList.size() > 0) {
//		LOGGER.info("fetch Privileges By Client Id Method ended");
//		return privilegesList;
//	    } else {
//		LOGGER.error("fetch Privileges By Client Id : Entity Not Found Exception - Privileges not found");
//		throw new EntityNotFoundException("Privileges Not Found for Client ID : " + clientId);
//	    }
//	} else {
//	    LOGGER.error("fetch Privileges By Client Id : Entity Not Found Exception - Client not found");
//	    throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + clientId);
//	}
//    }
    private String getColumn(Optional<ColumnOrder> order) {
        LOGGER.info("in get Column method");
        return order != null && order.isPresent() ? order.get().getValue() : "modifiedAt";
    }

    public SuccessResponse deleteClientByClientId(String clientId, TokenPayLoadDetails details) {
        LOGGER.info("delete Client by Client ID method started");
        Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository.findByClientId(clientId);
        if (clientById.isPresent()) {
            ClientOnboardingDetails clientOnboardingDetails = clientById.get();
            clientOnboardingDetails.setDeleted(true);
            clientOnboardingDetails.setModifiedAt(Instant.now());
            clientOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
            clientOnboardingDetails.setModifiedUserType(details.getTypeOfUser());
            clientOnBoardingRepository.save(clientOnboardingDetails);
            deleteUsersOfClient(clientId);
            SuccessResponse response = new SuccessResponse();
            response.setId(clientId);
            response.setMessage(Constants.CLIENT_DELETED_SUCCESSFULLY);
            LOGGER.info("delete Client by Client ID method ended");
            return response;
        } else {
            LOGGER.error("delete Client by Client ID : Enitity not found Exception");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + ": " + clientId);
        }
    }

    private void deleteUsersOfClient(String clientId) {
        LOGGER.info("delete Users Of client method started");
        List<Users> listOfUsers = userOnBoardingRepository.findAllByClientIdAndDeleted(clientId, false);
        listOfUsers.forEach(user -> {
            user.setDeleted(true);
            user.setModifiedBy(clientId);
            user.setModifiedAt(Instant.now());
        });
        userOnBoardingRepository.saveAll(listOfUsers);
        LOGGER.info("delete Users Of client method ended");
    }

    public SuccessResponse saveImage(MultipartFile file) {
        LOGGER.info("save Image method started");
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!extension.equalsIgnoreCase(Constants.JPG) && !extension.equalsIgnoreCase(Constants.JPEG)
                && !extension.equalsIgnoreCase(Constants.PNG)) {
            LOGGER.error("save Image method : Bad Request Exception - invalid image format");
            throw new BadRequestException(ErrorMessages.INVALID_IMAGE_FORMAT);
        }
        if (file.getSize() > 0) {

//	    ClientLogo logo = clientLogoRepository
//		    .save(new ClientLogo(ApiUtil.compressBytes(file.getBytes()), file.getOriginalFilename()));
            ProfileImage logo = uploadImage(file);
            SuccessResponse response = new SuccessResponse();
            response.setId(logo.getId());
            response.setMessage(Constants.IMAGE_UPLOADED_SUCCESSFULLY);
            LOGGER.info("save Image method ended");
            return response;
        } else {
            LOGGER.error("save Image method : Bad Request Exception - File Cannot be empty");
            throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_EMPTY);
        }
    }

    public ProfileImage uploadImage(MultipartFile file) {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!extension.equalsIgnoreCase(Constants.JPG) && !extension.equalsIgnoreCase(Constants.JPEG)
                && !extension.equalsIgnoreCase(Constants.PNG)) {
            LOGGER.error("save Image method : Bad Request Exception - invalid image format");
            throw new BadRequestException(ErrorMessages.INVALID_IMAGE_FORMAT);
        }
        if (file.getSize() > 0) {
            ProfileImage logo = null;
            try {
                logo = profileImageRepository
                        .save(new ProfileImage(ApiUtil.compressBytes(file.getBytes()), file.getOriginalFilename()));
            } catch (Exception e) {
                throw new BadRequestException(ErrorMessages.FILE_UPLOAD_FAILED);
            }
            return logo;
        } else {
            LOGGER.error("save Image method : Bad Request Exception - File Cannot be empty");
            throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_EMPTY);
        }
    }

    public Resource getClientLogo(String clientId) {

        LOGGER.info("get Client Logo method started");
        Optional<ClientOnboardingDetails> client = clientOnBoardingRepository.findById(clientId);
        if (client.isPresent() && client.get().getLogo() != null) {
            Files fileOptional = client.get().getLogo();

            try {
                File file = new File(fileOptional.getFilePath());
                if (!file.exists()) {
                    throw new ResourceNotFoundException(ErrorMessages.FILE_NOT_FOUND);
                }
                Path path = Paths.get(file.getAbsolutePath());
                return new ByteArrayResource(java.nio.file.Files.readAllBytes(path));
            } catch (Exception e) {
                throw new ResourceNotFoundException(ErrorMessages.FILE_NOT_FOUND);
            }
        } else {
            LOGGER.error("get Client Logo method : log not found exception");
            throw new EntityNotFoundException(Constants.CLIENT_LOGO_NOT_FOUND + clientId);
        }
    }

    public List<Criteria> getFilterQuery(FetchAllRequest request) {
        LOGGER.info("get Filter Query method started");
        ArrayList<Criteria> filters = new ArrayList<>();
        if (isValid(request.getClientName())) {
            filters.add(Criteria.where("clientName").regex(request.getClientName(), Constants.REGEX_CASE_INSENSITIVE));
        }
        if (isValid(request.getClientId())) {
            filters.add(Criteria.where("clientId").regex(request.getClientId(), Constants.REGEX_CASE_INSENSITIVE));
        }
        if (isValid(request.getState())) {
            filters.add(Criteria.where("state").regex(request.getState(), Constants.REGEX_CASE_INSENSITIVE));
        }
        if (isValid(request.getArea())) {
            filters.add(Criteria.where("area").regex(request.getArea(), Constants.REGEX_CASE_INSENSITIVE));
        }
        if (isValid(request.getStatus())) {
            if (request.getStatus().equalsIgnoreCase("DRAFT")) {
                filters.add(Criteria.where("status").is(Status.ACTIVE));
                filters.add(Criteria.where("clientCredentials").exists(false));
            } else {
                filters.add(Criteria.where("status").is(request.getStatus().toUpperCase()));
                filters.add(Criteria.where("clientCredentials").ne(null));
            }
        }

        if (isValid(request.getFrom()) && !isValid(request.getTo())) {
            Date from = Date.valueOf(getDate(request.getFrom()));
            Date toDate = Date.valueOf(LocalDate.now().plusDays(1));
            filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
        }
        if (!isValid(request.getFrom()) && isValid(request.getTo())) {
            Date from = Date.valueOf(LocalDate.of(2021, 01, 01));
            Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
            filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
        }
        if (isValid(request.getFrom()) && isValid(request.getTo())) {
            Date from = Date.valueOf(getDate(request.getFrom()));
            Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
            filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
        }

        if (isValid(request.getHeadOfficeName())) {
            filters.add(Criteria.where("headOfficeName").regex(request.getHeadOfficeName(),
                    Constants.REGEX_CASE_INSENSITIVE));
        }
        filters.add(Criteria.where("deleted").is(false));
        filters.add(Criteria.where("deleted").is(false));
        LOGGER.info("get Filter Query method ended");
        return filters;
    }

    public LocalDate getDate(String date) {
        LOGGER.info("get Date method started");
        DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        try {
            LOGGER.info("get Date method ended");
            return LocalDate.parse(date, outputDateFormat);
        } catch (Exception e) {
            LOGGER.error("get Date : Bad Request Exception - Date Format");
            throw new BadRequestException("Please provide date dd-mm-yyyy format");
        }
    }

    private boolean isValid(String text) {
        LOGGER.info("In - is Valid Field Mthod");
        return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
    }

    public ClientCredentialsResponse fetchCredentialsByClientId(String clientId) {
        LOGGER.info("fetch Credentials By Client Id method started");
        Optional<ClientOnboardingDetails> clientOptional = clientOnBoardingRepository.findByClientId(clientId);
        if (clientOptional.isPresent()) {
            if (clientOptional.get().getClientCredentials() != null) {
                ClientsCredentials credentials = clientOptional.get().getClientCredentials();
                ClientCredentialsResponse response = new ClientCredentialsResponse();
                BeanUtils.copyProperties(credentials, response);
                response.setPassword(aesEncryption.decrypt(credentials.getPassword()));
                response.setJoiningDate(credentials.getCreatedAt());
                LOGGER.info("fetch Credentials By Client Id method ended");
                return response;
            } else {
                LOGGER.error("fetch Credentials By Client Id : Entity Not Found Exception - credentials not found");
                throw new EntityNotFoundException(ErrorMessages.CLIENT_CREDENTIALS_NOT_FOUND);
            }

        } else {
            LOGGER.error("fetch Credentials By Client Id : Entity Not Found Exception - credentials not found");
            throw new EntityNotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
        }
    }

    public SuccessResponse changePasswordOfClient(String clientId, EditPasswordRequest request,
            TokenPayLoadDetails details) {

        LOGGER.info("change Password Of Client method Started");
        Optional<ClientOnboardingDetails> onboardingDetailsEntity = clientOnBoardingRepository.findByClientId(clientId);
        if (onboardingDetailsEntity.isPresent() && !onboardingDetailsEntity.get().isDeleted()) {
            if (onboardingDetailsEntity.get().getClientCredentials() != null) {
                ClientsCredentials credentialsToUpdate = onboardingDetailsEntity.get().getClientCredentials();
                String newPassword = aesEncryption.encrypt(request.getNewPassword());
                if (!StringUtils.isBlank(credentialsToUpdate.getPassword())
                        && !credentialsToUpdate.getPassword().equalsIgnoreCase(newPassword)) {
                    credentialsToUpdate.setModifiedAt(Instant.now());
                    credentialsToUpdate.setPassword(newPassword);
                    credentialsToUpdate.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
                    credentialsToUpdate.setModifiedUserType(details.getTypeOfUser());
                    clientCredentialsRepository.save(credentialsToUpdate);
                    if (!StringUtils.isBlank(onboardingDetailsEntity.get().getEmail())) {
                        emailService.sendMail(onboardingDetailsEntity.get().getEmail(), credentialsToUpdate, false);
                    }
                } else {
                    LOGGER.error("change Password Of Client : Bad Request Exception - Password Cannot Be Changed");
                    throw new BadRequestException(Constants.PASSWORD_CANNOT_BE_CHANGED);
                }
            } else {
                LOGGER.error("change Password Of Client : Entity Not Found Exception");
                throw new EntityNotFoundException(Constants.CREDENTIALS_NOT_FOUND + clientId);
            }
        } else {
            LOGGER.error("change Password Of Client : Bad Request Exception - Active Client not found");
            throw new BadRequestException(clientId + " " + Constants.ACTIVE_CLIENT_NOT_FOUND);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(clientId);
        response.setMessage(Constants.PASSWORD_CHANGE_SUCCESS);
        LOGGER.info("change Password Of Client method ended");
        return response;
    }

    public PaginationResponse<FetchAllClientResponse> fetchAllClientResponse(
            PaginationResponse<ClientOnboardingDetails> fetchAll) {
        LOGGER.info("fetch All Client Response method started");
        List<FetchAllClientResponse> fetchAllClientResponseList = new ArrayList<>();
        for (ClientOnboardingDetails client : fetchAll.getData()) {
            List<Users> usersByClientId = userOnBoardingRepository
                    .findByStatusAndClientIdAndDeleted(Status.ACTIVE.toString(), client.getClientId(), false);
            List<SiteOnboardingDetails> sitesbyClientIdList = siteOnboardingRepository
                    .findByClientIdInAndStatusAndDeleted(client.getClientId(), Status.ACTIVE, false);
            final boolean credentialsAvailable = clientCredentialsRepository.existsByClientId(client.getClientId());
            FetchAllClientResponse fetchAllClientResponse = ClientOnboardingMapper.toFetchResponse(client,
                    usersByClientId.size(), sitesbyClientIdList.size(), credentialsAvailable);
            fetchAllClientResponseList.add(fetchAllClientResponse);
        }
        PaginationResponse<FetchAllClientResponse> response = new PaginationResponse<>();
        response.setMessage(fetchAllClientResponseList.isEmpty() ? Constants.NO_RECORDS_FOUND
                : Constants.RECORDS_FETCHED_SUCCESSFULLY);
        response.setData(fetchAllClientResponseList);
        response.setSize(fetchAll.getSize());
        LOGGER.info("fetch All Client Response method ended");
        return response;
    }

    public void editWorkflowAndTheme(UpdatePrivilegesModel model) {
        LOGGER.info("fetch Client By Client Id method started");
        EditWorkflowAndThemeRequest request = model.getEditWorkflowAndThemeRequest();
        TokenPayLoadDetails tokenPayLoadDetails = model.getTokenPayLoadDetails();
        Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository.findByClientId(request.getClientId());
        if (clientById.isPresent()) {
            ClientOnboardingDetails clientOnboardingDetails = clientById.get();
            clientOnboardingDetails.setHasEditTheme(request.isEditTheme());
            clientOnboardingDetails.setHasEditWorkflow(request.isEditWorkFlow());
            clientOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
            clientOnboardingDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
            clientOnboardingDetails.setModifiedAt(Instant.now());
            clientOnboardingDetails = clientOnBoardingRepository.save(clientOnboardingDetails);
            /*
	     * if (clientOnboardingDetails.isHasEditTheme() == request.isEditTheme()) {
	     * throw new BadRequestException("Error while updating privilages to client :" +
	     * request.getClientId()); }
             */
        } else {
            LOGGER.error("edit Workflow And Theme by Client ID : Enitity not found Exception");
            throw new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + ": " + request.getClientId());

        }

    }

    public List<AssignedQualityAssuranceResponse> getAssignedQualityAssurance(String clientId) {
        List<AssignedQualityAssuranceResponse> qaR = new ArrayList<>();

        List<QualityAssurance> qualityAssurance = qualityAssuranceRepository.findByClientsIn(clientId);
        for (QualityAssurance qa : qualityAssurance) {
            AssignedQualityAssuranceResponse obj = new AssignedQualityAssuranceResponse();
            obj.setName(qa.getFirstName() + " " + qa.getLastName());
            obj.setMobile(qa.getMobile());
            obj.setEmail(qa.getEmail());
            obj.setQualityControllerStatus(qa.getQualityControllerStatus());
            qaR.add(obj);
        }

        return qaR;
    }

    public void updateClientStatus(String clientId, Status status) {
        ClientOnboardingDetails client = clientOnBoardingRepository.findById(clientId).orElseThrow(() -> {

            LOGGER.error("edit Workflow And Theme by Client ID : Enitity not found Exception");
            return new EntityNotFoundException(Constants.CLIENT_NOT_FOUND + ": " + clientId);
        });
        client.setStatus(status);
        clientOnBoardingRepository.save(client);
    }

}
