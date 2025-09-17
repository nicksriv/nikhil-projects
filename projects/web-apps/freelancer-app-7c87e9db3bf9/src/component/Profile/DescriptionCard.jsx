import React from 'react';
import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import {StyleSheet} from 'react-native';
import {R} from '@app/res/index';

const DescriptionCard = props => {
  return (
    <View style={styles.descriptionWrapper}>
      <Text style={styles.headerText}>{props?.label}</Text>
      <Text style={styles.colan}>:</Text>
      <Text style={styles.valueText}>{props?.value}</Text>
    </View>
  );
};

export default DescriptionCard;

const styles = StyleSheet.create({
  descriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
    marginVertical: R.units.scale(3),
    width: '35%',
  },
  valueText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '400',
    marginVertical: R.units.scale(3),
    textAlign: 'left',
    width: '55%',
    marginRight: R.units.scale(20),
  },
  colan: {
    paddingHorizontal: R.units.scale(2),
    fontWeight: '500',
  },
});
