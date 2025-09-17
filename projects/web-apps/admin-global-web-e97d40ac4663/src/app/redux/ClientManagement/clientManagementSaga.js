import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
    setAllClients,
    setAllModules,
    setClientDetailsById,
    setClientDetailBtnDisableState,
    setClientModulesById,
    setClientModulesBtnDisableState,
    setClientPrivilegeById,
    setClientAccessPrivilegeBtnDisableState,
    setClientDetails,
    setClientModule,
    setClientState,
    setClientCredentialDetails,
    setShowClientDetailsPopup,
    setInitialState,
    setAllStates,
    setAllCitiesByState,
    setClientsList,
  //  setSelectedClientName,
    setSelectedClientLogo,
    getEmailTemplate,
    setLogoForClient,
    // setClientLogoForHeader,
    setClientSortOptions,
    setLoader,
    setBackgroundImage,setAssignedQualityAssurances
} from './clientManagementSlice'
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from './../slices/snackbar'
import {
    getAllClientsService,
    getAllModulesService,
    getClientDetailsByIdService,
    getClientModulesByIdService,
    getClientPrivilegeByIdService,
    postClientDetailsService,
    //postClientLogoService,
    putClientDetailsService,
    postClientModulesService,
    putClientPrivilegesService,
    deleteClientService,
    getClientCredentialsService,
    //getAllStatesCitiesMasterService,
    changeClientPasswordService,
    getClientsService,
    getClientLogo,
    getAllClientsDetailsService,
    getEmailTemplateService,
    setEmailTemplateService,
    setClientLogoService,
    //getClientHeaderLogoService,
    getStatesDataService,
    getCitiesByStateDataService,
    setClientBackgroundService,
    getAssignQualityAssuranceService

} from './clientManagementService'
import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
// import { setStatesData } from '../UserProfile/userProfileSlice'
import { setUserLogoId } from '../AuthManagement/authManagementSlice'

