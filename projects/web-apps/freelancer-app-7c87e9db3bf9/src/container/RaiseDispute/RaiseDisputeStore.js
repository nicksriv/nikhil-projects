import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { disputeActions } from "../../store/dispute/disputeActions";
const mapStateToProps = (state) => {
  return {
    disputeList: state.dispute.disputeList,
    isLoading: state.dispute.isLoading.disputeList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDisputeListAction: disputeActions.getDisputeList,
    },
    dispatch
  );

const RaiseDisputeStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default RaiseDisputeStore;
