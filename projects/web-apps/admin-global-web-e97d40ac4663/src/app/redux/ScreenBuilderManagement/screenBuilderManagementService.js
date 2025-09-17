import { xhrClient } from 'app/views/utilities/DataRequest';
import { config } from 'helper/config.js';
const { isProd } = config;
//..SCREENBUILDER ENDPOINT 
const API_ENDPOINT = isProd
    ? config.production.screenbuilder_api_endpoint
    : config.development.screenbuilder_api_endpoint;

const APIVERSION = "screenbuilder/api/v1";
// const token = localStorage.getItem('accessToken');
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";

//..GET SAVED SCREEN INFORMATION
const getScreenInfoService = () => {
    //return xhrClient.get(`/screen/formdata`);
    return [
        {
            "id": "8591877F-0CCE-4002-9D98-497E9B718DA8",
            "element": "Short_Text",
            "fieldVariant": "outlined",
            "inputFieldSize": "large",
            "textAlignment": "left",
            "customOptions":
            {
                "required": false,
                "isMasked": false,
                "maskedValue": "",
                "validation": "None"
            },
            "fieldName": "shortText_055F402D-EDEA-4CC3-8E1A-2F0C9D677193",
            "label": "Short Text"
        }];
}

// //..GET MASTERS MODULES
// const getMasterModulesService = (data) => {
//     return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/masters/modules`);
// }
//..GET CLIENT MODULES
const getClientModulesByIdService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules?clientId=${clientId}`);
}
//..GET CLIENT ROLES BY CLIENT ID 
const getClientRolesByIdService = (clientId) => {
    return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/roles/client/${clientId}?pagination=false`);
}
//..GET ALL SUB MODULES
const getAllSubModulesByModuleIdService = (moduleId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodules`);
}
//..CREATE PARENT MODULE
const postModuleInfoService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules`, null, data);
}
//..UPDATE PARENT MODULE
const putModuleInfoService = (moduleId, data) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}`, null, data);
}
//..DELETE PARENT MODULE
const deleteModuleInfoService = (moduleId) => {
    return xhrClient.delete(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}`);
}
//..CREATE SUB MODULE
const postSubModuleInfoService = (moduleId, data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodules`, null, data);
}
//..DELETE SUB MODULE
const deleteSubModuleInfoService = (moduleId, submoduleId) => {
    return xhrClient.delete(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodules/${submoduleId}`);
}
//..FETCH ALL MODULES AND SUBMODULES
const getAllModulesWithSubModulesService = (data) => {
    //return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${data.clientId}/modules?page=${data.pageNumber}&size=${data.size}`);

    return xhrClient.get(
        `${API_ENDPOINT}${APIVERSION}/clients/${data.clientId}/modules?page=${data.pageNumber}&size=${data.size}${data.sortBy ? `&sortBy=${data.sortBy}` : ''
        }${data.sortOrder ? `&sortOrder=${data.sortOrder}` : ''}`,
        null,
        null,
        'json',
        data.filter
    );
}

// const putUploadImageService = (file)=> {
//     return xhrClient.put(`${API_ENDPOINT1}${ONBOARDING_APIVERSION}/files/upload?fileType=DOCUMENT`,null, file );
// }
//..GET Screen by Screen Id
const getScreenInfoByScreenIdService = (screenId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/submodules/${screenId}/screens`);
}
//..POST FORM DATA BUILT BY USER USING FORM BUILDER
const postScreenInfoService = (subModuleId, data) => {
    //return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/submodules/${subModuleId}/screens`, null, data);
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/screens`, null, data);
}
//..UPDATE FORM DATA BUILT BY USER USING FORM BUILDER
const putScreenInfoService = (subModuleId, data) => {
    //return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/submodules/${subModuleId}/screens`, null, data);
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/screens`, null, data);
}
//..GET Workflow by Workflow Id
const getWorkflowInfoByIdService = (workflowId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/workflows/${workflowId}`);
}
//..POST WORKFLOW INFORMATION (PUBLISH)
const postWorkflowInfoService = (subModuleId, data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/workflows`, null, data);
}
//..GET Workflow Details by Module Id and Sub module Id
const getWorkflowInfoBySubmoduleIdService = (moduleId, submoduleId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodules/${submoduleId}/workflows/latest`);
}
//..GET Workflow Details by Module Id
const getWorkflowInfoByModuleIdService = (moduleId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/workflows/latest`);
}
//..GET LIST OF FEATURE TEMPLATES WITH PAGINATION
const getAllFeatureTemplatesService = (size, page) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/featuretemplate`);
}
//..GET FEATURE TEMPLATES BY TEMPLATE ID
const getFeatureTemplatesByIdService = (templateId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/featuretemplate/${templateId}`);
}
//..POST FEATURE TEMPLATE DATA
const postFeatureTemplateService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/featuretemplate`, null, data);
}
//..DELET FEATURE TEMPLATES BY TEMPLATE ID
const deleteFeatureTemplatesByIdService = (templateId) => {
    return xhrClient.delete(`${API_ENDPOINT}${APIVERSION}/featuretemplate/${templateId}`);
}
//..POST CLONE MODULES
const postCloneWorkflowDetailsService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/clone`, null, data);
}
const getMasterDataTemplateService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/${clientId}/bulk-upload`,'application/pdf', null, 'blob');
    
    // fetch(`${API_ENDPOINT}${APIVERSION}/${clientId}/bulk-upload`, {
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
    //         link.setAttribute('download', 'MASTERDATA_TABLE.xls',);

    //         // Append to html link element page
    //         document.body.appendChild(link);

    //         // Start download
    //         link.click();

    //         // Clean up and remove the link
    //         link.parentNode.removeChild(link);
    //     })
}
export {
    //getMasterModulesService,
    getClientModulesByIdService,
    getClientRolesByIdService,
    getScreenInfoService,
    getAllSubModulesByModuleIdService,
    postModuleInfoService,
    putModuleInfoService,
    deleteModuleInfoService,
    postSubModuleInfoService,
    deleteSubModuleInfoService,
    getAllModulesWithSubModulesService,
    getScreenInfoByScreenIdService,
    postScreenInfoService,
    putScreenInfoService,
    getWorkflowInfoByIdService,
    postWorkflowInfoService,
    getWorkflowInfoBySubmoduleIdService,
    getWorkflowInfoByModuleIdService,
    getAllFeatureTemplatesService,
    getFeatureTemplatesByIdService,
    postFeatureTemplateService,
    deleteFeatureTemplatesByIdService,
    postCloneWorkflowDetailsService,
    getMasterDataTemplateService,
    //putUploadImageService,
};
