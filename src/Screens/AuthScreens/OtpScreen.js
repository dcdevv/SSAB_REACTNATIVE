/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  Center,
  Box,
  Heading,
  HStack,
  VStack,
  Input,
  ScrollView,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import {setTheme} from '../../Redux/actions';
import {connect} from 'react-redux';
import colors from '../../utils/appcolorpallet';
import {verifyOtp} from '../../api';
import AlertPopup from '../../components/AlertPopup';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.4;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;

const OtpScreen = props => {
  const authStyles = styles(props);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputs = Array(4).fill(0);
  let otpTextInput = [];
  let otp = [];

  function focusNext(value, index) {
    if (index < otpTextInput.length - 1 && value) {
      otp.push(value);
      otpTextInput[index + 1].focus();
    }
    if (index === otpTextInput.length - 1) {
      // otp.pop();
      otpTextInput[index].blur();
    }
    // otp[index] = value;
  }

  function focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0) {
      otpTextInput[index - 1].focus();
    }
  }

  const saveUserInfo = async () => {
    try {
      const IsUserLogin = await AsyncStorage.getItem('@IsUserLogin');
      if (IsUserLogin === null) {
        await AsyncStorage.setItem('@IsUserLogin', JSON.stringify('loggedIn'));
      }
    } catch (err) {
      'Error in saveUserInfo', err;
    }
  };

  const validateUser = async () => {
    setLoading(true);
    await verifyOtp({
      mobile: 8793368935,
      otp: 1234,
    })
      .then(res => {
        setLoading(false);
        if (res.data.status == 200) {
          saveUserInfo();
          setSuccessMessage(res.data.message);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            props.navigation.navigate('App');
          }, 3000);
        } else {
          saveUserInfo();
          setErrorMessage(res.data.message);
          setError(true);
          setTimeout(() => {
            setError(false);
            props.navigation.navigate('App');
          }, 3000);
        }
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage(error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={authStyles.container}>
      <ScrollView>
        <View style={authStyles.verifyAccountContainer}>
          <Heading>Verify Account</Heading>
          <Image
            source={require('../../assets/otpverify.png')}
            style={{
              width: ITEM_WIDTH * 1.4,
              height: ITEM_HEIGHT,
              resizeMode: 'cover',
            }}
          />
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            We sent OTP to your register mobile number
          </Heading>
        </View>
        <View style={authStyles.otpInputContainer}>
          {inputs.map((item, index) => {
            return (
              <Input
                w="16"
                h="16"
                rounded={'md'}
                key={'_otp' + index}
                style={authStyles.otpInput}
                ref={ref => (otpTextInput[index] = ref)}
                onChangeText={value => focusNext(value, index)}
                onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
                maxLength={1}
                keyboardType="numeric"
              />
            );
          })}
        </View>
        <Button
          style={authStyles.submitOtpButton}
          size={'lg'}
          mt="2"
          backgroundColor={colors[props.changestyle.theme].TERNARY}
          onPress={validateUser}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={`${colors[props.changestyle.theme].PRIMARY}`}
            />
          ) : (
            <Text style={authStyles.textStyle}>Verify</Text>
          )}
        </Button>
        {success && (
          <AlertPopup
            message={successMessage}
            status={'success'}
            variant={'solid'}
          />
        )}
        {error && (
          <AlertPopup
            message={errorMessage}
            status={'error'}
            variant={'solid'}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};
export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
