import { xhrClient } from 'app/views/utilities/DataRequest'

import { config } from 'helper/config.js'

const { isProd } = config

const API_BASE_URL = isProd
  ? config.production.api_base_url
  : config.development.api_base_url

const ONBOARDING_API_BASE_URL = isProd
  ? config.production.onboarding_api_base_url
  : config.development.onboarding_api_base_url
  
const JOB_API_BASE_URL = isProd
? config.production.job_api_base_url
: config.development.job_api_base_url

const getFreelancersListService = async (data = {}) => {
  const payload = {
    page: data['pageNumber'],
    size: data['size'],
  }


  if (data.filter) {
    payload['filter'] = {}
  }


  if (data.filter?.firstName) {
    payload['filter']['firstName'] = data.filter.firstName
  }
  if (data.filter?.lastName) {
    payload['filter']['lastName'] = data.filter.lastName
  }
  if (data.filter?.freelancerRefNo) {
    payload['filter']['freelancerRefNo'] = data.filter.freelancerRefNo
  }
  if (data.filter?.email) {
    payload['filter']['email'] = data.filter.email
  }
  if (data.filter?.mobile) {
    payload['filter']['mobile'] = data.filter.mobile
  }
  if (data.filter?.status) {
    payload['filter']['status'] = data.filter.status
  }
  if (data.filter?.state) {
    payload['filter']['state'] = data.filter.state
  }
  console.log("ada ",payload.filter)
  return xhrClient.get(
    `${ONBOARDING_API_BASE_URL}freelancer/?page=${payload.page}`,
    null,
    null,
    'json',
    payload.filter
  )
}

const getFreelancerListDownloadService = (payload) => {
  const { filter } = payload;
  Object.keys(filter).forEach((key) => (filter[key] == null) || filter[key] === "" && delete filter[key]);
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}freelancer/excel/download`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ,
    null,
    'blob',
    filter)
}
const getFreelancerDetailsService = async (payload) => {
  let id = payload
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}freelancer/${id}`)

}

const getFreelancerStatsService = async (payload) => {
  let id = payload
  return xhrClient.get(`${JOB_API_BASE_URL}jobs/stats?userId=${id}&userType=FREELANCER`)
}
const deactivateFreelancerService = async ({ id }) => {
  return xhrClient.put(`${ONBOARDING_API_BASE_URL}freelancer/status/${id}/?status=INACTIVE`, null)
}
const activateFreelancerService = async ({ id }) => {
  return xhrClient.put(`${ONBOARDING_API_BASE_URL}freelancer/status/${id}/?status=ACTIVE`, null)

}
export {
  getFreelancersListService,
  getFreelancerListDownloadService,
  getFreelancerDetailsService,
  deactivateFreelancerService,
  activateFreelancerService,
  getFreelancerStatsService
}
