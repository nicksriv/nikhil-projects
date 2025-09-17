import React from "react";
import Filter from "../../component/Filter/Filter";
import { navigationHelper } from "../../helper/navigation";
import { searchJobApis } from "../../store/searchJob/searchJobApis";
import { searchJobParser } from "../../store/searchJob/searchJobParsers";

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOptions: [
        {
          label: "Category",
          value: "CATEGORY",
        },
        {
          label: "Skills",
          value: "SKILLS",
        },
        {
          label: "Location",
          value: "LOCATIONS",
        },
      ],
      selectedFilterName: "CATEGORY",
      selectedCategoryId: "",
      filterData: {},
      selectedOptions: [],
      skillsList: [],
      isChecked: false,
      skillsDataList: [],
      checkedItems: [],
      selectedCity: "",
    };
  }

  componentDidMount() {
    let payload = {
      name: "",
      categoryIds: [],
    };
    this.updateFilterDataFromStore();
    this.fetchSkillsList(payload);
    this.props.getSkillsCategoriesListAction();
  }

  updateFilterDataFromStore = () => {
    const { filterData } = this.props;
    const checkedItems = [];
    if (Object.keys(filterData).length) {
      Object.keys(filterData).forEach((k) => {
        filterData[k].forEach((fd) => checkedItems.push(fd));
      });
    }
    this.setState({ filterData, checkedItems });
  };

  fetchSkillsList = async (payload) => {
    try {
      const { name, categoryIds } = payload;
      const res = await searchJobApis.getSkills({ name, categoryIds });
      if (res.content) {
        const parsedData = searchJobParser.skillsListParser(res);
        this.setState({ skillsDataList: parsedData });
      }
    } catch (error) {}
  };

  handleonSelectOptions = async (id) => {
    let { filterData, selectedFilterName, checkedItems } = this.state;
    let filterName = "";
    if (selectedFilterName === "CATEGORY") {
      filterName = "skillsCategories";
    }
    if (selectedFilterName === "SKILLS") {
      filterName = "skills";
    }

    if (!filterData[filterName]) {
      filterData[filterName] = [];
    }

    // to remove if already exist
    if (filterData[filterName].includes(id)) {
      filterData[filterName] = filterData[filterName].filter(
        (fid) => fid !== id
      );
      checkedItems = checkedItems.filter((fid) => fid !== id);
    } else {
      // to add if not exist
      filterData[filterName].push(id);
      checkedItems.push(id);
    }

    try {
      // Call skills API after Category is selected
      if (selectedFilterName === "CATEGORY") {
        const payload = {
          name: "skillsCategories",
          categoryIds: filterData["CATEGORY"],
        };
        await this.fetchSkillsList(payload);
      }
    } catch (error) {}
    this.setState({ filterData, checkedItems });
  };

  handleOnSelectFilter = (value) => {
    this.setState({ selectedFilterName: value });
  };

  handleLoading = () => {
    const { selectedFilterName } = this.state;
    const { isLoading } = this.props;
    let loading = false;
    if (selectedFilterName === "Category") {
      if (isLoading.skillsCategoriesList) {
        loading = true;
      }
    }
    if (selectedFilterName === "Skills") {
      if (isLoading.skillsList) {
        loading = true;
      }
    }
    return loading;
  };

  getData = () => {
    const { filterOptions, selectedFilterName, skillsDataList } = this.state;
    const {
      skillsCategoriesList = [],
    } = this.props;
    let data = [];
    if (selectedFilterName === filterOptions[0].value) {
      if (skillsCategoriesList.length) {
        data = skillsCategoriesList;
      }
    }
    if (selectedFilterName === filterOptions[1].value) {
      if (skillsDataList.length) {
        data = skillsDataList;
      }
    }
    return data;
  };

  clearFilter = () => {
    this.setState({
      filterData: {},
      selectedFilterName: "CATEGORY",
      selectedCategoryId: "",
      checkedItems: [],
    });
    this.props.setFilterLengthAction({ filterLength: 0 });
    this.props.updateFilterDataAction({ filterData: {} });
    this.props.updateSearchJobListPageAction({ page: 0 });
    this.props.getSearchJobListAction({ filterData: {}, page: 0 });
  };

  handleSubmit = () => {
    const { filterData } = this.state;
    let filterLength = 0;
    if (Object.keys(this.state.filterData).length !== 0) {
      filterLength = 1;
    }
    
    if (!filterLength) {
      this.clearFilter();
      return;
    }
    
    this.props.setFilterLengthAction({ filterLength: filterLength });
    this.props.updateFilterDataAction({ filterData });
    this.props.updateSearchJobListPageAction({ page: 0 });
    this.props.getSearchJobListAction({ filterData, page: 0 });
    navigationHelper.goBack();
  };
  handleLocationChange = ({ data }) => {
    this.setState((prevState) => ({
      filterData: {
        ...prevState.filterData,
        city: data.terms[0].value.toLowerCase(),
      },
      selectedCity: data.terms[0].value,
    }));
  };

  render() {
    const {
      filterOptions,
      selectedFilterName,
      checkedItems,
      isChecked,
      selectedCity,
    } = this.state;
    return (
      <>
        <Filter
          filterData={filterOptions}
          onSelectFilter={this.handleOnSelectFilter}
          filterOptionsData={this.getData()}
          isLoading={this.handleLoading()}
          onSelectOptions={this.handleonSelectOptions}
          isChecked={isChecked}
          checkedItems={checkedItems}
          selectedFilterName={selectedFilterName}
          onSubmit={this.handleSubmit}
          clearFilter={this.clearFilter}
          onLocationChange={this.handleLocationChange}
          selectedCity={selectedCity}
        />
      </>
    );
  }
}

export default FilterContainer;
