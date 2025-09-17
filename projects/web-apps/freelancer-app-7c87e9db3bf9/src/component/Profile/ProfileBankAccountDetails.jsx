import React from 'react';
import {StyleSheet} from 'react-native';
import View from '@app/component/common/View';
import {R} from '../../res';
import Card from '@app/component/common/Card';
import DescriptionCard from '@app/component/Profile/DescriptionCard';
import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import CardHeader from '@app/component/Profile/CardHeader';

const ProfileBankAccountDetails = ({bankDetail}) => {
  const bankDetailDescriptionField = [
    {
      label: 'Bank Name',
      render: bankDetail => bankDetail?.bankName || 'NA',
    },
    {
      label: 'Account Holder Name',
      render: bankDetail => bankDetail?.accountHolderName || 'NA',
    },
    {
      label: 'Account Number',
      render: bankDetail => bankDetail?.accountNumber || 'NA',
    },
    {
      label: 'IFSC Code',
      render: bankDetail => bankDetail?.ifscCode || 'NA',
    },
    {
      label: 'Branch Name',
      render: bankDetail => bankDetail?.branch || 'NA',
    },
  ];
  return (
    <>
      <CardHeader
        cardHeader={'Bank Details'}
        iconName={
          !Object.values(bankDetail).every(element =>
            [null, '', undefined].includes(element),
          )
            ? 'pencil'
            : 'plus'
        }
        onIconPress={() => {
          navigationHelper.navigate({
            name: ScreenConstants.EDIT_PROFILE,
            params: {
              key: 'bankDetail',
              data: bankDetail,
              name:'Bank Details'
            },
          });
        }}
      />
      <Card style={styles.cardStyle}>
        <View paddingHorizontal={10}>
          {bankDetailDescriptionField?.map((bk, idx) => (
            <DescriptionCard
              key={`bank${idx}`}
              label={bk.label}
              value={bk.render(bankDetail)}
            />
          ))}
        </View>
      </Card>
    </>
  );
};

export default ProfileBankAccountDetails;
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginBottom: R.units.scale(10),
    elevation: 4,
    padding: R.units.scale(10),
  },
});
