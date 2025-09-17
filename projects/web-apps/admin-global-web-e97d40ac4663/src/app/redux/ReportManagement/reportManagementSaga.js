import { cloneDeep } from 'lodash';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from './../slices/snackbar';
import { setAddedReport, setModuleList, setReportId, setConfiguredReportById, setColumnValues, setStateByName, setCreatedChartId, setReportList, setReportColumns, setSitesForCharts, setChartsData, setCustomChartValues, setChartsView, setReportAddSuccess, setUpdatedChart, setReportSortOptions, setLoader } from './reportManagementSlice';
//import { getClientModulesService, saveReportService, getConfiguredReportByIdService, getAllChartsDataService, getReportColumnsService, getClientRolesByIdService, updateReportsDataService, getAllReportsDataService, getColumnsByIdService, saveCustomChartService, deleteReportService, getConfguredReportTableDataService, getSitesForChartsService, getChartDataByIdService, updateChartDataByIdService, updateVisibleColumnsService } from './reportManagerService';
// import { setAddedReport, setModuleList, setReportId, setConfiguredReportById, setColumnValues, setStateByName, setCreatedChartId, setReportList, setReportColumns, setSitesForCharts, setChartsData, setCustomChartValues, setChartsView, setReportAddSuccess, setUpdatedChart, setReportSortOptions } from './reportManagementSlice';
import { getClientModulesService, saveReportService, getConfiguredReportByIdService, getAllChartsDataService, getReportColumnsService, getClientRolesByIdService, updateReportsDataService, getAllReportsDataService, getColumnsByIdService, saveCustomChartService, deleteReportService, getConfguredReportTableDataService, getSitesForChartsService, getChartDataByIdService, updateChartDataByIdService, updateVisibleColumnsService, updateChartOrderService, downloadReportByIdService, getReportTableDataDownloadService } from './reportManagerService';

