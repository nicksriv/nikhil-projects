import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { myWorkActions } from "@app/store/mywork/myWorkActions";

const mapStateToProps = (state) => {
  return {
    myWorkEarningStats: state.myWork.myWorkEarningStats,
    myWorkStats: state.myWork.myWorkStats,
    isLoading1: state.dispute.isLoading.myWorkEarningStats,
    isLoading2: state.dispute.isLoading.myWorkStats,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyWorkEarningStatsAction: myWorkActions.getMyWorkEarningStats,
      getMyWorkStatsAction: myWorkActions.getMyWorkStats,
    },
    dispatch
  );

const ReportStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default ReportStore;
