import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchJobActions} from '../../store/searchJob/searchJobActions';

const mapStateToProps = state => {
  return {
    searchJobList: state.searchJobList.searchJobList,
    isLoading: state.searchJobList.isLoading.searchJobList,
    skillsList: state.searchJobList.skillsList,
    skillsCategoriesList: state.searchJobList.skillsCategoriesList,
    searchjobInitialCalled: state.searchJobList.initialCalled.searchJobList,
    searchJobListPage: state.searchJobList.page,
    filterData: state.searchJobList.filterData,
    filterLength: state.searchJobList.filterLength,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchJobListAction: searchJobActions.getSearchJobList,
      getSkillsListAction: searchJobActions.getSkillsList,
      getSkillsCategoriesListAction: searchJobActions.getSkillsCategoriesList,
      updateSearchJobListPageAction: searchJobActions.updateSearchJobListPage,
      updateFilterDataAction: searchJobActions.updateFilterData,
    },
    dispatch,
  );

const SearchJobListStore = SearchJobListContainer =>
  connect(mapStateToProps, mapDispatchToProps)(SearchJobListContainer);
export default SearchJobListStore;
