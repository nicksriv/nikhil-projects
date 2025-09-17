import { convertDate } from 'app/views/utilities/DateFormat'
import globalConstants from 'helper/constants.js'
import _get from 'lodash.get'
import { capitalizeFirstLetter } from 'helper/utils'
import { commonParsers } from '../commonParsers'
import { dateTimeHelper } from '../../../helper/dateTime';

const jobManagementParsers = {}

jobManagementParsers.jobListParser = (response) => {
    let totalElements = 0
    let totalPages = 0
    let size = 0
    if (response.content) {
        totalElements = response.totalElements
        totalPages = response.totalPages
        size = response.size
        response = response.content
    }
    if (!response) {
        return {
            list: [],
            totalElements,
            totalPages,
            size,
        }
    }

    const parseSkills = (skills) => skills.map((sk) => sk['name'] || 'NA')
    const parsedData = response.map((res, index) => {
        return {
            id: _get(res, 'id', null),
            jobTitle: _get(res, 'jobTitle', null),
            jobRefNo: _get(res, 'jobRefNo', null),
            jobType:globalConstants.jobType[(_get(res, 'jobType', null))],
            skills: parseSkills(_get(res, 'skills', [])),
            state: _get(res, 'address.state', null),
            status:globalConstants.jobStatus[_get(res, 'status', null)],
            jobStatus: globalConstants.jobStatus[_get(res, 'jobStatus', null)],
            jobApplicant: true,
            jobCandidate: true,
        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

jobManagementParsers.jobDetailParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }
    const parseJobTiming = (jobTiming) => ({
        durationOfWork: _get(jobTiming, 'durationOfWork', null),
        durationOfWorkType: _get(jobTiming, 'durationOfWorkType', null),
        hourRequired: _get(jobTiming, 'hourRequired', null),
        hourRequiredPer: _get(jobTiming, 'hourRequiredPer', null),
        jobDays: _get(jobTiming, 'jobDays', []),
        shiftEndTime: _get(jobTiming, 'shiftEndTime', null),
        shiftStartTime: _get(jobTiming, 'shiftStartTime', null),
    })
    const parsedJobVisibility = (jobVisibility) => ({
        visibilityType: _get(jobVisibility, 'visibilityType', null),
        visibilityValue: _get(jobVisibility, 'visibilityValue', null),
        isVisibleToVendor: _get(jobVisibility, 'isVisibleToVendor', null),
        isVisibleToFreelancer: _get(
            jobVisibility,
            'isVisibleToFreelancer',
            null
        ),
    })
    const parsedBilling = (billing) => ({
        number: _get(billing, 'number', null),
        type: _get(billing, 'type', null),
    })

    return {
        id: _get(response, 'id', null),
        jobRefNo: _get(response, 'jobRefNo', null),
        clientId: _get(response, 'clientId', null),
        jobTitle: _get(response, 'jobTitle', null),
        jobShortDescription: _get(response, 'jobShortDescription', null),
        jobDescription: _get(response, 'jobDescription', null),
        experienceLevel: _get(response, 'experienceLevel', null),
        jobType: _get(response, 'jobType', null),
        projectType: _get(response, 'projectType', null),
        billing: parsedBilling(_get(response, 'billing', null)),
        totalJobApplicant: _get(response, 'totalJobApplicant', null),
        totalJobCandidate: _get(response, 'totalJobCandidate', null),
        publishStatus: _get(response, 'publishStatus', null),
        jobStatus: _get(response, 'jobStatus', null),
        jobStatusReason: _get(response, 'jobStatusReason', null),
        highlights: _get(response, 'highlights', []),
        deliverables: _get(response, 'deliverables', []),
        skills: commonParsers.parseSkills(_get(response, 'skills', [])),
        skillCategories: commonParsers.skillsCategoryData(
            _get(response, 'skillCategories', [])
        ),
        modules: _get(response, 'modules', []),
        address: commonParsers.parseAddress(_get(response, 'address', {})),
        jobTiming: parseJobTiming(_get(response, 'jobTiming', {})),
        jobVisibility: parsedJobVisibility(_get(response, 'jobVisibility', {})),
        locationGps: commonParsers.parsedGpsLocation(_get(response, 'locationGps', {})),
        jobDraftJson: _get(response, 'jobDraftJson', {}),
    }
}

jobManagementParsers.skillsListParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return []
    }
    return response.map((e, idx) => ({
        id: _get(e, 'id', ''),
        name: _get(e, 'name', ''),
        experience: _get(e, 'experience', ''),
    }))
}

