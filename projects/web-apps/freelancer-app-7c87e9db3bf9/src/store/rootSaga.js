import { all } from "redux-saga/effects";
import { registerCommonSagas } from "./common/commonSagas";
import { registerAuthSagas } from "./auth/authSagas";
import { registerSearchJobSagas } from "./searchJob/searchJobSagas";
import { registerMyJobSagas } from "./myJob/myJobSagas";
import { registerProfileSagas } from "./profile/profileSagas";
import { registerDashboardSaga } from "./dashboard/dashboardSagas";
import { registerMyWorkSagas } from "./mywork/myWorkSagas";
import { registerDisputeSagas } from "./dispute/disputeSagas";

function* rootSaga() {
  yield all([
    registerCommonSagas(),
    registerAuthSagas(),
    registerSearchJobSagas(),
    registerMyJobSagas(),
    registerProfileSagas(),
    registerDashboardSaga(),
    registerMyWorkSagas(),
    registerDisputeSagas(),
  ]);
}

export default rootSaga;
