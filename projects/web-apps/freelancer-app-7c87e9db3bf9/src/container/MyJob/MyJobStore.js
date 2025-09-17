import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { myJobActions } from "../../store/myJob/myJobActions";

const mapStateToProps = (state) => {
  return {
    myJobList: state.myJob.myJobList,
    isLoading: state.myJob.isLoading.myJobList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      myJobListAction: myJobActions.getMyJobList,
    },
    dispatch
  );

const MyJobStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default MyJobStore;
