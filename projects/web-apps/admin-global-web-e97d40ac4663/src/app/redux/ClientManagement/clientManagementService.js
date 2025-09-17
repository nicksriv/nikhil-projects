import { xhrClient } from 'app/views/utilities/DataRequest'
//..BELOW IS THE MOCK DATA FOR STATES AND CITIES.
//..TODO::WILL CHANGE IT TO API CALL ONCE API WILL READY
//import StatesCitiesMaster from '../../views/ClientManagment/components/ClientOnboard/states-cities.json'
import { config } from 'helper/config.js';
const { isProd } = config;
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

const APIVERSION = "api/v1";
//..GET ALL CLIENTS
const getAllClientsService = (data) => {
    return xhrClient.get(
        `${API_ENDPOINT}${APIVERSION}/clients?pageNumber=${data.pageNumber}&size=${data.size}${
            data.sortBy ? `&sortBy=${data.sortBy}` : ''
        }${data.sortOrder ? `&sortOrder=${data.sortOrder}` : ''}`,
        null,
        null,
        'json',
        data.filter
    )
}
//..GET ONLY ACTIVE AND DRAFTED CLIENTS
const getClientsService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients?paginationRequired=false`)
}

//..GET SELECTED CLIENT LOGO
const getClientLogo = (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${id}/logo`)
}
//..GET MASTERS MODULES
const getAllModulesService = async (data) => {
    const res = await xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/modules`)
    console.log("rrrrr",res)
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/modules`)
}
//..GET ALL STATES CITIES MASTER DATA
// const getAllStatesCitiesMasterService = (data) => {
//     return StatesCitiesMaster
// }
const getStatesDataService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/states`);
}
const getCitiesByStateDataService = (stateName) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/cities?stateName=${stateName}`);
}
//..GET SELECTED CLIENT DETAILS
const getClientDetailsByIdService = (clientId) => {
    const res = xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}`)
    return res;
}
//..GET SELECTED CLIENT MODULES
const getClientModulesByIdService = (clientId) => {
    const res = xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/modules`)
    return res;
}
//..GET SELECTED CLIENT PRIVILEGE
const getClientPrivilegeByIdService = (clientId) => {
    const res = xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/privileges`)
    return res;
}
//..POST NEW CLIENT DETAILS
const postClientDetailsService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients`, null, data)
}
//..POST CLIENT LOGO
const postClientLogoService = (logo,id) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${id}/logo`,null,logo)
}
//..UPDATE CLIENT DETAILS
const putClientDetailsService = (data, clientId) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}`, null, data)
}
//..POST SELECTED CLIENT MODULES
const postClientModulesService = (data, clientId) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/modules`, null, data)
}
//..PUT CREATE/UPDATE CLIENT PRIVILEGES
const putClientPrivilegesService = (data, clientId) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/privileges`, null, data)
}
//..DELETE CLIENT BY ID
const deleteClientService = (_id) => {
    return xhrClient.delete(`${API_ENDPOINT}${APIVERSION}/clients/${_id}`)
}
//..GET CLIENT CREDENTIALS BY ID
const getClientCredentialsService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/credentials`)
}
//..CHANGE CLIENT PASSWORD
const changeClientPasswordService = (data) => {
    return xhrClient.put(
        `${API_ENDPOINT}${APIVERSION}/clients/${data.clientId}/password-change`,
        null,
        data.newPassword
    )
}

//..GET ALL CLIENTS DETAILS

const getAllClientsDetailsService = (clientId, clientName, headOfficeName, state, status, from, to, area) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/download?clientId=${clientId}&clientName=${clientName}&headOfficeName=${headOfficeName?headOfficeName:''}&state=${state}&status=${status}&from=${from}&to=${to}&area=${area?area:''}`, null ,null, 'blob')
    //.then((responce)=> response.blob())
    .then((blob)=>{
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ClientDetails.xls',);
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);
    })
    
}
const getEmailTemplateService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/email-template`);
}
const setEmailTemplateService = (clientId, data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/email-template`, null, data);
}
// const setClientLogoService = (file) => {
//     return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/upload-image`, null, file);
// }
const setClientLogoService = (file) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/files/upload?fileType=LOGO`, null, file );
}
const setClientBackgroundService = (file) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/files/upload?fileType=IMAGE`, null, file);
}
const setUploadDocumentService = (file) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/files/upload?fileType=DOCUMENT`, null, file);
}

const setUploadVideoFileService = (file) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/files/upload?fileType=VIDEO`, null, file);
}
// const getClientHeaderLogoService = (clientIdForUserLogo) => {
//     return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/files/${clientIdForUserLogo}`, null, null,'blob' );
// }
const deactivateClientService = async ({ id }) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${id}/status?status=INACTIVE`, null);
}

const activateClientService = async ({ id }) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/clients/${id}/status?status=ACTIVE`, null);
  }

const getAssignQualityAssuranceService = async (id) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${id}/assign/qualityAssurance`);
}
export {
    getAllClientsService,
    getClientsService,
    getClientLogo,
    getAllModulesService,
    //getAllStatesCitiesMasterService,
    getClientDetailsByIdService,
    getClientModulesByIdService,
    getClientPrivilegeByIdService,
    postClientDetailsService,
    postClientLogoService,
    putClientDetailsService,
    postClientModulesService,
    putClientPrivilegesService,
    deleteClientService,
    getClientCredentialsService,
    changeClientPasswordService,
    getAllClientsDetailsService,
    getEmailTemplateService,
    setEmailTemplateService,
    setClientLogoService,
    //getClientHeaderLogoService,
    getStatesDataService,
    getCitiesByStateDataService,
    getAssignQualityAssuranceService,
    setClientBackgroundService,
    setUploadDocumentService,
    setUploadVideoFileService,
    deactivateClientService,
    activateClientService
}
