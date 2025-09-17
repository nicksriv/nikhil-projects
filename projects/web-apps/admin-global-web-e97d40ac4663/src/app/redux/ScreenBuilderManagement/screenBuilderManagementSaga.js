import { call, put, takeEvery, all } from 'redux-saga/effects';
import { format } from 'date-fns';
import { cloneDeep } from 'lodash';
// import history from 'helper/history.js';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from '../slices/snackbar';
import {
    setStateByName,
    setCreatedModule,
    setCloneWorkflowDetails,
    setModule,
    setFormData,
    //  setModuleFilterDetails,
    setWorkflowState,
    setFeatureTemplate,
    setSBSortOptions,
    setScreenDataInWorkflow,
    setConsolidatedFlag,
    setConsolidatedFlagAll,
    setApprovalOnTable,
    setLoader,
    setAppLoader,
    setSubmoduleSuccessStatus,
    setUploadedFileId
} from './screenBuilderManagementSlice';
import {
    //getMasterModulesService,
    getClientModulesByIdService,
    getScreenInfoService,
    getAllSubModulesByModuleIdService,
    getAllModulesWithSubModulesService,
    postSubModuleInfoService,
    deleteModuleInfoService,
    deleteSubModuleInfoService,
    postModuleInfoService,
    putModuleInfoService,
    getScreenInfoByScreenIdService,
    postScreenInfoService,
    putScreenInfoService,
    getWorkflowInfoByIdService,
    postWorkflowInfoService,
    getAllFeatureTemplatesService,
    getFeatureTemplatesByIdService,
    postFeatureTemplateService,
    getClientRolesByIdService,
    getWorkflowInfoBySubmoduleIdService,
    deleteFeatureTemplatesByIdService,
    postCloneWorkflowDetailsService,
    getMasterDataTemplateService,
    //putUploadImageService
} from './screenBuilderManagementService';
import { setUploadDocumentService, setUploadVideoFileService } from '../ClientManagement/clientManagementService';

// import {
//     getAllRolesByClientIdService
// } from '../UserManagement/userManagementService';

