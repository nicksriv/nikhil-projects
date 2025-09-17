import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { commonActions } from "@app/store/common/commonActions";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setToastAction: commonActions.setToast,
    },
    dispatch
  );

const AskUsStore = (AskUsContainer) =>
  connect(mapStateToProps, mapDispatchToProps)(AskUsContainer);
export default AskUsStore;
