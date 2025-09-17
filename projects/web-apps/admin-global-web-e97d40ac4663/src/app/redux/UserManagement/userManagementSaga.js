import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  setUserDetails,
  setMappedLocationDetails,
  setUserEmploymentDetails,
  setUserBankDetails,
  setEmpReportingReferralDetails,
  setUserState,
  setInitialState,
  setAllStoresByClientId,
  setAllRolesByClientId,
  setBankMaster,
  setAllUsers,
  setMappedLocationState,
  setBankDetailsState,
  setUserCredentialDetails,
  setShowUserDetailsPopup,
  setClientIdForUsers,
  setSelectedMappedLocation,
  // startLoading,
  // endLoading,
  setUsersErrorLog,
  getUserEmailTemplate,
  setUserSortOptions,
  
  setLoader,
  setStatesData,
  setCitiesData
} from './userManagementSlice';
import {
  SNACKBAR_SUCCESS,
  SNACKBAR_ERROR,
} from './../slices/snackbar';
import {
  // getAllStatesCitiesMasterService,
  // getAllStoresByClientIdService,
  // changeUserProfilePasswordService,
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
  postStoresByClientIdService,
  getAllRolesByClientIdService,
  postRolesByClientIdService,
  getAllUsersService,
  deleteUserService,
  getUserCredentialsService,
  changeUserPasswordService,
  getTemplateService,
  getSiteMappingTemplateService,
  postUploadUsersService,
  putUploadSiteMapService,
  getUserEmailTemplateService,
  setUserEmailTemplateService,
  getListOfLocationIdService,
  getLocationDetailsService,
  getStatesDataService,
  getCitiesByStateDataService,
  getAllUsersDownloadService
} from './userManagementService';
import { format } from 'date-fns'
import { cloneDeep } from 'lodash';
//import { saveAs } from 'file-saver';

//..GET ALL USERS
function* getAllUsers(data) {
  try {
    // yield put(startLoading());
    const { payload } = data;
    let newData = cloneDeep(payload);
    newData.filter['to'] ? newData.filter.to = format(newData.filter.to, 'dd-MM-yyyy') : newData.filter.to = null;
    newData.filter['from'] ? newData.filter.from = format(newData.filter.from, 'dd-MM-yyyy') : newData.filter.from = null;
    newData.filter.ageFrom = newData.filter.ageFrom === 0 ? null : newData.filter.ageFrom;
    newData.filter.ageTo = newData.filter.ageTo === 0 ? null : newData.filter.ageTo;

    newData.filter = Object.entries(newData.filter).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
    const response = yield call(getAllUsersService, newData);
    yield put(setAllUsers(response));
    yield put(setLoader("complete"))
    // yield put(endLoading());

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
    yield put(setLoader("failed"))
    // yield put(endLoading());

  }
}

