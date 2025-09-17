import myWorkConstants from "./myWorkConstants";
const myWorkActions = {};

myWorkActions.getMyWorkList = () => ({
  type: myWorkConstants.MY_WORK_SAGA,
});

myWorkActions.getMyWorkDescription = (id) => ({
  type: myWorkConstants.MY_WORK_DESCRIPTION_SAGA,
  payload: id,
});

myWorkActions.getMyWorkDescription = (id) => ({
  type: myWorkConstants.MY_WORK_DESCRIPTION_SAGA,
  payload: id,
});

myWorkActions.getMyWorkEarningStats = (year) => ({
  type: myWorkConstants.MY_WORK_EARNING_STATS_SAGA,
  payload: year,
});

myWorkActions.getMyWorkStats = (year) => ({
  type: myWorkConstants.MY_WORK_STATS_SAGA,
  payload: year,
});

myWorkActions.getModuleData = (clientId) => ({
  type: myWorkConstants.MY_MODULE_DATA_SAGA,
  payload: clientId,
});

myWorkActions.setActiveJobId = (id) => ({
  type: myWorkConstants.SET_ACTIVE_JOB_ID,
  payload: id,
});

export { myWorkActions };
