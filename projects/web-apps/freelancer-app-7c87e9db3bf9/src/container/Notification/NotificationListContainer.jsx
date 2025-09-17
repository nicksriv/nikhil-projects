import React from "react";
import { FlatList, RefreshControl } from "react-native";

import Separator from "@app/component/common/Separator";
import View from "@app/component/common/View";

import NotificationCard from "@app/component/Notification/NotificationCard";
import ActivityIndicator from "@app/component/common/ActivityIndicator";

import { R } from "../../res";

class NotificationListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {
    this.props.getNotificationListAction();
  }

  handleRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.getNotificationListAction();
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 500)
  }

  render() {
    const { notificationList, isInitialCalled, isLoading } = this.props;
    if (!isInitialCalled && isLoading) {
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
      <FlatList
        data={notificationList}
        renderItem={(data) => <NotificationCard notificationData={data.item} />}
        refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
        keyExtractor={(item, index) => `notification_card_${index}`}
        ItemSeparatorComponent={<Separator />}
        ListHeaderComponent={<Separator />}
        ListFooterComponent={<Separator />}
      />
    );
  }
}

export default NotificationListContainer;
