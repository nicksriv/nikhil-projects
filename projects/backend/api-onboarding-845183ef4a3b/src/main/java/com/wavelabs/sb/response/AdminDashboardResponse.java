package com.wavelabs.sb.response;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdminDashboardResponse {

    private long vendorsCount;
    private long freelancersCount;
    private long disputesCount;
    private long QualityAssurancesCount;
    private long storesCount;
    private long usersCount;
    private long clientsCount;
    private LoginInfo login;
    private List<ReportingOrTeamInfo> teams;
    private List<ModulesInfo> modules;

    public long getStoresCount() {
	return storesCount;
    }

    public void setStoresCount(long storesCount) {
	this.storesCount = storesCount;
    }

    public long getUsersCount() {
	return usersCount;
    }

    public void setUsersCount(long usersCount) {
	this.usersCount = usersCount;
    }

    public long getClientsCount() {
	return clientsCount;
    }

    public void setClientsCount(long clientsCount) {
	this.clientsCount = clientsCount;
    }

    public LoginInfo getLogin() {
	return login;
    }

    public void setLogin(LoginInfo login) {
	this.login = login;
    }

    public List<ReportingOrTeamInfo> getTeams() {
	return teams;
    }

    public void setTeams(List<ReportingOrTeamInfo> teams) {
	this.teams = teams;
    }

    public List<ModulesInfo> getModules() {
	return modules;
    }

    public void setModules(List<ModulesInfo> modules) {
	this.modules = modules;
    }
}
