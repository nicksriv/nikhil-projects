import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchJobActions } from "../../store/searchJob/searchJobActions";
import { myJobActions } from "../../store/myJob/myJobActions";

const mapStateToProps = (state) => {
  return {
    searchJobDescription: state.searchJobList.searchJobDescription,
    isisJobAppliedSuccesfully: state.searchJobList.isJobAppliedSuccesfully,
    similarJobList: state.searchJobList.similarJobList,
    otherOpeningJobList: state.searchJobList.otherOpeningJobList,
    myJobDescription: state.myJob.myJobDescription,
    isDescriptionLoading: state.myJob.isLoading.myJobDescription,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSearchJobDescriptionAction: searchJobActions.getJobDescription,
      applyJobAction: searchJobActions.applyJob,
      getsimilarJobListAction: searchJobActions.getSimilarJobList,
      getOtherOpeningJobListAction: searchJobActions.getOtherOpeningJobList,
      getMyJobDescriptionAction: myJobActions.getMyJobDescription,
      myJobListAction: myJobActions.getMyJobList,
    },
    dispatch
  );

const MyJobDescriptionStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default MyJobDescriptionStore;
