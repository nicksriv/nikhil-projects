import { call, put, takeEvery, all } from 'redux-saga/effects';
// import { getTemplateService } from '../UserManagement/userManagementService';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from './../slices/snackbar';
import { getAllSiteDetailsService, setSiteDeatilsService, getManagerDetailsService, getIndividualSiteService, setIndividualSiteService, getSiteTemplateService, setSiteTemplateService, setExcelSheetService, getStatesDataService, getCitiesByStateDataService } from './siteManagementService';
import { getAllSitesData, setSiteSortOptions, setSiteFormValues, setSiteErrorLog, setUploadState, setManagerDetails, deleteManagerDetails, resetCurrentManager, setInitialState, setManagers, setFetchedSiteDetails,  setLoader, setStatesData, setCitiesData } from './siteManagementSlice';
import { format } from 'date-fns'
import { cloneDeep } from 'lodash';

function* getAllSiteDetails(payload) {
    try {
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
        const response = yield call(getAllSiteDetailsService, newData);
        yield put(getAllSitesData(response));
        yield put(setLoader("complete"));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
        yield put(setLoader("failed"));
    }
}
//..GET ALL STATES CITIES MASTER DATA
// function* getStatesCitiesMaster() {
//     try {
//         const response = yield call(getAllStatesCitiesMasterService);
//         yield put(setSiteState({ name: 'statesCitiesMasterData', value: response }));
//         yield put(setAllStates());
//     } catch (error) {
//         yield put(SNACKBAR_ERROR(error.message));
//     }
// }
function* getStatesData() {
    try {
        let response = yield call(getStatesDataService);
        yield put(setStatesData(response.data));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* getCitiesByStateData(data) {
    try {
        let response = yield call(getCitiesByStateDataService, data.payload);
        yield put(setCitiesData(response.data));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setSiteDetails(payload) {
    try {
        const response = yield call(setSiteDeatilsService, payload);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setSiteFormDetails(payload) {
    try {
        yield put(setSiteFormValues(payload.payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* getManagerDetails(payload) {
    try {
        const response = yield call(getManagerDetailsService, payload.payload)
        yield put(setManagerDetails(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* deleteManagerDetail(payload) {
    try {
        yield put(deleteManagerDetails(payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* resetCurrentManagerDetails(payload) {
    try {
        yield put(resetCurrentManager(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setSiteInitialState() {
    try {
        yield put(setInitialState())
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setManagerList(payload) {
    try {
        yield put(setManagers(payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* getIndividualSiteDetails(payload) {
    try {
        const response = yield call(getIndividualSiteService, payload.payload.id);
        yield put(setFetchedSiteDetails({ name: 'siteDetails', value: response }));
        //yield put(setAllCitiesByState());
        yield put (setCitiesData())
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setIndividualSiteDetails(payload) {
    try {
        const { payload: { siteDetails, id } } = payload;
        const managersList = [];
        siteDetails.managers.map((manager) => {
           return managersList.push(manager.id)
        })
        const updatedData = {
            address: siteDetails.address,
            area: siteDetails.area,
            city: siteDetails.city,
            clientId: siteDetails.clientId,
            country: "India",
            email: siteDetails.email,
            latitude: siteDetails.latitude,
            longitude: siteDetails.longitude,
            managers: managersList,
            name: siteDetails.name,
            phone: siteDetails.phone,
            pin: siteDetails.pin,
            siteId: siteDetails.siteId,
            state: siteDetails.state,
            status: siteDetails.status,
            type: siteDetails.type
        }
        const response = yield call(setIndividualSiteService, id, updatedData);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* getSiteTemplate() {
    try {
       const response =  yield call(getSiteTemplateService);
       const url = window.URL.createObjectURL(response);
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'SiteTemplate.xls',);
   
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
function* setSiteTemplateData(payload) {
    try {
        const { clientId, data, reqConfig } = payload.payload;
        const response = yield call(setSiteTemplateService, clientId, data, reqConfig);
        yield put(setUploadState({ name: 'bulkUploadReport', value: response }));
        yield put(setUploadState({ name: 'showUploadComplete', value: true }));
        yield put(setSiteErrorLog(response));
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setExcelSheet(payload) {
    try {
        const { payload: { clientId } } = payload;
        const response = yield call(setExcelSheetService, clientId)
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'SiteTable.xls',);
    
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
// function* setFilterCitiesValue(payload) {
//     try {
//         const { payload: { value } } = payload;
//         yield put(setFilterCities(value));
//     } catch (error) {
//         yield put(SNACKBAR_ERROR(error.message));
//     }
// }
function* setSortDirection(payload) {
    try {
        yield put(setSiteSortOptions(payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* watchIndividualSiteDetails() {
    yield takeEvery('getIndividualDetailsAction', getIndividualSiteDetails);
}
function* watchGetAllSiteDetails() {
    yield takeEvery('getAllSiteDetailsAction', getAllSiteDetails);
}
// function* watchGetStatesCitiesMasterAction() {
//     yield takeEvery('getStatesCitiesMasterAction', getStatesCitiesMaster);
// }
function* watchSetSiteDetails() {
    yield takeEvery('setSiteDetailsAction', setSiteDetails);
}
function* watchSetSiteFormDetails() {
    yield takeEvery('setSiteFormDetailsAction', setSiteFormDetails);
}
function* watchGetManagerDetails() {
    yield takeEvery('getManagerDetailsAction', getManagerDetails);
}
function* watchDeleteManagerDetails() {
    yield takeEvery('deleteManagerDetailsAction', deleteManagerDetail);
}
function* watchResestCurrentManagerDetails() {
    yield takeEvery('resetCurrentManagerDetailsAction', resetCurrentManagerDetails);
}
function* watchSetSiteInitialStateAction() {
    yield takeEvery('setSiteInitialStateAction', setSiteInitialState);
}
function* watchSetManagerListAction() {
    yield takeEvery('setManagerListAction', setManagerList)
}
function* watchSetIndividualSiteDetailsAction() {
    yield takeEvery('setIndividualSiteDetailsAction', setIndividualSiteDetails)
}
function* watchGetSiteTemplateAction() {
    yield takeEvery('getSiteTemplateAction', getSiteTemplate)
}
function* watchSetSiteTemplateAction() {
    yield takeEvery('setSiteTemplateAction', setSiteTemplateData)
}
function* watchSetExcelSheetAction() {
    yield takeEvery('setExcelSheetAction', setExcelSheet)
}
// function* watchSetFilterCitiesAction() {
//     yield takeEvery('setFilterCitiesAction', setFilterCitiesValue)
// }
function* watchGetStatesData() {
    yield takeEvery('getStatesDataAction', getStatesData)
}

function* watchGetCitiesByStateData() {
    yield takeEvery('getCitiesByStateDataAction', getCitiesByStateData);
}
function* watchSetSiteSortDirectionAction() {
    yield takeEvery('setSiteSortDirectionAction', setSortDirection)
}
// Actions
export default function* siteManagementSaga() {
    yield all([
        watchGetAllSiteDetails(),
        watchSetSiteDetails(),
        watchSetSiteFormDetails(),
        watchGetStatesData(),
        watchGetCitiesByStateData(),
        //watchGetStatesCitiesMasterAction(),
        watchGetManagerDetails(),
        watchDeleteManagerDetails(),
        watchResestCurrentManagerDetails(),
        watchSetSiteInitialStateAction(),
        watchSetManagerListAction(),
        watchIndividualSiteDetails(),
        watchSetIndividualSiteDetailsAction(),
        watchGetSiteTemplateAction(),
        watchSetSiteTemplateAction(),
        watchSetExcelSheetAction(),
        //watchSetFilterCitiesAction(),
        watchSetSiteSortDirectionAction()
    ])

}