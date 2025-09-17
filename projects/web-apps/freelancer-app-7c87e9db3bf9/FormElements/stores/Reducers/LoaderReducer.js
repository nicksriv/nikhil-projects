import { LOADER_OFF, LOADER_ON } from "../../constants";
const initialState = {
  loader: null,
};
const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_ON:
      return {
        ...state,
        loader: true,
      };
    case LOADER_OFF:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
export default LoaderReducer;
