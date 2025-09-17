import { config } from "../../config";
import { commonConstants } from "./commonConstants";

const initialState = {
  deviceId: null,
  toast: {
    timeout: 10000,
    open: false,
    message: "",
  },
  blogs: [],

  loading: {
    blogs: 0,
  },
  initialCalled: {
    notificationList: 0,
    blogs: 0,
  },
  notificationList: [],
  faqList: [],
  isLoading: {
    notificationList: 0,
    faqList: 0,
  },
};

export const commonReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonConstants.RESET_COMMON_DATA: {
      return {
        ...initialState,
        deviceId: state.deviceId,
      };
    }

    case commonConstants.DEVICE_ID_DATA: {
      return {
        ...state,
        deviceId: payload.deviceId,
      };
    }

    case commonConstants.GLOBAL_SET_TOAST_DATA: {
      return {
        ...state,
        toast: {
          open: true,
          message: payload.message,
          timeout: payload.timeout || initialState.toast.timeout,
        },
      };
    }

    case commonConstants.GLOBAL_RESET_TOAST_DATA: {
      return {
        ...state,
        toast: {
          timeout: 10000,
          open: false,
          message: "",
        },
      };
    }

    case commonConstants.NOTIFICATION_REQUEST: {
      return {
        ...state,
        notificationList: initialState.notificationList,
        loading: {
          ...state.loading,
          notificationList: 1,
        },
      };
    }

    case commonConstants.NOTIFICATION_RESPONSE: {
      return {
        ...state,
        notificationList: payload,
        initialCalled: {
          ...state.initialCalled,
          notificationList: 1,
        },
        loading: {
          ...state.loading,
          notificationList: 0,
        },
      };
    }
    case commonConstants.FAQ_REQUEST: {
      return {
        ...state,
        faqList: initialState.faqList,
        loading: {
          ...state.loading,
          faqList: 1,
        },
      };
    }

    case commonConstants.FAQ_RESPONSE: {
      return {
        ...state,
        faqList: payload,
        initialCalled: {
          ...state.initialCalled,
          faqList: 1,
        },
        loading: {
          ...state.loading,
          faqList: 0,
        },
      };
    }

    default:
      return state;
  }
};
