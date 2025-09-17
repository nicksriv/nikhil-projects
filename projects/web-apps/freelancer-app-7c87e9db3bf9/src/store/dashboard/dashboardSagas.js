import { call, put, takeLatest } from "@redux-saga/core/effects";
import { dashboardConstants } from "./dashboardConstants";
import { dashboardApis } from "./dashboardApis";
import { dashboardParsers } from "./dashboardParsers";

function* getDashboardStatsSaga() {
  try {
    yield put({ type: dashboardConstants.DASHBOARD_STATS_REQUEST });
    
    const res = yield call(dashboardApis.getDashboardStatsApi);
    const payload = dashboardParsers.getDashboardStatsParser(res);
    
    yield put({ type: dashboardConstants.DASHBOARD_STATS_RESPONSE, payload });
  } catch (error) {
    yield put({ type: dashboardConstants.DASHBOARD_STATS_RESPONSE, payload: {} });
  }
}

export function* registerDashboardSaga() {
  yield takeLatest(
    dashboardConstants.DASHBOARD_STATS_SAGA,
    getDashboardStatsSaga
  );
}
