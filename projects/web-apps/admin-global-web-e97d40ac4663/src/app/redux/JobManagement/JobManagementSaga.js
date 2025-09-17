import { call, put, takeEvery, all } from 'redux-saga/effects'
import { cloneDeep } from 'lodash'
import { format } from 'date-fns'
import { SNACKBAR_ERROR } from './../slices/snackbar'

import { jobManagementParsers } from './JobManagementParser'
import {
    getJobListService,
    getSkillsService,
    getjobListDownloadService,
    getJobDetailsService,
    getApplicantListService,
    getApplicantDetailsService,
    getJobApplicantListDownloadService,
    getJobCandidateListService,
    getJobCandidateDetailService,
    getApplicantRecentWorkService,
    getFreelancerDetailService,
    getVendorDetailService,
} from './JobManagementService'
import {
    setJobList,
    setJobDetails,
    setJobSortOption,
    setSkillsList,
    setJobFormBtnState,
    setLoader,
    setApplicantList,
    setApplicantDetails,
    setCandidateList,
    setCandidateDetails,
    setApplicantRecentWorkList,
    setFreelancerDetails,
    setVendorDetails,
    setJobModules,
    setClientId,
} from './JobManagementSlice'
import { getAllModulesWithSubModulesService } from '../ScreenBuilderManagement/screenBuilderManagementService'

function* getJobsListSaga(data) {
    try {
        const { payload } = data
        let newData = cloneDeep(payload)
        yield put(setLoader(1))
        const response = yield call(getJobListService, newData)
        const parsedData = jobManagementParsers.jobListParser(response)
        yield put(setJobList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* getJobDetailsSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getJobDetailsService, payload)
        const parsedData = jobManagementParsers.jobDetailParser(response)
        yield put(setJobDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))

    }
}

function* setJobSortDirection(payload) {
    try {
        yield put(setJobSortOption(payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* setSkillsListSaga() {
    try {
        const response = yield call(getSkillsService)
        const parsedData = jobManagementParsers.skillsListParser(response)
        yield put(setSkillsList(parsedData))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getJobListDownload({ type, payload }) {
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
        const response = yield call(getjobListDownloadService, newData)
        const url = window.URL.createObjectURL(response)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Joblist.xls')

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) {}
}

function* setActiveStep(payload) {
    try {
        const { activeStep } = payload.payload
        yield put(setJobFormBtnState({ name: 'activeStep', value: activeStep }))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
function* getApplicantListSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getApplicantListService, payload)
        const parsedData = jobManagementParsers.applicantListParser(response)
        yield put(setApplicantList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* getApplicantDetailsSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getApplicantDetailsService, payload)
        const parsedData = jobManagementParsers.applicantDetailParser(response)
        yield put(setApplicantDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }

}

function* getJobApplicantListDownloadSaga({ type, payload }) {
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
        const response = yield call(getJobApplicantListDownloadService, newData)
        const url = window.URL.createObjectURL(response)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Joblist.xls')

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) {}
}

function* getJobCandidateListSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getJobCandidateListService, payload)
        const parsedData = jobManagementParsers.jobCandidateListParser(response)
        yield put(setCandidateList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))

    }
}

function* getJobCandidateDetailSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getJobCandidateDetailService, payload)
        const parsedData =
            jobManagementParsers.jobCandidateDetailParser(response)
        yield put(setCandidateDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* getApplicantRecentWorkSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getApplicantRecentWorkService, payload)
        const parsedData =
            jobManagementParsers.jobApplicantRenectWorkParser(response)
        yield put(setApplicantRecentWorkList(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* getFreelancerDetailSaga({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getFreelancerDetailService, payload)
        const parsedData = jobManagementParsers.freelancerDetailParser(response)
        yield put(setFreelancerDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* getVendorDetailSaga({ type, payload }) {
    try {
        const response = yield call(getVendorDetailService, payload)
        const parsedData = jobManagementParsers.vendorDetailParser(response)
        yield put(setVendorDetails(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}
function* getJobModules({ type, payload }) {
    try {
        yield put(setLoader(1))
        const response = yield call(getAllModulesWithSubModulesService, payload)
        const parsedData = jobManagementParsers.jobModuleParser(response)
        yield put(setJobModules(parsedData))
        yield put(setLoader(0))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader(0))
    }
}

function* setClientIdSaga({type,payload}) {
    try {
      yield put(setClientId(payload));
    } catch (error) {
      yield put(SNACKBAR_ERROR(error.message));
    }
}

function* watchJobsList() {
    yield takeEvery('getJobsListAction', getJobsListSaga)
}
function* watchJobDetails() {
    yield takeEvery('getJobDetailAction', getJobDetailsSaga)
}
function* watchSetSortDirection() {
    yield takeEvery('setJobSortDirectionAction', setJobSortDirection)
}
function* watchSkillsList() {
    yield takeEvery('getSkillsListAction', setSkillsListSaga)
}
function* watchJobListDownload() {
    yield takeEvery('getJobListDownloadAction', getJobListDownload)
}
function* watchSetActiveStepAction() {
    yield takeEvery('setActiveStepAction', setActiveStep)
}
function* watchApplicantListAction() {
    yield takeEvery('getApplicantListAction', getApplicantListSaga)
}
function* watchApplicantDetailsAction() {
    yield takeEvery('getApplicantDetailsAction', getApplicantDetailsSaga)
}
function* watchJobApplicantListDownload() {
    yield takeEvery(
        'getJobApplicantListDownloadAction',
        getJobApplicantListDownloadSaga
    )
}

function* watchJobCandidateListAction() {
    yield takeEvery('getJobCandidateListAction', getJobCandidateListSaga)
}
function* watchJobCandidateDetailAction() {
    yield takeEvery('getJobCandidateDetailAction', getJobCandidateDetailSaga)
}
function* watchApplicantRecentWorkAction() {
    yield takeEvery('getApplicantRecentWorkAction', getApplicantRecentWorkSaga)
}
function* watchFreelancerDetailAction() {
    yield takeEvery('getFreelancerDetailAction', getFreelancerDetailSaga)
}
function* watchVendorDetailAction() {
    yield takeEvery('getVendorDetailAction', getVendorDetailSaga)
}

function* watchJobModulesAction() {
    yield takeEvery('getJobModulesAction', getJobModules)
}
function* watchSetClientIdAction() {
    yield takeEvery('setClientIdAction', setClientIdSaga)
}
export default function* jobManagementSaga() {
    yield all([
        watchJobsList(),
        watchJobDetails(),
        watchSetSortDirection(),
        watchSkillsList(),
        watchJobListDownload(),
        watchSetActiveStepAction(),
        watchApplicantListAction(),
        watchApplicantDetailsAction(),
        watchJobApplicantListDownload(),
        watchJobCandidateListAction(),
        watchJobCandidateDetailAction(),
        watchApplicantRecentWorkAction(),
        watchFreelancerDetailAction(),
        watchVendorDetailAction(),
        watchJobModulesAction(),
        watchSetClientIdAction()
    ])
}