function* getAllClients(data) {
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
        
        const response = yield call(getAllClientsService, newData)
        yield put(setAllClients(response))
        yield put(setLoader("complete"))
    } catch (error) {
        yield put(setLoader("failed"))
        // yield put(SNACKBAR_ERROR(error.message))
    }
}
function* getClientsList() {
    try {
        const response = yield call(getClientsService);
        yield put(setClientsList(response.data))
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}
function* setSelectClient(payload) {
    try {
        const response = yield call(
            getClientLogo,
            payload.payload.selectedClientId
        );
        yield put(setSelectedClientLogo(response))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..GET MASTERS MODULES
function* getAllModules() {
    try {
        const response = yield call(getAllModulesService)
        //...TO HANDLE MODULE SELECTION
        const modules = response.map((m, i) => {
            m.checked = false
            m.view = true
            m.editTheme = false
            m.editWorkFlow = false
            return m
        })
        yield put(setAllModules(modules))
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}
//..GET ALL STATES CITIES MASTER DATA
// function* getStatesCitiesMaster() {
//     try {
//         const response = yield call(getAllStatesCitiesMasterService)
//         yield put(
//             setClientState({ name: 'statesCitiesMasterData', value: response })
//         )
//         yield put(setAllStates())
//     } catch (error) {
//         // yield put(SNACKBAR_ERROR(error.error))
//     }
// }
function* getStatesData() {
    try {
        let response = yield call(getStatesDataService);
        yield put(setAllStates(response.data));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.error))
    }
}

function* getCitiesByStateData(data) {
    try {
        let response = yield call(getCitiesByStateDataService, data.payload);
        yield put(setAllCitiesByState(response.data));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.error))
    }
}
//..GET SELECTED CLIENT DETAILS
function* getClientDetailsById(payload) {
    try {
        const { clientId } = payload.payload
        const response = yield call(getClientDetailsByIdService, clientId)
        yield put(setClientDetailsById(response))
        yield put(setClientDetailBtnDisableState())
        yield put(setAllCitiesByState())
        yield put(setClientPrivilegeById({ editTheme: response.editTheme, editWorkFlow: response.editWorkFlow}))
        yield put(setLoader('complete'))

    } catch (error) {
        yield put(setLoader('failed'))
    // yield put(SNACKBAR_ERROR(error.message))
    }
}
//.. GET ALL CLIENTS DETAILS
function* getAllClientsDetails(data){
    try {
        const {payload} = data;
        let newData = cloneDeep(payload);
        if (newData) {
            newData.to
            ? (newData.to = format(
                newData.to,
                'dd-MM-yyyy'
            ))
            : (newData.to = "")
        newData.from
            ? (newData.from = format(
                newData.from,
                'dd-MM-yyyy'
            ))
            : (newData.from = "")
        }
        const {clientId, clientName, headOfficeName, state, status, from, to, area } = newData;
       // const response = yield call(getAllClientsDetailsService)
        yield call(getAllClientsDetailsService, clientId, clientName, headOfficeName, state, status, from, to, area )
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}

//..GET SELECTED CLIENT MODULES
function* getClientModulesById(payload) {
    console.log('payload module',payload.payload)
    try {
        const { clientId } = payload.payload
        console.log("client id ",clientId)
        const response = yield call(getClientModulesByIdService, clientId)
        console.log("modules res",response)
        yield put(setClientModulesById(response))
        yield put(setClientModulesBtnDisableState())
        yield put(setLoader('complete'))
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}
//..GET SELECTED CLIENT PRIVILEGE
function* getClientPrivilegeById(payload) {
    try {
        const { clientId } = payload.payload
        const response = yield call(getClientPrivilegeByIdService, clientId)
        yield put(setClientPrivilegeById(response))
        yield put(setClientAccessPrivilegeBtnDisableState())
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}
function* setClientFormValues(payload) {
    try {
        yield put(setClientDetails(payload.payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* setClientModuleFormValues(payload) {
    try {
        yield put(setClientModule(payload.payload))
        yield put(setClientModulesBtnDisableState())
        yield put(setClientAccessPrivilegeBtnDisableState())
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* setActiveStep(payload) {
    try {
        const { activeStep } = payload.payload
        yield put(setClientState({ name: 'activeStep', value: activeStep }))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* setClientId(payload) {
    try {
        const { clientId } = payload.payload
        yield put(setClientState({ name: 'clientId', value: clientId }))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..POST NEW CLIENT DETAILS
function* postClientDetails(payload) {
    try {
        const { clientDetails, activeStep } = payload.payload
        const response = yield call(postClientDetailsService, clientDetails)
        const { id, message } = response
        // const logo = yield call(postClientLogoService, clientDetails.uploadLogo, id)
        const { clientId } = yield call(getClientDetailsByIdService, id)
        // API to get the Client Credentials
        const credentials = yield call(getClientCredentialsService, clientId)
        yield put(setClientCredentialDetails(credentials))
        yield put(
            setClientState({ name: 'clientGeneratedId', value: clientId })
        ) //..THIS IS API GENERATED ID
        yield put(setClientState({ name: 'clientId', value: id })) //..THIS IS OBJECT ID
        yield put(
            setClientState({ name: 'clientCreatedMessage', value: message })
        )
        yield put(setClientState({ name: 'activeStep', value: activeStep + 1 }))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

//..POST NEW CLIENT MODULES
function* postClientModules(payload) {
    try {
        const { clientModules, clientId, activeStep } = payload.payload
        const response = yield call(
            postClientModulesService,
            clientModules,
            clientId
        )
        const { message } = response
        yield put(
            setClientState({
                name: 'clientModulesCreatedMessage',
                value: message,
            })
        )
        yield put(setClientState({ name: 'activeStep', value: activeStep + 1 }))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..PUT EXISTING CLIENT PRIVILEGE
function* putClientPrivilege(payload) {
    try {
        const {
            clientPrivilege,
            // clientId,
            clientGeneratedId,
            clientDetails,
      //      activeStep,
            pageMode,
        } = payload.payload

        const response = yield call(
            putClientPrivilegesService,
            clientPrivilege,
            clientDetails.clientId? clientDetails.clientId: clientGeneratedId
        )
        const { message } = response
        yield put(
            setClientState({
                name: 'clientPrivilegeCreatedMessage',
                value: message,
            })
        )
        if (pageMode === 'add') {
            const { clientName, password } = yield call(
                getClientCredentialsService,
                clientGeneratedId
            )
            yield put(
                setClientState({ name: 'clientUserName', value: clientName })
            ) //..
            yield put(
                setClientState({ name: 'clientPassword', value: password })
            ) //..
            yield put(setClientState({ name: 'showSubmitPopUp', value: true }))
        }
        yield put(
            SNACKBAR_SUCCESS('Client Details has been updated successfully')
        )
        //yield put(setClientState({ name: 'activeStep', value: activeStep + 1 }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..UPDATE CLIENT DETAILS
function* putClientDetails(payload) {
    try {
        const { clientDetails, clientId, activeStep } = payload.payload;
        const response = yield call(
            putClientDetailsService,
            clientDetails,
            clientId
        )
        const { message } = response
        //yield put(setClientState({ name: 'clientId', value: clientId }));
        yield put(
            setClientState({ name: 'clientCreatedMessage', value: message })
        )
        yield put(setClientState({ name: 'activeStep', value: activeStep }))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..DELETE CLIENT DETAILS
function* deleteClient(data) {
    try {
        const { _id } = data.payload
        const response = yield call(deleteClientService, _id)
        yield put(SNACKBAR_SUCCESS(response.message))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..GET CLIENT CREDENTIAL DETAILS
function* getClientCredentialDetailsById(data) {
    try {
        const { clientId } = data.payload
        const response = yield call(getClientCredentialsService, clientId)
        yield put(setClientCredentialDetails(response))
        yield put(setShowClientDetailsPopup(true))
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}
//..SET INITIAL STATE
function* setClientInitialState() {
    try {
        yield put(setInitialState())
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* changePassword(data) {
    try {
        const response = yield call(changeClientPasswordService, data.payload)
        yield put(SNACKBAR_SUCCESS(response.message))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* emailTemplate(data) {
    try {
        const { clientId } = data
        const response = yield call(getEmailTemplateService, clientId);
        yield put(getEmailTemplate(response));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message));
    }
}

function* setemailTemplate(data) {
    try {
        const { payload } = data;
        const response = yield call(setEmailTemplateService, payload.clientId, payload);
        yield put(SNACKBAR_SUCCESS(response.message))

    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setClientLogo(payload) {
    try {
        const { file } = payload;
        if (file) {
            let response = yield call(setClientLogoService, file);
            yield put(setUserLogoId(response.id));
            yield put(SNACKBAR_SUCCESS(response.message));
            yield put(setLogoForClient(response));
        } else {
            yield put(setLogoForClient({ id: "" }));
        }
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setClientBackground(payload) {
    try {
        const { file } = payload;
        if (file) {
            let response = yield call(setClientBackgroundService, file);
            yield put(SNACKBAR_SUCCESS(response.message));
            yield put(setBackgroundImage(response));
        } else {
            yield put(setBackgroundImage({ id: "" }));
        }

    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* deleteClientLogo() {
    try {
        yield put(setUserLogoId(""));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
// function* getClientLogoForHeader(payload) {
//     try {
//         const { id } = payload;
//         let response = yield call(getClientHeaderLogoService, id);
//         yield put(setClientLogoForHeader(URL.createObjectURL(response)));
//     } catch (error) {
//         yield put(setClientLogoForHeader(null));
//     }
// }

function* setSortingDirection(payload) {
    try {
        yield put(setClientSortOptions(payload))

    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

// try {
//     const { payload } = data
//     let newData = cloneDeep(payload)
//     const response = yield call(getFreelancersListService, newData)
//     console.log("freelancer list",response)
//     const parsedData = freelancerManagementParsers.freelancerListParser(response)
//     yield put(setFreelancerList(parsedData))
// } catch (error) {
//     yield put(SNACKBAR_ERROR(error.message))
// }

function* getAssignedQualityAssurances(payload){
    const { clientId } = payload.payload;
    try{
        const response = yield call(getAssignQualityAssuranceService, clientId)
        yield put(setAssignedQualityAssurances(response))
    }
    catch(error){
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* watchAllClients() {
    yield takeEvery('getAllClientsAction', getAllClients)
}
function* watchClientsList() {
    yield takeEvery('getClientsListAction', getClientsList)
}
//..SET SELECTED CLIENT NAME
function* watchsetSelectedClientName() {
    yield takeEvery('setSelectClientAction', setSelectClient)
}
//..GET MASTERS MODULES
function* watchAllModules() {
    yield takeEvery('getAllModulesAction', getAllModules)
}
//..GET SELECTED CLIENT DETAILS
function* watchClientDetailsByIdAction() {
    yield takeEvery('getClientDetailsByIdAction', getClientDetailsById)
}
//..GET ALL CLIENTS DETAILS
function* watchGetAllClientDetails(){
    yield takeEvery('getAllClientsDetails', getAllClientsDetails)
}

//..GET SELECTED CLIENT MODULES
function* watchClientModulesByIdAction() {
    console.log('welcome to modules');
    yield takeEvery('getClientModulesByIdAction', getClientModulesById)
}
//..GET SELECTED CLIENT PRIVILEGE
function* watchClientPrivilegeByIdAction() {
    yield takeEvery('getClientPrivilegeByIdAction', getClientPrivilegeById)
}
function* watchSetClientDetailsAction() {
    yield takeEvery('setClientDetailsAction', setClientFormValues)
}
function* watchSetClientModuleAction() {
    yield takeEvery('setClientModuleAction', setClientModuleFormValues)
}
function* watchPostClientDetailsAction() {
    yield takeEvery('postClientDetailsAction', postClientDetails)
}
function* watchPostClientModulesAction() {
    yield takeEvery('postClientModulesAction', postClientModules)
}
function* watchPutClientPrivilegeAction() {
    yield takeEvery('putClientPrivilegeAction', putClientPrivilege)
}
function* watchSetActiveStepAction() {
    yield takeEvery('setActiveStepAction', setActiveStep)
}
function* watchSetClientIdAction() {
    yield takeEvery('setClientIdAction', setClientId)
}
function* watchPutClientDetailsAction() {
    yield takeEvery('putClientDetailsAction', putClientDetails)
}
function* watchDeleteClientAction() {
    yield takeEvery('deleteClientAction', deleteClient)
}
function* watchGetClientCredentialDetailsAction() {
    yield takeEvery(
        'getClientCredentialDetailsAction',
        getClientCredentialDetailsById
    )
}
function* watchSetInitialStateAction() {
    yield takeEvery('setInitialStateAction', setClientInitialState)
}
// function* watchGetStatesCitiesMasterAction() {
//     yield takeEvery('getStatesCitiesMasterAction', getStatesCitiesMaster)
// }
function* watchChangeClientPasswordAction() {
    yield takeEvery('changeClientPasswordAction', changePassword)
}
function* watchgetEmailTemplateAction() {
    yield takeEvery('getClientEmailTemplateAction', emailTemplate)
}
function* watchsetEmailTemplateAction() {
    yield takeEvery('setClientEmailTemplateAction', setemailTemplate)
}
function* watchsetClientLogo() {
    yield takeEvery('setClientLogoAction', setClientLogo)
}
function* watchsetClientBackground() {
    yield takeEvery('setClientBackgroundAction', setClientBackground)
}
// function* watchGetClientLogoForHeader() {
//     yield takeEvery('getClientLogoAction', getClientLogoForHeader)
// }
function* watchSetSortDirection() {
    yield takeEvery('setSortDirectionAction', setSortingDirection)
}
function* watchGetStatesData() {
    yield takeEvery('getStatesDataAction', getStatesData)
}

function* watchGetCitiesByStateData() {
    yield takeEvery('getCitiesByStateDataAction', getCitiesByStateData);
}
function* watchDeleteClientLogo() {
    yield takeEvery('deleteClientLogoAction', deleteClientLogo)
}
function* watchGetAssignQualityAssurance(){
    yield takeEvery('getAssignedQualityAssuranceAction',getAssignedQualityAssurances)
}
// Actions
export default function* clientManagementSaga() {
    yield all([
        watchAllClients(),
        watchGetStatesData(),
        watchGetCitiesByStateData(),
        watchClientsList(),
        watchsetSelectedClientName(),
        watchAllModules(),
        watchClientDetailsByIdAction(),
        watchClientModulesByIdAction(),
        watchClientPrivilegeByIdAction(),
        watchSetClientDetailsAction(),
        watchSetClientModuleAction(),
        watchPostClientDetailsAction(),
        watchPutClientDetailsAction(),
        watchPostClientModulesAction(),
        watchPutClientPrivilegeAction(),
        watchSetActiveStepAction(),
        watchSetClientIdAction(),
        watchDeleteClientAction(),
        watchGetClientCredentialDetailsAction(),
        watchSetInitialStateAction(),
        watchsetClientBackground(),
        //watchGetStatesCitiesMasterAction(),
        watchChangeClientPasswordAction(),
        watchGetAllClientDetails(),
        watchgetEmailTemplateAction(),
        watchsetEmailTemplateAction(),
        watchsetClientLogo(),
        //watchGetClientLogoForHeader(),
        watchSetSortDirection(),
        watchDeleteClientLogo(),
        watchGetAssignQualityAssurance()
    ])
}
