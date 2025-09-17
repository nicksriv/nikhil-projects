import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
    setDashboardData,
    setStatistics,setDashboardStats,setDashboardJobStats
} from './dashboardSlice'
import { SNACKBAR_ERROR } from './../slices/snackbar'
import {
    getDashboardDataService,
    getStatisticsService,getDashboardStatsService,getDashboardJobStatsService
} from './dashboardService'
import {dashboardParsers} from './dashboardParsers'
import { setLoader } from '../ClientManagement/clientManagementSlice'

function* getDashboardData() {
    try {
        const res = yield call(getDashboardDataService)
        yield put(setDashboardData(res))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getDashboardStats({type,payload}){
    try{
        const response = yield call(getDashboardStatsService)
        const parsedData = dashboardParsers.dashboardStatsParser(response)
        yield put(setDashboardStats(parsedData))
        yield put(setLoader('complete'))
    }
    catch(error){
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}
function* getDashboardJobStats({type,payload}){
    try{
        const response = yield call(getDashboardJobStatsService)
        const parsedData = dashboardParsers.dashboardJobStatsParser(response)
        yield put(setDashboardJobStats(parsedData))
        yield put(setLoader('complete'))
    }
    catch(error){
        yield put(SNACKBAR_ERROR(error.message))
        yield put(setLoader('failed'))
    }
}




function* getStatistics(action) {
    try {
        const res = yield call(getStatisticsService, action.payload)
        yield put(setStatistics(res))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* watchGetDashboardData() {
    yield takeEvery('getDashboardDataAction', getDashboardData)
}

function* watchGetStatisticsData() {
    yield takeEvery('getStatisticsAction', getStatistics)
}

function* watchGetDashboardStatsData() {
    yield takeEvery('getDashboardStatsAction', getDashboardStats)
}
function* watchGetDashboardJobStatsData() {
    yield takeEvery('getDashboardJobStatsAction', getDashboardJobStats)
}
// Actions
export default function* dashboardSaga() {
    yield all([watchGetDashboardData(), watchGetStatisticsData(),watchGetDashboardStatsData(),watchGetDashboardJobStatsData()])
}
