package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Dispute;
import com.wavelabs.sb.documents.DisputeCategory;
import com.wavelabs.sb.documents.Freelancer;
import com.wavelabs.sb.documents.Vendor;
import com.wavelabs.sb.enums.DisputeStatus;
import com.wavelabs.sb.enums.UserType;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ForbiddenException;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.DisputeCategoryRespository;
import com.wavelabs.sb.repositories.DisputeRespository;
import com.wavelabs.sb.repositories.FreelancerRepository;
import com.wavelabs.sb.repositories.VendorRepository;
import com.wavelabs.sb.request.AddRemarkRequest;
import com.wavelabs.sb.response.DisputeDetailResponse;
import com.wavelabs.sb.response.DisputeListResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.ClassUtil;

@Service
public class DisputeService {

    @Autowired
    DisputeRespository disputeRepository;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    FreelancerRepository freelancerRepository;

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    DisputeCategoryRespository disputeCategoryRespository;

    public Dispute getDisputeById(String id) {
        Dispute dispute = disputeRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Dispute id is not valid :" + id));
        return dispute;
    }

    public DisputeCategory getDisputeCategoryById(String id) {
        Optional<DisputeCategory> dcO = disputeCategoryRespository.findById(id);
        if (!dcO.isPresent()) {
            throw new BadRequestException("Dispute Category Id is not present");
        }
        return dcO.get();
    }

    public List<String> getClientDisputeCategoryIds() {
        List<DisputeCategory> disputeCategories = disputeCategoryRespository.findByDisputeResolver(UserType.CLIENT);
        return disputeCategories.stream().map(dc -> dc.getId()).collect(Collectors.toList());
    }

