import { call, put, takeEvery, all } from 'redux-saga/effects'
import { cloneDeep } from 'lodash'
import { format } from 'date-fns'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from './../slices/snackbar'
import { qualityAssuranceManagementParsers } from './QualityAssuranceManagementParser'
import {
    getQualityAssuranceListService, updateQualityAssurancePasswordService, getQualityAssuranceListDownloadService, getQualityAssuranceDetailsService, getQualityAssuranceCredentialService,
    setQualityAssuranceEmailTemplateService,getQualityAssuranceEmailTemplateService
} from './QualityAssuranceManagementService'
import {
    setQualityAssuranceList, setQualityAssuranceCredential,
    setQualityAssuranceDetails, setLoader,setQualityAssuranceEmailTemplate
} from './QualityAssuranceManagementSlice'

function* getQualityAssuranceListSaga(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(getQualityAssuranceListService, newData)
        const parsedData = qualityAssuranceManagementParsers.qualityAssuranceListParser(response)
        yield put(setQualityAssuranceList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* getQualityAssuranceListDownload({ type, payload }) {
    try {
        let newData = cloneDeep(payload)
        const response = yield call(getQualityAssuranceListDownloadService, newData)
        const url = window.URL.createObjectURL(response)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'QualityAssurancelist.xlsx')

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) { }
}

function* getQualityAssuranceDetailsSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getQualityAssuranceDetailsService, payload)
        const parsedData = qualityAssuranceManagementParsers.qualityAssuranceDetailsParser(response)
        yield put(setQualityAssuranceDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* getQualityAssuranceCredentialSaga({ type, payload }) {
    try {
        const response = yield call(getQualityAssuranceCredentialService, payload)
        console.log("ResPonse",response)
        const parsedData =
            qualityAssuranceManagementParsers.qualityAssuranceCredentialParser(response)
        console.log("Parsed data",parsedData)
        yield put(setQualityAssuranceCredential(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}
function* updateQualityAssurancePasswordSaga({ type, payload }) {
    try {
        const response = yield call(updateQualityAssurancePasswordService,
            payload
        )
        yield put(SNACKBAR_SUCCESS(response.message))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* getQualityAssuranceEmailTemplateSaga({ type, payload }) {
    try {
        const response = yield call(getQualityAssuranceEmailTemplateService, payload)
        const parsedData =
        qualityAssuranceManagementParsers.qualityAssuranceEmailTemplateParser(response)
        yield put(setQualityAssuranceEmailTemplate(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}

function* setQualityAssuranceEmailTemplateSaga({ type, payload }) {
    console.log("set QA EMail",payload)
    try {
        const response = yield call(setQualityAssuranceEmailTemplateService, payload)
        yield put(SNACKBAR_SUCCESS(response.message))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* watchQualityAssuranceListDownload() {
    yield takeEvery('getQualityAssuranceListDownloadAction', getQualityAssuranceListDownload)
}

function* watchQualityAssuranceList() {
    yield takeEvery('getQualityAssuranceListAction', getQualityAssuranceListSaga)
}

function* watchQualityAssuranceDetails() {
    yield takeEvery('getQualityAssuranceDetailsAction', getQualityAssuranceDetailsSaga)
}
function* watchQualityAssuranceCredentialAction() {
    yield takeEvery('getQualityAssuranceCredentialAction', getQualityAssuranceCredentialSaga)
}
function* watchUpdateQualityAssurancePasswordAction() {
    yield takeEvery('updateQualityAssurancePasswordAction', updateQualityAssurancePasswordSaga)
}
function* watchQualityAssuranceEmailTemplateAction() {
    yield takeEvery('getQualityAssuranceEmailTemplateAction', getQualityAssuranceEmailTemplateSaga)
}
function* watchSetQualityAssuranceEmailTemplateAction() {
    yield takeEvery('setQualityAssuranceEmailTemplateAction', setQualityAssuranceEmailTemplateSaga)
}
export default function* qualityAssuranceManagementSaga() {
    yield all([
        watchQualityAssuranceList(),
        watchQualityAssuranceListDownload(),
        watchQualityAssuranceDetails(),
        watchQualityAssuranceCredentialAction(),
        watchUpdateQualityAssurancePasswordAction(),
        watchQualityAssuranceEmailTemplateAction(),
        watchSetQualityAssuranceEmailTemplateAction(),
    ])
}
