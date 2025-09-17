import { xhrClient } from 'app/views/utilities/DataRequest'

import { config } from 'helper/config.js'

const { isProd } = config

const API_BASE_URL = isProd
  ? config.production.api_base_url
  : config.development.api_base_url

const JOB_API_BASE_URL = isProd
    ? config.production.job_api_base_url
    : config.development.job_api_base_url


const getJobListService = (data = {}) => {
    const payload = {
        page: data['pageNumber'],
        size: data['size'],
        clientId: data['clientId'],
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
    if (data.filter?.jobType) {
        payload['filter']['jobType'] = data.filter.jobType
    }
    if (data.filter?.jobTitle) {
        payload['filter']['jobTitle'] = data.filter.jobTitle
    }
    if (data.filter?.jobStatus) {
        payload['filter']['jobStatus'] = data.filter.jobStatus
    }
    if (data.filter?.state) {
        payload['filter']['state'] = data.filter.state
    }

    if (data.filter?.skills && data.filter?.skills.length) {
        payload['filter']['skills'] = data.filter.skills
            .map((sk) => sk.id)
            .join()
    }
    console.log("job filter",payload.filter)
    if(localStorage.getItem('typeOfUser') === "QUALITY_ASSURANCE"){
        return xhrClient.get(
            `${JOB_API_BASE_URL}jobs?page=${payload.page}`,
            null,
            null,
            'json',
            payload.filter
        )
    }
    else{
        return xhrClient.get(
            `${JOB_API_BASE_URL}jobs/?clientId=${payload.clientId}&page=${payload.page}`,
            null,
            null,
            'json',
            payload.filter
        )
    }
   
}

const getJobDetailsService = (payload) => {
    let id = payload
    return xhrClient.get(`${JOB_API_BASE_URL}jobs/${id}`)
}

const getSkillsService = () => {
    return xhrClient.get(`${JOB_API_BASE_URL}skill`, null, null, 'json')
}

const getjobListDownloadService = (payload) => {
    if (payload.filter?.skills && payload.filter?.skills.length) {
        payload['filter']['skills'] = payload.filter.skills
            .map((sk) => sk.id)
            .join()
    }
    return xhrClient.get(
        `${JOB_API_BASE_URL}jobs/excel/download`,
        'application/pdf',
        null,
        'blob',
        payload.filter
    )
}

const addJobService = async (payload) => {
    return await xhrClient.post(`${JOB_API_BASE_URL}jobs/`, null, payload)
}

const updateJobService = async ({ id, payload }) => {
    return await xhrClient.put(`${JOB_API_BASE_URL}jobs/${id}`, null, payload)
}

const unPublishJobService = async ({ id }) => {
    return await xhrClient.put(`${JOB_API_BASE_URL}jobs/${id}/unpublish`, null)
}
const publishJobService = async ({ id }) => {
    return await xhrClient.put(`${JOB_API_BASE_URL}jobs/${id}/publish`, null)
}

const mapJobModulesService = async ({ id, payload }) => {
    return await xhrClient.put(
        `${JOB_API_BASE_URL}jobs/${id}/map/modules`,
        null,
        payload
    )
}

const getApplicantListService = async (payload) => {
    return await xhrClient.get(
        `${JOB_API_BASE_URL}jobs/${payload.id}/applicants`,
        null,
        null,
        'json',
        payload.filter
    )
}

const getApplicantDetailsService = async (payload) => {
    const { jobId, id } = payload
    return xhrClient.get(`${JOB_API_BASE_URL}jobs/${jobId}/applicants/${id}`)
}

const getJobApplicantListDownloadService = (payload) => {
    return xhrClient.get(
        `${JOB_API_BASE_URL}jobs/excel/download`,
        'application/pdf',
        null,
        'blob',
        payload.filter
    )
}

const appproveApplicantService = async ({ jobId, id }) => {
    return await xhrClient.post(
        `${JOB_API_BASE_URL}jobs/${jobId}/applicants/${id}/approve`,
        null
    )
}

const rejectApplicantService = async ({ jobId, id, note }) => {
    return await xhrClient.post(
        `${JOB_API_BASE_URL}jobs/${jobId}/applicants/${id}/reject?notes=${note}`,
        null
    )
}

const getJobCandidateListService = async (payload) => {
    return await xhrClient.get(
        `${JOB_API_BASE_URL}jobs/${payload.id}/candidates`,
        null,
        null,
        'json',
        payload.filter
    )
}

const getJobCandidateDetailService = async (payload) => {
    const { jobId, id } = payload
    return xhrClient.get(`${JOB_API_BASE_URL}jobs/${jobId}/candidates/${id}`)
}

const updateCandidateNotesService = async (payload) => {
    const { jobId, id, notes } = payload
    return await xhrClient.put(
        `${JOB_API_BASE_URL}jobs/${jobId}/candidates/${id}/note`,
        null,
        notes
    )
}

const approveCandidateWorkService = async ({ jobId, id, approveWork }) => {
    return await xhrClient.put(
        `${JOB_API_BASE_URL}jobs/${jobId}/candidates/${id}/approve-work`,
        null,
        approveWork
    )
}

const rejectCandidateWorkService = async ({ jobId, id, jobStatusRemark }) => {
    return await xhrClient.put(
        `${JOB_API_BASE_URL}jobs/${jobId}/candidates/${id}/reject`,
        null,
        { jobStatusRemark: jobStatusRemark }
    )
}

const updateCanidatePaymentStatusService = async ({
    jobId,
    id,
    paymentStatus,
}) => {
    return await xhrClient.post(
        `${JOB_API_BASE_URL}jobs/${jobId}/candidates/${id}/payment`,
        null,
        paymentStatus
    )
}

const updatePayerRemarkService = async ({ jobId, id, payerRemark }) => {
    return await xhrClient.put(
        `${JOB_API_BASE_URL}jobs/${jobId}/candidates/${id}/remark`,
        null,
        { payerRemark }
    )
}

const updateCompleteJobService = async ({ jobId }) => {
    return await xhrClient.put(`${JOB_API_BASE_URL}jobs/${jobId}/complete`, null)
}

const getApplicantRecentWorkService = async ({ userId, userType }) => {
    return xhrClient.get(
        `${JOB_API_BASE_URL}jobs/hkhkhkh/candidates/recent-work?userId=${userId}&userType=${userType}`
    )
}

const getFreelancerDetailService = async ({ userId }) => {
    return xhrClient.get(
        `${API_BASE_URL}freelancer/${userId}`
    )
}

const getVendorDetailService = async ({ userId }) => {
    return xhrClient.get(
        `${API_BASE_URL}vendors/${userId}`
    )
}

export {
    getJobListService,
    getJobDetailsService,
    getSkillsService,
    getjobListDownloadService,
    addJobService,
    updateJobService,
    unPublishJobService,
    publishJobService,
    mapJobModulesService,
    getApplicantListService,
    getApplicantDetailsService,
    getJobApplicantListDownloadService,
    appproveApplicantService,
    rejectApplicantService,
    getJobCandidateListService,
    getJobCandidateDetailService,
    updateCandidateNotesService,
    approveCandidateWorkService,
    rejectCandidateWorkService,
    updateCanidatePaymentStatusService,
    updatePayerRemarkService,
    getApplicantRecentWorkService,
    getFreelancerDetailService,
    getVendorDetailService,
    updateCompleteJobService,
}
