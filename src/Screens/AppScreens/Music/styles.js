/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import appfont from '../../../utils/appfont';
import colors from '../../../utils/appcolorpallet';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const {poppins_medium, poppins_regular} = appfont.font;

export const styles = ({changestyle}) => {
  const {theme} = changestyle;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 80,
      height: 40,
      borderRadius: 5,
      backgroundColor: '#D9BD24',
    },
    bottomSheetContainer: {
      flex: 1,
      backgroundColor: colors[theme].PRIMARY,
    },
    songCoverImageContainer: {
      elevation: 6,
      borderRadius: 20,
      shadowColor: colors[theme].SHADOW,
      shadowOffset: {height: 10, width: 10},
    },
    songCoverImage: {
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_HEIGHT * 0.5,
      borderRadius: 20,
    },
    playButton: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: colors[theme].TERNARY,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
