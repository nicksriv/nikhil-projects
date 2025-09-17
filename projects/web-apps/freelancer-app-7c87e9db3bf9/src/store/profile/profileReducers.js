import { profileConstants } from "./profileConstants";
initialState = {
  profileData: {},
  isLoading: {
    profileData: 0,
  },
};

export const profileReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case profileConstants.PROFILE_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          profileData: 1,
        },
        profileData: initialState.profileData,
      };
    }

    case profileConstants.PROFILE_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          profileData: 0,
        },
        profileData: payload,
      };
    }

    default:
      return state;
  }
};
