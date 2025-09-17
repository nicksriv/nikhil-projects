import { dashboardConstants } from "./dashboardConstants";
const initialState = {
  dashboardStats: {},
  isLoading: {
    dashboardStats: 0,
  },
  isInitialCalled: {
    dashboardStats: 0,
  },
};

const dashboardReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case dashboardConstants.DASHBOARD_STATS_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          dashboardStats: 1,
        },
        dashboardStats: initialState.dashboardStats,
      };
    }

    case dashboardConstants.DASHBOARD_STATS_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          dashboardStats: 0,
        },
        isInitialCalled: {
          ...state.isInitialCalled,
          dashboardStats: 1,
        },
        dashboardStats: payload,
      };
    }

    default:
      return state;
  }
};

export { dashboardReducers };
