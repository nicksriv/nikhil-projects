import { axios } from "../../helper/axios";
import { dashboardConstants } from "./dashboardConstants";

const dashboardApis = {};

dashboardApis.getDashboardStatsApi = async () => {
  const res = await axios.get(dashboardConstants.DASHBOARD_STATS_API);
  return res;
};

export { dashboardApis };
