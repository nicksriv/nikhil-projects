import { call, put, takeEvery, all } from 'redux-saga/effects'

import { cloneDeep } from 'lodash'
import { format } from 'date-fns'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from './../slices/snackbar'
import {
    getVendorListService,
    getVendorListDownloadService,
    getVendorDetailsService,
    getVendorCredentialService,
    updateVendorPasswordService,
    getVendorEmailTemplateService,
    setVendorEmailTemplateService,
    getVendorStatsService,
} from './VendorManagementService'
import {
    setLoader,
    setVendorList,
    setVendorDetails,
    setVendorFormBtnState,
    setVendorCredential,
    setVendorEmailTemplate,
    setVendorStats,
} from './VendorManagementSlice'
import vendorManagementParser from './VendorManagementParser'

function* getVendorListSaga(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(getVendorListService, newData)
        const parsedData = vendorManagementParser.vendorListParser(response)
        yield put(setVendorList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* getVendorListDownloadSaga({ type, payload }) {
    try {
        let newData = cloneDeep(payload)
        newData['to']
            ? (newData.to = format(newData.to, 'dd-MM-yyyy'))
            : (newData.to = '')
        newData['from']
            ? (newData.from = format(newData.from, 'dd-MM-yyyy'))
            : (newData.from = '')
        newData = Object.entries(newData).reduce(
            (a, [k, v]) => (v ? ((a[k] = v), a) : a),
            {}
        )
        const response = yield call(getVendorListDownloadService, newData)
        const url = window.URL.createObjectURL(response)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'VendorsList.xls')

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getVendorDetailsSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getVendorDetailsService, payload)
        const parsedData = vendorManagementParser.vendorDetailsParser(response)
        yield put(setVendorDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* setActiveStep(payload) {
    try {
        const { activeStep } = payload.payload
        yield put(
            setVendorFormBtnState({ name: 'activeStep', value: activeStep })
        )
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getVendorCredentialSaga({ type, payload }) {
    try {
        const response = yield call(getVendorCredentialService, payload)
        const parsedData =
            vendorManagementParser.vendorCredentialParser(response)
        yield put(setVendorCredential(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* updateVendorPasswordSaga({ type, payload }) {
    const { vendorId, newPassword } = payload
    try {
        const response = yield call(updateVendorPasswordService, {
            vendorId,
            newPassword,
        })
        yield put(SNACKBAR_SUCCESS(response.message))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* getVendorEmailTemplateSaga({ type, payload }) {
    try {
        const response = yield call(getVendorEmailTemplateService, payload)
        const parsedData =
            vendorManagementParser.vendorEmailTemplateParser(response)
        yield put(setVendorEmailTemplate(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* setVendorEmailTemplateSaga({ type, payload }) {
    try {
        const response = yield call(setVendorEmailTemplateService, payload)
        yield put(SNACKBAR_SUCCESS(response.message))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getVendorStatsSaga({ type, payload }) {
    try {
        const response = yield call(getVendorStatsService, payload)
        const parsedData = vendorManagementParser.vendorStatsParser(response)
        yield put(setVendorStats(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* watchVendorList() {
    yield takeEvery('getVendorListAction', getVendorListSaga)
}
function* watchVendorListDownload() {
    yield takeEvery('getVendorListDownloadAction', getVendorListDownloadSaga)
}
function* watchVendorDetails() {
    yield takeEvery('getVendorDetailsAction', getVendorDetailsSaga)
}
function* watchSetActiveStepAction() {
    yield takeEvery('setActiveStepAction', setActiveStep)
}

function* watchVendorCredentialAction() {
    yield takeEvery('getVendorCredentialAction', getVendorCredentialSaga)
}

function* watchUpdateVendorPasswordAction() {
    yield takeEvery('updateVendorPasswordAction', updateVendorPasswordSaga)
}
function* watchVendorEmailTemplateAction() {
    yield takeEvery('getVendorEmailTemplateAction', getVendorEmailTemplateSaga)
}
function* watchSetVendorEmailTemplateAction() {
    yield takeEvery('setVendorEmailTemplateAction', setVendorEmailTemplateSaga)
}
function* watchVendorStatsAction() {
    yield takeEvery('getVendorStatsAction', getVendorStatsSaga)
}

export default function* vendorManagementSaga() {
    yield all([
        watchVendorList(),
        watchVendorListDownload(),
        watchVendorDetails(),
        watchSetActiveStepAction(),
        watchVendorCredentialAction(),
        watchUpdateVendorPasswordAction(),
        watchVendorEmailTemplateAction(),
        watchSetVendorEmailTemplateAction(),
        watchVendorStatsAction(),
    ])
}
