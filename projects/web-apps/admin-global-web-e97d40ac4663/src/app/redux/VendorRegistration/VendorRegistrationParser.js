import _get from 'lodash.get'

const vendorRegistrationParser = {}

vendorRegistrationParser.vendorRegistrationListParser = (response) => {
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
    
    const parsedData = response.map((response) => {
        return {
            id:_get(response,'id',null),
            jobId: _get(response, 'jobId', null),
            name: _get(response, 'vendorName', ''),
            mobile:_get(response,'mobileNo',null),
            email:_get(response,'email',''),
            vendorRequestStatus:_get(response,'vendorRequestStatus',''),
            userNote:_get(response,'userNote',null),
            actions:_get(response,'actions',true)
        }
    })

    return {
        list: parsedData,
        totalElements,
        totalPages,
        size,
    }
}

vendorRegistrationParser.assignVendorListParser = (response) => {
   
    if (!response) {
        return []
    }
    return response.map((response, i) => {
        return {
            vendorId: _get(response, 'vendorId', ''),
            vendorName: _get(response, 'vendorName', ''),
            email: _get(response, 'email', ''),
            mobile: _get(response, 'mobile', ''),
            select:_get(response,'select',true),
        }
    })
}


export default vendorRegistrationParser