function* getAllUsersDownload(data) {
  try{
    const clientId = data.payload.clientIdForUsers;
    let newData = cloneDeep(data.payload.filter);
    newData['to'] ? newData.to = format(newData.to, 'dd-MM-yyyy') : newData.to = "";
    newData['from'] ? newData.from = format(newData.from, 'dd-MM-yyyy') : newData.from = "";
    newData.ageFrom = newData.ageFrom === 0 ? "" : newData.ageFrom;
    newData.ageTo = newData.ageTo === 0 ? "" : newData.ageTo;
    newData = Object.entries(newData).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
    const response = yield call(getAllUsersDownloadService, clientId, newData);
    const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'UesrsList.xls',);
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);
  } catch(error) {

  }
}
//..GET USER CREDENTIAL DETAILS
function* getUserCredentialDetailsById(data) {
  try {
    const { userId } = data.payload;
    const response = yield call(getUserCredentialsService, userId);
    yield put(setUserCredentialDetails(response));
    yield put(setShowUserDetailsPopup(true));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..DELETE USER DETAILS
function* deleteUser(data) {
  try {
    const { _id } = data.payload;
    const response = yield call(deleteUserService, _id);
    yield call(getAllUsers, data);
    yield put(SNACKBAR_SUCCESS(response.message));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET ALL STATES CITIES MASTER DATA
// function* getStatesCitiesMaster() {
//   try {
//     const response = yield call(getAllStatesCitiesMasterService);
//     yield put(setUserState({ name: 'statesCitiesMasterData', value: response }));
//     yield put(setAllStates());
//   } catch (error) {
//     yield put(SNACKBAR_ERROR(error.message));
//   }
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
//..GET All USERS BY CLIENT ID
function* getAllUsersByClientId(payload) {
  try {
    const { clientId } = payload.payload;
    const response = yield call(getAllUsersByClientIdService, clientId);
    const { data } = response;
    yield put(setUserState({ name: 'clientEmployees', value: data }));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..POST USERS BASIC DETAILS BY CLIENT ID
function* postUserBasicDetailsByClientId(payload) {
  try {
    const { clientId, userBasicDetails, activeStep } = payload.payload;
    const response = yield call(postUserBasicDetailsByClientIdService, clientId, userBasicDetails);
    const { id } = response;
    yield put(setUserState({ name: 'id', value: id })); //..THIS IS OBJECT ID OF NEWLY CREATED USER
    yield put(setUserState({ name: 'activeStep', value: activeStep + 1 }));
    yield put(setUserState({ name: 'isBasicDetailsSaved', value: true }));
  } catch (error) {
    yield put(setUserState({ name: 'isBasicDetailsSaved', value: false }));
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET SELECTED USER DETAILS
function* getUserBasicDetailsById(payload) {
  try {
    const { id } = payload.payload;
    yield put(setLoader(1))
    const response = yield call(getUserBasicDetailsByIdService, id);
    if (response && response.dob) {
      const dobArr = response.dob.split('-');
      if (dobArr && Array.isArray(dobArr) && dobArr.length === 3) {
        const d = dobArr[0];
        const m = dobArr[1];
        const y = dobArr[2];
        response.dob = `${m}-${d}-${y}`;
      }
    }
    yield put(setUserState({ name: 'userBasicDetails', value: response }));
    //yield put(setFormBtnState());
    yield put(setCitiesData());
    yield put(setLoader(1))
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..PUT SELECTED USER DETAILS
function* putUserBasicDetailsById(payload) {
  try {
    const { id, userBasicDetails, activeStep } = payload.payload;
    yield call(putUserBasicDetailsByIdService, id, userBasicDetails);
    // const { message } = response;
    yield put(setUserState({ name: 'activeStep', value: activeStep + 1 }));
    yield put(setUserState({ name: 'isBasicDetailsSaved', value: true }));
  } catch (error) {
    yield put(setUserState({ name: 'isBasicDetailsSaved', value: false }));
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* deleteUserById() {
  try {
    yield call(deleteUserByIdService);
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET USER BANK DETAILS 
function* getUserBankDetailsById(payload) {
  try {
    const { id } = payload.payload;
    yield put(setLoader(1))
    const response = yield call(getUserBankDetailsByIdService, id);
    yield put(setBankDetailsState(response))
    yield put(setLoader(0))
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET BANK MASTER
function* getBankMaster() {
  try {
    const response = yield call(getBankMasterService);
    const { banks } = response;
    yield put(setBankMaster(banks));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..PUT USER BANK DETAILS
function* putUserBankDetailsById(payload) {
  try {
    const { id, userBankDetails, pageMode, empName,
      // employeeId, userId 
    } = payload.payload;
    yield call(putUserBankDetailsByIdService, id, userBankDetails);
    // const { message } = response;
    if (pageMode === 'add') {
      const userCreds = yield call(getUserCredentialsService, id);
      yield put(setUserState({ name: 'userCredentialDetails', value: userCreds }));
      yield put(setUserState({ name: 'showSubmitPopUp', value: true }));
      yield put(SNACKBAR_SUCCESS(`User ${empName} onboarded successfully`));
    } else if (pageMode === 'edit') {
      yield put(SNACKBAR_SUCCESS(`User details of ${empName} updated successfully`));
    }

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET USER EMPLOYEE DETAILS   
function* getUserEmployeeDetailsById(payload) {
  try {
    const { id } = payload.payload;
    yield put(setLoader(1))
    const response = yield call(getUserEmployeeDetailsByIdService, id);
    if (response && response.joiningDate) {
      const jdArr = response.joiningDate.split('-');
      if (jdArr && Array.isArray(jdArr) && jdArr.length === 3) {
        const d = jdArr[0];
        const m = jdArr[1];
        const y = jdArr[2];
        response.joiningDate = `${m}-${d}-${y}`;
      }
    }
    let data = { ...response };
    data.roles = data.roles.map((r) => r.name);
    yield put(setUserState({ name: 'userEmploymentDetails', value: data }));
    yield put(setLoader(0))
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..PUT USER EMPLOYEE DETAILS
function* putUserEmployeeDetailsById(payload) {
  try {
    const { id, userEmploymentDetails, activeStep, roles } = payload.payload;
    let formattedUserEmploymentDetails = { ...userEmploymentDetails };
    formattedUserEmploymentDetails.roles = formattedUserEmploymentDetails.roles.map((r, i) => {
      const cr = roles.find(x => x.name === r);
      if (cr && cr.id) {
        return cr.id;
      }
    });
    yield call(putUserEmployeeDetailsByIdService, id, formattedUserEmploymentDetails);
    // const { message } = response;
    yield put(setUserState({ name: 'activeStep', value: activeStep + 1 }));
    yield put(setUserState({ name: 'isEmploymentDetailsSaved', value: true }));
  } catch (error) {
    yield put(setUserState({ name: 'isEmploymentDetailsSaved', value: false }));
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET USER LOCATION DETAILS
function* getUserLocationDetailsById(payload) {
  try {
    const { id } = payload.payload;
    yield put(setLoader(1))
    const response = yield call(getUserLocationDetailsByIdService, id);
    const { locations } = response;
    yield put(setMappedLocationState(locations))
    yield put(setLoader(0))
    // const { message } = response;
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..PUT USER LOCATION DETAILS
function* putUserLocationDetailsById(payload) {
  try {
    const { id, mappedLocations, activeStep, deletedLocations } = payload.payload;
    let data = {
      siteIdsToDelete: [],
      sitesToMap: []
    }
    let filteredLocations = [...new Set(mappedLocations)];
    let siteIds = filteredLocations.map((site) => {
      return {
        location: site.siteId,
        days: site.days,
        dates: site.dates
      }
    });
    if (deletedLocations) {
      let locationDeleted = [...new Set(deletedLocations)];
      let deletedSiteIds = locationDeleted.map((site) => {
        return site.siteId
      });
      deletedSiteIds = deletedSiteIds.filter(function (element) {
        return element !== undefined;
      });
      data.siteIdsToDelete = deletedSiteIds;
    }
    siteIds = siteIds.filter(function (element) {
      return element !== undefined && JSON.stringify(element) !== '{}'
    });
    data.sitesToMap = siteIds;
    yield call(putUserLocationDetailsByIdService, id, data);
    // const { message } = response;
    yield put(setUserState({ name: 'activeStep', value: activeStep + 1 }));
    yield put(setUserState({ name: 'isMappedLocationSaved', value: true }));
  } catch (error) {
    yield put(setUserState({ name: 'isMappedLocationSaved', value: false }));
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET ALL STORES BY CLIENT ID
function* getAllStoresByClientId(payload) {
  try {
    const { clientId } = payload.payload;
    const response = yield call(getListOfLocationIdService, clientId);
    yield put(setAllStoresByClientId(response.data));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* postStoresByClientId() {
  try {
    yield call(postStoresByClientIdService);
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET ALL ROLES BY CLIENT ID
function* getAllRolesByClientId(payload) {
  try {
    const { clientId } = payload.payload;
    const response = yield call(getAllRolesByClientIdService, clientId);
    const { roles } = response;
    yield put(setAllRolesByClientId(roles));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* postRolesByClientId() {
  try {
    yield call(postRolesByClientIdService);
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* setUserFormValues(payload) {
  try {
    yield put(setUserDetails(payload.payload));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* setUserEmploymentFromValues(payload) {
  try {
    yield put(setUserEmploymentDetails(payload.payload));
    yield put(setEmpReportingReferralDetails(payload.payload));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* setUserBankFromValues(payload) {
  try {
    yield put(setUserBankDetails(payload.payload));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* setMappedLocationFromValues(payload) {
  try {
    yield put(setMappedLocationDetails(payload.payload));

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* setSelectedMappedLocationDetail(payload) {
  try {
    const { payload: { value } } = payload;
    const response = yield call(getLocationDetailsService, value);
    yield put(setSelectedMappedLocation(response))
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* setActiveStep(payload) {
  try {
    const { activeStep } = payload.payload;
    yield put(setUserState({ name: 'activeStep', value: activeStep }));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..SET INITIAL STATE 
function* setClientInitialState() {
  try {
    yield put(setInitialState());
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..SET USER ID (OBJECT ID) USED IN EDIT MODE
function* setUserId(payload) {
  try {
    const { id } = payload.payload;
    yield put(setUserState({ name: 'id', value: id }));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..setClientIdForUser 
function* setClientIdForUser(payload) {
  try {
    yield put(setClientIdForUsers(payload));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..User password change
function* changePassword(data) {
  try {
    const response = yield call(changeUserPasswordService, data.payload);
    yield put(SNACKBAR_SUCCESS(response.message));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
//..GET DOWNLOAD TEMPLATE TO BULK UPLOAD
function* getTemplate(data) {
  try {
    const { clientId } = data.payload;
    const response = yield call(getTemplateService, clientId);
    // yield call(getTemplateService, clientId);
    // var blob = new Blob([response], { type: "application/vnd.ms-excel" });
    // var blob = new Blob([response], {type:'data:application/vnd.ms-excel;base64'});
    // saveAs(blob, "UserTemplate.xls");
    // let blob = response.blob();
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'UserTemplate.xls',);

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
function* getSiteMappingTemplate(data) {
  try {
    const { type } = data.payload;
    const response = yield call(getSiteMappingTemplateService, type);
    // yield call(getTemplateService, clientId);
    // var blob = new Blob([response], { type: "application/vnd.ms-excel" });
    // var blob = new Blob([response], {type:'data:application/vnd.ms-excel;base64'});
    // saveAs(blob, "UserTemplate.xls");
    // let blob = response.blob();
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Site Template.xls',);

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


//..POST: UPLOAD XLS/ODS FILE TO USER BULK UPLOAD 
function* postUploadUsers(payload) {
  try {
    const { clientId, data, reqConfig } = payload.payload;
    const response = yield call(postUploadUsersService, clientId, data, reqConfig);
    yield put(setUserState({ name: 'bulkUploadReport', value: response }));
    yield put(setUserState({ name: 'showUploadComplete', value: true }));
    yield put(setUsersErrorLog(response));

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}

// POST:UPLOAD MAP SITE UPLOAD
function* putSiteMapUsers(payload) {
  try {
    const { clientId, data, reqConfig } = payload.payload;
    const response = yield call(putUploadSiteMapService, clientId, data, reqConfig);
    yield put(setUserState({ name: 'siteMapUpload', value: response }));
    yield put(setUserState({ name: 'showUploadComplete', value: true }));
    yield put(setUsersErrorLog(response));

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}


function* resetUploadUsers() {
  try {
    yield put(setUserState({ name: 'showUploadComplete', value: false }));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}
function* userEmailTemplate(data) {

  try {
    const { userId } = data
    let response = yield call(getUserEmailTemplateService, userId);
    yield put(getUserEmailTemplate(response));

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}

function* setuserEmailTemplate(data) {
  try {
    const { payload } = data;
    let response = yield call(setUserEmailTemplateService, payload.userId, data);
    yield put(SNACKBAR_SUCCESS(response.message));
  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}

function* setSortingDirection(payload) {
  try {
    yield put(setUserSortOptions(payload))

  } catch (error) {
    yield put(SNACKBAR_ERROR(error.message));
  }
}

function* watchAllUsersAction() {
  yield takeEvery('getAllUsersAction', getAllUsers);
}
function* watchGetClientCredentialDetailsAction() {
  yield takeEvery('getUserCredentialDetailsAction', getUserCredentialDetailsById);
}
function* watchSetUserDetailsAction() {
  yield takeEvery('setUserDetailsAction', setUserFormValues);
}
function* watchDeleteUserAction() {
  yield takeEvery('deleteUserAction', deleteUser);
}
function* watchsetUserEmploymentDetails() {
  yield takeEvery('setUserEmploymentDetailsAction', setUserEmploymentFromValues)
}
function* watchsetUserBankDetails() {
  yield takeEvery('setUserBankDetailsAction', setUserBankFromValues)
}
function* watchsetSelectedMappedLocationDetail() {
  yield takeEvery('setSelectedMappedLocationDetailAction', setSelectedMappedLocationDetail)
}
function* watchsetMappedLocationDetails() {
  yield takeEvery('setMappedLocationDetailsAction', setMappedLocationFromValues)
}
function* watchSetActiveStepAction() {
  yield takeEvery('setActiveStepAction', setActiveStep);
}
function* watchSetInitialStateAction() {
  yield takeEvery('setInitialStateAction', setClientInitialState);
}
// function* watchGetStatesCitiesMasterAction() {
//   yield takeEvery('getStatesCitiesMasterAction', getStatesCitiesMaster);
// }
function* watchGetStatesData() {
  yield takeEvery('getStatesDataAction', getStatesData)
}

function* watchGetCitiesByStateData() {
  yield takeEvery('getCitiesByStateDataAction', getCitiesByStateData);
}

function* watchGetAllUsersByClientIdAction() {
  yield takeEvery('getAllUsersByClientIdAction', getAllUsersByClientId);
}
function* watchPostUserBasicDetailsByClientIdAction() {
  yield takeEvery('postUserBasicDetailsByClientIdAction', postUserBasicDetailsByClientId);
}
function* watchGetUserBasicDetailsByIdAction() {
  yield takeEvery('getUserBasicDetailsByIdAction', getUserBasicDetailsById);
}
function* watchPutUserBasicDetailsByIdAction() {
  yield takeEvery('putUserBasicDetailsByIdAction', putUserBasicDetailsById);
}
function* watchDeleteUserByIdAction() {
  yield takeEvery('deleteUserByIdAction', deleteUserById);
}
function* watchGetUserBankDetailsByIdAction() {
  yield takeEvery('getUserBankDetailsByIdAction', getUserBankDetailsById);
}
function* watchGetBankMasterAction() {
  yield takeEvery('getBankMasterAction', getBankMaster);
}
function* watchPutUserBankDetailsByIdAction() {
  yield takeEvery('putUserBankDetailsByIdAction', putUserBankDetailsById);
}
function* watchGetUserEmployeeDetailsByIdAction() {
  yield takeEvery('getUserEmployeeDetailsByIdAction', getUserEmployeeDetailsById);
}
function* watchPutUserEmployeeDetailsByIdAction() {
  yield takeEvery('putUserEmployeeDetailsByIdAction', putUserEmployeeDetailsById);
}
function* watchGetUserLocationDetailsByIdAction() {
  yield takeEvery('getUserLocationDetailsByIdAction', getUserLocationDetailsById);
}
function* watchPutUserLocationDetailsByIdAction() {
  yield takeEvery('putUserLocationDetailsByIdAction', putUserLocationDetailsById);
}
function* watchGetAllStoresByClientIdAction() {
  yield takeEvery('getAllStoresByClientIdAction', getAllStoresByClientId);
}
function* watchPostStoresByClientIdAction() {
  yield takeEvery('postStoresByClientIdAction', postStoresByClientId);
}
function* watchGetAllRolesByClientIdAction() {
  yield takeEvery('getAllRolesByClientIdAction', getAllRolesByClientId);
}
function* watchPostRolesByClientIdAction() {
  yield takeEvery('postRolesByClientIdAction', postRolesByClientId);
}
function* watchSetUserIdAction() {
  yield takeEvery('setUserIdAction', setUserId);
}
function* watchSetClientIdForUserAction() {
  yield takeEvery('setClientIdForUserAction', setClientIdForUser);
}
function* watchChangeUserPasswordAction() {
  yield takeEvery('changeUserPasswordAction', changePassword);
}
//..GET DOWNLOAD TEMPLATE TO BULK UPLOAD
function* watchGetTemplateAction() {
  yield takeEvery('getTemplateAction', getTemplate);
}
//..GET DOWNLOAD TEMPLATE TO SITE MAPPING

function* watchGetSiteMappingTemplateAction() {
  yield takeEvery('getSiteMappingTemplateAction', getSiteMappingTemplate);
}
//..POST: UPLOAD XLS/ODS FILE TO USER BULK UPLOAD 
function* watchPostUploadUsersAction(payload) {
  yield takeEvery('postUploadUsersAction', postUploadUsers);
}
// POST:UPLOAD MAP SITE UPLOAD
function* watchPutUploadSiteMapAction(payload) {
  yield takeEvery('putUploadSiteMapAction', putSiteMapUsers);
}

//..RESET BULK UPLOAD 
function* watchRestUploadUsersAction() {
  yield takeEvery('restUploadUsersAction', resetUploadUsers);
}
function* watchgetUserEmailTemplateAction() {
  yield takeEvery('getUserEmailTemplateAction', userEmailTemplate);
}
function* watchsetUserEmailTemplateAction() {
  yield takeEvery('setUserEmailTemplateAction', setuserEmailTemplate);
}
function* watchSetSortDirection() {
  yield takeEvery('setUserSortDirectionAction', setSortingDirection)
}
function*  watchUsersDownloadAction() {
  yield takeEvery('getAllUsersDownload', getAllUsersDownload)
}

// Actions
export default function* userManagementSaga() {
  yield all([
    watchAllUsersAction(),
    watchGetClientCredentialDetailsAction(),
    watchDeleteUserAction(),
    watchSetUserDetailsAction(),
    watchsetUserEmploymentDetails(),
    watchsetUserBankDetails(),
    watchsetSelectedMappedLocationDetail(),
    watchsetMappedLocationDetails(),
    watchSetActiveStepAction(),
    watchSetInitialStateAction(),
    //watchGetStatesCitiesMasterAction(),
    watchGetStatesData(),
    watchSetInitialStateAction(),
    watchGetCitiesByStateData(),
    //watchGetStatesCitiesMasterAction(),
    watchGetAllUsersByClientIdAction(),
    watchPostUserBasicDetailsByClientIdAction(),
    watchGetUserBasicDetailsByIdAction(),
    watchPutUserBasicDetailsByIdAction(),
    watchDeleteUserByIdAction(),
    watchGetUserBankDetailsByIdAction(),
    watchGetBankMasterAction(),
    watchPutUserBankDetailsByIdAction(),
    watchGetUserEmployeeDetailsByIdAction(),
    watchPutUserEmployeeDetailsByIdAction(),
    watchGetUserLocationDetailsByIdAction(),
    watchPutUserLocationDetailsByIdAction(),
    watchGetAllStoresByClientIdAction(),
    watchPostStoresByClientIdAction(),
    watchGetAllRolesByClientIdAction(),
    watchPostRolesByClientIdAction(),
    watchSetUserIdAction(),
    watchSetClientIdForUserAction(),
    watchChangeUserPasswordAction(),
    watchGetTemplateAction(),
    watchGetSiteMappingTemplateAction(),
    watchPostUploadUsersAction(),
    watchRestUploadUsersAction(),
    watchPutUploadSiteMapAction(),
    watchgetUserEmailTemplateAction(),
    watchsetUserEmailTemplateAction(),
    watchSetSortDirection(),
    watchUsersDownloadAction()
  ]);
}
