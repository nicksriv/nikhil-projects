import { searchJobConstants } from "./searchJobConstants";
const initialState = {
  searchJobList: [],
  searchJobDescription: {},
  isJobAppliedSuccesfully: false,
  similarJobList: [],
  otherOpeningJobList: [],
  filterData: {},
  page: 0,
  isLoading: {
    searchJobList: 0,
    searchJobDescription: 0,
    skillsList: 0,
    skillsCategoriesList: 0,
  },

  skillsList: [],
  skillsCategoriesList: [],
  initialCalled: {
    searchJobList: 0,
  },
  filterLength: 0,
};

export const searchJobReducers = (
  state = initialState,
  { type, payload, requestPayload }
) => {
  switch (type) {
    case searchJobConstants.SEARCH_JOB_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          searchJobList: 1,
        },
      };
    }

    case searchJobConstants.SEARCH_JOB_RESPONSE: {
      let searchJobList = initialState.searchJobList;
      if (requestPayload.page === 0) {
        searchJobList = [...payload];
      }
      if (requestPayload.page >= 0 && requestPayload.page !== state.page) {
        searchJobList = [...state.searchJobList, ...payload];
      }

      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          searchJobList: 0,
        },
        searchJobList: searchJobList,
        initialCalled: {
          ...state.initialCalled,
          searchJobList: 1,
        },
      };
    }

    case searchJobConstants.SEARCH_JOB_DESCRIPTION_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          searchJobDescription: 1,
        },
        searchJobDescription: initialState.searchJobDescription,
      };
    }

    case searchJobConstants.SEARCH_JOB_DESCRIPTION_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          searchJobDescription: 0,
        },
        searchJobDescription: payload,
      };
    }
    case searchJobConstants.APPLY_JOB_REQUEST: {
      return {
        ...state,
      };
    }

    case searchJobConstants.APPLY_JOB_RESPONSE: {
      return {
        ...state,
        isJobAppliedSuccesfully: true,
      };
    }

    case searchJobConstants.SIMILAR_JOB_REQUEST: {
      return {
        ...state,
        similarJobList: initialState.similarJobList,
      };
    }

    case searchJobConstants.SIMILAR_JOB_RESPONSE: {
      return {
        ...state,
        similarJobList: payload,
      };
    }
    case searchJobConstants.OTHER_OPENING_JOB_REQUEST: {
      return {
        ...state,
        otherOpeningJobList: initialState.otherOpeningJobList,
      };
    }

    case searchJobConstants.OTHER_OPENING_JOB_RESPONSE: {
      return {
        ...state,
        otherOpeningJobList: payload,
      };
    }
    case searchJobConstants.SKILLS_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          skillsList: 1,
        },
        skillsList: initialState.skillsList,
      };
    }

    case searchJobConstants.SKILLS_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          skillsList: 0,
        },
        skillsList: payload,
      };
    }
    case searchJobConstants.SKILL_CATEGORIES_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          skillsCategoriesList: 1,
        },
        skillsCategoriesList: initialState.skillsCategoriesList,
      };
    }

    case searchJobConstants.SKILL_CATEGORIES_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          skillsCategoriesList: 0,
        },
        skillsCategoriesList: payload,
      };
    }

    case searchJobConstants.UPDATE_FILTER_DATA: {
      return {
        ...state,
        filterData: payload.filterData,
      };
    }

    case searchJobConstants.RESET_FILTER_DATA: {
      return {
        ...state,
        filterData: initialState.filterData,
      };
    }

    case searchJobConstants.UPDATE_PAGE: {
      return {
        ...state,
        page: initialState.page,
      };
    }

    case searchJobConstants.SET_FILTER_COLOR: {
      return {
        ...state,
        filterLength: payload,
      };
    }

    default:
      return state;
  }
};
