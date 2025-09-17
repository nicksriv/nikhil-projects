import { call, put, takeLatest } from "@redux-saga/core/effects";
import { profileConstants } from "./profileConstants";
import { profileApis } from "./profileApis";
import { profileParsers } from "./profileParsers";

function* getProfileSaga({ type }) {
  try {
    yield put({ type: profileConstants.PROFILE_REQUEST });
    const res = yield call(profileApis.getProfileApi);
    const payload = profileParsers.getProfileParser(res);
    yield put({ type: profileConstants.PROFILE_RESPONSE, payload });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}
function* getVendorUSerProfileSaga({ type }) {
  try {
    yield put({ type: profileConstants.PROFILE_REQUEST });
    const res = yield call(profileApis.getVendorUserProfileApi);
    const payload = profileParsers.getVendorUserParser(res);
    yield put({ type: profileConstants.PROFILE_RESPONSE, payload });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

export function* registerProfileSagas() {
  yield takeLatest(profileConstants.PROFILE_SAGA, getProfileSaga);
  yield takeLatest(profileConstants.VENDOR_USER_PROFILE_SAGA, getVendorUSerProfileSaga);
}
