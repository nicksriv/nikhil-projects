import { xhrClient } from 'app/views/utilities/DataRequest'
import { config } from 'helper/config.js'

const { isProd } = config
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint

 const API_BASE_URL = isProd
    ? config.production.api_base_url
    : config.development.api_base_url

const JOB_API_BASE_URL = isProd
    ? config.production.job_api_base_url
    : config.development.job_api_base_url

const APIVERSION = 'api/v1'

const getDashboardDataService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/dashboard/admin`)
}

const getDashboardStatsService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/dashboard/admin`)
}

const getDashboardJobStatsService = () => {
    if(localStorage.getItem('typeOfUser') === "QUALITY_ASSURANCE"){
        return xhrClient.get(`${JOB_API_BASE_URL}jobs/qa-dashboard/stats`)
    }
    return xhrClient.get(`${JOB_API_BASE_URL}jobs/dashboard/stats`)

}

const getStatisticsService = (clientId = '') => {
    const url = clientId
        ? `/dashboard/userstatistics?clientId=${clientId}`
        : '/dashboard/userstatistics'
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}${url}`)
}

const getUserProfilePhoto = (profileId) => {
    return xhrClient.get(
        `${API_ENDPOINT}${APIVERSION}/files/${profileId}`,
        null,
        null,
        'blob'
    )
}

export { getDashboardDataService, getStatisticsService, getUserProfilePhoto, getDashboardStatsService,getDashboardJobStatsService }
