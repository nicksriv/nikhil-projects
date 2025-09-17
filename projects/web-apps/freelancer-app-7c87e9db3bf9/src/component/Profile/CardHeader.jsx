import React from 'react';
import {StyleSheet} from 'react-native';
import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import {R} from '@app/res/index';
import Icon from 'react-native-vector-icons/EvilIcons';

const CardHeader = ({cardHeader, iconName, onIconPress}) => {
  return (
    <View style={styles.cardHeaderView}>
      <Text style={styles.cardHeader}>{cardHeader}</Text>
      <Icon
        name={iconName}
        size={R.units.scale(30)}
        style={styles.editIcon}
        onPress={onIconPress}
      />
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  profileHeaderView: {
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: R.units.scale(14),
    fontWeight: '500',
    marginHorizontal: R.units.scale(5),
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '50%',
    marginVertical: R.units.scale(8),
  },
  cardHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: R.units.scale(13),
    marginVertical: R.units.scale(10),
  },
  cardHeader: {
    fontSize: R.units.scale(14),
    fontWeight: '500',
  },
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginBottom: R.units.scale(10),
    elevation: 4,
    padding: R.units.scale(10),
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
  descriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  editIcon: {
    color: R.colors.primary.main,
  },
  pdfName: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
    marginVertical: R.units.scale(3),
  },
  pdfDate: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(10),
    fontWeight: '400',
  },
  colan: {
    paddingHorizontal: R.units.scale(2),
    fontWeight: '500',
  },
  designationHeader: {
    fontSize: R.units.scale(13),
    fontWeight: '500',
  },
  companyNameHeader: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
  },
  workDescription: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '400',
    marginVertical: R.units.scale(3),
    textAlign: 'left',
    marginRight: R.units.scale(20),
  },
  fromDateStyle: {
    fontSize: R.units.scale(11),
    fontWeight: '400',
  },
  root: {
    borderRadius: R.units.scale(50),
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  skillHeaderText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
  },
});
