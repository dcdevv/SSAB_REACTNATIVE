/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {View, Text} from 'react-native';
import React from 'react';
import {setTheme} from '../Redux/actions';
import {connect} from 'react-redux';
import CommonCard from './CommonCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {generateRandomColor} from '../common/function';
import {styles} from './components.style';

const SongList = props => {
  const {item, onPlaySong} = props;
  const songListStyle = styles(props);
  let iconColor = generateRandomColor();
  return (
    <CommonCard onPlaySong={onPlaySong}>
      <View style={songListStyle.songListContainer}>
        <View
          style={{
            ...songListStyle.iconBackground,
            backgroundColor: `${iconColor}20`,
          }}>
          <Ionicons name="musical-note" size={22} color={iconColor} />
        </View>
        <View>
          <Text style={songListStyle.songListText}>{item.title}</Text>
          <Text style={songListStyle.songListSubText}>{item.subTitle}</Text>
        </View>
      </View>
    </CommonCard>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
