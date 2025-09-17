import React from 'react';
import {StyleSheet} from 'react-native';

import Card from '@app/component/common/Card';
import RenderForm from '@app/component/common/RenderForm';
import {R} from '@app/res/index';

const EditProfileKycDetails = ({onChange, formValue, formError}) => {
  const {adhaarNumber, panNumber} = formValue;
  const kycDetails = [
    {
      label: 'Aadhar No:',
      placeholder: 'Enter Addhar No',
      value: adhaarNumber,
      onChange: value =>
        onChange({key: 'kycDetail', name: 'adhaarNumber', value: value}),
      keyboardType: 'numeric',
      error: formError.adhaarNumber,
    },
    {
      label: 'PAN No:',
      placeholder: 'Enter PAN No',
      value: panNumber,
      onChange: value =>
        onChange({key: 'kycDetail', name: 'panNumber', value: value}),
      error: formError.panNumber,
    },
  ];
  return (
    <>
      <Card style={styles.cardStyle}>
        <RenderForm data={kycDetails} />
      </Card>
    </>
  );
};

export default EditProfileKycDetails;

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
