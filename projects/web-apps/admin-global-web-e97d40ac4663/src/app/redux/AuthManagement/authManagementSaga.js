import { call, put, takeEvery, all } from 'redux-saga/effects'
import { setLoginDetails, setLogoutDetails, setNavigations, setCPasswordStatus, setUserProfileImageId, setUserLogoId, setClientDisabled, setClientEnabled } from './authManagementSlice'
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from './../slices/snackbar'
import { setAuthenticationService, logoutUserService, changeUserProfilePasswordService } from './authManagementService';
import jwtDecode from 'jwt-decode';
import { setClientIdForUsers } from '../UserManagement/userManagementSlice';

function* authenticationAction(payload) {
    try {
        const response = yield call(setAuthenticationService, payload.payload);
        const logoId = response.logoId;
        localStorage.setItem('logoId', logoId ? logoId : "");
        localStorage.setItem('profileId', response.profileId ? response.profileId : "");
        localStorage.setItem('googleMapAuthKey', response.googleMapAuthKey);
        yield put(setLoginDetails(response));
        const user = jwtDecode(response.token);
        if (user.typeOfUser === "Client") {
            yield put(setClientIdForUsers({ clientId: user.clientId, clientLogoId: user.id }));
        } 
        else if(user.typeOfUser === "QUALITY_ASSURANCE"){
            localStorage.setItem('qaId',payload?.payload?.clientId)
            localStorage.setItem('qaName',JSON.stringify({firstName:user?.firstName,lastName:user?.lastName}))
        }
        else if (user.typeOfUser === "User") {
            yield put(setClientIdForUsers({ clientId: user.clientId, clientLogoId: user.clientSystemId }));
        }
        
        yield put(setUserLogoId(localStorage.getItem('logoId') && localStorage.getItem('logoId')));
        yield put(setUserProfileImageId(localStorage.getItem('profileId') && localStorage.getItem('profileId')));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* logout() {
    try {
        const response = yield call(logoutUserService);
        yield put(setLogoutDetails())
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* setNavigationByUser(data) {
    try {
        const { navigations, isClientSelected } = data.payload;
        const role = localStorage.getItem("typeOfUser");
        //const role = "QUALITY_ASSURANCE";
        let filteredNavigations = getfilteredNavigations(navigations, role, isClientSelected);
        yield put(setNavigations(filteredNavigations));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

const getfilteredNavigations = (navList = [], role, isClientSelected) => {
    return navList.reduce((array, nav) => {
        if (nav.auth) {
            if (nav.auth.includes(role)) {
                if (role === "Admin") {
                    if (isClientSelected || ["Client Management","Vendor Management","Freelancer Management","QA Management","Dispute Management"].includes(nav.name)) {
                        array.push(nav);
                    }
                    return array
                }
                if (role === "Client"){
                    if (isClientSelected || ["Dispute Management"].includes(nav.name)) {
                        array.push(nav);
                    }
                } 
                else if(role === "QUALITY_ASSURANCE"){
                    if(["Job Management"].includes(nav.name)){
                        array.push(nav);
                    }
                }
                else {
                    if (nav.name === "Theme Management") {
                        let editThemeEnabled = localStorage.getItem('editThemeEnabled');
                        if (editThemeEnabled === "true") {
                            array.push(nav);
                        }
                    } else if (nav.name === "Screen Builder") {
                        let workflowEnabled = localStorage.getItem('editWorkflowEnabled');
                        if (workflowEnabled === "true") {
                            array.push(nav);
                        }
                    }
                    else {
                        array.push(nav);
                    }
                }
            }
        } else {
            if (nav.children) {
                nav.children = getfilteredNavigations(nav.children, role)
                array.push(nav)
            } else {
                array.push(nav)
            }
        }
        return array
    }, [])
}

//..User Profile password change
function* changeProfilePassword(data) {
    yield put(setCPasswordStatus(false));
    try {
        const response = yield call(changeUserProfilePasswordService, data.payload);
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setCPasswordStatus(true));
        yield call(logout);
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
        yield put(setCPasswordStatus(false));
    }
}


function* watchAuthentication() {
    yield takeEvery('setAuthenticationAction', authenticationAction)
}

function* watchLogoutUser() {
    yield takeEvery('logoutUserAction', logout)
}

//Set Navigations Call
function* watchSetNavigationByUserAction() {
    yield takeEvery('setNavigationByUserAction', setNavigationByUser)
}

function* watchChangeUserProfilePasswordAction() {
    yield takeEvery('changeUserProfilePasswordAction', changeProfilePassword);
}


// Actions
export default function* authManagementSaga() {
    yield all([
        watchAuthentication(),
        watchLogoutUser(),
        watchSetNavigationByUserAction(),
        watchChangeUserProfilePasswordAction(),
    ])
}
