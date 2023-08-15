/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../utils/appcolorpallet';
import appfont from '../../../utils/appfont';

const {width, height} = Dimensions.get('window');
const {poppins_medium, poppins_regular} = appfont.font;

export const styles = ({changestyle}) => {
  const {theme} = changestyle;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].PRIMARY,
    },
    contentContainer: {
      width: width * 0.9,
      alignSelf: 'center',
    },
    contentCoverImageContainer: {
      height: height * 0.3,
    },
    overlay: {
      borderRadius: 5,
      backgroundColor: 'rgba(0,0,0,0.2)',
      height: height * 0.3,
    },
    contentCoverImage: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 5,
    },
    titleContainer: {
      marginVertical: 10,
    },
    contentTitle: {
      color: colors[theme].TEXT,
      fontFamily: poppins_medium,
      letterSpacing: 0.2,
      fontSize: 18,
    },
    contentSubTitle: {
      color: colors[theme].TEXT,
      fontFamily: poppins_regular,
      fontSize: 12,
    },
    roundButton: {
      width: width * 0.12,
      height: width * 0.12,
      borderRadius: 50,
      backgroundColor: colors[theme].ACTIVETAB,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      right: 15,
      bottom: -25,
      elevation: 6,
      shadowColor: colors[theme].SHADOW,
    },
    emptyListStyle: {
      fontFamily: poppins_regular,
      color: colors[theme].TEXT,
      padding: 10,
      fontSize: 18,
      textAlign: 'center',
    },
  });
};