function* getAllModules(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload);
        if (newData.filter) {
            newData.filter.to
                ? (newData.filter.to = format(
                    newData.filter.to,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
            newData.filter.from
                ? (newData.filter.from = format(
                    newData.filter.from,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
        }
        const response = yield call(getAllModulesWithSubModulesService, newData);
        const { modules, size } = response;
        yield put(setStateByName({ name: 'moduleList', value: { data: modules, size: size } }));
        yield put(setAppLoader("complete"))
    } catch (error) {
        yield put(setStateByName({ name: 'moduleList', value: { data: [], size: 0 } }));
        yield put(setAppLoader("failed"))
        // yield put(SNACKBAR_ERROR(error.message))
    }
}

function* setCreateModuleFormValues(data) {
    try {
        const { payload } = data;
        yield put(setCreatedModule(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setCloneWorkflowFormValues(data) {
    try {
        const { payload } = data;
        yield put(setCloneWorkflowDetails(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET CLIENT MODULES
function* getClientModules(payload) {
    try {
        yield put(setLoader({ payload: true }));
        const {// clientId, 
            id } = payload.payload;
        const response = yield call(getClientModulesByIdService, id);
        // const clientModules = masterModules.filter(x => {
        //     const cmIndex = clientSelectedModules.findIndex(c => c.id === x.id);
        //     if (cmIndex != -1) {
        //         return x;
        //     }
        // });
        const { modules } = response;
        yield put(setStateByName({ name: 'clientModulesList', value: modules }));
        yield put(setStateByName({ name: 'clientId', value: id, fieldName: "createdModule" }));
        yield put(setLoader({ payload: false }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..GET CLIENT ROLES BY CLIENT ID 
function* getClientRolesById(payload) {
    try {
        const { clientId } = payload.payload;
        const response = yield call(getClientRolesByIdService, clientId);
        const { roles } = response;
        yield put(setStateByName({ name: 'workflowRoles', value: roles }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..GET ALL MODULES ALONG WITH SUB MODULES AND ROLES
function* getSubModulesList(payload) {
    try {
        const { moduleId } = payload.payload;
        const response = yield call(getAllSubModulesByModuleIdService, moduleId);
        const { data } = response;
        yield put(setStateByName({ name: 'clientSubModulesList', value: data }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* postSubModuleInfo(payload) {
    try {
        const { data } = payload.payload;
        const apiRequest = {
            moduleId: data.moduleId,
            name: data.moduleName,
            icon: data.icon,
            clientId: data.clientId,
            status: "DRAFT"
        };
        let response;
        if (data.isChildModule) {
            response = yield call(postSubModuleInfoService, data.moduleId, apiRequest);
        } else {
            response = yield call(postModuleInfoService, apiRequest);
        }
        const { id, message } = response;
        // yield put(setStateByName({ name: 'workflowStatus', value: "ACTIVE" }));
        if (data.isChildModule) {
            yield put(setStateByName({ name: 'subModuleId', value: id }));
            yield put(setStateByName({ name: 'moduleId', value: data.moduleId }));
        } else {
            yield put(setStateByName({ name: 'moduleId', value: id }));
        }
        yield put(setStateByName({ name: 'showMasterScreen', value: false }));
        yield put(setStateByName({ name: 'isWorkflowDataLoading', value: false }));
        if (data.isChildModule) {
            // history.push('/module/add');
            yield put(setSubmoduleSuccessStatus(true));
        } else {
            let newData = cloneDeep(payload.payload);
            if (newData.filter) {
                newData.filter.to
                    ? (newData.filter.to = format(
                        newData.filter.to,
                        'dd-MM-yyyy'
                    ))
                    : (newData.filter.to = null)
                newData.filter.from
                    ? (newData.filter.from = format(
                        newData.filter.from,
                        'dd-MM-yyyy'
                    ))
                    : (newData.filter.to = null)
            }
            const response1 = yield call(getAllModulesWithSubModulesService, newData);
            const { modules, size } = response1;
            yield put(setStateByName({ name: 'moduleList', value: { data: modules, size: size } }));

            const response2 = yield call(getClientModulesByIdService, data.clientId);
            yield put(setStateByName({ name: 'clientModulesList', value: response2.modules }));
        }
        yield put(SNACKBAR_SUCCESS(message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..UPDATE PARENT MODULE
function* putModuleInfo(payload) {
    try {
        const { moduleId, data } = payload.payload;
        const response = yield call(putModuleInfoService, moduleId, data);
        const {  message } = response;
        yield put(SNACKBAR_SUCCESS(message));
        let newData = cloneDeep(payload.payload);
        if (newData.filter) {
            newData.filter.to
                ? (newData.filter.to = format(
                    newData.filter.to,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
            newData.filter.from
                ? (newData.filter.from = format(
                    newData.filter.from,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
        }
        const response1 = yield call(getAllModulesWithSubModulesService, newData);
        const { modules, size } = response1;
        yield put(setStateByName({ name: 'moduleList', value: { data: modules, size: size } }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..DELETE MODULES ALONG WITH SUB MODULES
function* deleteModule(payload) {
    try {
        const { moduleId } = payload.payload;
        const response = yield call(deleteModuleInfoService, moduleId);
        const { message } = response;
        yield put(SNACKBAR_SUCCESS(message));
        let newData = cloneDeep(payload.payload);
        if (newData.filter) {
            newData.filter.to
                ? (newData.filter.to = format(
                    newData.filter.to,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
            newData.filter.from
                ? (newData.filter.from = format(
                    newData.filter.from,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
        }
        const response1 = yield call(getAllModulesWithSubModulesService, newData);
        const { modules, size } = response1;
        yield put(setStateByName({ name: 'moduleList', value: { data: modules, size: size } }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..DELETE SUB MODULES
function* deleteSubmodule(payload) {
    try {
        const { subModuleId, moduleId } = payload.payload;
        const response = yield call(deleteSubModuleInfoService, moduleId, subModuleId);
        const { message } = response;
        yield put(SNACKBAR_SUCCESS(message));
        let newData = cloneDeep(payload.payload);
        if (newData.filter) {
            newData.filter.to
                ? (newData.filter.to = format(
                    newData.filter.to,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
            newData.filter.from
                ? (newData.filter.from = format(
                    newData.filter.from,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
        }
        const response1 = yield call(getAllModulesWithSubModulesService, newData);
        const { modules, size } = response1;
        yield put(setStateByName({ name: 'moduleList', value: { data: modules, size: size } }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* getModule(data) {
    try {
        const { payload } = data;
        yield put(setModule(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET USER FORM DATA
function* getUserFormData() {
    try {
        const response = yield call(getScreenInfoService);
        yield put(setFormData(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET Screen by Screen Id
function* getScreenInfoByScreenId(payload) {
    try {
        const { screenId } = payload.payload;
        const response = yield call(getScreenInfoByScreenIdService, screenId);
        const { form, name } = response;
        yield put(setStateByName({ name: 'screenData', value: form }));
        yield put(setStateByName({ name: 'screenId', value: screenId }));
        yield put(setStateByName({ name: 'screenName', value: name }));
    } catch (error) {
        //alert(JSON.stringify(error));
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET Workflow Forms Data by Screen Id
function* getWorkflowFormData(payload) {
    try {
        // const { masterScreensWorkflowData } = payload.payload;
        // let wd = masterScreensWorkflowData.slice(0);
        // yield all(
        //     wd.map((d, i) => {
        //         const response = call(getScreenInfoByScreenIdService, d.screenId);
        //         const { form } = response;
        //         put(setScreenDataInWorkflow({ data: form, index: i }));
        //     })
        // );        
        const { screenId, index } = payload.payload;
        const response = yield call(getScreenInfoByScreenIdService, screenId);
        const { form, name } = response;
        yield put(setScreenDataInWorkflow({ data: form, index: index, name: name }));
    } catch (error) {
        //alert(JSON.stringify(error));
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..POST USERS FORM DATA
function* postUserFormData(payload) {
    try {
        const { createdModule, subModuleId, moduleId, screenData, selectedRoles,
            masterScreensWorkflowData,
            pageMode,
            screenIndex,
            //workflowRequest,
            screenName } = payload.payload;
        const defaultScreenTitle = `Master screen_0${screenIndex + 1}`;
        let data = {
            clientId: createdModule.clientId,
            fields: [],
            moduleId: moduleId,
            name: `${screenName ? screenName : defaultScreenTitle}`,
            roles: selectedRoles,
            form: screenData,
            subModuleName: createdModule.parentModuleName,
            submoduleId: subModuleId
        };
        formatFields(screenData);

        function formatFields(d) {
            d.forEach((s, i) => {
                let optionValues;
                if (s.singleChoiceOptions) {
                    optionValues = s.singleChoiceOptions.map((option) => option.label);
                }
                let fieldItem = {
                    componentId: s.id,
                    filtered: s.customOptions && s.customOptions.filtered ? s.customOptions.filtered : false,
                    hint: s.label,
                    type: s.element,
                    status: "ACTIVE",
                    visibleOnTable: s.customOptions && s.customOptions.dataTable ? s.customOptions.dataTable : false,
                    values: s.customOptions?.optionsText ? s.customOptions.optionsText.split("\n") : optionValues ? optionValues : []
                }

                if (s.element === "Dropdown") {
                    var dc = [];
                    s.dependentComponents.map((v)=>{
                        dc = Array.prototype.concat.apply(dc, v.form);
                    })
                    formatFields(dc);
                }
                data.fields.push(fieldItem);
            })
        }

        const response = yield call(postScreenInfoService, subModuleId, data);
        const { id, message } = response;
        yield put(SNACKBAR_SUCCESS(message));
        yield put(setStateByName({ name: 'screenId', value: id }));
        yield put(setWorkflowState({
            data: screenData,
            screenIndex: screenIndex, id: id, pageMode: pageMode,
            screenName: screenName,
            masterScreensWorkflowData
        }));
        yield put(setStateByName({ name: 'screenData', value: [] }));
        yield put(setStateByName({ name: 'screenName', value: "" }));
        // //DRAFT STATTUS LOGIC
        // console.log(payload.payload)
        // if (!payload.payload.workflowId) {
        //     yield call(postWorkflowInfo, payload);
        // }
    } catch (error) {
        //alert(JSON.stringify(error));
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..PUT USERS FORM DATA
function* putUserFormData(payload) {
    try {
        const { createdModule, subModuleId, moduleId, screenData, selectedRoles,
            //  masterScreensWorkflowData,
            pageMode,
            screenIndex,
            //workflowRequest,
            screenId,
            screenName,
            isFromPublish } = payload.payload;
        const defaultScreenTitle = `Master screen_0${screenIndex + 1}`;
        let data = {
            clientId: createdModule.clientId,
            fields: [],
            moduleId: moduleId,
            name: `${screenName ? screenName : defaultScreenTitle}`,
            roles: selectedRoles,
            form: screenData,
            subModuleName: createdModule.parentModuleName,
            submoduleId: subModuleId,
            screenId: screenId,
        };

        formatFields(screenData);

        function formatFields(d) {
            d.forEach((s, i) => {
                if (s.label) {
                    let optionValues;
                    if (s.singleChoiceOptions) {
                        optionValues = s.singleChoiceOptions.map((option) => option.label);
                    }
                    let fieldItem = {
                        componentId: s.id,
                        filtered: s.customOptions && s.customOptions.filtered ? s.customOptions.filtered : false,
                        hint: s.label,
                        type: s.element,
                        status: "ACTIVE",
                        visibleOnTable: s.customOptions && s.customOptions.dataTable ? s.customOptions.dataTable : false,
                        values: s.customOptions?.optionsText ? s.customOptions.optionsText.split("\n") : optionValues ? optionValues : []
                    }
    
                    if (s.element === "Dropdown") {
                        var dc = [];
                        s.dependentComponents.map((v)=>{
                            dc = Array.prototype.concat.apply(dc, v.form);
                        })
                        formatFields(dc);
                    }
                    data.fields.push(fieldItem);
                }
            })
        }

        const response = yield call(putScreenInfoService, subModuleId, data);
        const { id, message } = response;
        yield put(SNACKBAR_SUCCESS(message));
        if (!isFromPublish) {
            yield put(setStateByName({ name: 'screenId', value: id }));
            yield put(setWorkflowState({
                data: screenData,
                screenIndex: screenIndex, id: id, pageMode: pageMode,
                screenName: screenName
            }));
        }
    } catch (error) {
        //alert(JSON.stringify(error));
        yield put(SNACKBAR_ERROR(error.message));
    }
}

//..GET Workflow by Workflow Id
function* getWorkflowInfoById(payload) {
    try {
        const { workflowId, masterScreensWorkflowData } = payload.payload;
        const response = yield call(getWorkflowInfoByIdService, workflowId);
        const { workFlows } = response;
        yield put(setStateByName({ name: 'workflowRequest', value: workFlows }));
        yield put(setStateByName({ name: 'workflowInformation', value: response }));
        yield put(setStateByName({ name: 'workflowStatus', value: response.status }));
        yield put(setStateByName({ name: 'mappedByValue', value: response.mappedBy }));
        let wd = masterScreensWorkflowData.slice(0);
        workFlows.map((w, i) => {
            let wobj = {
                displayIndex: w.displayOrder,
                screenId: w.screenId,
                nextScreenId: w.nextScreenId,
                previousScreenId: w.previousScreenId,
                screenTitle: w.screenName,
                //screenData: sd, //..TODO need to ask BE team
                screenData: [],
                isListingPage: false,
                isConsolidatedScreen: false,
                hasApprovalOnScreens: response.hasApprovalOnScreens,
                hasApprovalOnTable: response.hasApprovalOnTable
              };
            wd.push(wobj);
        });
        yield put(setStateByName({ name: 'masterScreensWorkflowData', value: wd }));
        //..BACKUP OLD DATA FOR ACCESS PRIVILEGE
        yield put(setStateByName({ name: 'workflowRequestBackup', value: workFlows }));
        yield put(setStateByName({ name: 'masterScreensWorkflowDataBackup', value: wd }));
        //..SELECTED ROLES
        const selectedRoles = response.roles.map((r) => r.role);
        yield put(setStateByName({ name: 'roleName', value: selectedRoles }));
        if (response.hasApprovalOnTable) {
            yield put(setApprovalOnTable());
            yield put(setConsolidatedFlagAll());
        }
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..POST WORKFLOW INFORMATION (PUBLISH)
function* postWorkflowInfo(payload) {
    try {
        const { moduleId, subModuleId, clientId, workflowData, workflowPageMode, workflowId,
            isConsolidateTeamsData,
            dataTableChecked,
            internalScreensChecked,
            mappedBy,
            clientRoles,
            masterScreensWorkflowData,
            workflowStatus,
            selectedRoles, screenName } = payload.payload;
        let workflowRequest = {
            clientId: clientId,
            status: workflowStatus,
            id: (workflowPageMode === "edit" || workflowId) ? workflowId : null,
            moduleId: moduleId,
            submoduleId: subModuleId,
            roleIds: [],
            workflows: []
        };
        let wr = JSON.parse(JSON.stringify(workflowData));
        //..workflowData
        wr.forEach((d, i) => {
            d.displayOrder = (i + 1);
            if (i === 0 && workflowPageMode === "edit") {
                if (masterScreensWorkflowData.length > 1) {
                    wr[i].screenName = masterScreensWorkflowData[1].screenTitle
                } 
            }
            if (i > 0) {
                let prevId = wr[i - 1].screenId;
                let nextId;

                wr[i].previousScreenId = prevId;
                if ((i + 1) >= wr.length) {
                    nextId = wr[i].screenId;
                } else {
                    nextId = wr[i + 1].screenId;
                }
                wr[i].nextScreenId = nextId;
            }
        });
        if (wr && wr.length > 1) {
            wr[0].nextScreenId = wr[1].screenId;
        }
        workflowRequest.workflows = wr;
        const mid = subModuleId !== '' ? subModuleId : moduleId;
        if (isConsolidateTeamsData && mappedBy) {
            workflowRequest.mappedBy = mappedBy;
            workflowRequest.hasApprovalOnTable = dataTableChecked;
            workflowRequest.hasApprovalOnScreens = internalScreensChecked;
        }
        let roleIds = [];
        selectedRoles.map((r, i) => {
            const cr = clientRoles.find(x => x.name === r);
            if (cr && cr.id) {
                roleIds.push(cr.id);
            }
        });
        workflowRequest.roleIds = roleIds;
        const response = yield call(postWorkflowInfoService, mid, workflowRequest);
        const {  message, id } = response;
        yield put(SNACKBAR_SUCCESS(message));
        yield put(setStateByName({ name: 'selectedWorkflowId', value: id }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET Workflow Details by Module Id and Sub module Id
function* getWorkflowInfoBySubmoduleId(payload) {
    try {
        const { moduleId, subModuleId,  masterScreensWorkflowData } = payload.payload;
        const response = yield call(getWorkflowInfoBySubmoduleIdService, moduleId, subModuleId);
        const { workFlows } = response;
        yield put(setStateByName({ name: 'dynamicSubmoduleWorkflowDetails', value: response }));
        // //..BACKUP OLD DATA
        // yield put(setStateByName({ name: 'workflowRequestBackup', value: workflowRequest }));
        // yield put(setStateByName({ name: 'masterScreensWorkflowDataBackup', value: masterScreensWorkflowData }));
        //..Below Code is to merge screens
        // const wrnextDisplayOrder = workflowRequest.length + 1;
        // const swnextDisplayOrder = masterScreensWorkflowData.length + 1;
        // let wr = workflowRequest.slice(0);
        // let wd = masterScreensWorkflowData.slice(0);
        let wr = [];
        let wd = [];
        wd.push(masterScreensWorkflowData[0]);
        workFlows.map((w, i) => {
            let wrobj = {
                screenId: w.current,
                nextScreenId: w.next,
                previousScreenId: w.previous,
                //displayOrder: wrnextDisplayOrder + i,
                displayOrder: i + 1,
                screenName: w.name,
                status: "ACTIVE"
            };

            let wdobj = {
                //displayIndex: swnextDisplayOrder + i,
                displayIndex: i + 1,
                screenId: w.current,
                nextScreenId: w.next,
                previousScreenId: w.previous,
                screenTitle: w.name,
                screenData: [],
                isListingPage: false,
                isConsolidatedScreen: true
            };
            wr.push(wrobj);
            wd.push(wdobj);
        });

        yield put(setStateByName({ name: 'workflowRequest', value: wr }));
        yield put(setStateByName({ name: 'masterScreensWorkflowData', value: wd }));
        yield put(setConsolidatedFlag());
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..SET USERS FORM DATA INTO REDUX
function* setUserFormData(payload) {
    try {
        const { data } = payload.payload;
        yield put(setFormData(data));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET LIST OF FEATURE TEMPLATES WITH PAGINATION
function* getAllFeatureTemplates(payload) {
    try {
        // const { size, page } = payload.payload;
        const response = yield call(getAllFeatureTemplatesService);
        const { data } = response;
        yield put(setFeatureTemplate({ data: data }));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET FEATURE TEMPLATES BY TEMPLATE ID
function* getFeatureTemplatesById(payload) {
    try {
        const { templateId } = payload.payload;
        const response = yield call(getFeatureTemplatesByIdService, templateId);
        const { id } = response;
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..POST FEATURE TEMPLATE DATA
function* postFeatureTemplate(payload) {
    try {
        const { formData, name, clientId, size, page } = payload.payload;
        const requestData = {
            form: formData,
            name: name,
            clientId: clientId
        };
        const response = yield call(postFeatureTemplateService, requestData);
        const {  message } = response;
        yield put(SNACKBAR_SUCCESS(message));
        //..GET ALL TEMPLATES
        const responseAll = yield call(getAllFeatureTemplatesService, size, page);
        const { data } = responseAll;
        yield put(setFeatureTemplate({ data: data }));
        yield put(setStateByName({ name: 'formElementCheck', value: [] }));
    } catch (error) {
        yield put(setFeatureTemplate({ data: [] }));
        yield put(setStateByName({ name: 'formElementCheck', value: [] }));
        yield put(SNACKBAR_ERROR(error.message));
    }
}

//..DELETE FEATURE TEMPLATE DATA BY ID
function* deleteFeatureTemplate(payload) {
    try {
        const { size, page, templateId } = payload.payload;
        //delet call
        yield call(deleteFeatureTemplatesByIdService, templateId);

        const response1 = yield call(getAllFeatureTemplatesService, size, page);
        const { data } = response1;
        yield put(setFeatureTemplate({ data: data }));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setSortingDirection(payload) {
    try {
        yield put(setSBSortOptions(payload))

    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..POST CLONE MODULES
function* postCloneWorkflowDetails(payload) {
    try {
        const { data } = payload.payload;
        const response = yield call(postCloneWorkflowDetailsService, data);
        const {  message } = response;
        yield put(SNACKBAR_SUCCESS(message));

        //Populating the new data in table
        let newData = cloneDeep(payload.payload);
        if (newData.filter) {
            newData.filter.to
                ? (newData.filter.to = format(
                    newData.filter.to,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
            newData.filter.from
                ? (newData.filter.from = format(
                    newData.filter.from,
                    'dd-MM-yyyy'
                ))
                : (newData.filter.to = null)
        }
        const response1 = yield call(getAllModulesWithSubModulesService, newData);
        const { modules, size } = response1;
        yield put(setStateByName({ name: 'moduleList', value: { data: modules, size: size } }));

        const response2 = yield call(getClientModulesByIdService, data.clientId);
        yield put(setStateByName({ name: 'clientModulesList', value: response2.modules }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* downloadMasterDataDropDownTemplate(payload) {
    const { clientId } = payload;
    try {
      const response = yield call(getMasterDataTemplateService, clientId);
      const url = window.URL.createObjectURL(response);
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'MASTERDATA_TABLE.xls',);
   
       // Append to html link element page
       document.body.appendChild(link);
   
       // Start download
       link.click();
   
       // Clean up and remove the link
       link.parentNode.removeChild(link);
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* postFile(payload) {
    const { file } = payload;
    try {
        const res = yield call(setUploadDocumentService, file);
        yield put(setUploadedFileId(res.id));
    } catch (error) {
        //yield put(SNACKBAR_ERROR(error.message))
    }
}
function* postVideoFile(payload) {
    const { file } = payload;
    try {
        const res = yield call(setUploadVideoFileService, file);
        yield put(setUploadedFileId(res.id));
    } catch (error) {
        //yield put(SNACKBAR_ERROR(error.message))
    }
}


// function* getModuleCredentialDetailsById(data) {
//     try {
//         const { id } = data.payload;
//         const response = yield call(getModuleCredentialsService, id);
//         yield put(setModuleCredentialDetails(response));
//         yield put(setShowModuleDetailsPopup(true));
//     } catch (error) {

//     }
// }

function* watchAllModules() {
    yield takeEvery('getAllModulesSubmodulesAction', getAllModules);
}
//..GET MASTERS MODULES
function* watchClientModules() {
    console.log("client module")
    yield takeEvery('getClientModulesAction', getClientModules);
}
function* watchSetCreateModuleFormValuesAction() {
    yield takeEvery('setCreateModuleFormValuesAction', setCreateModuleFormValues);
}
function* watchSetCloneWorkflowFormValuesAction() {
    yield takeEvery('setCloneWorkflowFormValuesAction', setCloneWorkflowFormValues);
}
function* watchGetSubModulesListAction() {
    yield takeEvery('getSubModulesListAction', getSubModulesList);
}
function* watchPostSubModuleInfoAction() {
    yield takeEvery('postSubModuleInfoAction', postSubModuleInfo);
}
//..UPDATE PARENT MODULE
function* watchPutModuleInfoAction() {
    yield takeEvery('putModuleInfoAction', putModuleInfo);
}
//..DELETE MODULE
function* watchDeleteModuleInfoAction() {
    yield takeEvery('deleteModuleInfoAction', deleteModule);
}
//..DELETE SUB MODULE
function* watchDeleteSubModuleInfoAction() {
    yield takeEvery('deleteSubModuleInfoAction', deleteSubmodule);
}
function* watchModule() {
    yield takeEvery('getModuleAction', getModule);
}
function* watchPostFileAction() {
    yield takeEvery('postFileAction', postFile);
}
function* watchPostVideoFileAction() {
    yield takeEvery('postVideoFileAction', postVideoFile);
}
function* watchGetFormDataAction() {
    yield takeEvery('getFormDataAction', getUserFormData);
}
function* watchGetScreenInfoByScreenIdAction() {
    yield takeEvery('getScreenInfoByScreenIdAction', getScreenInfoByScreenId);
}
function* watchPostFormDataAction() {
    yield takeEvery('postFormDataAction', postUserFormData);
}
function* watchPutFormDataAction() {
    yield takeEvery('putFormDataAction', putUserFormData);
}
//..GET CLIENT ROLES BY CLIENT ID 
function* watchGetClientRolesByIdAction() {
    yield takeEvery('getClientRolesByIdAction', getClientRolesById);
}
//..GET Workflow by Workflow Id
function* watchGetWorkflowInfoByIdAction() {
    yield takeEvery('getWorkflowInfoByIdAction', getWorkflowInfoById);
}
//..POST WORKFLOW INFORMATION (PUBLISH)
function* watchPostWorkflowInfoAction() {
    yield takeEvery('postWorkflowInfoAction', postWorkflowInfo);
}
//..GET Workflow Details by Module Id and Sub module Id
function* watchGetWorkflowInfoBySubmoduleIdAction() {
    yield takeEvery('getWorkflowInfoBySubmoduleIdAction', getWorkflowInfoBySubmoduleId);
}
function* watchSetFormDataAction() {
    yield takeEvery('setFormDataAction', setUserFormData);
}
//..GET LIST OF FEATURE TEMPLATES WITH PAGINATION
function* watchGetAllFeatureTemplates() {
    yield takeEvery('getAllFeatureTemplatesAction', getAllFeatureTemplates);
}
//..GET LIST OF FEATURE TEMPLATES WITH PAGINATION
function* watchGetWorkflowFormDataAction() {
    yield takeEvery('getWorkflowFormDataAction', getWorkflowFormData);
}
//..GET FEATURE TEMPLATES BY TEMPLATE ID
function* watchGetFeatureTemplatesById() {
    yield takeEvery('getFeatureTemplatesByIdAction', getFeatureTemplatesById);
}
//..POST FEATURE TEMPLATE DATA
function* watchPostFeatureTemplate() {
    yield takeEvery('postFeatureTemplateAction', postFeatureTemplate);
}
//..DELETE FEATURE TEMPLATES BY TEMPLATE ID
function* watchDeleteFeatureTemplatesById() {
    yield takeEvery('deleteFeatureTemplatesByIdAction', deleteFeatureTemplate);
}
function* watchSetSortDirection() {
    yield takeEvery('setSortDirectionAction', setSortingDirection);
}
//..POST CLONE MODULES
function* watchPostCloneWorkflowDetailsAction() {
    yield takeEvery('postCloneWorkflowDetailsAction', postCloneWorkflowDetails);
}
function* watchGetMasterDataDropDownAction() {
    yield takeEvery('getMasterDataDropDownAction', downloadMasterDataDropDownTemplate);
}
// function* watchGetModuleCredentialDetailsAction() {
//     yield takeEvery('getModuleCredentialDetailsAction', getModuleCredentialDetailsById)
// }

export default function* screenBuilderManagementSaga() {
    yield all([
        watchAllModules(),
        watchClientModules(),
        watchSetCreateModuleFormValuesAction(),
        watchSetCloneWorkflowFormValuesAction(),
        watchGetSubModulesListAction(),
        watchPostSubModuleInfoAction(),
        watchPutModuleInfoAction(),
        watchDeleteModuleInfoAction(),
        watchDeleteSubModuleInfoAction(),
        watchModule(),
        watchGetFormDataAction(),
        watchGetScreenInfoByScreenIdAction(),
        watchPostFormDataAction(),
        watchPutFormDataAction(),
        watchGetClientRolesByIdAction(),
        watchGetWorkflowInfoByIdAction(),
        watchPostWorkflowInfoAction(),
        watchGetWorkflowInfoBySubmoduleIdAction(),
        watchSetFormDataAction(),
        watchGetAllFeatureTemplates(),
        watchGetWorkflowFormDataAction(),
        watchGetFeatureTemplatesById(),
        watchPostFeatureTemplate(),
        watchDeleteFeatureTemplatesById(),
        watchSetSortDirection(),
        watchPostCloneWorkflowDetailsAction(),
        watchGetMasterDataDropDownAction(),
        watchPostFileAction(),
        watchPostVideoFileAction(),
    ]);
}