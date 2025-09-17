import { disputeConstants } from "./disputeConstants";

const initialState = {
  disputeList: [],
  disputeListCategory: [],
  isLoading: {
    disputeList: 0,
    disputeListCategory: 0,
  },
};

export const disputeReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case disputeConstants.DISPUTE_LIST_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeList: 1,
        },
        disputeList: initialState.disputeList,
      };
    }

    case disputeConstants.DISPUTE_LIST_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeList: 0,
        },
        disputeList: payload,
      };
    }

    case disputeConstants.DISPUTE_LIST_CATEGORIES_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeListCategory: 1,
        },
        disputeListCategory: initialState.disputeListCategory,
      };
    }

    case disputeConstants.DISPUTE_LIST_CATEGORIES_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeListCategory: 0,
        },
        disputeListCategory: payload,
      };
    }

    default:
      return state;
  }
};
