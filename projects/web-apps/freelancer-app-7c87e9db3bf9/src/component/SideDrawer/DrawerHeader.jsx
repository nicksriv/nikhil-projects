import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {navigationHelper} from '../../helper/navigation';
import {ScreenConstants} from '../../navigator/ScreenConstants';
import {R} from '../../res';
import Text from '../common/Text';
import Seperator from '../common/Separator';
import View from '../common/View';
import config from '../../config/local';
import SideBar from './SideBar';

const DrawerHeader = props => {
  const {
    isVendor = false,
    profileData: {
      profileCompletionPercentage = 0,
      profileImage = '',
      basicDetails = {},
    },
  } = props;
  const {firstName = '', lastName = ''} = basicDetails;
  return (
    <>
      <View
        marginVertical={R.units.scale(8)}
        touchable={!isVendor}
        onPress={() =>
          isVendor
            ? null
            : navigationHelper.navigate({
                name: ScreenConstants.PROFILE,
              })
        }>
        <View alignItems="center" paddingVertical={8} justifyContent="center">
          <View style={styles.imageView}>
            {profileImage ? (
              <Avatar.Image
                source={
                  profileImage !== null
                    ? {uri: `${config.imageBaseURL}${profileImage}`}
                    : R.images.tab.userProfie()
                }
                size={100}
              />
            ) : (
              <Avatar.Text
                label={firstName?.slice(0, 2).toUpperCase()}
                size={100}
              />
            )}
          </View>

          <Seperator />
          <Text style={styles.userName}>
            {firstName} {lastName}
          </Text>
        </View>
        {isVendor ? null : <SideBar percentage={profileCompletionPercentage} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  imageView: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#b3b7bd',
    padding: 1,
  },
});

export default DrawerHeader;
