/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';
import colors from '../../utils/appcolorpallet';

export const styles = props => {
  const {theme} = props.changestyle;
  return StyleSheet.create({
    topContainer: {
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors[theme].DRAWERTOPCONTAINER,
      height: 200,
    },
    titleContainer: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    titleInnerContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 10,
    },
    avatarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10,
    },
    themeSwicherIcon: {
      backgroundColor: colors[theme].THEMESWITCHERBACKGROUND,
      borderRadius: 50,
      padding: 5,
    },
    logoutContainer: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
