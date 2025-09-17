import React from "react";
import { StyleSheet } from "react-native";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";
import Separator from "@app/component/common/Separator";
import { Avatar } from "react-native-paper";

import config from "@app/config/local";
import { R } from "@app/res";


const DashboardHeader = ({ profileData, onProfileHeaderPress ,userType}) => {
const {profileImage, basicDetails={}} = profileData;
const {firstName="", lastName=""} = basicDetails;
  return (
    <View
      container
      touchable
      onPress={onProfileHeaderPress}
      style={styles.dashboardHeaderView}>
      <View style={styles.imageView}>
        {profileImage ? (
          <Avatar.Image
            source={
              profileImage !== null
                ? {uri: `${config.imageBaseURL}${profileImage}`}
                : R.images.tab.userProfie()
            }
            size={54}
          />
        ) : (
          <Avatar.Text label={firstName?.slice(0, 2).toUpperCase()} size={54} />
        )}
      </View>

      <Separator vertical size={12} />
      <View>
        <Text variant="subtitle2" size={16} font="semibold">
          Hello,
        </Text>
        <Text variant="body1" transform="capitalize">
          {firstName} {''}
          {lastName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    elevation: 3,
    borderRadius: R.units.scale(3),
    paddingHorizontal: R.units.scale(8),
    paddingVertical: R.units.scale(12),
  },
  imageView: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#b3b7bd',
    padding: 1,
  },
});

export default DashboardHeader;
