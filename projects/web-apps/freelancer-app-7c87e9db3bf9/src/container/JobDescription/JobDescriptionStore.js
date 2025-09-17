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
    isDescriptionLoading: state.searchJobList.isLoading.searchJobDescription,
    myJobDescription: state.myJob.myJobDescription,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSearchJobDescriptionAction: searchJobActions.getJobDescription,
      getSearchJobListAction: searchJobActions.getSearchJobList,
      applyJobAction: searchJobActions.applyJob,
      getsimilarJobListAction: searchJobActions.getSimilarJobList,
      getOtherOpeningJobListAction: searchJobActions.getOtherOpeningJobList,
      getMyJobDescriptionAction: myJobActions.getMyJobDescription,
      getMyJobListAction: myJobActions.getMyJobList,
    },
    dispatch
  );

const JobDescriptionStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);

export default JobDescriptionStore;
