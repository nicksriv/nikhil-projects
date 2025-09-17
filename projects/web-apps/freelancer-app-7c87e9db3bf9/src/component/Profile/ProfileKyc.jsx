import React from 'react';
import {StyleSheet} from 'react-native';
import View from '@app/component/common/View';
import {R} from '@app/res/index';
import Card from '@app/component/common/Card';
import DescriptionCard from '@app/component/Profile/DescriptionCard';
import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import CardHeader from '@app/component/Profile/CardHeader';

const ProfileKyc = ({kycDetail}) => {
  const kycDescriptionField = [
    {
      label: 'Aadhar',
      render: kycDetail => kycDetail?.adhaarNumber || 'NA',
    },
    {
      label: 'PAN',
      render: kycDetail => kycDetail?.panNumber || 'NA',
    },
  ];
  return (
    <>
      <CardHeader
        cardHeader={'Kyc Details'}
        iconName={
          !Object.values(kycDetail).every(element =>
            [null, '', undefined].includes(element),
          )
            ? 'pencil'
            : 'plus'
        }
        onIconPress={() => {
          navigationHelper.navigate({
            name: ScreenConstants.EDIT_PROFILE,
            params: {
              key: 'kycDetail',
              data: kycDetail,
              name:'Kyc Details'
            },
          });
        }}
      />
      <Card style={styles.cardStyle}>
        <View paddingHorizontal={10}>
          {kycDescriptionField.map((ky, idx) => (
            <DescriptionCard
              key={`kyc${idx}`}
              label={ky.label}
              value={ky.render(kycDetail)}
            />
          ))}
        </View>
      </Card>
    </>
  );
};

export default ProfileKyc;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginBottom: R.units.scale(10),
    elevation: 4,
    padding: R.units.scale(10),
  },
});
