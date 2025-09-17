import { xhrClient } from 'app/views/utilities/DataRequest'

import { config } from 'helper/config.js'

const { isProd } = config

const API_BASE_URL = isProd
  ? config.production.api_base_url
  : config.development.api_base_url

const ONBOARDING_API_BASE_URL = isProd
  ? config.production.onboarding_api_base_url
  : config.development.onboarding_api_base_url

const getDisputesListService = async (data = {}) => {

  const payload = {
    page: data['pageNumber'],
    size: data['size'],
  }
  if (data.filter) {
    payload['filter'] = {}
  }
  if (data.filter?.from) {
    payload['filter']['from'] = data.filter.from
  }
  if (data.filter?.to) {
    payload['filter']['to'] = data.filter.to
  }

  if (data.filter?.disputeRefNo) {
    payload['filter']['disputeRefNo'] = data.filter.disputeRefNo
  }
  if (data.filter?.disputeStatus) {
    payload['filter']['disputeStatus'] = data.filter.disputeStatus
  }
  if (data.filter?.disputeTitle) {
    payload['filter']['disputeTitle'] = data.filter.disputeTitle
  }
  if (data.filter?.raisedBy) {
    payload['filter']['raisedBy'] = data.filter.raisedBy
  }
  if (data.filter?.userType) {
    payload['filter']['userType'] = data.filter.userType
  }

  return xhrClient.get(
    `${ONBOARDING_API_BASE_URL}disputes/?page=${payload.page}`, null,
    null,
    'json',
    payload.filter)
}
const getDisputeDetailsService = async (payload) => {
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}disputes/${payload}`)
}
const getDisputeListDownloadService = (payload) => {
  const { filter } = payload;
  Object.keys(filter).forEach((key) => (filter[key] === null) || filter[key] === "" && delete filter[key]);
  return xhrClient.get(`${ONBOARDING_API_BASE_URL}disputes/excel/download`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ,
    null,
    'blob',
    filter)
}
const inreviewDisputeService = async ({ id }) => {
  return await xhrClient.put(
    `${ONBOARDING_API_BASE_URL}disputes/${id}/status?disputeStatus=INREVIEW`,
    null
  )
}

const closedDisputeService = async ({ id }) => {
  return await xhrClient.put(
    `${ONBOARDING_API_BASE_URL}disputes/${id}/status?disputeStatus=CLOSED`,
    null
  )
}

const closedDisputeRemarkService = async ({ id, remark }) => {
  return await xhrClient.put(
    `${ONBOARDING_API_BASE_URL}disputes/${id}/remark`,
    null,
    remark
  )
}
export {
  getDisputesListService,
  getDisputeListDownloadService,
  getDisputeDetailsService,
  inreviewDisputeService,
  closedDisputeService,
  closedDisputeRemarkService
}
