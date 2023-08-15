/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './components.style';
import {BlurView} from 'expo-blur';

const TitleBadge = props => {
  const titleBadgeStyle = styles(props);

  return (
    <BlurView
      intensity={100}
      tint="dark"
      style={[
        titleBadgeStyle.titleBadgeContainer,
        props.position,
        props.bottom,
      ]}>
      {props.children}
    </BlurView>
  );
};

export default TitleBadge;
