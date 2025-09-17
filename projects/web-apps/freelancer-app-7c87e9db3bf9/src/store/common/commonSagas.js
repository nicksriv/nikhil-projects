import { call, put, takeLatest } from "@redux-saga/core/effects";

import { commonApis } from "./commonApis";
import { commonParsers } from "./commonParsers";
import { commonConstants } from "./commonConstants";

function* getNotificationListSaga({ type }) {
  try {
    yield put({ type: commonConstants.NOTIFICATION_REQUEST });

    const res = yield call(commonApis.getNotificationsApi);
    const payload = commonParsers.notificationListParser(res);

    yield put({ type: commonConstants.NOTIFICATION_RESPONSE, payload });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

function* getFaqListSaga({ type }) {
  try {
    yield put({ type: commonConstants.FAQ_REQUEST });

    const res = yield call(commonApis.getFaqApi);
    const payload = commonParsers.faqListParser(res);

    yield put({ type: commonConstants.FAQ_RESPONSE, payload });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

export function* registerCommonSagas() {
  yield takeLatest(commonConstants.NOTIFICATION_SAGA, getNotificationListSaga);
  yield takeLatest(commonConstants.FAQ_SAGA, getFaqListSaga);
}
