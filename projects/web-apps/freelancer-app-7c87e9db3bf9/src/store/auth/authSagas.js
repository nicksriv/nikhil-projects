import { call, put, takeLatest } from "@redux-saga/core/effects";

import { authApis } from "./authApis";
import { authConstants } from "./authConstants";
import { asyncStorage } from "../asyncStorage";

function* logoutSaga({ type, payload }) {
  try {
    const res = yield call(authApis.logoutApi);
    yield call(asyncStorage.removeToken);
    yield call(asyncStorage.removeProfileData);
    yield call(asyncStorage.removeUserType);
    yield put({ type: authConstants.RESET_AUTHENTICATED_DATA, payload });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

export function* registerAuthSagas() {
  yield takeLatest(authConstants.LOGOUT_SAGA, logoutSaga);
}
