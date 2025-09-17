import React from 'react';
import TextInput from '@app/component/common/TextInput';
import View from './View';
import Text from './Text';
import {R} from '@app/res/index';
import {StyleSheet} from 'react-native';

const RenderForm = ({data = []}) => {
  return (
    <View>
      {data.map((item, idx) => {
        return (
          <>
            <Text style={styles.labelText}>{item.label}</Text>
            <TextInput
              key={`textfield_${idx}`}
              placeholder={item.placeholder}
              value={item.value}
              onChange={e => item.onChange(e)}
              disabled={item.disabled}
              keyboardType={item.keyboardType}
              multiline={item.multiline}
              numberOfLines={item.numberOfLines}
              {...item}
            />
          </>
        );
      })}
    </View>
  );
};

export default RenderForm;

const styles = StyleSheet.create({
  labelText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    fontWeight: '500',
    marginHorizontal: R.units.scale(6),
  },
});
