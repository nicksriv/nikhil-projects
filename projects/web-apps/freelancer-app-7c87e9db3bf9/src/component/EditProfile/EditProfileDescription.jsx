import React from 'react';
import {StyleSheet} from 'react-native';

import Card from '@app/component/common/Card';
import RenderForm from '@app/component/common/RenderForm';
import {R} from '@app/res/index';

const EditProfileDescription = ({
  onChange,
  componentData,
  onSubmit,
  formValue,
  formError,
}) => {
  const {firstName, lastName, email, mobile, address} = formValue;
  const profileDescription = [
    {
      label: 'First Name:',
      placeholder: 'Enter Your Name',
      value: firstName,
      onChange: value =>
        onChange({key: 'basicDetails', name: 'firstName', value: value}),
      error: formError.firstName,
    },
    {
      label: 'Last Name:',
      placeholder: 'Enter Your Last Name',
      value: lastName,
      onChange: value =>
        onChange({key: 'basicDetails', name: 'lastName', value: value}),
      error: formError.lastName,
    },
    {
      label: 'Email:',
      underlineColor: 'red',
      placeholder: 'Enter Your Email',
      value: email,
      onChange: value =>
        onChange({key: 'basicDetails', name: 'email', value: value}),
      error: formError.email,
      disabled: true,
    },
    {
      label: 'Mobile:',
      underlineColor: 'red',
      placeholder: 'Enter Your Mobile',
      value: mobile,
      onChange: value =>
        onChange({key: 'basicDetails', name: 'mobile', value: value}),
      keyboardType: 'numeric',
      error: formError.mobile,
      disabled: true,
    },
    {
      label: 'Address',
      placeholder: 'Address',
      value: address?.location,
      onChange: value =>
        onChange({key: 'address', name: 'location', value: value}),
      multiline: true,
      numberOfLines: 3,
    },
    {
      label: 'Pincode',
      placeholder: 'Pincode:',
      value: address?.pinCode,
      onChange: value =>
        onChange({key: 'address', name: 'pinCode', value: value}),
      keyboardType: 'numeric',
    },
  ];
  return (
    <>
      <Card style={styles.cardStyle}>
        <RenderForm data={profileDescription} />
      </Card>
    </>
  );
};

export default EditProfileDescription;

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
