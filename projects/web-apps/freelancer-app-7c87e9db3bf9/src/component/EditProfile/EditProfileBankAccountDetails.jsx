import React from 'react';
import {StyleSheet} from 'react-native';

import Card from '@app/component/common/Card';
import RenderForm from '@app/component/common/RenderForm';
import {R} from '@app/res/index';

const EditProfileBankAccountDetails = ({onChange, formValue, formError}) => {
  const {bankName, accountHolderName, accountNumber, ifscCode, branch} =
    formValue;
  const bankAccountDetails = [
    {
      label: 'Bank Name:',
      placeholder: 'Enter Bank Name',
      value: bankName,
      onChange: value =>
        onChange({key: 'bankDetail', name: 'bankName', value: value}),
      error: formError.bankName,
    },
    {
      label: 'Account Holder Name:',
      placeholder: 'Enter Account Holder Name',
      value: accountHolderName,
      onChange: value =>
        onChange({key: 'bankDetail', name: 'accountHolderName', value: value}),
      error: formError.accountHolderName,
    },
    {
      label: 'Account Number:',
      placeholder: 'Enter Account Number',
      value: accountNumber,
      onChange: value =>
        onChange({key: 'bankDetail', name: 'accountNumber', value: value}),

      keyboardType: 'numeric',
      error: formError.accountNumber,
    },
    {
      label: 'IFSC Code:',
      placeholder: 'Enter IFSC Code',
      value: ifscCode,
      onChange: value =>
        onChange({key: 'bankDetail', name: 'ifscCode', value: value}),
      error: formError.ifscCode,
    },
    {
      label: 'Branch Address:',
      placeholder: 'Address',
      value: branch,
      onChange: value =>
        onChange({key: 'bankDetail', name: 'branch', value: value}),
      multiline: true,
      numberOfLines: 3,
      error: formError.branch,
    },
  ];
  return (
    <>
      <Card style={styles.cardStyle}>
        <RenderForm data={bankAccountDetails} />
      </Card>
    </>
  );
};

export default EditProfileBankAccountDetails;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(15),
    elevation: 4,
    padding: R.units.scale(10),
    justifyContent: 'center',
  },
});
