import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { myWorkActions } from "../../store/mywork/myWorkActions";

const mapStateToProps = (state) => {
  return {
    activeJobId: state.myWork.activeJobId,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyWorkListAction: myWorkActions.getMyWorkList,
    },
    dispatch
  );

const SubModuleListStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default SubModuleListStore;
