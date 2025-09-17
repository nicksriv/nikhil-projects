import { combineReducers } from "redux";
import { authReducers } from "./auth/authReducers";
import { commonReducers } from "./common/commonReducers";
import { dashboardReducers } from "./dashboard/dashboardReducers";
import { myJobReducers } from "./myJob/myJobReducers";
import { profileReducers } from "./profile/profileReducers";
import { searchJobReducers } from "./searchJob/searchJobReducers";
import { myWorkReducers } from "./mywork/myWorkReducers";
import { disputeReducers } from "./dispute/disputeReducers";
import  dynamicModuleReducer from "../../FormElements/stores/Store/configureStore"

const rootReducers = combineReducers({
  common: commonReducers,
  auth: authReducers,
  searchJobList: searchJobReducers,
  myJob: myJobReducers,
  profile: profileReducers,
  dashboard: dashboardReducers,
  myWork: myWorkReducers,
  dispute: disputeReducers,
  dynamicModule:dynamicModuleReducer
});

export default rootReducers;
