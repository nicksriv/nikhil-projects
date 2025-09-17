package com.wavelabs.sb.services;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Dispute;
import com.wavelabs.sb.documents.Freelancer;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.documents.Vendor;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.AdminMapper;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserStatisticsModel;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.AuthenticationRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.QADashboardResponse;
import com.wavelabs.sb.repositories.QualityAssuranceRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.AdminDashboardResponse;
import com.wavelabs.sb.response.LoginInfo;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserDashboardResponse;
import com.wavelabs.sb.response.UserStatisticsChart;
import com.wavelabs.sb.response.UserStatisticsResponse;

@Service
public class DashboardService {

	private static final Logger LOGGER = LoggerFactory.getLogger(DashboardService.class);

	@Autowired
	UserOnboardingService onboardingService;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	UserProfileService profileService;

	@Autowired
	ScreenBuilderService builderService;

	@Autowired
	AuthenticationRepository authenticationRepository;

	@Autowired
	AdminDetailsRepository adminDetailsRepository;

	@Autowired
	ClientOnboardingRepository clientOnboardingRepository;

	@Autowired
	UserOnboardingRepository userOnboardingRepository;

	@Autowired
	RoleOnboardingRepository roleOnboardingRepository;

	@Autowired
	QualityAssuranceRepository qualityAssuranceRepository;

	public UserDashboardResponse fetchUserDashboardData(TokenPayLoadDetails details) {
		LOGGER.info("fetchDashboardData method started");
		Users user = onboardingService.getUser(details.getId());
		Users reportingUser = null;
		if (!StringUtils.isBlank(user.getReportingManagerId())) {
			reportingUser = profileService.getUserOrNull(user.getReportingManagerId());
		}

		UserDashboardResponse response = new UserDashboardResponse();
		UserDashboardResponse userModules = builderService.fetchUserModules(details.getId(), Constants.USER);
		response.setCharts(userModules.getCharts());
		response.setModules(userModules.getModules());
		response.setLogin(getLastLogin(user.getUserId()));
		response.setReporting(
				reportingUser != null ? UserOnboardingMapper.getReportingOrTeamInfo(reportingUser) : null);
		LOGGER.info("fetchDashboardData method ended");
		return response;
	}

	private LoginInfo getLastLogin(String userName) {

		PageRequest request = PageRequest.of(0, 2, Sort.by(Sort.Direction.DESC, "loginAt"));
		Page<AuthenticationAuditingDetails> list = authenticationRepository.findRecentToken(userName, request);
		if (list.getTotalElements() > 1) {
			LoginInfo info = new LoginInfo();
			AuthenticationAuditingDetails details = list.getContent().get(1);
			info.setTime(details.getLoginAt().toString());
			info.setIp(details.getIpAddress());
			info.setBrowser(details.getUserAgent());
			return info;
		}
		return null;
	}

