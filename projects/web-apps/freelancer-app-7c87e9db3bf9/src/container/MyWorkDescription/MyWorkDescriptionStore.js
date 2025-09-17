import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { myWorkActions } from "../../store/mywork/myWorkActions";

const mapStateToProps = (state) => {
  return {
    myWorkDescription: state.myWork.myWorkDescription,
    isLoading: state.myWork.isLoading.myWorkDescription,
    moduleData:state.myWork.moduleData
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyWorkListAction: myWorkActions.getMyWorkList,
      getMyWorkDescriptionAction: myWorkActions.getMyWorkDescription,
      getModuleData:myWorkActions.getModuleData,
      setActiveJobId:myWorkActions.setActiveJobId
    },
    dispatch
  );

const MyWorkDescriptionStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default MyWorkDescriptionStore;
