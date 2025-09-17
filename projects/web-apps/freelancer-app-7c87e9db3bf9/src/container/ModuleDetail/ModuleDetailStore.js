import { compose, hoistStatics } from "recompose";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import withSpinner from "../Components/withSpinner";
import * as pageActions from "@app/FormElements/stores/Actions/pageList";
import * as authActions from "@app/FormElements/stores/Actions/auth"
import * as validationActions from "@app/FormElements/stores/Actions/validation"


const mapStateToProps = (state) => ({
  loader: state.dynamicModule.loader.loader,
  list: state.dynamicModule.tablelist.list,
  workflowList: state.dynamicModule.tablelist.workflowList,
  reportlist:state.dynamicModule.tablelist.reportlist,
  reportRowList:state.dynamicModule.tablelist.reportRowList,
  reportFiltersParams:state.dynamicModule.tablelist.reportFiltersParams,
  listofreport:state.dynamicModule.tablelist.listofreport,
  myModule:state.dynamicModule.tablelist.myModule,
  mySubModule:state.dynamicModule.tablelist.mySubModule,
  row: state.dynamicModule.tablelist.rowList,
  rowDetails: state.dynamicModule.tablelist.rowDetails,
  auth: state.dynamicModule.auth.login,

  profilePicture: state.dynamicModule.validationReducer.profilePicture,
  allChartDataRedux: state.dynamicModule.validationReducer.allChartDataRedux,
  allChartDataReportRedux: state.dynamicModule.validationReducer.allChartDataReportRedux,
  localLogo: state.dynamicModule.validationReducer.localLogo,
  localBackground: state.dynamicModule.validationReducer.localBackground,

  chartApiData: state.dynamicModule.validationReducer.chartApiData,
  activeJobId: state.myWork.activeJobId,

});

const ActionCreators = Object.assign({}, pageActions, authActions, validationActions);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

const DashboardStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default DashboardStore;

