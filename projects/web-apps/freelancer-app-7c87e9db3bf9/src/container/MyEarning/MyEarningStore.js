import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../store/auth/authActions";
import { dashboardActions } from "../../store/dashboard/dashboardActions";
import { profileActions } from "../../store/profile/profileActions";
import { myWorkActions } from "../../store/mywork/myWorkActions";

const mapStateToProps = (state) => {
  return {
    dashboardStats: state.dashboard.dashboardStats,
    isLoading: state.dashboard.isLoading.dashboard,
    profileData: state.profile.profileData,
    myWorkList: state.myWork.myWorkList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthenticationAction: authActions.setAuthentication,
      getDashboardStatsActions: dashboardActions.getDashboardStats,
      getProfileAction: profileActions.getProfile,
      getMyWorkListAction: myWorkActions.getMyWorkList,
    },
    dispatch
  );

const MyEarningStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default MyEarningStore;
