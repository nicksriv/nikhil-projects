import { convertDate } from 'app/views/utilities/DateFormat'
import _get from 'lodash.get'

const dashboardParsers = {}

dashboardParsers.dashboardStatsParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }
    const handleLoginInfo = (login) => ({
        browser: _get(login, 'browser', ''),
        ip: _get(login, 'ip', ''),
        time: _get(login, 'time', '')
    })
    return {
        clientsCount: _get(response, 'clientsCount', null),
        login: handleLoginInfo(_get(response, 'login', {}))
    }
}

dashboardParsers.dashboardJobStatsParser = (response) => {

    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }
    if(localStorage.getItem('typeOfUser') === "QUALITY_ASSURANCE"){
        return {
            totalClients:_get(response, 'totalClients', null),
            totalJobsApproved:_get(response, 'totalJobsApproved', null),
            totalJobsAssigned:_get(response, 'totalJobsAssigned', null),
            totalJobsInprogress:_get(response, 'totalJobsInprogress', null),
        }   
    }
    return {
        totalDisputes: _get(response, 'totalDisputes', null),
        totalFreelancers: _get(response, 'totalFreelancers', null),
        totalQualityAssurances: _get(response, 'totalQualityAssurances', null),
        totalVendors: _get(response, 'totalVendors', null),
        totalJobs: _get(response, 'totalJobs', null),
        totalCompletedJobs: _get(response, 'totalCompletedJobs', null),
        totalOngoingJobs: _get(response, 'totalOngoingJobs', null),
        totalNewJobs: _get(response, 'totalNewJobs', null),
        totalEarned: _get(response, 'totalEarned', null),
        totalAmountPaid: _get(response, 'totalAmountPaid', null),
        totalPendingAmount: _get(response, 'totalPendingAmount', null),
    }
}



export { dashboardParsers }
