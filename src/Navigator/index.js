/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './Stacks/AuthNavigator';
import HomeDrawer from './Drawer/HomeDrawer';
import {getUserInfo} from '../common/function';
import AppNavigator from './Stacks/AppNavigator';
import GridSkeleton from '../components/GridSkeleton';

const Index = () => {
  const [IsUserLogin, setIsUserLogin] = useState('');
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const details = await getUserInfo('@IsUserLogin');
    setIsUserLogin(details);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      {!loading && IsUserLogin === 'loggedIn' ? (
        <HomeDrawer />
      ) : !loading ? (
        <AuthNavigator />
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default Index;