//SAVE MODULE AND REPORT NAME FROM POPUP
function* setAddedReportValues(payload) {
    try {
        yield put(setAddedReport(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//GET CLIENT PARENT MODULES
function* getClientModules(clientId) {
    try {
        let response = yield call(getClientModulesService, clientId)
        yield put(setModuleList(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//SAVE REPORT FROM ADD POPUP
function* saveReport(data) {
    try {
        let newData = cloneDeep(data.addedReport)
        newData["clientId"] = localStorage.getItem('selectedClientLogo');
        let response = yield call(saveReportService, newData);
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setReportId(response.id));
        yield put(setReportAddSuccess(true));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//GET COLUMS FROM MODULES
function* getReportColumns(data) {
    try {
        const { payload } = data;
        let response = yield call(getReportColumnsService, payload);
        yield put(setColumnValues(response.columns));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//GET CLIENT ROLES
function* getClientRolesById(payload) {
    try {
        const { clientId } = payload.payload;
        const response = yield call(getClientRolesByIdService, clientId);
        const { roles } = response;
        yield put(setStateByName({ name: 'reportRoles', value: roles }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//ADD or UPDATE REPORT DETAILS
function* updateReport(payload) {
    try {
        const { configuredReportData, createdReportId } = payload;
        const response = yield call(updateReportsDataService, configuredReportData, createdReportId);
        yield put(SNACKBAR_SUCCESS(response.message));
        yield call(getConfiguredReportById, { configurationsId: createdReportId});
        yield call(getColumnsById, { configuredReportId: createdReportId})
    } catch (error) {
        yield put(SNACKBAR_ERROR(error && error.message));
    }
}
//GET REPORTS LIST FOR TABLE
function* getAllReportsData(payload) {
    try {
        const { clientId, pageNumber, size, sortBy, sortOrder, filter } = payload;
        const response = yield call(getAllReportsDataService, clientId, pageNumber, size, sortBy, sortOrder, filter);
        yield put(setReportList(response));
        yield put(setLoader("complete"));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
        yield put(setLoader("failed"));
    }
}
//GET COLUMS FOR BELOW TABLE
function* getColumnsById(payload) {
    try {
        const { configuredReportId } = payload;
        const response = yield call(getColumnsByIdService, configuredReportId);
        yield put(setReportColumns(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//DELETE REPORT BY ID
function* deleteReportById(data) {
    try {
        const { payload: { reportId } } = data;
        const response = yield call(deleteReportService, reportId);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//GET CHARTS LIST DATA
function* getAllChartsData(data) {
    try {
        const { reportConfigurationId } = data;
        const response = yield call(getAllChartsDataService, reportConfigurationId);
        yield put(setChartsData(response.data || []));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//GET CHART DATA BY ID
function* getChartDataById(data) {
    try {
        const { chartId, from, to, siteIds } = data.payload;
        const response = yield call(getChartDataByIdService, chartId, from, to, siteIds);
        let customResponse = {...response};
        customResponse.xAxis = response.xAxis.componentId;
        customResponse.yAxis = response.yAxis.componentId;
        yield put(setCustomChartValues(customResponse));

        let r = {...response};
        r.id = chartId;
        let chartResponse = {
            id: chartId,
            data: r
        }
        yield put(setUpdatedChart(chartResponse));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//save chart
function* saveCustomChart(value) {
    try {
        const { payload: { data } } = value;
        let response = yield call(saveCustomChartService, data);
        yield put(setCreatedChartId(response));
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setChartsView(0));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

//save chart
function* updateCustomChart(value) {
    try {
        const { data, chartId} = value.payload;
        let response = yield call(updateChartDataByIdService, chartId, data);
        yield put(setCreatedChartId(response));
        yield put(SNACKBAR_SUCCESS(response.message));
        yield put(setChartsView(0));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

//UPDATE CHART ORDER
function* updateChartOrder(payload) {
    try {
        const { data, reportId } = payload.payload;
        const response = yield call(updateChartOrderService, reportId, data);
    } catch (error) {
        yield put(SNACKBAR_ERROR(error && error.message));
    }
}

//GET INDIVIDUAL REPORT DETAILS
function* getConfiguredReportById(data) {
    try {
        const { configurationsId } = data;
        let response = yield call(getConfiguredReportByIdService, configurationsId);
        yield put(setConfiguredReportById(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));  
    }
}
//GET SITES FOR CHARTS
function* getSitesForCharts(data) {
    try {
        const { clientId } = data.payload;
        let response = yield call(getSitesForChartsService, clientId);
        yield put(setSitesForCharts(response.data));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));  
    }
}
//SORT TABLE
function* setSortDirection(payload) {
    try {
        yield put(setReportSortOptions(payload))
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//UPDATE VISIBLE COLUMNS BY REPORT ID
function* updateVisibleColumns(data) {
    try {
        const { reportId, columns } = data.payload;
        let response = yield call(updateVisibleColumnsService, reportId, columns);
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));  
    }
}

//DOWNLOAD REPORT BY REPORT ID
function* downloadReportById(data) {
    try {
        const { reportId } = data.payload;
        let response = yield call(downloadReportByIdService, reportId);
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Reports.xls');
    
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

//.. GET ALL CLIENTS DETAILS
function* downloadReportDataDetails(data){
    try {
        const {payload} = data;

        yield call(getReportTableDataDownloadService, payload)
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}

function* watchDeleteReportByIdAction() {
    yield takeEvery('deleteReportByIdAction', deleteReportById)
}
function* watchSaveCustomChartAction() {
    yield takeEvery('saveCustomChartAction', saveCustomChart);
}
function* watchGetColumnsByIdAction() {
    yield takeEvery('getColumnsByIdAction', getColumnsById);
}
function* watchGetAllReportsDataAction() {
    yield takeEvery('getAllReportsDataAction', getAllReportsData);
}
function* watchAddReportAction() {
    yield takeEvery('saveReportAction', saveReport);
}
function* watchSetAddedReport() {
    yield takeEvery('setAddedReportAction', setAddedReportValues);
}
function* watchGetClientModule() {
    yield takeEvery('getClientsModulesAction', getClientModules)
}
function* watchUpdateReportModule() {
    yield takeEvery('updateReportAction', updateReport);
}
function* watchGetReportColumns() {
    yield takeEvery('getReportColumnsAction', getReportColumns)
}
function* watchGetClientRolesByIdAction() {
    yield takeEvery('getClientRolesByIdAction', getClientRolesById);
}
function* watchGetAllChartsAction() {
    yield takeEvery('getAllChartsDataAction', getAllChartsData);
}
function* watchGetChartDataByIdAction() {
    yield takeEvery('getChartDataByIdAction', getChartDataById);
}
function* watchUpdateChartDataAction() {
    yield takeEvery('updateChartDataAction', updateCustomChart);
}
function* watchGetReportByIdAction() {
    yield takeEvery('getConfiguredReportByIdAction', getConfiguredReportById);
}
function* watchGetSitesForChartsAction() {
    yield takeEvery('getSitesForChartsAction', getSitesForCharts);
}
function* watchSetReportSortDirectionAction() {
    yield takeEvery('setReportSortDirectionAction', setSortDirection)
}
function* watchUpdateVisibleColumnsAction() {
    yield takeEvery('updateVisibleColumnsAction', updateVisibleColumns);
}
function* watchUpdateChartOrderAction() {
    yield takeEvery('updateChartOrderAction', updateChartOrder);
}
function* watchDownloadReportByIdAction() {
    yield takeEvery('downloadReportByIdAction', downloadReportById);
}
function* watchDownloadReportDataDetailsAction() {
    yield takeEvery('downloadReportDataDetails', downloadReportDataDetails);
}


// Actions
export default function* reportManagementSaga() {
    yield all([
        watchSetAddedReport(),
        watchGetClientModule(),
        watchUpdateReportModule(),
        watchGetReportColumns(),
        watchGetClientRolesByIdAction(),
        watchAddReportAction(),
        watchGetAllReportsDataAction(),
        watchGetColumnsByIdAction(),
        watchSaveCustomChartAction(),
        watchDeleteReportByIdAction(),
        watchGetAllChartsAction(),
        watchGetChartDataByIdAction(),
        watchUpdateChartDataAction(),
        watchGetReportByIdAction(),
        watchGetSitesForChartsAction(),
        watchSetReportSortDirectionAction(),
        watchUpdateVisibleColumnsAction(),
        watchUpdateChartOrderAction(),
        watchDownloadReportByIdAction(),
        watchDownloadReportDataDetailsAction()
    ])
}