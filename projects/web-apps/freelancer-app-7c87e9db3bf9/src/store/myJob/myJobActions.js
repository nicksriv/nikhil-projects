import myJobConstants from "./myJobConstants";
const myJobActions = {};

myJobActions.getMyJobList = () => ({
  type: myJobConstants.MY_JOB_SAGA,
});

myJobActions.getMyJobDescription = (id) => ({
  type: myJobConstants.MY_JOB_DESCRIPTION_SAGA,
  payload: id,
});

export { myJobActions };