	public AdminDashboardResponse fetchAdminDashboardData(TokenPayLoadDetails details) {
		LOGGER.info("fetchDashboardData method started");
		AdminDashboardResponse response = new AdminDashboardResponse();
		if (details.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {
			ClientOnboardingDetails clientOnboardingDetails = getClient(details.getClientId());
			List<ObjectId> roleId = getRoleId(clientOnboardingDetails.getId());
			if (roleId != null) {
				List<Users> users = userOnboardingRepository.findByClientIdAndStatusAndDeletedAndRolesIn(
						clientOnboardingDetails.getClientId(), Status.ACTIVE, false, roleId);
				response.setTeams(UserOnboardingMapper.getTeams(users));
			}
			UserDashboardResponse adminModules = builderService.fetchUserModules(details.getId(), Constants.CLIENT);
			response.setModules(adminModules.getModules());
			response.setUsersCount(getCount(details.getClientId(), Constants.USERS_COUNT));
			response.setStoresCount(getCount(details.getClientId(), Constants.SITES_COUNT));
			response.setLogin(getLastLogin(details.getClientId()));
		} else if (details.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
			Optional<Users> userOptional = userOnboardingRepository.findById(details.getId());
			if (!userOptional.isPresent()) {
				throw new ResourceNotFoundException(ErrorMessages.ADMIN_NOT_FOUND);
			}
			List<ObjectId> roleId = getRoleId(details.getClientSystemId());
			if (roleId != null) {
				List<Users> users = userOnboardingRepository.findByClientIdAndStatusAndDeletedAndRolesIn(
						details.getClientId(), Status.ACTIVE, false, roleId);
				response.setTeams(UserOnboardingMapper.getTeams(users));
			}
			UserDashboardResponse adminModules = builderService.fetchUserModules(details.getClientSystemId(),
					Constants.CLIENT);
			response.setModules(adminModules.getModules());
			response.setUsersCount(getCount(details.getClientId(), Constants.USERS_COUNT));
			response.setStoresCount(getCount(details.getClientId(), Constants.SITES_COUNT));
			response.setLogin(getLastLogin(details.getUserId()));
		} else if (details.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
			Optional<AdminDetails> adminOptional = adminDetailsRepository.findById(details.getId());
			if (!adminOptional.isPresent()) {
				throw new ResourceNotFoundException(ErrorMessages.ADMIN_NOT_FOUND);
			}
			List<AdminDetails> admins = adminDetailsRepository.findByDeletedAndIdNot(false, details.getId());
			response.setTeams(AdminMapper.getTeams(admins));
			response.setUsersCount(getCount(null, Constants.USERS_COUNT));
			response.setStoresCount(getCount(null, Constants.SITES_COUNT));
			response.setClientsCount(getCount(null, Constants.CLIENTS_COUNT));
			response.setVendorsCount(getCount(null, Constants.VENDORS_COUNT));
			response.setFreelancersCount(getCount(null, Constants.FREELANCER_COUNT));
			response.setDisputesCount(getCount(null, Constants.DISPUTE_COUNT));
			response.setQualityAssurancesCount(getCount(null, Constants.QUALITY_ASSURANCE_COUNT));
			response.setLogin(getLastLogin(details.getAdminId()));

		} else if (details.getTypeOfUser().equalsIgnoreCase(Constants.QUALITY_ASSURANCE)) {
			Optional<QualityAssurance> qualityAssuranceO = qualityAssuranceRepository.findById(details.getId());
			if (!qualityAssuranceO.isPresent()) {
				throw new ResourceNotFoundException(ErrorMessages.QUALITY_ASSURANCE_NOT_FOUND);
			}
			QualityAssurance qualityAssurance = qualityAssuranceO.get();
			response.setLogin(getLastLogin(qualityAssurance.getQualityAssuranceRefNo()));
		}

		LOGGER.info("fetchDashboardData method ended");
		return response;
	}

	public AdminDetails getAdmin(String adminId) {
		Optional<AdminDetails> adminOptional = adminDetailsRepository.findByAdminIdAndStatusAndDeleted(adminId,
				Status.ACTIVE, false);
		if (!adminOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.ADMIN_NOT_FOUND);
		}
		return adminOptional.get();
	}

	public ClientOnboardingDetails getClient(String clientId) {
		Optional<ClientOnboardingDetails> clientOnboardingDetails = clientOnboardingRepository
				.findByClientIdAndStatusAndDeleted(clientId, Status.ACTIVE, false);
		if (!clientOnboardingDetails.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
		}
		return clientOnboardingDetails.get();
	}

	private List<ObjectId> getRoleId(String clientId) {
		RoleOnboardingDetails role = roleOnboardingRepository.findByClientIdAndDeletedAndRoleIgnoreCase(clientId, false,
				Constants.ADMIN);
		if (role != null) {
			List<ObjectId> roleId = new ArrayList<>();
			roleId.add(new ObjectId(role.getId()));
			return roleId;
		}
		return new ArrayList<>();
	}

	@SuppressWarnings(value = "unchecked")
	private String getMaxUsersClient() {
		try {
			SuccessResponse response = new SuccessResponse();
			Aggregation agg = Aggregation.newAggregation(Aggregation.match(new Criteria("deleted").is(false)),
					Aggregation.group(Aggregation.fields().and("clientId")).count().as(Constants.USERS_COUNT),
					Aggregation.sort(Direction.DESC, Constants.USERS_COUNT), Aggregation.limit(1));
			AggregationResults<Users> result = mongoTemplate.aggregate(agg, "users", Users.class);
			List<Document> documents = (List<Document>) result.getRawResults().get("results");
			documents.forEach(doc -> response.setId(doc.get(Constants._ID).toString()));
			return response.getId();
		} catch (Exception e) {
			LOGGER.info("Something went worng ");
			throw new BadRequestException(ErrorMessages.SOMETHING_WENT_WRONG);
		}
	}

	@SuppressWarnings(value = "unchecked")
	private List<UserStatisticsChart> getUsersCount(String clientId) {

		Aggregation agg = Aggregation.newAggregation(Aggregation.match(getCriteria(clientId)),
				Aggregation.project().andExpression("year(createdAt)").as(Constants.YEAR)
						.andExpression("month(createdAt)").as(Constants.MONTH),
				Aggregation.group(Aggregation.fields().and(Constants.YEAR).and(Constants.MONTH)).count()
						.as(Constants.USERS_COUNT),
				Aggregation.sort(Direction.DESC, Constants.YEAR).and(Direction.DESC, Constants.MONTH));
		try {
			AggregationResults<Users> result = mongoTemplate.aggregate(agg, "users", Users.class);
			Document usersCountDoc = result.getRawResults();
			List<Document> documents = (List<Document>) usersCountDoc.get("results");
			List<UserStatisticsChart> charts = new ArrayList<>();
			documents.forEach(userCount -> {
				UserStatisticsChart chart = new UserStatisticsChart();
				Document date = (Document) userCount.get(Constants._ID);
				chart.setxAxis(getMonthYear(date));

				chart.setyAxis(
						userCount.containsKey(Constants.USERS_COUNT) ? (int) userCount.get(Constants.USERS_COUNT) : 0);
				charts.add(chart);
			});
			return charts;
		} catch (Exception e) {
			LOGGER.info("Something went worng ");
			throw new BadRequestException(ErrorMessages.SOMETHING_WENT_WRONG);
		}
	}

