import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { disputeActions } from "../../store/dispute/disputeActions";

const mapStateToProps = (state) => {
  return {
    disputeListCategory: state.dispute.disputeListCategory,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDisputeListAction: disputeActions.getDisputeList,
      getDisputeCategoriesAction: disputeActions.getDisputeCategories,
    },
    dispatch
  );

const RaiseDisputeDescriptionStore = (RaiseDisputeDescriptionContainer) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RaiseDisputeDescriptionContainer);

export default RaiseDisputeDescriptionStore;
