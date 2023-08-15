/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../../Screens/AppScreens/Home/Home';
import Chapters from '../../../Screens/AppScreens/Home/Chapters';
import Content from '../../../Screens/AppScreens/Home/Content';
// import MusicPlayer from '../../../Screens/AppScreens/Music/MusicPlayer';
import PlaySong from '../../../Screens/AppScreens/Music/PlaySong';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chapters" component={Chapters} />
      <Stack.Screen name="Content" component={Content} />
      {/* <Stack.Screen name="music" component={MusicPlayer} /> */}
      <Stack.Screen name="music" component={PlaySong} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
