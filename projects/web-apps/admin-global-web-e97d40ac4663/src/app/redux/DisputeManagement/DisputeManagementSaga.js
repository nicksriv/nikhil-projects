import { call, put, takeEvery, all } from 'redux-saga/effects'
import { cloneDeep } from 'lodash'
import { format } from 'date-fns'
import { SNACKBAR_ERROR } from './../slices/snackbar'
import { disputeManagementParsers } from './DisputeManagementParser'
import {
    getDisputesListService, getDisputeListDownloadService, getDisputeDetailsService
} from './DisputeManagementService'
import {
    setDisputeList, setDisputeDetails,
    setLoader
} from './DisputeManagementSlice'

function* getDisputesListSaga(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(getDisputesListService, newData)
        if (payload.filter.clientId) {
            const newResponse = response.content.filter((dispute) => {
                return dispute.clientId === payload.filter.clientId
            })
            response.content = newResponse
            response.numberOfElements = newResponse.length
            response.totalElements = newResponse.length
            response.totalPages = Math.ceil(newResponse.length / 20)
            const parsedData = disputeManagementParsers.disputeListParser(response)
            yield put(setDisputeList(parsedData))
            yield put(setLoader(0))
        }
        else {
            const parsedData = disputeManagementParsers.disputeListParser(response)
            yield put(setDisputeList(parsedData))
            yield put(setLoader(0))

        }
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* getDisputeListDownload({ type, payload }) {
    try {
        let newData = cloneDeep(payload)
        const response = yield call(getDisputeListDownloadService, newData)
        const url = window.URL.createObjectURL(response)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Disputelist.xlsx')
        // Append to html link element page
        document.body.appendChild(link)
        // Start download
        link.click()
        // Clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) {
        console.log("Error", error)
    }
}

function* getDisputeDetailsSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getDisputeDetailsService, payload)
        const parsedData = disputeManagementParsers.disputeDetailsParser(response)
        yield put(setDisputeDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))

    }
}
function* watchDisputeDetailsAction() {
    yield takeEvery('getDisputeDetailsAction', getDisputeDetailsSaga)
}
function* watchDisputeListDownload() {
    yield takeEvery('getDisputeListDownloadAction', getDisputeListDownload)
}
function* watchDisputesList() {
    yield takeEvery('getDisputesListAction', getDisputesListSaga)
}

export default function* disputeManagementSaga() {
    yield all([
        watchDisputesList(),
        watchDisputeListDownload(),
        watchDisputeDetailsAction(),
    ])
}