	private String getMonthYear(Document date) {
		String month = "";
		month = date.containsKey(Constants.MONTH) ? Month.of((int) date.get(Constants.MONTH)).toString().substring(0, 3)
				: null;
		if (month != null) {
			String year = date.containsKey(Constants.YEAR) ? date.get(Constants.YEAR).toString().substring(2, 4) : null;
			month = month + " " + year;
		}
		return month;
	}

	private Criteria getCriteria(String clientId) {
		Criteria criteria = new Criteria("clientId").is(clientId);
		Date from = Date.valueOf(LocalDate.now().minusMonths(6));
		Date toDate = Date.valueOf(LocalDate.now().plusDays(1));
		criteria.and("createdAt").gte(from).lte(toDate);
		criteria.and("deleted").is(false);
		return criteria;
	}

	public UserStatisticsResponse fetchUserStatistics(UserStatisticsModel request) {
		ClientOnboardingDetails client = null;
		String clientId = null;
		TokenPayLoadDetails details = request.getDetails();
		if (Constants.ADMIN.equalsIgnoreCase(details.getTypeOfUser())) {
			if (!StringUtils.isBlank(request.getClientId())) {
				Optional<ClientOnboardingDetails> clientOptional = clientOnboardingRepository
						.findById(request.getClientId());
				if (!clientOptional.isPresent()) {
					throw new ResourceNotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
				}
				client = clientOptional.get();
			} else {
				clientId = getMaxUsersClient();
			}
		}
		if (Constants.CLIENT.equalsIgnoreCase(details.getTypeOfUser())) {
			clientId = details.getClientId();
		}
		if (Constants.USER.equalsIgnoreCase(details.getTypeOfUser())) {
			clientId = details.getClientId();
		}

		if (!StringUtils.isBlank(clientId)) {
			Optional<ClientOnboardingDetails> clientOptional = clientOnboardingRepository.findByClientId(clientId);
			if (!clientOptional.isPresent()) {
				throw new ResourceNotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
			}
			client = clientOptional.get();
		}

		UserStatisticsResponse response = new UserStatisticsResponse();
		if (client != null) {
			response.setClientId(client.getClientId());
			response.setClientName(client.getClientName());
			response.setCharts(getUsersCount(client.getClientId()));
			response.setId(client.getId());
		}
		return response;
	}

	private long getCount(String clientId, String type) {
		Query query = new Query();
		query.addCriteria(Criteria.where("deleted").is(false));

		if (Constants.SITES_COUNT.equalsIgnoreCase(type)) {
			if (!StringUtils.isBlank(clientId)) {
				query.addCriteria(Criteria.where("clientId").is(clientId));
			}
			return mongoTemplate.count(query, SiteOnboardingDetails.class);
		}
		if (Constants.USERS_COUNT.equalsIgnoreCase(type)) {
			if (!StringUtils.isBlank(clientId)) {
				query.addCriteria(Criteria.where("clientId").is(clientId));
			}
			return mongoTemplate.count(query, Users.class);
		}
		if (Constants.CLIENTS_COUNT.equalsIgnoreCase(type)) {
			return mongoTemplate.count(query, ClientOnboardingDetails.class);
		}
		if (Constants.VENDORS_COUNT.equalsIgnoreCase(type)) {
			return mongoTemplate.count(query, Vendor.class);
		}
		if (Constants.FREELANCER_COUNT.equalsIgnoreCase(type)) {
			return mongoTemplate.count(query, Freelancer.class);
		}
		if (Constants.DISPUTE_COUNT.equalsIgnoreCase(type)) {
			return mongoTemplate.count(query, Dispute.class);
		}
		if (Constants.QUALITY_ASSURANCE_COUNT.equalsIgnoreCase(type)) {
			return mongoTemplate.count(query, QualityAssurance.class);
		}

		return 0;
	}

	public QADashboardResponse getQADashboard(TokenPayLoadDetails details) {
		Optional<QualityAssurance> qualityAssurance = qualityAssuranceRepository.findById(details.getUserId());

		if (!qualityAssurance.isPresent()) {
			throw new ResourceNotFoundException("Quality assurance not present");
		}
		QualityAssurance qa = qualityAssurance.get();
		QADashboardResponse qad = new QADashboardResponse();

		qad.setTotalClients(qa.getClients().size());
		return qad;
	}
}
