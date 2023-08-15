/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import appfont from '../utils/appfont';
import colors from '../utils/appcolorpallet';

const {poppins_medium, gtw, poppins_semibold} = appfont.font;
const {width, height} = Dimensions.get('window');

export const styles = props => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[props?.changestyle?.theme]?.PRIMARY,
    },
    absolute: {
      position: 'absolute',
    },
    bottom_0: {
      bottom: 0,
    },
    card: {
      width: props.width * 0.95,
      height: props.width * props.aspectratio + 10,
      borderRadius: 10,
      position: 'relative',
      margin: 5,
      elevation: 6,
      shadowColor: colors[props?.changestyle?.theme]?.SHADOW,
    },
    cardImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 10,
    },
    titleBadgeContainer: {
      backgroundColor: '#23293D',
      zIndex: 50,
      width: '100%',
      padding: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      height: 45,
      justifyContent: 'center',
    },
    titleText: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 15,
      fontFamily: gtw,
    },
    musicListCard: {
      borderWidth: 0.5,
      backgroundColor: colors[props?.changestyle?.theme]?.MUSICCARDBG,
      elevation: 6,
      shadowColor: colors[props?.changestyle?.theme]?.SHADOW,
    },
    musicListCardImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      alignSelf: 'center',
    },
    musicListCardText: {
      fontFamily: poppins_semibold,
      letterSpacing: 0.4,
      fontSize: 18,
      color: colors[props?.changestyle?.theme]?.TEXT,
    },
    musicListCardSubText: {
      fontFamily: poppins_medium,
      letterSpacing: 0.2,
      fontSize: 14,
      color: colors[props?.changestyle?.theme]?.GRAYTEXT,
    },
    commonCardContainer: {
      width: width * 0.9,
      backgroundColor: colors[props?.changestyle?.theme]?.PRIMARY,
      elevation: 4,
      shadowColor: colors[props?.changestyle?.theme]?.SHADOW,
      // marginVertical: 8,
      padding: 10,
      // borderRadius: 10,
    },
    iconBackground: {
      width: 40,
      height: 40,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    songListContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    songListText: {
      fontFamily: poppins_semibold,
      letterSpacing: 0.2,
      fontSize: 16,
      color: colors[props?.changestyle?.theme]?.TEXT,
      marginHorizontal: 10,
    },
    songListSubText: {
      fontFamily: poppins_medium,
      letterSpacing: 0.2,
      marginHorizontal: 10,
      fontSize: 12,
      color: colors[props?.changestyle?.theme]?.GRAYTEXT,
    },
  });
};
