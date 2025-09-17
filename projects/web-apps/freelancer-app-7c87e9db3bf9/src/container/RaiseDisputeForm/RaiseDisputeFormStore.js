import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { myWorkActions } from "../../store/mywork/myWorkActions";
import { disputeActions } from "../../store/dispute/disputeActions";
import { commonActions } from "@app/store/common/commonActions";

const mapStateToProps = (state) => {
  return {
    myWorkList: state.myWork.myWorkList,
    disputeListCategory: state.dispute.disputeListCategory,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyWorkAction: myWorkActions.getMyWorkList,
      getDisputeCategoriesAction: disputeActions.getDisputeCategories,
      getDisputeListAction: disputeActions.getDisputeList,
      setToastAction: commonActions.setToast,
    },
    dispatch
  );

const RaiseDisputeFormStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default RaiseDisputeFormStore;
