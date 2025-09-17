import myWorkConstants from "./myWorkConstants";

const initialState = {
  myWorkList: [],
  myWorkDescription: {},
  myWorkEarningStats: [],
  myWorkStats: [],
  moduleData:[],
  isLoading: {
    myWorkList: 0,
    myWorkDescription: 0,
    myWorkEarningStats: 0,
    myWorkStats: 0,
    moduleData:0
  },
  isInitialCalled: {
    myWorkList: 0,
    myWorkDescription: 0,
  },
  activeJobId:""
};

export const myWorkReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case myWorkConstants.MY_WORK_REQUEST: {
      return {
        ...state,
        myWorkList: initialState.myWorkList,
        isLoading: {
          ...state.isLoading,
          myWorkList: 1,
        },
      };
    }

    case myWorkConstants.MY_WORK_RESPONSE: {
      return {
        ...state,
        myWorkList: payload,
        isLoading: {
          ...state.isLoading,
          myWorkList: 0,
        },
        isInitialCalled: {
          ...state.isInitialCalled,
          myWorkList: 1,
        }
      };
    }

    case myWorkConstants.MY_WORK_DESCRIPTION_REQUEST: {
      return {
        ...state,
        myWorkDescription: initialState.myWorkDescription,
        isLoading: {
          ...state.isLoading,
          myWorkDescription: 1,
        },
      };
    }

    case myWorkConstants.MY_WORK_DESCRIPTION_RESPONSE: {
      return {
        ...state,
        myWorkDescription: payload,
        isLoading: {
          ...state.isLoading,
          myWorkDescription: 0,
        },
        isInitialCalled: {
          ...state.isInitialCalled,
          myWorkDescription: 1,
        }
      };
    }

    case myWorkConstants.MY_WORK_EARNING_STATS_REQUEST: {
      return {
        ...state,
        myWorkEarningStats: initialState.myWorkEarningStats,
        isLoading: {
          ...state.isLoading,
          myWorkEarningStats: 1,
        },
      };
    }

    case myWorkConstants.MY_WORK_EARNING_STATS_RESPONSE: {
      return {
        ...state,
        myWorkEarningStats: payload,
        isLoading: {
          ...state.isLoading,
          myWorkEarningStats: 0,
        }
      };
    }

    case myWorkConstants.MY_WORK_STATS_REQUEST: {
      return {
        ...state,
        myWorkStats: initialState.myWorkStats,
        isLoading: {
          ...state.isLoading,
          myWorkStats: 1,
        },
      };
    }

    case myWorkConstants.MY_WORK_STATS_RESPONSE: {
      return {
        ...state,
        myWorkStats: payload,
        isLoading: {
          ...state.isLoading,
          myWorkStats: 0,
        }
      };
    }


    case myWorkConstants.MY_MODULE_DATA_REQUEST: {
      return {
        ...state,
        moduleData: initialState.moduleData,
        isLoading: {
          ...state.isLoading,
          moduleData: 1,
        },
      };
    }

    case myWorkConstants.MY_MODULE_DATA_RESPONSE: {
      return {
        ...state,
        moduleData: payload,
        isLoading: {
          ...state.isLoading,
          moduleData: 0,
        }
      };
    }

    case myWorkConstants.SET_ACTIVE_JOB_ID: {
      return {
        ...state,
        activeJobId:payload
      };
    }

    default:
      return state;
  }
};
