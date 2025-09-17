import { call, put, takeLatest } from "@redux-saga/core/effects";
import { myWorkApis } from "./myWorkApis";
import myWorkConstants from "./myWorkConstants";
import { myWorkParsers } from "./myWorkParsers";

function* myWorkListSaga({ type }) {
  try {
    yield put({ type: myWorkConstants.MY_WORK_REQUEST });
    const res = yield call(myWorkApis.myWorkList);
    const payload = myWorkParsers.myWorkListParser(res);
    yield put({ type: myWorkConstants.MY_WORK_RESPONSE, payload });
  } catch (error) {
    yield put({ type: myWorkConstants.MY_WORK_RESPONSE, payload: [] });
  }
}

function* myWorkDescription({ type, payload }) {
  try {
    yield put({ type: myWorkConstants.MY_WORK_DESCRIPTION_REQUEST });
    const res = yield call(myWorkApis.getMyWorkDescription, payload);
    const data = myWorkParsers.myWorkDescriptionParser(res);
    yield put({
      type: myWorkConstants.MY_WORK_DESCRIPTION_RESPONSE,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: myWorkConstants.MY_WORK_DESCRIPTION_RESPONSE,
      payload: {},
    });
  }
}


function* myWorkEarningStatsSaga({ type, payload }) {
  try {
    yield put({ type: myWorkConstants.MY_WORK_EARNING_STATS_REQUEST });
    const res = yield call(myWorkApis.myWorkEarningStats, payload);
    const resParse = myWorkParsers.myWorkEarningStatsParser(res);
    yield put({ type: myWorkConstants.MY_WORK_EARNING_STATS_RESPONSE, payload: resParse });
  } catch (error) {
    yield put({ type: myWorkConstants.MY_WORK_EARNING_STATS_RESPONSE, payload: [] });
  }
}


function* myWorkStatsSaga({ type, payload }) {
  try {
    yield put({ type: myWorkConstants.MY_WORK_STATS_REQUEST });
    const res = yield call(myWorkApis.myWorkStats, payload);
    const resParse = myWorkParsers.myWorkStatsParser(res);
    yield put({ type: myWorkConstants.MY_WORK_STATS_RESPONSE, payload: resParse });
  } catch (error) {
    yield put({ type: myWorkConstants.MY_WORK_STATS_RESPONSE, payload: [] });
  }
}

function* myModuleData({ type, payload }) {
  try {
    yield put({ type: myWorkConstants.MY_MODULE_DATA_REQUEST });
    const res = yield call(myWorkApis.moduleData , payload);
    // const resParse = myWorkParsers.myWorkStatsParser(res);
    yield put({ type: myWorkConstants.MY_MODULE_DATA_RESPONSE, payload: res.modules });
  } catch (error) {
    yield put({ type: myWorkConstants.MY_MODULE_DATA_RESPONSE, payload: [] });
  }
}

export function* registerMyWorkSagas() {
  yield takeLatest(myWorkConstants.MY_WORK_SAGA, myWorkListSaga);
  yield takeLatest(myWorkConstants.MY_WORK_DESCRIPTION_SAGA, myWorkDescription);
  yield takeLatest(myWorkConstants.MY_WORK_EARNING_STATS_SAGA, myWorkEarningStatsSaga);
  yield takeLatest(myWorkConstants.MY_WORK_STATS_SAGA, myWorkStatsSaga);
  yield takeLatest(myWorkConstants.MY_MODULE_DATA_SAGA, myModuleData);

}
