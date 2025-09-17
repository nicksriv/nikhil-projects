import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {R} from '../../res';

const Icon = {
  Ionicons,
  AntDesign,
};

let IconButtonStyles;
const RenderView = p => {
  if (p.onPress) {
    return <TouchableNativeFeedback {...p} />;
  }
  return <>{p.children}</>;
};
const IconButton = props => {
  const {
    name,
    type = 'MaterialIcons',
    backgroundColor = 'transparent',
    color = R.colors.primary.main,
    size = 'sm',
    customSize,
    scale = 8,
    shape = '',
    children,

    // styles
    wrapperStyles,
    iconStyles,
    ...restProps
  } = props;

  const sizes = {xxs: 10, xs: 16, sm: 24, md: 32, lg: 48};

  let borderRadius;
  switch (shape) {
    case 'square':
      borderRadius = 0;
      break;

    case 'rounded':
      borderRadius = R.units.scale(4);
      break;

    case 'circle':
    default:
      borderRadius = R.units.scale(sizes[size] + 8);
      break;
  }

  let btnSize = R.units.scale(sizes[size]);
  if (customSize) {
    btnSize = R.units.scale(customSize);
    if (shape === 'circle') {
      borderRadius = R.units.scale(customSize) + scale;
    }
  }

  IconButtonStyles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0,
      backgroundColor,
      height: btnSize + scale,
      width: btnSize + scale,
      borderRadius,
    },
    icon: {
      fontSize: btnSize,
      color,
    },
  });
  // @ts-ignore
  const ChildrenComponent = Icon[type];

  return (
    <RenderView {...restProps}>
      <View style={{...IconButtonStyles.wrapper, ...wrapperStyles}}>
        {children ? (
          children
        ) : (
          <ChildrenComponent
            name={name}
            style={{...IconButtonStyles.icon, ...iconStyles}}
          />
        )}
      </View>
    </RenderView>
  );
};

export {IconButtonStyles};

export default IconButton;
