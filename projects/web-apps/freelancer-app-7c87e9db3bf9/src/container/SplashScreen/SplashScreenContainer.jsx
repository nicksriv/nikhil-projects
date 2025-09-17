import React from "react";
import { R } from "@app/res";

import Image from "@app/component/common/Image";
import View from "@app/component/common/View";

import { navigationHelper } from "@app/helper/navigation";
import { ScreenConstants } from "@app/navigator/ScreenConstants";

import { asyncStorage } from "@app/store/asyncStorage";
import Geolocation from 'react-native-geolocation-service';

class SplashScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const token = await asyncStorage.getToken();
    if (token) {
      this.props.setAuthenticationAction();
    } else {
      navigationHelper.navigate({ name: ScreenConstants.USER_SELECTION_SCREEN });
    }
    this.getGeoLocationPermission();



  }

  getGeoLocationPermission = async () => {
    Geolocation.getCurrentPosition(
     async (position) => {
      await asyncStorage.setLocation({
      long: position.coords.longitude,
      lat: position.coords.latitude,
    });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message,'location error');
      }
      // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );

  };

  render() {
    return (
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        alignVertical="center"
      >
        <Image width={200} source={R.images.tab.logo()} />
      </View>
    );
  }
}

export default SplashScreenContainer;
