import { xhrClient } from 'app/views/utilities/DataRequest'

import { config } from 'helper/config.js'

const { isProd } = config

const API_BASE_URL = isProd
    ? config.production.api_base_url
    : config.development.api_base_url

const ONBOARDING_API_BASE_URL = isProd
    ? config.production.onboarding_api_base_url
    : config.development.onboarding_api_base_url

const getVendorRegistrationListService = (data = {}) => {
    const payload = {
        page: data['pageNumber'],
        size: data['size'],
    }

    if (data.filter) {
        payload['filter'] = {}
    }

    if (data.filter?.vendorName) {
        payload['filter']['vendorName'] = data.filter.vendorName
    }
    if (data.filter?.mobile) {
        payload['filter']['mobileNo'] = data.filter.mobile
    }
    if (data.filter?.email) {
        payload['filter']['email'] = data.filter.email
    }



    return xhrClient.get(
        `${ONBOARDING_API_BASE_URL}vendors/request/list?page=${payload.page}`,
        null,
        null,
        'json',
        payload.filter
    )

}

const assignVendorRegistrationListService = (data = {}) => {
    const { jobId, vendorRequestId } = data;
    return xhrClient.get(
        `${ONBOARDING_API_BASE_URL}vendors/${vendorRequestId}/users?jobId=${jobId}`,
        null,
        null,
        'json'
    )

}
const approveVendorRegistrationService = async (payload, vendorRegistrationActionData) => {
    const { jobId, vendorRequestId } = vendorRegistrationActionData;
    const vendorRequestApprove = localStorage.getItem('vendorApprove');
    const vendorId = payload;
    if (vendorRequestApprove) {
        return await xhrClient.put(
            `${ONBOARDING_API_BASE_URL}vendors/${vendorRequestId}/Status?vendorRequestStatus=APPROVED&jobId=${jobId}&userNote=""`,
            null,
            payload,
            null
        )
    }
    else {
        return await xhrClient.put(
            `${ONBOARDING_API_BASE_URL}vendors/${vendorRequestId}/Status?vendorRequestStatus=APPROVED&jobId=${jobId}&userNote=""&vendorId=${vendorId}`,
            null,
            null
        )
    }
}

const rejectVendorRegistrationService = async (notes, vendorRegistrationActionData) => {
    const { jobId, vendorRequestId } = vendorRegistrationActionData;
    return await xhrClient.put(
        `${ONBOARDING_API_BASE_URL}vendors/${vendorRequestId}/Status?vendorRequestStatus=REJECTED&jobId=${jobId}&userNote=${notes}`,
        null,
        { userNote: notes }, null
    )
}


export {
    getVendorRegistrationListService,
    approveVendorRegistrationService,
    rejectVendorRegistrationService,
    assignVendorRegistrationListService
}
