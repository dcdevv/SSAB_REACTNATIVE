/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {styles} from './styles';
import {setTheme} from '../../Redux/actions';
import {Text, ScrollView, Box, Button, Flex, Divider} from 'native-base';
import colors from '../../utils/appcolorpallet';
import appfont from '../../utils/appfont';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
const {poppins_medium} = appfont.font;

const AuthScreen = props => {
  const [screen, setScreen] = useState('login');
  const authStyles = styles(props);

  return (
    <ScrollView
      style={authStyles.screenAlignment}
      showsVerticalScrollIndicator={false}>
      <Box alignItems="center" style={authStyles.buttonContainer}>
        <Flex direction="row" h="70" p="4">
          <Button
            backgroundColor={
              screen === 'login'
                ? `${colors[props.changestyle.theme].TERNARY}`
                : 'muted.200'
            }
            size="sm"
            variant={screen === 'login' ? 'solid' : 'outline'}
            onPress={() => setScreen('login')}>
            <Text
              style={{fontFamily: poppins_medium}}
              color={
                screen === 'login'
                  ? `${colors[props.changestyle.theme].PRIMARY}`
                  : `${colors[props.changestyle.theme].INACTIVETEXT}`
              }>
              LOGIN
            </Text>
          </Button>
          <Divider
            bg={`${colors[props.changestyle.theme].QUATERNARY}`}
            thickness="2"
            mx="2"
            orientation="vertical"
          />
          <Button
            backgroundColor={
              screen === 'signup'
                ? `${colors[props.changestyle.theme].TERNARY}`
                : 'muted.200'
            }
            size="sm"
            variant={screen === 'signup' ? 'solid' : 'outline'}
            onPress={() => setScreen('signup')}>
            <Text
              style={{fontFamily: poppins_medium}}
              color={
                screen === 'signup'
                  ? `${colors[props.changestyle.theme].PRIMARY}`
                  : `${colors[props.changestyle.theme].INACTIVETEXT}`
              }>
              SIGN-UP
            </Text>
          </Button>
        </Flex>
      </Box>
      {screen === 'login' && <LoginScreen navigation={props.navigation} />}
      {screen === 'signup' && <SignUpScreen navigation={props.navigation} />}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
