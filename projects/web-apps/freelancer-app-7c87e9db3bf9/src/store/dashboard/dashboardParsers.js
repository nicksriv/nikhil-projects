import _get from "lodash.get";
const dashboardParsers = {};

dashboardParsers.getDashboardStatsParser = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }

  return {
    totalHoursWorked: _get(res, "totalHoursWorked", ""),
    totalMoneyEarned: _get(res, "totalMoneyEarned", ""),
    totalProjectWorked: _get(res, "totalProjectWorked", ""),
    lastProjectEarning: _get(res, "lastProjectEarning", ""),
  };
};

export { dashboardParsers };
