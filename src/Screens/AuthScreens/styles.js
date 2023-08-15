/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/appcolorpallet';
import appfont from '../../utils/appfont';

const {width, height} = Dimensions.get('screen');
const {poppins, gtw} = appfont.font;

export const styles = ({changestyle}) => {
  const {theme} = changestyle;
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors[theme].PRIMARY,
    },
    innerContainer: {
      width: width * 0.9,
      alignSelf: 'center',
    },
    screenAlignment: {
      width: width * 0.8,
      alignSelf: 'center',
      height: height,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 40,
    },
    activeButton: {
      backgroundColor: colors[theme].TERNARY,
      borderRadius: 5,
      color: colors[theme].ACTIVETEXT,
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
      elevation: 12,
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.4,
      shadowRadius: 2,
      width: width * 0.25,
    },
    inactiveButton: {
      backgroundColor: colors[theme].SECONDARY,
      borderRadius: 5,
      color: colors[theme].INACTIVETEXT,
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
      shadowColor: colors[theme].SHADOW,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 2,
      fontSize: 20,
      width: width * 0.25,
    },
    activeText: {
      color: colors[theme].ACTIVETEXT,
      fontSize: 16,
      fontWeight: '600',
    },
    inactiveText: {
      color: colors[theme].INACTIVETEXT,
      fontSize: 16,
      fontWeight: '600',
    },
    phoneInput: {
      borderColor: colors[theme].INPUTBORDER,
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    focusInput: {
      elevation: 6,
      shadowColor: colors[theme].SHADOW,
      backgroundColor: colors[theme].PRIMARY,
      color: colors[theme].INACTIVETEXT,
    },
    blurInput: {
      elevation: 0,
      shadowColor: colors[theme].SHADOW,
      backgroundColor: colors[theme].PRIMARY,
      color: colors[theme].INACTIVETEXT,
    },
    blockButton: {
      width: '100%',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: colors[theme].TERNARY,
      alignItems: 'center',
    },
    otpInput: {
      // backgroundColor: colors[theme].SECONDARY,
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
    },
    verifyAccountContainer: {
      height: height * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    submitOtpButton: {
      width: width * 0.8,
      alignSelf: 'center',
      marginBottom: 20,
    },
    inputField: {
      fontSize: 18,
      letterSpacing: 1.5,
      fontFamily: poppins,
    },
    textStyle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: poppins,
      color: colors[theme].PRIMARY,
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });
};
