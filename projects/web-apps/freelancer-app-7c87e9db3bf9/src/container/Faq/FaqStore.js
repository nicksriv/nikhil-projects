import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { commonActions } from "../../store/common/commonActions";

const mapStateToProps = (state) => {
  return {
    faqList: state.common.faqList,
    isLoading: state.common.isLoading.faqList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFaqListAction: commonActions.getFaqList,
    },
    dispatch
  );

const FaqStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default FaqStore;
