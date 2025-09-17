import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { commonActions } from "../../store/common/commonActions";

const mapStateToProps = (state) => {
  return {
    notificationList: state.common.notificationList,
    isLoading: state.common.isLoading.notificationList,
    isInitialCalled: state.common.initialCalled.notificationList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotificationListAction: commonActions.getNotificationList,
    },
    dispatch
  );

const NotificationListStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default NotificationListStore;
