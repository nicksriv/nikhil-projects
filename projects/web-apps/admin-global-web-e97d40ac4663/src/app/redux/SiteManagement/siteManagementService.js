import { xhrClient } from 'app/views/utilities/DataRequest'
import { config } from 'helper/config.js';
// import StatesCitiesMaster from '../../views/SiteManagement/components/SiteOnBoard/states-cities.json';
// import { de } from 'date-fns/locale';
const { isProd } = config;
// const token = localStorage.getItem('accessToken');
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;

const APIVERSION = "api/v1";

const getAllSiteDetailsService = (data) => {
    const { pageNumber, size, sortBy, sortOrder, clientId } = data;
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites/?clientId=${clientId}&pagination=true&pageNumber=${pageNumber ? pageNumber : ""}&size=${size ? size : ""}&sortBy=${sortBy ? sortBy : ""}&sortOrder=${sortOrder ? sortOrder : ""}`,
        null,
        null,
        'json',
        data.filter);
}
const setSiteDeatilsService = (data) => {
    const { payload } = data;
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/sites`, null, payload);
}
// const getAllStatesCitiesMasterService = () => {
//     return StatesCitiesMaster;
// }
const getStatesDataService = () => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/states`);
}

const getCitiesByStateDataService = (stateName) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/masters/cities?stateName=${stateName}`);
}
const getManagerDetailsService = (data) => {
    const { clientId, userId } = data;
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites/employee/${userId}/client/${clientId}`);
}
const getIndividualSiteService = (siteId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites/${siteId}`);
}
const setIndividualSiteService = (siteId, data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/sites/${siteId}`, null, data);
}
const getSiteTemplateService = () => {
     return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites/bulkupload/template`, 'application/pdf', null, 'blob');
    // fetch(`${API_ENDPOINT}${APIVERSION}/sites/bulkupload/template`, {
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
    //         link.setAttribute('download', 'SiteTemplate.xls',);

    //         // Append to html link element page
    //         document.body.appendChild(link);

    //         // Start download
    //         link.click();

    //         // Clean up and remove the link
    //         link.parentNode.removeChild(link);
    //     })
}
const setSiteTemplateService = (clientId, data, reqConfig) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/sites/${clientId}/bulkupload`, null, data);
}
const setExcelSheetService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/sites/${clientId}/download?paginationRequired=false`, 'application/pdf', null, 'blob');
    // fetch(`${API_ENDPOINT}${APIVERSION}/sites/${clientId}/download?paginationRequired=false`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/pdf',
    //     },
    // })
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'SiteTable.xls',);

    //         // Append to html link element page
    //         document.body.appendChild(link);

    //         // Start download
    //         link.click();

    //         // Clean up and remove the link
    //         link.parentNode.removeChild(link);
    //     })
}
export {
    getAllSiteDetailsService,
    setSiteDeatilsService,
    //getAllStatesCitiesMasterService,
    getStatesDataService,
    getCitiesByStateDataService,
    getManagerDetailsService,
    getIndividualSiteService,
    setIndividualSiteService,
    getSiteTemplateService,
    setSiteTemplateService,
    setExcelSheetService
};