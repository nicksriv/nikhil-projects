import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import View from '../../component/common/View';
import {navigationHelper} from '../../helper/navigation';
import {ScreenConstants} from '../../navigator/ScreenConstants';
import ActivityIndicator from '../../component/common/ActivityIndicator';
import {R} from '../../res';
import InformativeImage from '../../component/common/InformativeImage';
import Separator from '@app/component/common/Separator';
import DashboardJobCard from '@app/component/Dashboard/DashboardJobCard';

class MyWorkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'ONGOING',
      refreshing: false,
    };
  }
  componentDidMount() {
    this.props.getMyWorkListAction();
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.props.getMyWorkListAction();
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 500);
  };

  handleOnPress = id => {
    navigationHelper.navigate({
      name: ScreenConstants.WORK_DETAIL,
      params: {
        id: id,
      },
    });
  };

  render() {
    const {myWorkList = [], isLoading} = this.props;
    if (isLoading) {
      return (
        <View justifyContent="center" alignItems="center" height="100%">
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }
    return (
      <View container style={{backgroundColor: R.colors.white}}>
        <FlatList
          data={myWorkList}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          renderItem={data => (
            <DashboardJobCard
              variant="outlined"
              title={data.item.jobTitle}
              status={data.item.jobStatus}
              createdAt={data.item.createdAt}
              createdAtLabel={'Applied on'}
              onPress={() => this.handleOnPress(data.item.id)}
              jobRefNo={data.item.jobRefNo}
            />
          )}
          ItemSeparatorComponent={<Separator size={12} />}
          ListHeaderComponent={<Separator size={12} />}
          ListFooterComponent={<Separator size={12} />}
          ListEmptyComponent={<InformativeImage text={`No work data found`} />}
        />
      </View>
    );
  }
}

export default MyWorkContainer;
