import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { myWorkActions } from "../../store/mywork/myWorkActions";

const mapStateToProps = (state) => {
  return {
    myWorkList: state.myWork.myWorkList,
    isLoading: state.myWork.isLoading.myWorkList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyWorkListAction: myWorkActions.getMyWorkList,
    },
    dispatch
  );

const MyWorkStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default MyWorkStore;
