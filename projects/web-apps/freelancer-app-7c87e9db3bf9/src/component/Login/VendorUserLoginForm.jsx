import React from 'react';
import {StyleSheet} from 'react-native';
import {R} from '@app/res';

import Separator from '@app/component/common/Separator';
import Text from '@app/component/common/Text';
import Button from '@app/component/form/Button';
import Card from '@app/component/common/Card';
import TextInput from '@app/component/common/TextInput';

const VendorUserLoginForm = props => {
  const {onContinue, onChange, formData, formError, isLoading} = props;
  return (
    <Card style={styles.cardStyle}>
      <Text variant="subtitle1" font="semibold">
        Welcome Back,
      </Text>
      <Text>Sign in to continue</Text>
      <Separator size={10} />
      <TextInput
        placeholder="User Name"
        onChange={value => onChange('userName', value)}
        error={formError.userName}
        value={formData.userName}
      />
      <TextInput
        placeholder="Password"
        onChange={value => onChange('password', value)}
        error={formError.password}
        value={formData.password}
      />
      <Separator size={10} />
      <Button
        isLoading={isLoading}
        onPress={onContinue}
        text="Continue"
        size="md"
        variant="contained"
        disabled={isLoading ? true : false}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingBottom: R.units.scale(12),
  },
});

export default VendorUserLoginForm;
