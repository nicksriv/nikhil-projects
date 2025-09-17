import {
  GET_HEADER_LIST,
  GET_FILTER_HEADER_LIST,
  GET_ROW_LIST,
  GET_WORKFLOW_LIST,
  GET_ROW_DETAILS,
  MAPPING_DATA,
  VISIBLE_REPORT_LIST,
  VISIBLE_REPORT_ROW_LIST,
  VISIBLE_LISTOFREPORT,
  GET_MY_ITEM,
  GET_MY_SUB_ITEM,
  VISIBLE_REPORT_LIST_FILTER,
} from "../../constants";
const initialState = {
  list: {},
  rowList: {},
  reportRowList: {},
  workflowList: {},
  rowDetails: {},
  mappingData:[],
  reportlist: '',
  reportFiltersParams:{},
  listofreport: false,
  myModule: {},
  mySubModule: {}
};
const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEADER_LIST:
      return {
        ...state,
        list: action.payload,
      };
      case GET_FILTER_HEADER_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case GET_ROW_LIST:
      return {
        ...state,
        rowList: action.payload,
      };
      case VISIBLE_REPORT_ROW_LIST:
        return {
          ...state,
          reportRowList: action.payload,
        };
    case GET_WORKFLOW_LIST:
      return {
        ...state,
        workflowList: action.payload,
      };
    case GET_ROW_DETAILS:
      return {
        ...state,
        rowDetails: action.payload
      };
    case MAPPING_DATA:
      return {
        ...state,
        mappingData: action.payload
      };
      case VISIBLE_REPORT_LIST:
      return {
        ...state,
        reportlist: action.payload
      };
      case VISIBLE_REPORT_LIST_FILTER:
        return {
          ...state,
          reportFiltersParams: action.payload
        };
      case VISIBLE_LISTOFREPORT:
      return {
        ...state,
        listofreport: action.payload
      };
      case GET_MY_ITEM:
        return {
          ...state,
          myModule: action.payload,
        };
        case GET_MY_SUB_ITEM:
        return {
          ...state,
          mySubModule: action.payload,
        };
    default:
      return state;
  }
};
export default ListReducer;
