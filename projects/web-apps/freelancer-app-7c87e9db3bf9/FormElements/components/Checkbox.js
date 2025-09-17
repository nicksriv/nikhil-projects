/**
 * @format
 */
import React from 'react';
import { Text, View } from 'react-native';
import { Checkbox as CB, useTheme } from 'react-native-paper';

const Checkbox = (props): JSX.Element => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        // height: 30,
        marginRight: 35,
        margin: 10,
      }}>
      <CB.Android
        color={colors?.primary}
        status={props?.status ? 'checked' : 'unchecked'}
        onPress={() => props.toggleStatus(!props?.status)}
      />
      <Text style={{ marginLeft: 10 }}>{props?.label}</Text>
    </View>
  );
};
export default Checkbox;
