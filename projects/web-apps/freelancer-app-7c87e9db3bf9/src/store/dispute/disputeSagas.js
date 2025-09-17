import { call, put, takeLatest } from "@redux-saga/core/effects";

import { disputeConstants } from "./disputeConstants";
import { disputeParsers } from "./disputeParsers";
import { disputeApis } from "./disputeApis";

function* disputeListSaga({ type }) {
  try {
    yield put({ type: disputeConstants.DISPUTE_LIST_REQUEST });
    const res = yield call(disputeApis.getDisputeApi);
    const payload = disputeParsers.getDisputeListParser(res);
    yield put({ type: disputeConstants.DISPUTE_LIST_RESPONSE, payload });
  } catch (error) {
    yield put({ type: disputeConstants.DISPUTE_LIST_RESPONSE, payload: [] });
    console.error(`Action ${type} failed with `, error);
  }
}
function* disputeListCategorySaga({ type }) {
  try {
    yield put({ type: disputeConstants.DISPUTE_LIST_CATEGORIES_REQUEST });
    const res = yield call(disputeApis.getDisputeCategoriesApi);
    const payload = disputeParsers.getDisputeCategoriesParser(res);
    yield put({
      type: disputeConstants.DISPUTE_LIST_CATEGORIES_RESPONSE,
      payload,
    });
  } catch (error) {
    yield put({
      type: disputeConstants.DISPUTE_LIST_CATEGORIES_RESPONSE,
      payload: [],
    });
    console.error(`Action ${type} failed with `, error);
  }
}

export function* registerDisputeSagas() {
  yield takeLatest(disputeConstants.DISPUTE_LIST_SAGA, disputeListSaga);
  yield takeLatest(
    disputeConstants.DISPUTE_LIST_CATEGORIES_SAGA,
    disputeListCategorySaga
  );
}
