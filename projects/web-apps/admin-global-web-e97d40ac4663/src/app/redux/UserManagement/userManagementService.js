import { xhrClient } from 'app/views/utilities/DataRequest';

//..BELOW IS THE MOCK DATA FOR STATES AND CITIES.
//..TODO::WILL CHANGE IT TO API CALL ONCE API WILL READY
//import StatesCitiesMaster from '../../views/ClientManagment/components/ClientOnboard/states-cities.json';
import { config } from 'helper/config.js';

const { isProd } = config;

const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const APIVERSION = "api/v1";
// const token = localStorage.getItem('accessToken');
//..GET ALL USERS
const getAllUsersService = (data) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${data.clientId}/users?pageNumber=${data.pageNumber}&size=${data.size}${data.sortBy ? `&sortBy=${data.sortBy}` : ''}${data.sortOrder ? `&sortOrder=${data.sortOrder}` : ''}`, null, null, "json", data.filter);
}
//..GET USER CREDENTIALS BY ID
const getUserCredentialsService = (userId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/users/${userId}/credentials`);
}
//..DELETE USER
const deleteUserService = (_id) => {
    return xhrClient.delete(`${API_ENDPOINT}${APIVERSION}/users/${_id}`);
}
//..GET ALL STATES CITIES MASTER DATA
// const getAllStatesCitiesMasterService = (data) => {
//     return StatesCitiesMaster;
// }
//..GET All USERS BY CLIENT ID
const getAllUsersByClientIdService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/users`);
}
//..POST USERS BASIC DETAILS BY CLIENT ID
const postUserBasicDetailsByClientIdService = (clientId, data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/users`, null, data);
}
//..GET SELECTED USER DETAILS
const getUserBasicDetailsByIdService = (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/users/${id}`);
}
//..PUT SELECTED USER DETAILS
const putUserBasicDetailsByIdService = (id, data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/users/${id}`, null, data);
}
//..DELETE USER BY ID
const deleteUserByIdService = (id, data) => {
    return xhrClient.delete(`${API_ENDPOINT}${APIVERSION}/users/${id}`);
}
//..GET USER BANK DETAILS
const getUserBankDetailsByIdService = (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/users/${id}/banks`);
}
//..GET BANK MASTER
const getBankMasterService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/banks`);
}
//..PUT USER BANK DETAILS
const putUserBankDetailsByIdService = (id, data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/users/${id}/banks`, null, data);
}
//..GET USER EMPLOYEE DETAILS
const getUserEmployeeDetailsByIdService = (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/users/${id}/employee`);
}
//..PUT USER EMPLOYEE DETAILS
const putUserEmployeeDetailsByIdService = (id, data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/users/${id}/employee`, null, data);
}
//..GET USER LOCATION DETAILS
const getUserLocationDetailsByIdService = (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/users/${id}/locations`);
}
//..PUT USER LOCATION DETAILS
const putUserLocationDetailsByIdService = (id, data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/users/${id}/locations`, null, data);
}
//..GET ALL STORES BY CLIENT ID
const getAllStoresByClientIdService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/stores`);
}
//..GET List Of Location ID
const getListOfLocationIdService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites?clientId=${clientId}&paginationRequired=false`)
}
//..GET STORE DETAILS BY LOCATION ID
const getLocationDetailsService = (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites/${id}`)
}
//..POST ALL STORES BY CLIENT ID
const postStoresByClientIdService = (clientId, data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/stores`, null, data);
}
//..GET ALL ROLES BY CLIENT ID
const getAllRolesByClientIdService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/roles/client/${clientId}?pagination=false`);
}
//..POST ALL ROLES BY CLIENT ID
const postRolesByClientIdService = (clientId, data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/roles`, null, data);
}
//..CHANGE USER PASSWORD
const changeUserPasswordService = (data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/users/${data.userId}/reset?newPassword=${data.newPassword}`, null);
}
//..GET DOWNLOAD TEMPLATE TO BULK UPLOAD
const getTemplateService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/bulk-upload`, 'application/pdf', null, 'blob');
    // fetch(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/bulk-upload`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/pdf',
    //         'Authorization': `Bearer ${token}`
    //     },
    // })
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'UserTemplate.xls',);

    //         // Append to html link element page
    //         document.body.appendChild(link);

    //         // Start download
    //         link.click();

    //         // Clean up and remove the link
    //         link.parentNode.removeChild(link);
    //     })
}
const getSiteMappingTemplateService = (type)=>{
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/location-mapping-download?fileType=${type}`,'application/pdf',null,'blob');
}

const getAllUsersDownloadService = (clientId, newData) => {
    const {employeeName,employeeId,reportingManager,role,gender,status,contactNumber,mappedStore,ageFrom,ageTo,from,to} = newData;
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/users-download?employeeName=${employeeName?employeeName:""}&employeeId=${employeeId?employeeId:''}&reportingManager=${reportingManager?reportingManager:''}&role=${role?role:''}&gender=${gender?gender:''}&status=${status?status:''}&contactNumber=${contactNumber?contactNumber:''}&mappedStore=${mappedStore?mappedStore:''}&ageFrom=${ageFrom?ageFrom:''}&ageTo=${ageTo?ageTo:''}&from=${from?from:''}&to=${to?to:''}`,'application/pdf', null, 'blob');
}
//..POST: UPLOAD XLS/ODS FILE TO USER BULK UPLOAD 
const postUploadUsersService = (clientId, data, reqConfig) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/users/${clientId}/bulk-upload`, null, data);
}

// POST:UPLOAD MAP SITE UPLOAD
const putUploadSiteMapService = (clientId, data, reqConfig) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/upload-user-location-mapping`, null, data);
}

const getUserEmailTemplateService = (user_id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/users/${user_id}/email-template`)
}
const setUserEmailTemplateService = (user_id, data) => {
    const { payload } = data;
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/users/${user_id}/email-template`, null, payload)
}
const getStatesDataService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/states`);
}

const getCitiesByStateDataService = (stateName) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/cities?stateName=${stateName}`);
}
export {
    getAllUsersService,
    getUserCredentialsService,
    deleteUserService,
    getStatesDataService,
    getCitiesByStateDataService,
    //getAllStatesCitiesMasterService,
    getAllUsersByClientIdService,
    postUserBasicDetailsByClientIdService,
    getUserBasicDetailsByIdService,
    putUserBasicDetailsByIdService,
    deleteUserByIdService,
    getUserBankDetailsByIdService,
    getBankMasterService,
    putUserBankDetailsByIdService,
    getUserEmployeeDetailsByIdService,
    putUserEmployeeDetailsByIdService,
    getUserLocationDetailsByIdService,
    putUserLocationDetailsByIdService,
    getAllStoresByClientIdService,
    postStoresByClientIdService,
    getAllRolesByClientIdService,
    postRolesByClientIdService,
    changeUserPasswordService,
    getTemplateService,
    getSiteMappingTemplateService,
    postUploadUsersService,
    putUploadSiteMapService,
    getUserEmailTemplateService,
    setUserEmailTemplateService,
    getListOfLocationIdService,
    getLocationDetailsService,
    getAllUsersDownloadService
};
