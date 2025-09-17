import { dashboardConstants } from "./dashboardConstants";

const dashboardActions = {};

dashboardActions.getDashboardStats = () => ({
  type: dashboardConstants.DASHBOARD_STATS_SAGA,
});

export { dashboardActions };
