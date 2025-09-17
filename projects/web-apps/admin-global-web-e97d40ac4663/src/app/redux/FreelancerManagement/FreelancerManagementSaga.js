import { call, put, takeEvery, all } from 'redux-saga/effects'
import { cloneDeep } from 'lodash'
import { format } from 'date-fns'
import { SNACKBAR_ERROR } from './../slices/snackbar'

import { freelancerManagementParsers } from './FreelancerManagementParser'
import {
    getFreelancersListService,
    getFreelancerListDownloadService,
    getFreelancerDetailsService,
    getFreelancerStatsService
} from './FreelancerManagementService'
import {
    setFreelancerList,
    setFreelancerDetails,
    setLoader, setFreelancerStatsJobs
} from './FreelancerManagementSlice'

function* getFreelancersListSaga(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(getFreelancersListService, newData)
        const parsedData = freelancerManagementParsers.freelancerListParser(response)
        yield put(setFreelancerList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}



function* getFreelancerListDownload({ type, payload }) {
    try {
        let newData = cloneDeep(payload)
        const response = yield call(getFreelancerListDownloadService, newData)
        const url = window.URL.createObjectURL(response)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Freelancerlist.xlsx')

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) { }
}




function* getFreelancerDetailsSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getFreelancerDetailsService, payload)
        const parsedData = freelancerManagementParsers.freelancerDetailsParser(response)
        yield put(setFreelancerDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}



function* getFreelancerStatsJobsSaga({ type, payload }) {
    try {
        const response = yield call(getFreelancerStatsService, payload)
        const parsedData = freelancerManagementParsers.freelancerStatsJobsParser(response)
        yield put(setFreelancerStatsJobs(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}
function* watchFreelancersList() {
    yield takeEvery('getFreelancersListAction', getFreelancersListSaga)
}
function* watchFreelancerListDownload() {
    yield takeEvery('getFreelancerListDownloadAction', getFreelancerListDownload)
}
function* watchFreelancerDetailsAction() {
    yield takeEvery('getFreelancerDetailsAction', getFreelancerDetailsSaga)
}

function* watchFreelancerStatsJobsAction() {
    yield takeEvery('getFreelancerStatsJobsAction', getFreelancerStatsJobsSaga)
}

export default function* freelancerManagementSaga() {
    yield all([
        watchFreelancersList(),
        watchFreelancerListDownload(),
        watchFreelancerDetailsAction(),
        watchFreelancerStatsJobsAction()
    ])
}
