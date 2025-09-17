import React from 'react';
import {StyleSheet} from 'react-native';
import {R} from '@app/res';

import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import Image from '@app/component/common/Image';
import Separator from '@app/component/common/Separator';
import Button from '@app/component/form/Button';

import {ScreenConstants} from '@app/navigator/ScreenConstants';

export default class UserSelectionContainer extends React.Component {
  handleUserType = name => {
    this.props.navigation.reset({
      index: 0,
      routes: [{name: ScreenConstants.LOGIN, params: {name}}],
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Separator size={20} />
        <View style={styles.logoView}>
          <Image
            source={R.images.tab.logo()}
            backgroundColor={'transparent'}
            width={200}
          />
        </View>
        <Separator size={30} />
        <View>
          <View alignItems="center">
            <Text variant="subtitle2" font="medium">
              Identify Yourself?
            </Text>
          </View>
          <Separator size={20} />

          <Button
            onPress={() => this.handleUserType('freelancer')}
            text="Freelancer"
            size="md"
            variant="contained"
          />
          <Separator size={20} />
          <Button
            onPress={() => this.handleUserType('vendor-user')}
            text="Company User"
            size="md"
            variant="contained"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.background.paper,
    flex: 1,
    paddingHorizontal: R.units.scale(20),
    justifyContent: 'center',
  },
  logoView: {
    alignItems: 'center',
  },
});
