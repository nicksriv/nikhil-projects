import React from "react";
import View from "../../component/common/View";
import MyEarningCard from "../../component/MyEarning/MyEarningCard";
import MyEarningHeader from "../../component/MyEarning/MyEarningHeader";
import InformativeImage from "../../component/common/InformativeImage";
import ActivityIndicator from "../../component/common/ActivityIndicator";
import { R } from "../../res";
import { FlatList, RefreshControl } from "react-native";
import Separator from "../../component/common/Separator";

class MyEarningContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.getDashboardStatsActions();
    this.props.getMyWorkListAction();
  }
  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getDashboardStatsActions();
    this.props.getMyWorkListAction();
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 500);
  };
  render() {
    const { dashboardStats = {}, myWorkList = [], isLoading } = this.props;
    if (isLoading) {
      return (
        <View
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }
    return (
      <View container style={{ flex: 1, backgroundColor: R.colors.white }}>
        <MyEarningHeader earningHeader={dashboardStats} />
        <Separator />

        <FlatList
          data={myWorkList}
          renderItem={(item, index) => (
            <MyEarningCard data={item} key={index} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          ItemSeparatorComponent={<Separator size={12} />}
          ListHeaderComponent={<Separator size={12} />}
          ListFooterComponent={<Separator size={12} />}
          ListEmptyComponent={
            <InformativeImage text={"No earning data available"} />
          }
        />

        <Separator />
      </View>
    );
  }
}

export default MyEarningContainer;
