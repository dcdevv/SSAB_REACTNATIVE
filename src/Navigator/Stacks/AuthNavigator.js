/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoradSwiper from '../../components/OnBoardingSwiper';
import AuthScreen from '../../Screens/AuthScreens';
import OtpScreen from '../../Screens/AuthScreens/OtpScreen';
import AppNavigator from './AppNavigator';
import HomeDrawer from '../Drawer/HomeDrawer';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="onboard" component={OnBoradSwiper} />
      <Stack.Screen name="auth" component={AuthScreen} />
      <Stack.Screen name="otp" component={OtpScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
