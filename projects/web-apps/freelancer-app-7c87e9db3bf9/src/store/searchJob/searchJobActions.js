import { searchJobConstants } from "./searchJobConstants";

const searchJobActions = {};

searchJobActions.getSearchJobList = ({ filterData = {}, page = 0 } = {}) => ({
  type: searchJobConstants.SEARCH_JOB_SAGA,
  payload: { filterData, page },
});

searchJobActions.getJobDescription = (id) => ({
  type: searchJobConstants.SEARCH_JOB_DESCRIPTION_SAGA,
  payload: id,
});

searchJobActions.applyJob = (payload) => ({
  type: searchJobConstants.APPLY_JOB_SAGA,
  payload,
});

searchJobActions.getSimilarJobList = (id) => ({
  type: searchJobConstants.SIMILAR_JOB_SAGA,
  payload: id,
});

searchJobActions.getOtherOpeningJobList = (id) => ({
  type: searchJobConstants.OTHER_OPENING_JOB_SAGA,
  payload: id,
});

searchJobActions.getSkillsList = (payload = "") => ({
  type: searchJobConstants.SKILLS_SAGA,
  payload,
});
searchJobActions.getSkillsCategoriesList = () => ({
  type: searchJobConstants.SKILL_CATEGORIES_SAGA,
});

searchJobActions.updateFilterData = ({ filterData }) => ({
  type: searchJobConstants.UPDATE_FILTER_DATA,
  payload: { filterData },
});

searchJobActions.resetFilterData = () => ({
  type: searchJobConstants.RESET_FILTER_DATA,
});

searchJobActions.updateSearchJobListPage = ({ page }) => ({
  type: searchJobConstants.UPDATE_PAGE,
  payload: { page },
});

searchJobActions.setFilterLength = ({ filterLength }) => ({
  type: searchJobConstants.SET_FILTER_COLOR,
  payload: filterLength,
});

export { searchJobActions };
