import React from 'react';
import {StyleSheet} from 'react-native';
import View from '@app/component/common/View';
import {R} from '../../res';
import Card from '@app/component/common/Card';
import DescriptionCard from '@app/component/Profile/DescriptionCard';
import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import CardHeader from '@app/component/Profile/CardHeader';

const ProfileDescription = ({basicDetails}) => {
  const profileDescriptionField = [
    {
      label: 'First Name',
      render: basicDetails => basicDetails?.firstName || 'NA',
    },
    {
      label: 'Last Name',
      render: basicDetails => basicDetails?.lastName || 'NA',
    },
    {
      label: 'Email',
      render: basicDetails => basicDetails?.email || 'NA',
    },
    {
      label: 'Mobile',
      render: basicDetails => basicDetails?.mobile || 'NA',
    },
    {
      label: 'Address',
      render: basicDetails => basicDetails?.address?.location,
    },
  ];
  return (
    <>
      <CardHeader
        cardHeader={'Personal Information'}
        iconName={
          !Object.values(basicDetails).every(element =>
            [null, '', undefined].includes(element),
          )
            ? 'pencil'
            : 'plus'
        }
        onIconPress={() => {
          navigationHelper.navigate({
            name: ScreenConstants.EDIT_PROFILE,
            params: {
              key: 'basicDetails',
              data: basicDetails,
              name:'Personal Information'
            },
          });
        }}
      />

      <Card style={styles.cardStyle}>
        <View paddingHorizontal={10}>
          {profileDescriptionField.map((pd, idx) => (
            <DescriptionCard
              key={`profile${idx}`}
              label={pd.label}
              value={pd.render(basicDetails)}
            />
          ))}
        </View>
      </Card>
    </>
  );
};

export default ProfileDescription;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginBottom: R.units.scale(10),
    elevation: 4,
    padding: R.units.scale(10),
  },
});
