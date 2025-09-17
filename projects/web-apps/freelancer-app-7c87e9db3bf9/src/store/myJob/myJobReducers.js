import { config } from "../../config";
import myJobConstants from "./myJobConstants";

const initialState = {
  myJobList: [],
  myJobDescription: {},
  isLoading: {
    myJobList: 0,
    myJobDescription: 0,
  },
  isInitialCalled: {
    myJobList: 0,
    myJobDescription: 0,
  }
};

export const myJobReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case myJobConstants.MY_JOB_REQUEST: {
      return {
        ...state,
        myJobList: initialState.myJobList,
        isLoading: {
          ...state.isLoading,
          myJobList: 1,
        },
      };
    }

    case myJobConstants.MY_JOB_RESPONSE: {
      return {
        ...state,
        myJobList: payload,
        isLoading: {
          ...state.isLoading,
          myJobList: 0,
        },
        isInitialCalled: {
          ...state.isInitialCalled,
          myJobList: 1,
        }
      };
    }
    case myJobConstants.MY_JOB_DESCRIPTION_REQUEST: {
      return {
        ...state,
        myJobDescription: initialState.myJobDescription,
        isLoading: {
          ...state.isLoading,
          myJobDescription: 1,
        },
      };
    }

    case myJobConstants.MY_JOB_DESCRIPTION_RESPONSE: {
      return {
        ...state,
        myJobDescription: payload,
        isLoading: {
          ...state.isLoading,
          myJobDescription: 0,
        },
        isInitialCalled: {
          ...state.isInitialCalled,
          myJobDescription: 1,
        }
      };
    }

    // case searchJobConstants.APPLY_JOB_REQUEST: {
    //   return {
    //     ...state,
    //   };
    // }

    default:
      return state;
  }
};