    public Page<Dispute> getDisputeList(Pageable pageable, String id, String disputeRefNo,
            String clientId, String userId, UserType userType, String disputeCategoryId,
            String disputeTitle, DisputeStatus disputeStatus, Instant raisedAt, String raisedBy,
            Instant from, Instant to, TokenPayLoadDetails details) {
        Query query = new Query();

        if (details.getTypeOfUser().toLowerCase().equals(UserType.CLIENT.toString().toLowerCase())) {
            query.addCriteria(Criteria.where("clientId").is(details.getUserId()));
            List<String> disputeCategoryIds = getClientDisputeCategoryIds();
            query.addCriteria(Criteria.where("disputeCategoryId").in(disputeCategoryIds));

        } else {
            if (clientId != null) {
                query.addCriteria(Criteria.where("clientId").is(clientId));
            }
        }

        if (id != null) {
            query.addCriteria(Criteria.where("id").is(id));
        }
        if (disputeRefNo != null) {
            query.addCriteria(Criteria.where("disputeRefNo").regex(Pattern.compile(disputeRefNo, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (disputeCategoryId != null) {
            query.addCriteria(Criteria.where("disputeCategoryId").is(disputeCategoryId));
        }
        if (disputeTitle != null) {
            query.addCriteria(Criteria.where("disputeTitle").regex(Pattern.compile(disputeTitle, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (userId != null) {
            query.addCriteria(Criteria.where("userId").is(userId));
        }
        if (raisedAt != null) {
            query.addCriteria(Criteria.where("raisedAt").is("createdAt"));
        }
        if (raisedBy != null) {
            query.addCriteria(Criteria.where("raisedBy").is(raisedBy));
        }
        if (userType != null) {
            query.addCriteria(Criteria.where("userType").is(userType));
        }
        if (disputeStatus != null) {
            query.addCriteria(Criteria.where("disputeStatus").is(disputeStatus));
        }
        if (from != null && to == null) {
            query.addCriteria(Criteria.where("createdAt").gte(from));
        }
        if (to != null && from == null) {
            query.addCriteria(Criteria.where("createdAt").lt(to));
        }
        if (from != null && to != null) {
            query.addCriteria(Criteria.where("").andOperator(Criteria.where("createdAt").lt(to),
                    Criteria.where("createdAt").gte(from)));
        }
        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, Dispute.class);
        if (pageable != null) {
            query.with(pageable);
        }else{
            pageable = Pageable.ofSize((int) count);
        }
        if (pageable == null) {
            pageable = Pageable.unpaged();
        }

        List<Dispute> result = mongoTemplate.find(query, Dispute.class);
        
        Page<Dispute> dispute = new PageImpl<>(result, pageable, count);

        return dispute;
    }

    public Page<DisputeListResponse> disputePageToDto(Page<Dispute> disputePage) {
        Page<DisputeListResponse> disputeListResponse = disputePage.map(dl -> {
            DisputeListResponse dlR = ClassUtil.convert(dl, DisputeListResponse.class);

            Optional<ClientOnboardingDetails> c0 = clientOnboardingRepository.findById(dl.getClientId());
            if (c0.isPresent()) {
                ClientOnboardingDetails c = c0.get();
                dlR.setClientName(c.getClientName());
            }

            if (dl.getUserType().equals(UserType.FREELANCER)) {

                Optional<Freelancer> f = freelancerRepository.findById(dl.getUserId());
                if (f.isPresent()) {
                    Freelancer fv = f.get();
                    dlR.setRaisedBy(fv.getFirstName() + " " + fv.getLastName());
                }
            }

            if (dl.getUserType().equals(UserType.VENDOR)) {

                Optional<Vendor> v = vendorRepository.findById(dl.getUserId());
                if (v.isPresent()) {
                    Vendor vd = v.get();
                    dlR.setRaisedBy(vd.getVendorName());
                }
            }
            dlR.setRaisedAt(dl.getCreatedAt());

            return dlR;
        });

        return disputeListResponse;
    }

    public DisputeDetailResponse getDisputeDetails(String id, TokenPayLoadDetails details) {
        Dispute dispute = getDisputeById(id);
        DisputeDetailResponse disputeDetailDto = ClassUtil.convert(dispute, DisputeDetailResponse.class);

        DisputeCategory dc = getDisputeCategoryById(dispute.getDisputeCategoryId());
        disputeDetailDto.setDisputeCategoryName(dc.getDisputeCategoryName());

        if (details.getTypeOfUser().toLowerCase().equals(UserType.CLIENT.toString().toLowerCase())
                && !(dc.getDisputeResolver().equals(UserType.CLIENT))) {
            throw new ForbiddenException("Not Expected User");
        }

        ClientOnboardingDetails clientOnboardingDetails = clientOnboardingRepository.findById(dispute.getClientId())
                .orElse(null);
        if (clientOnboardingDetails == null) {
            throw new BadRequestException("Client is not present");
        }
        if (dispute.getUserType().equals(UserType.FREELANCER)) {

            Freelancer freelancer = freelancerRepository.findById(dispute.getUserId()).orElseThrow(null);
            if (freelancer == null) {
                throw new BadRequestException("Freelancer is not present");
            }
            disputeDetailDto.setRaisedBy(freelancer.getFirstName() + " " + freelancer.getLastName());
            disputeDetailDto.setEmail(freelancer.getEmail());
            disputeDetailDto.setMobile(freelancer.getMobile());

        }

        if (dispute.getUserType().equals(UserType.VENDOR)) {

            Vendor vendor = vendorRepository.findById(dispute.getUserId()).orElseThrow(null);
            if (vendor == null) {
                throw new BadRequestException("Vendor is not present");
            }
            disputeDetailDto.setRaisedBy(vendor.getVendorName());
            if (vendor.getSpocDetail() != null) {
                disputeDetailDto.setEmail(vendor.getSpocDetail().getEmail());
                disputeDetailDto.setMobile(vendor.getSpocDetail().getMobile());  
            }  
        }

        disputeDetailDto.setClientName(clientOnboardingDetails.getClientName());
        disputeDetailDto.setRaisedAt(dispute.getCreatedAt());
        return disputeDetailDto;
    }

    public void updateStatus(String id, DisputeStatus disputeStatus) {
        Dispute dispute = disputeRepository.findById(id).orElse(null);
        dispute.setDisputeStatus(disputeStatus);
        disputeRepository.save(dispute);
    }

    public SuccessResponse addRemark(String id,AddRemarkRequest addRemarkRequest) {

        Optional<Dispute> disputeO = disputeRepository.findById(id);
        if(!disputeO.isPresent()){
            throw new BadRequestException("Dispute id not exists" + id);
        }
        Dispute dispute = disputeO.get();
        dispute.setClosedRemark(addRemarkRequest.getClosedRemark());
        disputeRepository.save(dispute);
        return new SuccessResponse("Remark Added Succesfully");
    }

}