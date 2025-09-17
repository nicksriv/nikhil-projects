import React,{useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import DashboardScreen from '../screen/DashboardScreen';
import SearchJobScreen from '../screen/SearchJobScreen';
import AskUsScreen from '../screen/AskUsScreen';
import FaqScreen from '../screen/FaqScreen';
import ReportScreen from '../screen/ReportScreen';
import RaiseDisputeScreen from '../screen/RaiseDisputeScreen';
import MyWorkScreen from '../screen/MyWorkScreen';
import MyEarningsScreen from '../screen/MyEarningsScreen';

import CustomDrawer from './CustomDrawer';

import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from '../component/common/Icon';

import {R} from '../res';

import View from '../component/common/View';
import RIcon from 'react-native-vector-icons/Ionicons';
import {navigationHelper} from '../helper/navigation';
import {ScreenConstants} from './ScreenConstants';
import MyJobScreen from '../screen/MyJobScreen';
import {asyncStorage} from '@app/store/asyncStorage';

const Drawer = createDrawerNavigator();

const HeaderRightComponent = props => {
  return (
    <View flexDirection="row" alignItems="center">
      {!props.disabledNotification && (
        <View
          paddingHorizontal={10}
          paddingVertical={10}
          touchable
          onPress={() => {
            navigationHelper.navigate({
              name: ScreenConstants.NOTIFICATION_LIST,
            });
          }}>
          <RIcon name="ios-notifications-outline" size={26} color="#000" />
        </View>
      )}
    </View>
  );
};

const DrawerNavigator = () => {
  const [isVendor, setIsVendor] = React.useState(false);
  const {profileData,isLoading} = useSelector((state=>state.profile))

  const getUserType = async () => {
    try {
      const userType = await asyncStorage.getUserType();
      if (userType === 'vendor-user') setIsVendor(true);
    } catch (error) {
      console.log(error,'at drawernav')
    }
  };
  
  useEffect(() => {
    getUserType();
  }, []);
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Dashboard"
      drawerContent={props => (
        <CustomDrawer
          isVendor={isVendor}
          profileData={profileData}
          isLoading={isLoading}
          {...props}
        />
      )}
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: -15,
        },
        headerStyle: {
          backgroundColor: '#F2F5FF',
          elevation: 5,
        },
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          hidden: true,
          drawerIcon: () => (
            <Icon
              source={R.images.sideDrawIcons.dashboard()}
              size="xs"
              color={R.colors.text.secondary}
            />
          ),
          headerRight: () => <HeaderRightComponent />,
        }}
      />

      {isVendor ? null : (
        <Drawer.Screen
          name="Search jobs"
          component={SearchJobScreen}
          options={{
            drawerIcon: () => (
              <SearchIcon color="#0008" name="search" size={25} />
            ),
            headerRight: () => <HeaderRightComponent />,
          }}
        />
      )}

      {isVendor ? null : (
        <Drawer.Screen
          name="Applied jobs"
          component={MyJobScreen}
          options={{
            drawerIcon: () => (
              <Icon source={R.images.sideDrawIcons.job()} size="xs" />
            ),
            headerRight: () => <HeaderRightComponent />,
          }}
        />
      )}
      {isVendor ? null : (
        <Drawer.Screen
          name="My earnings"
          component={MyEarningsScreen}
          options={{
            drawerIcon: () => (
              <Icon source={R.images.sideDrawIcons.rupee()} size="xs" />
            ),
            headerRight: () => <HeaderRightComponent />,
          }}
        />
      )}

      <Drawer.Screen
        name="My work"
        component={MyWorkScreen}
        options={{
          drawerIcon: () => (
            <Icon source={R.images.sideDrawIcons.job()} size="xs" />
          ),
          headerRight: () => <HeaderRightComponent />,
        }}
      />
      {isVendor ? null : (
        <Drawer.Screen
          name="Report"
          component={ReportScreen}
          options={{
            drawerIcon: () => (
              <Icon source={R.images.sideDrawIcons.report()} size="xs" />
            ),
            headerRight: () => <HeaderRightComponent />,
          }}
        />
      )}

      <Drawer.Screen
        name="FAQ's"
        component={FaqScreen}
        options={{
          drawerIcon: () => (
            <Icon source={R.images.sideDrawIcons.faq()} size="xs" />
          ),
          headerRight: () => <HeaderRightComponent />,
        }}
      />
      {isVendor ? null : (
        <Drawer.Screen
          name="Raise dispute"
          component={RaiseDisputeScreen}
          options={{
            drawerIcon: () => (
              <Icon source={R.images.sideDrawIcons.dispute()} size="xs" />
            ),
            headerRight: () => <HeaderRightComponent />,
          }}
        />
      )}
      {isVendor ? null : (
        <Drawer.Screen
          name="Ask us"
          component={AskUsScreen}
          options={{
            drawerIcon: () => (
              <Icon source={R.images.sideDrawIcons.question()} size="xs" />
            ),
            headerRight: () => <HeaderRightComponent />,
          }}
        />
      )}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};

export default DrawerNavigator;
