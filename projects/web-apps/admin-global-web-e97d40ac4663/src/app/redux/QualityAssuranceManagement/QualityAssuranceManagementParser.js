import { convertDate } from 'app/views/utilities/DateFormat'
import _get from 'lodash.get'

const qualityAssuranceManagementParsers = {}

qualityAssuranceManagementParsers.qualityAssuranceListParser = (response) => {
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
    const clientsData = (data) => {
        if (data.length) {
            return data.map((item) => {
                return item
            })
        }
        return []
    }
    const parsedData = response.map((res, index) => {
        return {
            id: _get(res, 'id', null),
            firstName: _get(res, 'firstName', ''),
            middleName: _get(res, 'middleName', ''),
            lastName: _get(res, 'lastName', ''),
            fullName: _get(res, 'firstName', '') + ' ' + _get(res, 'lastName', ''),
            qualityAssuranceRefNo: _get(res, 'qualityAssuranceRefNo', ''),
            email: _get(res, 'email', ''),
            mobile: _get(res, 'mobile', null),
            clients: clientsData(_get(res, 'clients', [])),
            status: _get(res, 'qualityControllerStatus', null),
        }
    })
    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}
qualityAssuranceManagementParsers.qualityAssuranceEmailTemplateParser = (response) => {
    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        const parsedData = {
            qualityAssuranceId: _get(response, 'qualityAssuranceId', ''),
            sendTo: _get(response, 'sendTo', ''),
            subject: _get(response, 'subject', ''),
            template: _get(response, 'template', ''),
        }
        return parsedData
    }
}
qualityAssuranceManagementParsers.qualityAssuranceCredentialParser = (response) => {
    if (!response) {
        return {}
    }
    if (response && Object.keys(response).length) {
        const parsedData = {
            id: _get(response, 'id', ''),
            qualityAssuranceId: _get(response, 'qualityAssuranceId', ''),
            qualityAssuranceName: _get(response, 'qualityAssuranceName', ''),
            joiningDate: convertDate(_get(response, 'joiningDate', null)),
            password: _get(response, 'password', ''),
        }
        return parsedData
    }
}
qualityAssuranceManagementParsers.qualityAssuranceDetailsParser = (response) => {
    if (response.content) {
        response = response.content
    }
    if (!response) {
        return {}
    }


    const handleClients = (data) => {
        if (data.length) {
            return data.map((item) => {
               return {
                    address:_get(item,'address',''),
                    adminName:_get(item,'adminName',''),
                    area:_get(item,'area',''),
                    city:_get(item,'city',''),
                    clientId:_get(item,'clientId',''),
                    clientName:_get(item,'clientName',''),
                    country:_get(item,'country',''),
                    email:_get(item,'email',''),
                    headOfficeName:_get(item,'headOfficeName',''),
                    mobile:_get(item,'mobile',''),
                    pinCode:_get(item,'pinCode',''),
                    state:_get(item,'state',''),
                    status:_get(item,'status','')
                }
               
            })
        }
        return []
    }
   

    const qualityAssuranceDetails = {
        clients:handleClients(_get(response,'clients',[])),
        email:_get(response,'email',''),
        firstName:_get(response,'firstName',''),
        lastName:_get(response,'lastName',''),
        middleName:_get(response,'middleName',''),
        mobile:_get(response,'mobile',''),
        qualityControllerStatus:_get(response,'qualityControllerStatus','')
    }

    return qualityAssuranceDetails
}


export { qualityAssuranceManagementParsers }
