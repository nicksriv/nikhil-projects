import { convertDate } from 'app/views/utilities/DateFormat'
import globalConstants from 'helper/constants.js'
import _get from 'lodash.get'


const disputeManagementParsers = {}

disputeManagementParsers.disputeListParser = (response) => {
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
            id: _get(res, 'id', ''),
            disputeCategoryId: _get(res, 'disputeCategoryId', ''),
            disputeRefNo: _get(res, 'disputeRefNo', ''),
            disputeTitle: _get(res, 'disputeTitle', ''),
            clientId: _get(res, 'clientId', ''),
            clientName: _get(res, 'clientName', ''),
            userId: _get(res, 'userId', ''),
            raisedBy: _get(res, 'raisedBy', ''),
            raisedAt:convertDate(_get(res, 'raisedAt', '')),
            disputeStatus:globalConstants.disputeStatus[_get(res, 'disputeStatus', '')],
            userType:globalConstants.userType[_get(res, 'userType', null)],

        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

disputeManagementParsers.disputeDetailsParser = (response) => {
    console.log("dispute parser res", response)

    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        return {
            id: _get(response, 'id', ''),
            disputeRefNo: _get(response, 'disputeRefNo', ''),
            disputeTitle: _get(response, 'disputeTitle', ''),
            disputeDescription: _get(response, 'disputeDescription', ''),
            clientName: _get(response, 'clientName', ''),
            mobile: _get(response, 'mobile', ''),
            email: _get(response, 'email', ''),
            raisedBy: _get(response, 'raisedBy', ''),
            raisedAt:convertDate(_get(response, 'raisedAt', '')),
            disputeStatus: _get(response, 'disputeStatus', ''),
            closedRemark: _get(response, 'closedRemark', null)
        }
    }
}

export { disputeManagementParsers }
