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

const getVendorListService = (data = {}) => {
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
    if (data.filter?.vendorName) {
        payload['filter']['vendorName'] = data.filter.vendorName
    }
    if (data.filter?.vendorRefNo) {
        payload['filter']['vendorRefNo'] = data.filter.vendorRefNo
    }
    if (data.filter?.status) {
        payload['filter']['status'] = data.filter.status
    }
    if (data.filter?.state) {
        payload['filter']['state'] = data.filter.state
    }

    if (data.filter?.skills && data.filter?.skills.length) {
        payload['filter']['skills'] = data.filter.skills
            .map((sk) => sk.id)
            .join()
    }
    return xhrClient.get(
        `${API_BASE_URL}vendors/?page=${payload.page}`,
        null,
        null,
        'json',
        payload.filter
    )
}

const getVendorListDownloadService = (data = {}) => {
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
    if (data.filter?.vendorName) {
        payload['filter']['vendorName'] = data.filter.vendorName
    }
    if (data.filter?.vendorRefNo) {
        payload['filter']['vendorRefNo'] = data.filter.vendorRefNo
    }
    if (data.filter?.status) {
        payload['filter']['status'] = data.filter.status
    }
    if (data.filter?.state) {
        payload['filter']['state'] = data.filter.state
    }

    if (data.filter?.skills && data.filter?.skills.length) {
        payload['filter']['skills'] = data.filter.skills
            .map((sk) => sk.id)
            .join()
    }
    return xhrClient.get(
        `${API_BASE_URL}vendors/excel/download`,
        'application/pdf',
        null,
        'blob',
        payload.filter
    )
}

const getVendorDetailsService = (id) => {
    return xhrClient.get(`${API_BASE_URL}vendors/${id}`)
}

const activateVendorService = async (id) => {
    return await xhrClient.put(
        `${API_BASE_URL}vendors/${id}/status?status=ACTIVE`,
        null
    )
}
const deActivateVendorService = async (id) => {
    return await xhrClient.put(
        `${API_BASE_URL}vendors/${id}/status?status=INACTIVE`,
        null
    )
}

const addVendorService = async (payload) => {
    return await xhrClient.post(
        `${API_BASE_URL}vendors/`,
        null,
        payload,
        null
    )
}

const updateVendorService = async ({ id, payload }) => {
    return await xhrClient.put(
        `${API_BASE_URL}vendors/${id}`,
        null,
        payload,
        null
    )
}

const uploadVendorLogoService = async ({ id, vendorRefNo, formData }) => {
    return await xhrClient.put(
        `${API_BASE_URL}vendors/profile/image?vendorId=${id}&vendorRefNo=${vendorRefNo}`,
        'multipart/form-data',
        formData,
        null
    )
}

const uploadVendorPortfolioService = async ({ id, vendorRefNo, formData }) => {
    return await xhrClient.put(
        `${API_BASE_URL}vendors/profile/portfolio?vendorId=${id}&vendorRefNo=${vendorRefNo}`,
        'multipart/form-data',
        formData,
        null
    )
}

const getVendorCredentialService = async ({ id }) => {
    return xhrClient.get(`${API_BASE_URL}vendors/${id}/credentials`)
}

const updateVendorPasswordService = async ({ vendorId, newPassword }) => {
    return await xhrClient.put(
        `${API_BASE_URL}vendors/${vendorId}/password-change`,
        null,
        newPassword,
        null
    )
}

const getVendorEmailTemplateService = async ({ vendorId }) => {
    return await xhrClient.get(
        `${API_BASE_URL}vendors/${vendorId}/email-template`,
        null,
        null
    )
}

const setVendorEmailTemplateService = async (payload) => {
    return await xhrClient.post(
        `${API_BASE_URL}vendors/${payload.vendorId}/email`,
        null,
        payload,
        null
    )
}

const getVendorStatsService = async ({ vendorId }) => {
    return await xhrClient.get(
        `${JOB_API_BASE_URL}jobs/stats/?userId=${vendorId}&userType=VENDOR`,
        null,
        null
    )
}

export {
    getVendorListService,
    getVendorListDownloadService,
    getVendorDetailsService,
    activateVendorService,
    deActivateVendorService,
    addVendorService,
    uploadVendorLogoService,
    uploadVendorPortfolioService,
    updateVendorService,
    getVendorCredentialService,
    updateVendorPasswordService,
    getVendorEmailTemplateService,
    setVendorEmailTemplateService,
    getVendorStatsService,
}
