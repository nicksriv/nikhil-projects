import React from 'react';
import {StyleSheet} from 'react-native';
import {R} from '../../res';
import Card from '../common/Card';
import Text from '../common/Text';
import View from '../common/View';
import Time from 'react-native-vector-icons/Octicons';
import Dollar from 'react-native-vector-icons/FontAwesome';
import constants from '@app/helper/constants';
import Separator from '../common/Separator';
const MyEarningCard = props => {
  const {jobTitle, totalHoursWorked, totalEarned, jobStatus, jobRefNo} =
    props.data.item;

  return (
    <Card style={styles.cardStyle}>
      <Text color="secondary" font="semibold">
        #{jobRefNo}
      </Text>
      <Text>{jobTitle}</Text>
      <Separator />
      <View
        width="100%"
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between">
        <View>
          <View style={styles.cardContentView}>
            <Text style={styles.cardTotalHeader}>
              <Time name="clock" color="#55AAE1" /> Total Working Hours:
            </Text>
            <Text style={styles.cardTotalValue}>{totalHoursWorked}</Text>
          </View>
          <View style={styles.cardContentView}>
            <Text style={styles.cardTotalHeader}>
              <Dollar name="dollar" color="#55AAE1" />
              {'  '}Total Earned:
            </Text>
            <Text style={styles.cardTotalValue}>{totalEarned}</Text>
          </View>
        </View>
        <Text
          style={{
            backgroundColor: constants[jobStatus]?.backgroundColor,
            color: constants[jobStatus]?.color,
            paddingVertical: R.units.scale(2),
            paddingHorizontal: R.units.scale(10),
            borderRadius: R.units.scale(20),
            borderColor: constants[jobStatus]?.color,
            borderWidth: 1,
            fontSize: 12,
            textTransform: 'capitalize',
            textAlign: 'center',
            alignItems: 'center',
          }}>
          {jobStatus ? constants[jobStatus]?.label : jobStatus}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: R.units.scale(1),
    borderColor: R.colors.border,
    backgroundColor: R.colors.white,
    borderRadius: R.units.scale(3),
    paddingHorizontal: R.units.scale(12),
    paddingVertical: R.units.scale(8),
    alignItems: 'flex-start',
    minHeight: R.units.scale(100),
  },

  cardContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardTotalHeader: {
    color: R.colors.text.secondary,
    fontWeight: '400',
    // paddingHorizontal: R.units.scale(5),
  },
  cardTotalValue: {
    fontWeight: '500',
    paddingHorizontal: R.units.scale(2),
  },
  cardStatus: {
    fontSize: R.units.scale(10),
    textAlign: 'center',
    color: R.colors.text.secondary,
    backgroundColor: R.colors.background.chip,
    paddingHorizontal: R.units.scale(8),
    borderRadius: R.units.scale(16),
  },
});

export default MyEarningCard;
