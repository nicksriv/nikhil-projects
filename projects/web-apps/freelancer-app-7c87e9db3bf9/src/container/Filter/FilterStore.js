import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchJobActions } from "../../store/searchJob/searchJobActions";

const mapStateToProps = (state) => {
  return {
    isLoading: state.searchJobList.isLoading,
    skillsList: state.searchJobList.skillsList,
    skillsCategoriesList: state.searchJobList.skillsCategoriesList,
    filterData: state.searchJobList.filterData,
    filterColor: state.searchJobList.filterColor,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSearchJobListAction: searchJobActions.getSearchJobList,
      getSkillsListAction: searchJobActions.getSkillsList,
      getSkillsCategoriesListAction: searchJobActions.getSkillsCategoriesList,
      updateFilterDataAction: searchJobActions.updateFilterData,
      resetFilterDataAction: searchJobActions.resetFilterData,
      updateSearchJobListPageAction: searchJobActions.updateSearchJobListPage,
      setFilterLengthAction: searchJobActions.setFilterLength,
    },
    dispatch
  );

const FilterStore = (FilterContainer) =>
  connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
export default FilterStore;
