/* eslint-disable prettier/prettier */
import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {setTheme} from '../Redux/actions';
import {connect} from 'react-redux';
import {styles} from './components.style';

const CommonCard = props => {
  const commonCardStyle = styles(props);
  return (
    <Pressable
      style={commonCardStyle.commonCardContainer}
      onPress={props.onPlaySong}>
      {props.children}
    </Pressable>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonCard);
