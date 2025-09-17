import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from './../slices/snackbar';
import { setFetchedRoleDetails, setInitialState, setLoader, setRoleDetails, setRoleModules, setRolesList } from './roleManagementSlice';
import { postRoleService, getRoleService, getIndividualRoleService, setIndividualRoleService } from './roleManagementService';
import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
import { getClientModulesByIdService } from '../ScreenBuilderManagement/screenBuilderManagementService';

function* setRoleFormValues(payload) {
    try {
        yield put(setRoleDetails(payload.payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setRole(payload) {
    try {
        const response = yield call(postRoleService, payload.payload.roleDetails);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* getClientRole(payload) {
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
        const response = yield call(getRoleService, newData);
        yield put(setRolesList(response))
        yield put(setLoader("complete"));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
        yield put(setLoader("failed"));
    }
}

function* getIndividualRole(payload) {
    try {
        const response = yield call(getIndividualRoleService, payload.payload.id);
        yield put(setFetchedRoleDetails({ name: 'roleDetails', value: response }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* getClientModules(payload) {
    try {
        const { payload: { clientId } } = payload;
        const response = yield call(getClientModulesByIdService, clientId);
        yield put(setRoleModules(response.modules));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* setIndividaulRole(payload) {
    try {
        const response = yield call(setIndividualRoleService, payload.payload.id, payload.payload.roleDetails);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setRoleInitialState() {
    try {
        yield put(setInitialState());
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* watchSetRoleDetailsAction() {
    yield takeEvery('setRoleDetailsAction', setRoleFormValues);
}
function* watchSetRoleAction() {
    yield takeEvery('setRoleAction', setRole);
}
function* watchGetClientRoleAction() {
    yield takeEvery('getClientRoleAction', getClientRole);
}
function* watchGetIndividualRoleAction() {
    yield takeEvery('getIndividualRoleAction', getIndividualRole)
}
function* watchSetIndividualRoleAction() {
    yield takeEvery('setIndividualRoleAction', setIndividaulRole)
}
function* watchSetRoleInitialStateAction() {
    yield takeEvery('setRoleInitialStateAction', setRoleInitialState);
}
function* watchGetUserModulesAction() {
    yield takeEvery('getUserModulesAction', getClientModules);
}

// Actions
export default function* roleManagementSaga() {
    yield all([
        watchSetRoleDetailsAction(),
        watchSetRoleAction(),
        watchGetClientRoleAction(),
        watchGetIndividualRoleAction(),
        watchSetIndividualRoleAction(),
        watchSetRoleInitialStateAction(),
        watchGetUserModulesAction()
    ])

}