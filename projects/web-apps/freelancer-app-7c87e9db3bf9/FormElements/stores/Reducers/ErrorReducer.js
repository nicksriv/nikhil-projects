import { ERROR } from "../../constants";
const initialState = {
    error: null,
};
const ErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default ErrorReducer;
