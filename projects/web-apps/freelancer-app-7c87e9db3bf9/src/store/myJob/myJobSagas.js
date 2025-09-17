import { call, put, takeLatest } from "@redux-saga/core/effects";
import { myJobApis } from "./myJobApi";
import myJobConstants from "./myJobConstants";
import { myJobParsers } from "./myJobParsers";

function* myJobListSaga({ type }) {
  try {
    yield put({ type: myJobConstants.MY_JOB_REQUEST });

    const res = yield call(myJobApis.myJobList);
    const payload = myJobParsers.myJobListParser(res);
    yield put({ type: myJobConstants.MY_JOB_RESPONSE, payload });
  } catch (error) {
    yield put({ type: myJobConstants.MY_JOB_RESPONSE, payload: [] });
  }
}

function* myJobDescriptionSaga({ type, payload }) {
  try {
    yield put({ type: myJobConstants.MY_JOB_DESCRIPTION_REQUEST });
    const res = yield call(myJobApis.getMyJobDescription, payload);
    const data = myJobParsers.myJobDetails(res);
    yield put({
      type: myJobConstants.MY_JOB_DESCRIPTION_RESPONSE,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: myJobConstants.MY_JOB_DESCRIPTION_RESPONSE,
      payload: {},
    });
  }
}

export function* registerMyJobSagas() {
  yield takeLatest(myJobConstants.MY_JOB_SAGA, myJobListSaga);
  yield takeLatest(
    myJobConstants.MY_JOB_DESCRIPTION_SAGA,
    myJobDescriptionSaga
  );
}
