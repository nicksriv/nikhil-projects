import { commonConstants } from "./commonConstants";

const commonActions = {};

commonActions.getBlogs = () => ({
  type: commonConstants.BLOGS_SAGA,
});

commonActions.updateDeviceId = ({ deviceId }) => ({
  type: commonConstants.DEVICE_ID_DATA,
  payload: { deviceId },
});

commonActions.setToast = ({ message, timeout }) => ({
  type: commonConstants.GLOBAL_SET_TOAST_DATA,
  payload: { message, timeout },
});

commonActions.resetToast = () => ({
  type: commonConstants.GLOBAL_RESET_TOAST_DATA,
});

commonActions.getNotificationList = () => ({
  type: commonConstants.NOTIFICATION_SAGA,
});

commonActions.getFaqList = () => ({
  type: commonConstants.FAQ_SAGA,
});

export { commonActions };
