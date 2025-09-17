import {
  GET_PROFILE_PIC,
  GET_ALL_CHART_VALUE,
  GET_ALL_CHART_REPORT_VALUE,
  GET_LOCAL_LOGO,
  GET_LOCAL_BACKGROUND,
  GET_CHART_VALUE
} from "../../constants";
const initialState = {
  profilePicture: "",
  allChartDataRedux: "",
  allChartDataReportRedux: "",
  localLogo: "",
  localBackground: "",
  chartApiData:'',
};
const ValidationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_PIC:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case GET_ALL_CHART_VALUE:
      return {
        ...state,
        allChartDataRedux: action.payload,
      };
    case GET_ALL_CHART_REPORT_VALUE:
      return {
        ...state,
        allChartDataReportRedux: action.payload,
      };
    case GET_LOCAL_LOGO:
      return {
        ...state,
        localLogo: action.payload,
      };
    case GET_LOCAL_BACKGROUND:
      return {
        ...state,
        localBackground: action.payload,
      };

      case GET_CHART_VALUE:
        return {
          ...state,
          chartApiData: action.payload,
        };

    default:
      return state;
  }
};
export default ValidationReducer;
