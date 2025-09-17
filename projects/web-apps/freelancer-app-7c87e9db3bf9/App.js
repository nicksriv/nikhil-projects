import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
  LogBox
} from "react-native";

import { R } from "./src/res/";

import View from './src/component/common/View'
import MainNavigator from "./src/navigator/MainNavigator";
import { asyncStorage } from "./src/store/asyncStorage";

const App = () => {

  const toast = useSelector((state) => state.common.toast);
  const isAppInitiating = false

  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
  LogBox.ignoreAllLogs();

   useEffect(() => {
    // await asyncStorage.removeToken()
    // await asyncStorage.removeUserType()
    // await asyncStorage.removeProfileData()
    // AsyncStorage.clear();
    if (toast.open) {
      ToastAndroid.show(toast.message, toast.timeout);
    }
  }, [toast]);
  return (
    <View style={[styles.container]}>
      <SafeAreaView style={[styles.container]}>
        <StatusBar
          backgroundColor={R.colors.primary.light}
          barStyle="light-content"
        />
        {isAppInitiating ? (
          <View style={[styles.loaderRoot]}>
            <ActivityIndicator color={R.colors.primary.light} size="large" />
          </View>
        ) : (
          <MainNavigator />
        )}
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.background.paper,
  },
  loaderRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
