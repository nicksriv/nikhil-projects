import { xhrClient } from 'app/views/utilities/DataRequest';
import { config } from 'helper/config.js';
const { isProd } = config;
//..SCREENBUILDER ENDPOINT 
const API_ENDPOINT = isProd
    ? config.production.screenbuilder_api_endpoint
    : config.development.screenbuilder_api_endpoint;

const APIVERSION = "screenbuilder/api/v1";
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";

//GET CLIENT MODULES
const getClientModulesService = (data) => {
    const { clientId } = data;
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/modules`);
}
//SAVE INITIAL REPORTS FROM ADD POPUP
const saveReportService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations`, null, data);
}
//GET ALL COLUMNS FOR CUSTOM COLUMNS FIELD
const getReportColumnsService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations/columns`, null, data);
}
//..GET CLIENT ROLES BY CLIENT ID 
const getClientRolesByIdService = (clientId) => {
    return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/roles/client/${clientId}?pagination=false`);
}
//UPDATE INDIVIDUAL REPORT DATA
const updateReportsDataService = (data, reportId) => {
    return xhrClient.put(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/dynamic/reportconfigurations/${reportId}`, null, data);
}
//DELETE REPORT RECORD FROM TABLE
const deleteReportService = (reportId) => {
    return xhrClient.delete(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/dynamic/reportconfigurations/${reportId}`);
}
//GET REPORTS LIST FOR TABLE
const getAllReportsDataService = (clientId, pageNumber, size, sortBy, sortOrder, filter) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations?clientId=${clientId}&pagination=true&pageNumber=${pageNumber ? pageNumber : ""}&size=${size ? size : ""}&sortBy=${sortBy ? sortBy : ""}&sortOrder=${sortOrder ? sortOrder : ""}`,
        null,
        null,
        'json',
        filter
    );
}
//GET COLUMNS BY REPORT ID
const getColumnsByIdService = (reportId) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations/${reportId}/columns`);
}
//CREATE CHART
const saveCustomChartService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/charts`, null, data);
}
//GET CHARTS LIST DATA
const getAllChartsDataService = (reportConfigurationId) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/charts?reportConfigurationId=${reportConfigurationId}`);
}
//GET CHART BY ID
const getChartDataByIdService = (chartId, from, to, sites) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/charts/${chartId}?from=${from}&to=${to}&sites=${sites}`);
}
//UPDATE CHART BY ID
const updateChartDataByIdService = (chartId, data) => {
    return xhrClient.put(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/charts/${chartId}`, null, data);
}
//GET INDIVIDUAL REPORTS DATA
const getConfiguredReportByIdService = (configurationsId) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations/${configurationsId}`)
}
//GET SITES FOR CHARTS
const getSitesForChartsService = (clientId) => {
    return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/sites/?clientId=${clientId}&paginationRequired=false`,);
}
//UPDATE VISIBLE COLUMNS
const updateVisibleColumnsService = (reportId, columns) => {
    return xhrClient.post(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportsconfigurations/${reportId}/visiblecolumns`, null, columns);
}
//UPDATE CHART ORDER
const updateChartOrderService = (reportId, data) => {
    return xhrClient.put(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/charts?reportId=${reportId}`, null, data);
}
//DOWNLOAD REPORT BY ID
const downloadReportByIdService = (reportId) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/${reportId}/download-report`, 'application/pdf', null, 'blob');
}

// GET ALL SAVED COLUMNS 
const getSavedTableHeadersService = async (reportId,payload) => {
    return await xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/selected-columns/${reportId}`)

}

// GET ALL COLUMNS 
const getAllColumnsService = async (reportId) => {
    console.log(reportId, 'idddddddddd')
    return await xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/all-columns/${reportId}`)
    
}

// GET ALL CUSTOM  COLUMNS 
const getAllCustomColumnsService = async (reportId) => {
    return await xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/custom-column/${reportId}`)
}


//SAVE SELECTED COLUMN
const postReportConfigService = async(reportId,payload) => {
    return xhrClient.post(
        `${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/config/${reportId}`,
        null,
        payload
    )
}


//SAVE SELECTED COLUMN
const postCustomColumn = async(reportId,payload) => {
    return xhrClient.post(
        `${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/config/custom-columns/${reportId}`,
        null,
        payload
    )
}

//Update Custom Column
const updateCustomColumn = async(reportId,payload) => {
    return xhrClient.put(
        `${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/custom-columns/${reportId}`,
        null,
        payload
    )
}

//delete Custom Column
const deleteCustomColumn = async(reportId,columnId) => {
    return xhrClient.delete(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/${reportId}/custom-column/${columnId}`)
}


const saveSelectedColumn = (reportId, payload) => {
    return xhrClient.post(
        `${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/save/selected-columns/${reportId}`,
        null,
        payload
    )
}

const getReportTableDataService = async({reportId, currentPage,searchParam}) => {
    //for future ref
    // return  xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/data/${reportId}&search=${searchParam}&page=${currentPage}`)
    if(searchParam){
        return  xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/data/${reportId}?page=${currentPage}&search=${searchParam}`)  
    }

    

    return  xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/data/${reportId}?page=${currentPage}`)  
}

const getReportTableDataDownloadService = async({reportId,searchParam}) => {
    const reportApi = xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/report/data/excel/download/${reportId}?search=${searchParam}`, null ,null, 'blob')  
    

    reportApi
    .then((blob)=>{
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ReportDetails.xlsx',);
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);
    })
}


export {
    getClientModulesService,
    saveReportService,
    getReportColumnsService,
    getClientRolesByIdService,
    updateReportsDataService,
    getAllReportsDataService,
    getColumnsByIdService,
    saveCustomChartService,
    deleteReportService,
    getAllChartsDataService,
    getConfiguredReportByIdService,
    getSitesForChartsService,
    getChartDataByIdService,
    updateChartDataByIdService,
    updateVisibleColumnsService,
    updateChartOrderService,
    downloadReportByIdService,
    getAllColumnsService,
    postCustomColumn,
    getAllCustomColumnsService,
    getSavedTableHeadersService,
    updateCustomColumn,
    deleteCustomColumn,
    postReportConfigService,
    saveSelectedColumn,
    getReportTableDataService,
    getReportTableDataDownloadService
}