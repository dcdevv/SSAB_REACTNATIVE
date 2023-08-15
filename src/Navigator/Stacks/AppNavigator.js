/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../Screens/AppScreens/Home/Home';
import HomeNavigator from './HomeStack/HomeNavigator';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import colors from '../../utils/appcolorpallet';
import Video from '../../Screens/AppScreens/Video/Video';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  const {theme} = props.changestyle;
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors[theme].ACTIVETAB,
        tabBarInactiveBackgroundColor: colors[theme].INACTIVETAB,
        tabBarActiveTintColor: colors[theme].ACTIVEICON,
        tabBarInactiveTintColor: colors[theme].INACTIVEICON,
        tabBarStyle: {
          borderTopWidth: 0,
          display: 'none',
        },
      }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={Video}
        options={{
          tabBarLabel: 'Videos',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="video" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

export default connect(mapStateToProps, null)(AppNavigator);
