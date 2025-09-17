import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {R} from '@app/res';

import View from '@app/component/common/View';
import ActivityIndicator from '@app/component/common/ActivityIndicator';
import Button from '@app/component/form/Button';
import RaisedDisputeCard from '@app/component/RaisedDispute/RaisedDisputeCard';
import Separator from '@app/component/common/Separator';

import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import InformativeImage from '@app/component/common/InformativeImage';

export default class RaiseDisputeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.getDisputeListAction();
  }

  handleOnPress = data => {
    navigationHelper.navigate({
      name: ScreenConstants.RAISED_DISPUTE_DESCRIPTION,
      params: {
        data: data,
      },
    });
  };

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.props.getDisputeListAction();
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 500);
  };

  render() {
    const {disputeList, isLoading} = this.props;

    if (isLoading) {
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

    return (
      <View style={styles.container} container >
        <View style={{flex: 1, backgroundColor: R.colors.white}}>
          <FlatList
            data={disputeList}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
            renderItem={(data, index) => (
              <RaisedDisputeCard
                key={`raise_dispute_card${index}`}
                disputeRefNo={data.item.disputeRefNo}
                disputeTitle={data.item.disputeTitle}
                createdAt={data.item.createdAt}
                disputeStatus={data.item.disputeStatus}
                onPress={() => this.handleOnPress(data.item)}
              />
            )}
            ItemSeparatorComponent={<Separator size={12} />}
            ListHeaderComponent={<Separator size={12} />}
            ListFooterComponent={<Separator size={12} />}
            ListEmptyComponent={
              <InformativeImage text={'No Dispute data available'} />
            }
          />
        </View>
        <View flex={0} alignItems="flex-end">          
          <Button
            text={'Raise a dispute'}
            onPress={() =>
              navigationHelper.navigate({
                name: ScreenConstants.RAISE_DISPUTE_FORM,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: R.units.scale(20),
    backgroundColor: R.colors.background.paper,
    flex: 1,
  },
});
