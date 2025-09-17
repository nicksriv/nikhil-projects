import { call, put, takeEvery, all } from 'redux-saga/effects'

import { cloneDeep } from 'lodash'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from '../slices/snackbar'
import {
    getVendorRegistrationListService,
    assignVendorRegistrationListService
} from './VendorRegistrationService'
import {
    setLoader,
    setVendorRegistrationList,
    setVendorRequestActionData,setAssignVendorRegistrationList,setVendorBasicDetails
} from './VendorRegistrationSlice'
import vendorRegistrationParser from './VendorRegistrationParser'

function* getVendorRegistartionListSaga(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(getVendorRegistrationListService, newData)
        const parsedData = vendorRegistrationParser.vendorRegistrationListParser(response)
        yield put(setVendorRegistrationList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* vendorRequestActionSaga(data){
    try{
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        yield put(setVendorRequestActionData(newData));
        yield put(setLoader(0));
    }
    catch(error){
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* vendorRequestsListActionSaga(data){
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(assignVendorRegistrationListService, newData)
        const parsedData = vendorRegistrationParser.assignVendorListParser(response)
        yield put(setAssignVendorRegistrationList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* vendorBasicDetailsActionSaga(data){
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        yield put(setVendorBasicDetails(newData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* watchVendorRegistrationList() {
    yield takeEvery('getVendorRegistrationListAction', getVendorRegistartionListSaga)
}
function* watchVendorRequestAction() {
    yield takeEvery('vendorRequestAction', vendorRequestActionSaga)
}
function* watchVendorRequestListAction() {
    yield takeEvery('getVendorsRequestsListAction', vendorRequestsListActionSaga)
}
function* watchVendorBasicDetailsAction() {
    yield takeEvery('setVendorBasicDetailsAction',vendorBasicDetailsActionSaga)
}

export default function* vendorManagementSaga() {
    yield all([
        watchVendorRegistrationList(),
        watchVendorRequestAction(),
        watchVendorRequestListAction(),
        watchVendorBasicDetailsAction()
    ])
}
