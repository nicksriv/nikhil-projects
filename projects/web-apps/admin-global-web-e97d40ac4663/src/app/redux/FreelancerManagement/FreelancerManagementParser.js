import { convertDate } from 'app/views/utilities/DateFormat'
import _get from 'lodash.get'

const freelancerManagementParsers = {}

freelancerManagementParsers.freelancerListParser = (response) => {
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
    const parseAddress = (address) => ({
        city: _get(address, 'city', null),
        country: _get(address, 'country', null),
        location: _get(address, 'location', null),
        pinCode: _get(address, 'pinCode', null),
        state: _get(address, 'state', null),
    })
    const parsedData = response.map((res, index) => {
        return {
            id: _get(res, 'id', null),
            freelancerRefNo: _get(res, 'freelancerRefNo', null),
            firstName: _get(res, 'firstName', ''),
            lastName: _get(res, 'lastName', ''),
            fullName: _get(res, 'firstName', '') + ' ' + _get(res, 'lastName', ''),
            email: _get(res, 'email', ''),
            mobile: _get(res, 'mobile', null),
            address: parseAddress(_get(response, 'address', {})),
            state: _get(res.address, 'state', ''),
            status: _get(res, 'status', null),
            freelancerRating: _get(res, 'freelancerRating', null)
        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}


freelancerManagementParsers.freelancerStatsJobsParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }


    return {
        totalMoneyEarned: _get(response, 'totalMoneyEarned', null),
        totalCompletedJobs: _get(response, 'totalCompletedJobs', null),
        totalInprogressJobs: _get(response, 'totalInprogressJobs', null),
        totalJobs: _get(response, 'totalJobs', null),
        totalCancelJobs: _get(response, 'totalCancelJobs', null),
        amountPaid: _get(response, 'amountPaid', null),
        pendingAmount: _get(response, 'pendingAmount', null),
        totalDisputes: _get(response, 'totalDisputes', null)
    }
}

freelancerManagementParsers.freelancerDetailsParser = (response) => {
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
                    skills: parseSkills(_get(item, 'skills', [])),
                }
                return skillCategoryArray
            })
        }
        return []
    }
    const parseSkills = (data) => {
        if (data.length) {
            return data.map((item) => {
                let skillArray = {
                    id: _get(item, 'id', null),
                    experience: _get(item, 'experience', null),
                    name: _get(item, 'name', null),
                }
                return skillArray
            })
        }
        return []
    }

    const parseAddress = (address) => ({
        city: _get(address, 'city', null),
        country: _get(address, 'country', null),
        location: _get(address, 'location', null),
        pinCode: _get(address, 'pinCode', null),
        state: _get(address, 'state', null),
    })
    const parseBankDetail = (bankDetail) => {
        return {
            bankName: _get(bankDetail, 'bankName', ''),
            accountHolderName: _get(bankDetail, 'accountHolderName', ''),
            accountNumber: _get(bankDetail, 'accountNumber', ''),
            ifscCode: _get(bankDetail, 'ifscCode', ''),
            branch: _get(bankDetail, 'branch', ''),
        }
    }

    const parseWorkDetail = (data) => {
        if (data.length) {
            return data.map((item) => {
                let workDetailArray = {
                    id: _get(item, 'id', null),
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
        skillCategory: skillsCategoryData(_get(response, 'skillCategory', [])),
        basicDetails: {
            firstName: _get(response, 'firstName', ''),
            middleName: _get(response, 'middleName', ''),
            lastName: _get(response, 'lastName', ''),
            mobile: _get(response, 'mobile', ''),
            email: _get(response, 'email', ''),
            address: parseAddress(_get(response, 'address', {})),
            status: _get(response, 'status', ''),

        },
        kycDetail: {
            panNumber: _get(response, 'panNumber', ''),
            adhaarNumber: _get(response, 'adhaarNumber', ''),
        },
        workDetails: parseWorkDetail(_get(response, 'workDetails', [])),
        bankDetail: parseBankDetail(_get(response, 'bankDetail', {})),
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


export { freelancerManagementParsers }
