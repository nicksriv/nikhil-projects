import React from 'react';
import {StyleSheet} from 'react-native';
import {R} from '@app/res';

import View from '@app/component/common/View';
import Text from '@app/component/common/Text';

import {LineChart} from 'react-native-gifted-charts';
import Separator from '@app/component/common/Separator';

export class ReportContainer extends React.Component {
  constructor(props) {
    super(props);
    let d = new Date();

    this.state = {
      year: d.getFullYear(),
    };
  }

  componentDidMount() {
    this.props.getMyWorkEarningStatsAction(this.state.year);
    this.props.getMyWorkStatsAction(this.state.year);
  }

  getAnualEarningData() {
    const {myWorkEarningStats} = this.props;

    let data = [
      {value: 0, label: 'Jan'},
      {value: 0, label: 'Feb'},
      {value: 0, label: 'Mar'},
      {value: 0, label: 'Apr'},
      {value: 0, label: 'May'},
      {value: 0, label: 'Jun'},
      {value: 0, label: 'Jul'},
      {value: 0, label: 'Aug'},
      {value: 0, label: 'Sep'},
      {value: 0, label: 'Oct'},
      {value: 0, label: 'Nov'},
      {value: 0, label: 'Dec'},
    ];

    if (myWorkEarningStats) {
      myWorkEarningStats.forEach(e => {
        if (e.month) {
          let m = e.month.split('-')[1] - 1;
          data[m].value = e.value;
        }
      });
    }

    return data;
  }

  getAnualJobData() {
    const {myWorkStats} = this.props;

    let data = [
      {value: 0, label: 'Jan'},
      {value: 0, label: 'Feb'},
      {value: 0, label: 'Mar'},
      {value: 0, label: 'Apr'},
      {value: 0, label: 'May'},
      {value: 0, label: 'Jun'},
      {value: 0, label: 'Jul'},
      {value: 0, label: 'Aug'},
      {value: 0, label: 'Sep'},
      {value: 0, label: 'Oct'},
      {value: 0, label: 'Nov'},
      {value: 0, label: 'Dec'},
    ];

    if (myWorkStats) {
      myWorkStats.forEach(e => {
        if (e.month) {
          let m = e.month.split('-')[1] - 1;
          data[m].value = e.value;
        }
      });
    }

    return data;
  }

  render() {
    return (
      <View style={styles.container} scrollable>
        <Text>
          Jan {this.state.year} - Dec {this.state.year}
        </Text>

        <Separator size={20} />
        <Text variant="body2" font="semibold">
          Annual Earning
        </Text>
        <Separator size={5} />
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: R.units.scale(10),
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <LineChart
            color={R.colors.success.main}
            width={320}
            pressEnabled
            showDataPointOnPress
            showTextOnPress
            showVerticalLine
            thickness={4}
            data={this.getAnualEarningData()}
          />
        </View>

        <Separator size={20} />
        <Text variant="body2" font="semibold">
          Annual Job
        </Text>
        <Separator size={5} />
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: R.units.scale(10),
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center',
          }}>
          <LineChart
            color={R.colors.primary.main}
            width={320}
            pressEnabled
            showDataPointOnPress
            showTextOnPress
            showVerticalLine
            thickness={4}
            data={this.getAnualJobData()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: R.units.scale(20),
    backgroundColor: R.colors.background.paper,
    flex: 1,
  },
});

export default ReportContainer;
