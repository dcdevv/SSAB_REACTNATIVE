/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {View, Text, Image, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from './components.style';
import TitleBadge from './TitleBadge';
import {setTheme} from '../Redux/actions';
import {connect} from 'react-redux';

const Card = props => {
  const cardStyles = styles(props);
  return (
    <Pressable
      style={cardStyles.card}
      onPress={() => {
        props.onPressEvent(props.categoryId, props.categoryName);
      }}>
      <Image source={{uri: props.imageUrl}} style={cardStyles.cardImage} />
      <TitleBadge position={cardStyles.absolute} bottom={cardStyles.bottom_0}>
        <Text style={cardStyles.titleText} numberOfLines={1}>
          {props.categoryName}
        </Text>
      </TitleBadge>
    </Pressable>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
