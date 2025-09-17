import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ScreenConstants} from './ScreenConstants';
import {navigationHelper} from '@app/helper/navigation';
import {useSelector} from 'react-redux';

import LoginScreen from '@app/screen/LoginScreen';
import NotificationScreen from '@app/screen/NotificationScreen';
import DrawerNavigator from './DrawerNavigator';
import JobDescriptionScreen from '@app/screen/JobDescriptionScreen';
import ProfileScreen from '@app/screen/ProfileScreen';
import SignupScreen from '@app/screen/SignupScreen';
import RaiseDisputeFormScreen from '@app/screen/RaiseDisputeFormScreen';
import EditProfileScreen from '@app/screen/EditProfileScreen';
import FilterScreen from '@app/screen/FilterScreen';
import SubModuleListScreen from '@app/screen/SubModuleListScreen';
import EditModuleScreen from '@app/screen/EditModuleScreen';
import AddModuleScreen from '@app/screen/AddModuleScreen';
import SplashScreen from '@app/screen/SplashScreen';
import MyJobDescriptionScreen from '@app/screen/MyJobDescriptionScreen';
import MyWorkDetailScreen from '@app/screen/MyWorkDetailScreen';
import RaiseDisputeDescriptionScreen from '@app/screen/RaiseDisputeDescriptionScreen';
import ModuleDetailScreen from '@app/screen/ModuleDetailScreen';
import ScreenBuilderScreen from '@app/screen/ScreenBuilderScreen';
import UserSelectionScreen from '@app/screen/UserSelectionScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <NavigationContainer ref={navigationHelper.setTopLevelNavigator}>
      <Stack.Navigator
        initialRouteName={ScreenConstants.SPLASH_SCREEN}
        screenOptions={{
          headerTitleAlign: Platform.OS === 'android' ? 'left' : 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#F2F5FF',
            elevation: 5,
          },
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name={ScreenConstants.SPLASH_SCREEN}
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenConstants.USER_SELECTION_SCREEN}
              component={UserSelectionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenConstants.SIGNUP}
              component={SignupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenConstants.LOGIN}
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={ScreenConstants.DRAWER_NAVIGATOR}
              component={DrawerNavigator}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name={ScreenConstants.JOB_DESCRIPTION}
              component={JobDescriptionScreen}
            />
            <Stack.Screen
              name={ScreenConstants.MY_JOB_DESCRIPTION}
              component={MyJobDescriptionScreen}
            />
            <Stack.Group screenOptions={{headerTitleAlign: 'left'}}>
              <Stack.Screen
                name={ScreenConstants.PROFILE}
                component={ProfileScreen}
              />
              <Stack.Screen
                name={ScreenConstants.EDIT_PROFILE}
                component={EditProfileScreen}
                options={(route) => ({ title: route.route.params.name })}
              />
              <Stack.Screen
                name={ScreenConstants.RAISED_DISPUTE_DESCRIPTION}
                component={RaiseDisputeDescriptionScreen}
              />
              <Stack.Screen
                name={ScreenConstants.RAISE_DISPUTE_FORM}
                component={RaiseDisputeFormScreen}
              />
              <Stack.Screen
                name={ScreenConstants.NOTIFICATION_LIST}
                component={NotificationScreen}
              />
              <Stack.Screen
                name={ScreenConstants.FILTER}
                component={FilterScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={ScreenConstants.WORK_DETAIL}
                component={MyWorkDetailScreen}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name={ScreenConstants.SUB_MODULE_LIST}
                component={SubModuleListScreen}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name={ScreenConstants.MODULE_DETAIL}
                component={ModuleDetailScreen}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name={ScreenConstants.SCREEN_BUILDER}
                component={ScreenBuilderScreen}
                options={{headerShown: true, title: ''}}
              />
              <Stack.Screen
                name={ScreenConstants.EDIT_MODULE}
                component={EditModuleScreen}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name={ScreenConstants.ADD_MODULE}
                component={AddModuleScreen}
                options={{headerShown: true}}
              />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
