/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';

const RoundButton = props => {
  const {icon, title, style} = props;
  return (
    <View style={style}>
      {icon}
      <Text>{title}</Text>
    </View>
  );
};

export default RoundButton;
