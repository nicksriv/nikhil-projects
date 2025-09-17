import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import JobCard from "../../component/JobCard/JobCard";
import Filter from "react-native-vector-icons/MaterialCommunityIcons";
import { navigationHelper } from "../../helper/navigation";
import { ScreenConstants } from "../../navigator/ScreenConstants";
import { R } from "../../res";
import ActivityIndicator from "../../component/common/ActivityIndicator";
import View from "../../component/common/View";
import Text from "../../component/common/Text";
import InformativeImage from "../../component/common/InformativeImage";
import Separator from "@app/component/common/Separator";

class SearchJobListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: 0,
      isRefreshing: false,
    };
  }
  componentDidMount() {
    this.handleRefresh();
    this.props.getSkillsListAction();
    this.props.getSkillsCategoriesListAction();
  }

  handleOnPress = (data) => {
    navigationHelper.navigate({
      name: ScreenConstants.JOB_DESCRIPTION,
      params: {
        id: data.item.id,
        screen: "searchJobs",
      },
    });
  };

  handleRefresh = () => {
    this.props.updateFilterDataAction({ filterData: {} });
    this.props.updateSearchJobListPageAction({ page: 0 });
    this.props.getSearchJobListAction({ filterData: {}, page: 0 });
    this.setState({ isRefreshing: true }, () => {
      setTimeout(() => {
        this.setState({ isRefreshing: false });
      }, 500);
    });
  };

  handleLoadMore = () => {
    const nextPage = this.props.searchJobListPage + 1;
    this.props.updateSearchJobListPageAction({ page: nextPage });
    this.props.getSearchJobListAction({
      filterData: this.props.filterData,
      page: nextPage,
    });
    this.setState({ isRefreshing: true }, () => {
      setTimeout(() => {
        this.setState({ isRefreshing: false });
      }, 500);
    });
  };

  render() {
    const {
      searchJobList = [],
      isLoading = {},
      searchjobInitialCalled,
      filterLength,
    } = this.props;
    if (isLoading.searchJobList || !searchjobInitialCalled) {
      return (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }
    if (!searchJobList.length && searchjobInitialCalled) {
      return <InformativeImage text={"No Jobs Found try again later!"} />;
    }

    const LoadMoreContent = (props) => {
      const { loadMore } = this.state;
      return (
        <View style={styles.loadMoreStyle}>
          <View
            touchable
            style={styles.loadMoreButton}
            onPress={this.handleLoadMore}
          >
            {loadMore ? (
              <ActivityIndicator
                isLoading
                color={R.colors.background}
                size="small"
              />
            ) : (
              <Text>Load More</Text>
            )}
          </View>
        </View>
      );
    };

    return (
      <>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }
          renderItem={(item) => (
            <JobCard
              showSkills={true}
              onPress={() => this.handleOnPress(item)}
              {...item}
            />
          )}
          data={searchJobList}
          keyExtractor={(item, idx) => `job_list_card_${idx}`}
          ListFooterComponent={LoadMoreContent}
          ListHeaderComponent={<Separator size={12} />}
          ItemSeparatorComponent={<Separator size={12} />}
          contentContainerStyle={{ paddingHorizontal: R.units.scale(10) }}
        />
        <Filter
          style={styles.filterIconStyle}
          name={filterLength ? "filter-check-outline" : "filter-outline"}
          size={24}
          onPress={() => {
            navigationHelper.navigate({
              name: ScreenConstants.FILTER,
            });
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  filterIconStyle: {
    position: "absolute",
    bottom: R.units.scale(36),
    right: R.units.scale(12),
    zIndex: 12,
    padding: R.units.scale(12),
    borderRadius: R.units.scale(50),
    backgroundColor: R.colors.primary.main,
    elevation: 4,
    color: R.colors.white,
  },
  loadMoreStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: R.units.scale(10),
  },
  loadMoreButton: {
    paddingHorizontal: R.units.scale(20),
    paddingVertical: R.units.scale(10),
    backgroundColor: R.colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: R.units.scale(5),
  },
});

export default SearchJobListContainer;
