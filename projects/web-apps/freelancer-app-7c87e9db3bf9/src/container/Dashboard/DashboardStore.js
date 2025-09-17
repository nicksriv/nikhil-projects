import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "@app/store/auth/authActions";
import { dashboardActions } from "@app/store/dashboard/dashboardActions";
import { profileActions } from "@app/store/profile/profileActions";
import { myWorkActions } from "@app/store/mywork/myWorkActions";
import { myJobActions } from "@app/store/myJob/myJobActions";
import { setAuth } from "@app/FormElements/stores/Actions/auth";
import { setMappingData } from "@app/FormElements/stores/Actions/pageList";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    dashboardStats: state.dashboard.dashboardStats,

    isLoading: state.dashboard.isLoading.dashboardStats,
    isInitialCalled: state.dashboard.isInitialCalled.dashboardStats,
    profileData: state.profile.profileData,

    myWorkList: state.myWork.myWorkList,
    isWorkListLoading: state.myWork.isLoading.myWorkList,
    isWorkListInitialCalled: state.myWork.isInitialCalled.myWorkList,

    appliedJobList: state.myJob.myJobList,
    isAppliedJobListLoading: state.myJob.isLoading.myJobList,
    isAppliedJobListInitialCalled: state.myJob.isInitialCalled.myJobList,
    dynamicModule:state.dynamicModule,
    myWorkStats: state.myWork.myWorkStats,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthenticationAction: authActions.setAuthentication,
      getDashboardStatsActions: dashboardActions.getDashboardStats,
      getProfileAction: profileActions.getProfile,
      getMyWorkListAction: myWorkActions.getMyWorkList,
      getMyJobListAction: myJobActions.getMyJobList,
      setAuthAction:setAuth,
      setMappingData:setMappingData  ,
      getVendorUserProfileAction:profileActions.getVendorProfile,

      getMyWorkStatsAction: myWorkActions.getMyWorkStats,
    },
    dispatch
  );

const DashboardStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default DashboardStore;