jobManagementParsers.applicantListParser = (response) => {
    let totalElements = 0
    let totalPages = 0
    let size = 0
    if (response.content) {
        totalElements = response.totalElements
        totalPages = response.totalPages
        size = response.size
        response = response.content
    }
    if (!response) {
        return {
            list: [],
            totalElements,
            totalPages,
            size,
        }
    }
    const parsedData = response.map((res, index) => {
        return {
            id: _get(res, 'id', null),
            jobId: _get(res, 'jobId', null),
            jobTitle: _get(res, 'jobTitle', null),
            applicantName: _get(res, 'applicantName', null),
            userType:globalConstants.userType[_get(res, 'userType', null)],
            userNote: _get(res, 'userNote', null),
            jobApplicationStatus:globalConstants.jobApplicationStatus[ _get(res, 'jobApplicationStatus', null)],
            jobApplicationAt:dateTimeHelper.format(_get(res, 'jobApplicationAt', null)),
            jobAplicationStatusReason: _get(
                res,
                'jobAplicationStatusReason',
                null
            ),
        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

jobManagementParsers.applicantDetailParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }
    const skillsCategoryData = (data) => {
        if (data.length) {
            return data.map((item) => {
                let skillCategoryArray = {
                    id: _get(item, 'id', ''),
                    name: _get(item, 'name', ''),
                    experience: _get(item, 'experience', ''),
                    skills: skills(_get(item, 'skills', [])),
                }
                return skillCategoryArray
            })
        }
        return []
    }

    const skills = (data) => {
        if (data.length) {
            return data.map((item) => {
                let skillArray = {
                    id: _get(item, 'id', ''),
                    name: _get(item, 'name', ''),
                    experience: _get(item, 'experience', ''),
                }
                return skillArray
            })
        }
        return []
    }
    return {
        applicantName: _get(response, 'applicantName', ''),
        id: _get(response, 'id', ''),
        jobApplicationAt: _get(response, 'jobApplicationAt', ''),
        jobApplicationStatus: _get(response, 'jobApplicationStatus', ''),
        userNote: _get(response, 'userNote', ''),
        userType: _get(response, 'userType', ''),
        userId: _get(response, 'userId', ''),
        jobAplicationStatusReason: _get(
            response,
            'jobAplicationStatusReason',
            ''
        ),

        applicantRating: _get(response, 'applicantRating', ''),
        profileImage: _get(response, 'profileImage', ''),
        basicDetails: {
            firstName: _get(response, 'firstName', ''),
            middleName: _get(response, 'middleName', ''),
            lastName: _get(response, 'lastName', ''),
            mobile: _get(response, 'mobile', ''),
            email: _get(response, 'email', ''),
        },
        skillCategory: skillsCategoryData(_get(response, 'skillCategory', [])),
    }
}

jobManagementParsers.jobCandidateListParser = (response) => {
    let totalElements = 0
    let totalPages = 0
    let size = 0
    if (response.content) {
        totalElements = response.totalElements
        totalPages = response.totalPages
        size = response.size
        response = response.content
    }
    if (!response) {
        return {
            list: [],
            totalElements,
            totalPages,
            size,
        }
    }
    const parsedData = response.map((res, index) => {
        return {
            id: _get(res, 'id', null),
            jobId: _get(res, 'jobId', null),
            jobTitle: _get(res, 'jobTitle', null),
            candidateName: _get(res, 'candidateName', null),
            userType:globalConstants.userType[_get(res, 'userType', null)],
            jobStatus:globalConstants.jobStatus[_get(res, 'jobStatus', null)],
            jobStatusRemark: _get(res, 'jobStatusRemark', null),
            amountStatus: globalConstants.amountStatus[_get(res, 'amountStatus', null)],
            totalHoursWorked: _get(res, 'totalHoursWorked', null),
            amountPaid: _get(res, 'amountPaid', null),
            createdAt: _get(res, 'createdAt', null),
            jobRating: _get(res, 'jobRating', null),
        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

jobManagementParsers.jobCandidateDetailParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }

    return {
        id: _get(response, 'id', null),
        clientId: _get(response, 'clientId', null),
        jobId: _get(response, 'jobId', null),
        userId: _get(response, 'userId', null),
        userType: _get(response, 'userType', null),
        jobTitle: _get(response, 'jobTitle', null),
        jobStatus: _get(response, 'jobStatus', null),
        jobStatusRemark: _get(response, 'jobStatusRemark', null),
        jobUserRemark: _get(response, 'jobUserRemark', null),
        jobApproverRemark: _get(response, 'jobApproverRemark', null),
        jobApproverRemarkAt: _get(response, 'jobApproverRemarkAt', null),
        jobRating: _get(response, 'jobRating', null),
        jobRatingDescription: _get(response, 'jobRatingDescription', null),
        totalHoursWorked: _get(response, 'totalHoursWorked', null),
        totalEarned: _get(response, 'totalEarned', null),
        amountPaid: _get(response, 'amountPaid', null),
        amountStatus: _get(response, 'amountStatus', null),
        payerRemark: _get(response, 'payerRemark', null),
        jobDetails: _get(response, 'jobDetails', null),
        createdAt: _get(response, 'createdAt', null),
        modules: _get(response, 'modules', []),
    }
}

jobManagementParsers.jobApplicantRenectWorkParser = (response) => {
    let totalElements = 0
    let totalPages = 0
    let size = 0
    if (response.content) {
        totalElements = response.totalElements
        totalPages = response.totalPages
        size = response.size
        response = response.content
    }
    if (!response) {
        return {
            list: [],
            totalElements,
            totalPages,
            size,
        }
    }
    const parsedData = response.map((res, index) => {
        return {
            jobTitle: _get(res, 'jobTitle', null),
            jobStatus:globalConstants.jobStatus[_get(res, 'jobStatus', null)],
            jobRating: _get(res, 'jobRating', null),
        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

jobManagementParsers.freelancerDetailParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }

    const parseWorkDetail = (data) => {
        if (data.length) {
            return data.map((item) => {
                let workDetailArray = {
                    id:_get(item,'id',null),
                    company: _get(item, 'company', ''),
                    designation: _get(item, 'designation', ''),
                    workDescription: _get(item, 'workDescription', ''),
                    startDate: convertDate(_get(item, 'startDate', '')),
                    endDate: convertDate(_get(item, 'endDate', '')),
                }
                return workDetailArray
            })
        }
        return []
    }

    const profileData = {
        id: _get(response, 'id', ''),
        freelancerRefNo: _get(response, 'freelancerRefNo', ''),
        skillCategory: commonParsers.skillsCategoryData(_get(response, 'skillCategory', [])),
        basicDetails: {
            firstName: _get(response, 'firstName', ''),
            middleName: _get(response, 'middleName', ''),
            lastName: _get(response, 'lastName', ''),
            mobile: _get(response, 'mobile', ''),
            email: _get(response, 'email', ''),
            address: commonParsers.parseAddress(_get(response, 'address', {})),
        },
        kycDetail: {
            panNumber: _get(response, 'panNumber', ''),
            adhaarNumber: _get(response, 'adhaarNumber', ''),
        },
        workDetails: parseWorkDetail(_get(response, 'workDetails', [])),
        bankDetail: commonParsers.parsedBankDetail(_get(response, 'bankDetail', {})),
        gpsLocation: _get(response, 'gpsLocation', ''),
        profileCompletionPercentage: _get(
            response,
            'profileCompletionPercentage',
            ''
        ),
        education: _get(response, 'education', ''),
        experienceInYear: _get(response, 'experienceInYear', ''),
        portfolioUrl: _get(response, 'resumeUrl', ''),

        freelancerRating: _get(response, 'freelancerRating', ''),
        appVersion: _get(response, 'appVersion', ''),
        profileImage: _get(response, 'profileImage', ''),
    }
    return profileData
}

jobManagementParsers.vendorDetailParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }

    const profileData = {
        id: _get(response, 'id', ''),
        vendorRefNo: _get(response, 'vendorRefNo', ''),
        vendorName: _get(response, 'vendorName', ''),
        companyIncorporatedAt: _get(response, 'companyIncorporatedAt', ''),
        skillCategory: commonParsers.skillsCategoryData(_get(response, 'skillCategory', [])),
        profileImage: _get(response, 'companyLogo', ''),
        locationGps: _get(response, 'locationGps', ''),
        address: commonParsers.parseAddress(_get(response, 'address', {})),
        experienceInYear: _get(response, 'experienceInYear', ''),
        workDetails: _get(response, 'workHighlights', ''),
        portfolioUrl: _get(response, 'portfolioUrl', ''),
        spocDetail: commonParsers.parsedSpocDetail(_get(response, 'spocDetail', '')),
        profileCompletionPercentage: _get(
            response,
            'profileCompletionPercentage',
            ''
        ),
        notificationId: _get(response, 'notificationId', ''),
        vendorRating: _get(response, 'vendorRating', ''),
        profileCompleted: _get(response, 'profileCompleted', ''),
        gpsLocation: commonParsers.parsedGpsLocation(_get(response, 'gpsLocation', {})),
    }
    return profileData
}

jobManagementParsers.jobModuleParser = (response) => {
    if (response.modules) {
        response = response.modules
    }
    if (!response) {
        return []
    }
    return response.map((response, i) => {
        return {
            name: _get(response, 'name', null),
            id: _get(response, 'id', null),
            icon: _get(response, 'icon', null),
            status: _get(response, 'status', null),
            roles: _get(response, 'roles', null),
            workFlowId: _get(response, 'workFlowId', null),
            moduleColor: _get(response, 'moduleColor', null),
            subModules: _get(response, 'subModules', []),
        }
    })
}

export { jobManagementParsers }
