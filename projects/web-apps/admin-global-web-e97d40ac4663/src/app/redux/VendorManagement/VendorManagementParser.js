import { convertDate } from 'app/views/utilities/DateFormat'
import _get from 'lodash.get'
import { commonParsers } from '../commonParsers'
const vendorManagementParser = {}

vendorManagementParser.vendorListParser = (response) => {
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
    const parsedData = response.map((response) => {
        return {
            id: _get(response, 'id', null),
            vendorName: _get(response, 'vendorName', null),
            vendorRefNo: _get(response, 'vendorRefNo', null),
            state: _get(response, 'address.state', null),
            status: _get(response, 'status', null),
            skills: parseSkills(_get(response, 'skills', [])),
            joinedAt: convertDate(_get(response, 'createdAt', '')),
        }
    })

    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

vendorManagementParser.vendorDetailsParser = (response) => {
    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        const parsedData = {
            id: _get(response, 'id', ''),
            vendorRefNo: _get(response, 'vendorRefNo', ''),
            vendorName: _get(response, 'vendorName', ''),
            companyIncorporatedAt: _get(
                response,
                'companyIncorporatedAt',
                ''
            )?.slice(0, 10),
            profileImage: _get(response, 'companyLogo', ''),
            locationGps: _get(response, 'locationGps', ''),
            experienceInYear: _get(response, 'experienceInYear', ''),
            workDetails: _get(response, 'workHighlights', ''),
            portfolioUrl: _get(response, 'portfolioUrl', ''),
            status: _get(response, 'status', ''),
            profileCompletionPercentage: _get(
                response,
                'profileCompletionPercentage',
                ''
            ),
            notificationId: _get(response, 'notificationId', ''),
            vendorRating: _get(response, 'vendorRating', ''),
            profileCompleted: _get(response, 'profileCompleted', ''),
            skillCategory: commonParsers.skillsCategoryData(
                _get(response, 'skillCategory', [])
            ),
            address: commonParsers.parseAddress(_get(response, 'address', {})),
            bankDetail: commonParsers.parsedBankDetail(
                _get(response, 'bankDetail', {})
            ),
            spocDetail: commonParsers.parsedSpocDetail(
                _get(response, 'spocDetail', '')
            ),
            gpsLocation: commonParsers.parsedGpsLocation(
                _get(response, 'gpsLocation', {})
            ),
        }
        return parsedData
    }
}

vendorManagementParser.vendorCredentialParser = (response) => {
    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        const parsedData = {
            vendorRefNo: _get(response, 'userName', ''),
            vendorId: _get(response, 'vendorId', ''),
            joiningDate: convertDate(_get(response, 'createdAt', '')),
            password: _get(response, 'password', ''),
        }
        return parsedData
    }
}

vendorManagementParser.vendorEmailTemplateParser = (response) => {
    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        const parsedData = {
            vendorId: _get(response, 'vendorId', ''),
            sendTo: _get(response, 'sendTo', ''),
            subject: _get(response, 'subject', ''),
            template: _get(response, 'template', ''),
        }
        return parsedData
    }
}

vendorManagementParser.vendorStatsParser = (response) => {
    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        const parsedData = {
            totalMoneyEarned: _get(response, 'totalMoneyEarned', ''),
            totalCompletedJobs: _get(response, 'totalCompletedJobs', ''),
            totalInprogressJobs: _get(response, 'totalInprogressJobs', ''),
            totalJobs: _get(response, 'totalJobs', ''),
            totalCancelJobs: _get(response, 'totalCancelJobs', ''),
            amountPaid: _get(response, 'amountPaid', ''),
            pendingAmount: _get(response, 'pendingAmount', ''),
            totalDisputes: _get(response, 'totalDisputes', ''),
        }
        return parsedData
    }
}
export default vendorManagementParser
