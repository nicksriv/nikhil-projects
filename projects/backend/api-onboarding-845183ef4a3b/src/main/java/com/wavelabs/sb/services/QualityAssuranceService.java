package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.QualityAssuranceCredentials;
import com.wavelabs.sb.enums.QualityControllerStatus;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.QualityAssuranceCredentialsRepository;
import com.wavelabs.sb.repositories.QualityAssuranceRepository;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.QualityAssuranceRequestDto;
import com.wavelabs.sb.response.ClientDetails;
import com.wavelabs.sb.response.QualityAssuranceCredentialsResponse;
import com.wavelabs.sb.response.QualityAssuranceDetailResponse;
import com.wavelabs.sb.response.QualityAssuranceListResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.ClassUtil;
import com.wavelabs.sb.utils.SecurityUtil;
import org.springframework.data.domain.Sort;

@Service
public class QualityAssuranceService {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(QualityAssuranceService.class);

    @Autowired
    QualityAssuranceCredentialsRepository qualityAssuranceCredentialsRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    QualityAssuranceRepository qualityAssuranceRepository;

    @Autowired
    AesEncryption aesEncryption;

    @Autowired
    EmailService emailService;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    public Page<QualityAssurance> getqaList(Pageable pageable, String id, String firstName, String lastName,
            String qualityAssuranceRefNo, String email, String mobile,
            String qualityControllerStatus ,Instant from , Instant to) {

        Query query = new Query();
        if (firstName != null) {
            query.addCriteria(Criteria.where("firstName").regex(Pattern.compile(firstName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (lastName != null) {
            query.addCriteria(Criteria.where("lastName").regex(Pattern.compile(lastName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (email != null) {
            query.addCriteria(
                    Criteria.where("email").regex(Pattern.compile(email, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (mobile != null) {
            query.addCriteria(
                    Criteria.where("mobile").regex(Pattern.compile(mobile, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (qualityAssuranceRefNo != null) {
            query.addCriteria(Criteria.where("qualityAssuranceRefNo").regex(Pattern.compile(qualityAssuranceRefNo, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (qualityControllerStatus != null) {
            query.addCriteria(Criteria.where("qualityControllerStatus").is(qualityControllerStatus));
        }
        if (from != null && to == null){
            query.addCriteria(Criteria.where("createdAt").gte(from));
        }
        if (to != null && from == null){
            query.addCriteria(Criteria.where("createdAt").lt(to));
        }

        if (from != null && to != null){
            query.addCriteria(Criteria.where("").andOperator(Criteria.where("createdAt").lt(to),
                                                                Criteria.where("createdAt").gte(from)));
        }
        
        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
        
        if (pageable != null) {
            query.with(pageable);
        }
        long count = mongoTemplate.count(query, QualityAssurance.class);

        List<QualityAssurance> result = mongoTemplate.find(query, QualityAssurance.class);
        Page<QualityAssurance> qa = new PageImpl<>(result, pageable, count);

        return qa;
    }

    public void updateStatus(String qualityAssuranceId, QualityControllerStatus qualityControllerStatus) {
        QualityAssurance qa = qualityAssuranceRepository.findById(qualityAssuranceId).orElse(null);
        qa.setQualityControllerStatus(qualityControllerStatus);
        qualityAssuranceRepository.save(qa);

    }

    public boolean validate(QualityAssuranceRequestDto qualityAssuranceRequestDto) {

        if (qualityAssuranceRequestDto.getFirstName() == null) {
            throw new BadRequestException("FirstName is not present");
        }

        if (qualityAssuranceRequestDto.getMiddleName() == null) {
            throw new BadRequestException("MiddleName is not present");
        }

        if (qualityAssuranceRequestDto.getLastName() == null) {
            throw new BadRequestException("LastName is not present");
        }

        if (qualityAssuranceRequestDto.getEmail() == null) {
            throw new BadRequestException("Email Id is not present");
        }

        if (qualityAssuranceRequestDto.getMobile() == null) {
            throw new BadRequestException("Mobile No is not present");
        }

        return true;
    }

    public QualityAssurance createQualityAssuranceDeatils(QualityAssuranceRequestDto qualityAssuranceRequestDto) {
        QualityAssurance qa = new QualityAssurance();

        qa.setFirstName(qualityAssuranceRequestDto.getFirstName());
        qa.setMiddleName(qualityAssuranceRequestDto.getMiddleName());
        qa.setLastName(qualityAssuranceRequestDto.getLastName());
        qa.setEmail(qualityAssuranceRequestDto.getEmail());
        qa.setMobile(qualityAssuranceRequestDto.getMobile());
        qa.setQualityControllerStatus(QualityControllerStatus.ACTIVE);
        qa.setQualityAssuranceRefNo("QA" + SecurityUtil.generateOtp());
        qa.setClients(new ArrayList<String>()); 
        qa.setCreatedAt(Instant.now());
        qa.setModifiedAt(Instant.now());
        qualityAssuranceRepository.save(qa);

        QualityAssuranceCredentials qac = new QualityAssuranceCredentials();
        qac.setQualityAssuranceName(qa.getQualityAssuranceRefNo());
        qac.setQualityAssuranceId(qa.getId());
        qac.setCreatedAt(qa.getCreatedAt());
        qac.setModifiedAt(qa.getModifiedAt());

        String password = aesEncryption.encrypt(SecurityUtil.generateOtp());
        qac.setPassword(password);
        qualityAssuranceCredentialsRepository.save(qac);
        return qa;
    }

    public QualityAssuranceDetailResponse getQualityAssuranceDetails(String qualityAssuranceId) {
        QualityAssurance qa = getQualityAssuranceById(qualityAssuranceId);
        QualityAssuranceDetailResponse qaDetails = ClassUtil.convert(qa, QualityAssuranceDetailResponse.class);

        List<ClientOnboardingDetails> clients = clientOnboardingRepository.findByIdIn(qa.getClients());
        List<ClientDetails> clientDetails = ClassUtil.convertList(clients, ClientDetails.class);
        qaDetails.setClients(clientDetails);

        return qaDetails;
    }

    public QualityAssurance getQualityAssuranceById(String qualityAssuranceId) {
        QualityAssurance qualityAssurance = qualityAssuranceRepository.findById(qualityAssuranceId).orElseThrow(null);
        if (qualityAssurance == null) {
            throw new BadRequestException("QualityAssurance Id is not present :" + qualityAssuranceId);
        }
        return qualityAssurance;
    }

    public void qaUserChangePassword(String userId, String newPassword) {
        QualityAssuranceCredentials qualityAssuranceCredentials = getQualityAssuranceCredentialsById(userId);
        qualityAssuranceCredentials.setPassword(aesEncryption.encrypt(newPassword));

    }

    private QualityAssuranceCredentials getQualityAssuranceCredentialsById(String userId) {
        QualityAssuranceCredentials qualityAssuranceCredential = qualityAssuranceCredentialsRepository.findById(userId)
                .orElseThrow(null);
        if (!qualityAssuranceCredential.getId().equals(userId)) {
            throw new BadRequestException("Id is not present :" + userId);
        }
        return qualityAssuranceCredential;
    }
        
    public void UpdateQaDetails(String qualityAssuranceId,
            QualityAssuranceDetailResponse qualityAssuranceDetailResponse) {

        Optional<QualityAssurance> qaO = qualityAssuranceRepository.findById(qualityAssuranceId);

        if (!qaO.isPresent()) {
            throw new BadRequestException("QA id does not exists :" + qualityAssuranceId);
        }
        QualityAssurance qa = qaO.get();

        if (qualityAssuranceDetailResponse.getFirstName() == null) {
            qa.setFirstName(qa.getFirstName());
        } else {
            qa.setFirstName(qualityAssuranceDetailResponse.getFirstName());
        }

        if (qualityAssuranceDetailResponse.getMiddleName() == null) {
            qa.setMiddleName(qa.getMiddleName());
        } else {
            qa.setMiddleName(qualityAssuranceDetailResponse.getMiddleName());
        }

        if (qualityAssuranceDetailResponse.getLastName() == null) {
            qa.setLastName(qa.getLastName());
        } else {
            qa.setLastName(qualityAssuranceDetailResponse.getLastName());
        }

        if (qualityAssuranceDetailResponse.getEmail() == null) {
            qa.setEmail(qa.getEmail());
        } else {
            qa.setEmail(qualityAssuranceDetailResponse.getEmail());
        }

        if (qualityAssuranceDetailResponse.getMobile() == null) {
            qa.setMobile(qa.getMobile());
        } else {
            qa.setMobile(qualityAssuranceDetailResponse.getMobile());
        }

        qualityAssuranceRepository.save(qa);
    }

    public QualityAssuranceCredentialsResponse fetchCredentialsById(String qualityAssuranceId) {
        LOGGER.info("fetch Credentials By Id method started");
        Optional<QualityAssurance> qaO = qualityAssuranceRepository.findById(qualityAssuranceId);
        if (qaO.isPresent()) {
            QualityAssuranceCredentials credentials = qualityAssuranceCredentialsRepository.findByQualityAssuranceId(qaO.get().getId()).orElseThrow(() -> new BadRequestException("invalid QA"));
            QualityAssuranceCredentialsResponse response = new QualityAssuranceCredentialsResponse();
            BeanUtils.copyProperties(credentials, response);
            response.setQualityAssuranceName(credentials.getQualityAssuranceName());
            response.setPassword(aesEncryption.decrypt(credentials.getPassword()));
            response.setJoiningDate(credentials.getCreatedAt());
            LOGGER.info("fetch Credentials By Client Id method ended");
            return response;
        } else {
            LOGGER.error("fetch Credentials By Id : Entity Not Found Exception - credentials not found");
            throw new EntityNotFoundException("");
        }
    }

    public SuccessResponse changeQaPassword(String id, EditPasswordRequest request) {
        Optional<QualityAssuranceCredentials> qaO = qualityAssuranceCredentialsRepository.findByQualityAssuranceId(id);
        if (qaO.isPresent()) {
            QualityAssuranceCredentials credentialsToUpdate = qaO.get();
            String newPassword = aesEncryption.encrypt(request.getNewPassword());
            if (!StringUtils.isBlank(credentialsToUpdate.getPassword())
                    && !credentialsToUpdate.getPassword().equalsIgnoreCase(newPassword)) {
                credentialsToUpdate.setPassword(newPassword);
                credentialsToUpdate.setModifiedAt(Instant.now());
                qualityAssuranceCredentialsRepository.save(credentialsToUpdate);
            } else {
                LOGGER.error("change Password Of QA : Entity Not Found Exception");
                throw new EntityNotFoundException(Constants.QA_CREDENTIALS_NOT_FOUND);
            }
        } else {
            LOGGER.error("change Password Of QA : Bad Request Exception - Active QA not found");
            throw new BadRequestException(id + " " + Constants.ACTIVE_CLIENT_NOT_FOUND);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(id);
        response.setMessage(Constants.PASSWORD_CHANGED_SUCCESSFULLY);
        LOGGER.info("change Password Of Client method ended");
        return response;
    }

    public void assignClient(String qualityAssuranceId, ArrayList<String> clients) {

        QualityAssurance qa = qualityAssuranceRepository.findById(qualityAssuranceId).orElseThrow(null);

        qa.setClients(clients);

        qualityAssuranceRepository.save(qa);

    }

    public Page<QualityAssuranceListResponse> getQualityAssuranceResponseList(Page<QualityAssurance> qaPage) {
        
        Page<QualityAssuranceListResponse> qaListResponse = qaPage.map(j -> {
            QualityAssuranceListResponse qalr = ClassUtil.convert(j, QualityAssuranceListResponse.class);
            
            List<ClientOnboardingDetails> clientList = clientOnboardingRepository.findByIdIn(j.getClients());
            List<String> clientDtos = clientList.stream().map(c -> c.getClientName()).collect(Collectors.toList());
            qalr.setClients(clientDtos);

            return qalr;
        });
        return qaListResponse;
    }

}
