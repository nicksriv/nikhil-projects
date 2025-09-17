import { xhrClient } from 'app/views/utilities/DataRequest'

import { config } from 'helper/config.js'

const { isProd } = config

const API_BASE_URL = isProd
  ? config.production.api_base_url
  : config.development.api_base_url

const ONBOARDING_API_BASE_URL = isProd
  ? config.production.onboarding_api_base_url
  : config.development.onboarding_api_base_url

const getQualityAssuranceListService = async (data = {}) => {
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
  // if (data.filter?.id) {
  //   payload['filter']['id'] = data.filter.id
  // }
  if (data.filter?.email) {
    payload['filter']['email'] = data.filter.email
  }
  if (data.filter?.mobile) {
    payload['filter']['mobile'] = data.filter.mobile
  }
  if (data.filter?.qualityControllerStatus) {
    payload['filter']['qualityControllerStatus'] = data.filter.qualityControllerStatus
  }
  if (data.filter?.qualityAssuranceRefNo) {
    payload['filter']['qualityAssuranceRefNo'] = data.filter.qualityAssuranceRefNo
  }
  if (data.filter?.clients) {
    payload['filter']['clients'] = data.filter.clients
  }
  return xhrClient.get(
    `${ONBOARDING_API_BASE_URL}quality-assurances/?page=${payload.page}`,
    null,
    null,
    'json',
    payload.filter
  )
}


const getQualityAssuranceListDownloadService = (payload) => {
  const { filter } = payload;
  Object.keys(filter).forEach((key) => (filter[key] == null) || filter[key] === "" && delete filter[key]);
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}quality-assurances/excel/download`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ,
    null,
    'blob',
    filter)
}
const getQualityAssuranceDetailsService = async (payload) => {
  let id = payload
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}quality-assurances/${id}`)

}
const addQualityAssuranceService = async (payload) => {
  return xhrClient.post(`${ONBOARDING_API_BASE_URL}quality-assurances/`, null,
    payload,
    null)
}
const editQualityAssuranceService = async (payload, id) => {
  return xhrClient.put(`${ONBOARDING_API_BASE_URL}quality-assurances/${id}`, null,
    payload,
    null)
}
const deactivateQualityAssuranceService = async ({ id }) => {
  return xhrClient.put(`${ONBOARDING_API_BASE_URL}quality-assurances/${id}/status/?qualityControllerStatus=INACTIVE`, null)
}
const activateQualityAssuranceService = async ({ id }) => {
  return xhrClient.put(`${ONBOARDING_API_BASE_URL}quality-assurances/${id}/status?qualityControllerStatus=ACTIVE`, null)

}
const assignClientToQualityAssuranceService = async ({ id, assignClientId }) => {
  return xhrClient.post(`${ONBOARDING_API_BASE_URL}quality-assurances/${id}/assign-clients?clients=${assignClientId}`, null)

}
const getQualityAssuranceCredentialService = async ({ id }) => {
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}quality-assurances/${id}/credentials`)
}

const updateQualityAssurancePasswordService = async (payload) => {
  const { qualityAssuranceId, newPassword} = payload;
  return await xhrClient.put(
      `${ONBOARDING_API_BASE_URL}quality-assurances/${qualityAssuranceId}/password-change`,
      null,
      newPassword,
      null
  )
}
const getQualityAssuranceEmailTemplateService = async ({ qualityAssuranceId }) => {
  return await xhrClient.get(
      `${ONBOARDING_API_BASE_URL}quality-assurances/${qualityAssuranceId}/email-template`,
      null,
      null
  )
}
const setQualityAssuranceEmailTemplateService = async (payload) => {
  console.log("PAAyload",payload);
  return await xhrClient.post(
      `${ONBOARDING_API_BASE_URL}quality-assurances/${payload.qualityAssuranceId}/email`,
      null,
      payload,
      null
  )
}

export {
  getQualityAssuranceListService, getQualityAssuranceListDownloadService, getQualityAssuranceDetailsService, addQualityAssuranceService,updateQualityAssurancePasswordService,
  editQualityAssuranceService,getQualityAssuranceEmailTemplateService, deactivateQualityAssuranceService, activateQualityAssuranceService, assignClientToQualityAssuranceService,getQualityAssuranceCredentialService,setQualityAssuranceEmailTemplateService
}
