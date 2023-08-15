/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
} from 'native-base';
import appfont from '../../utils/appfont';
import colors from '../../utils/appcolorpallet';
import {setTheme} from '../../Redux/actions';
import {connect} from 'react-redux';
import {EmailValidator, MobileValidator} from '../../common/regex';
import ErrorMessage from '../../components/ErrorMessage';
import appmessage from '../../common/message';
import {styles} from './styles';
import {registerUser} from '../../api';

const {poppins_medium, poppins_semibold} = appfont.font;
const {
  firstnameValidation,
  lastnameValidation,
  emailValidation,
  mobileValidation,
} = appmessage.messages;

const SignUpScreen = props => {
  const authStyles = styles(props);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    email: '',
  });

  const {firstname, lastname, mobile, email} = userDetails;

  const [error, setError] = useState({
    firstnameError: false,
    lastnameError: false,
    mobileError: false,
    emailError: false,
  });

  const {firstnameError, lastnameError, emailError, mobileError} = error;

  const signupUser = async () => {
    if (firstname === '') {
      setError({...error, firstnameError: true});
      setTimeout(() => {
        setError({...error, firstnameError: false});
      }, 3000);
      return;
    }
    if (lastname === '') {
      setError({...error, lastnameError: true});
      setTimeout(() => {
        setError({...error, lastnameError: false});
      }, 3000);
      return;
    }
    let isMobileValid = MobileValidator(mobile);
    if (!isMobileValid || mobile.length < 10) {
      setError({...error, mobileError: true});
      setTimeout(() => {
        setError({...error, mobileError: false});
      }, 3000);
      return;
    }

    let isEmailValid = EmailValidator(email);
    if (!isEmailValid) {
      setError({...error, emailError: true});
      setTimeout(() => {
        setError({...error, emailError: false});
      }, 3000);
      return;
    }
    await registerUser({
      email: email,
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
    })
      .then(res => {})
      .catch(error => {});
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          fontFamily={poppins_semibold}
          size="lg"
          fontWeight="700"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          fontFamily={poppins_medium}
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={1} mt="5">
          <FormControl isInvalid={firstnameError}>
            <FormControl.Label isRequired>
              <Text style={{fontFamily: poppins_medium}}>First Name</Text>
            </FormControl.Label>
            <Input
              style={authStyles.inputField}
              type="text"
              value={firstname}
              onChangeText={text =>
                setUserDetails({...userDetails, firstname: text})
              }
            />
            <ErrorMessage
              errorMessage={firstnameValidation}
              color={colors[props.changestyle.theme].ERROR}
            />
          </FormControl>
          <FormControl isInvalid={lastnameError}>
            <FormControl.Label>
              <Text style={{fontFamily: poppins_medium}}>Last Name</Text>
            </FormControl.Label>
            <Input
              style={authStyles.inputField}
              type="text"
              value={lastname}
              onChangeText={text =>
                setUserDetails({...userDetails, lastname: text})
              }
            />
            <ErrorMessage
              errorMessage={lastnameValidation}
              color={colors[props.changestyle.theme].ERROR}
            />
          </FormControl>
          <FormControl isInvalid={mobileError}>
            <FormControl.Label isRequired>
              <Text style={{fontFamily: poppins_medium}}>Mobile</Text>
            </FormControl.Label>
            <Input
              maxLength={10}
              style={authStyles.inputField}
              type="text"
              keyboardType="number-pad"
              value={mobile}
              onChangeText={text =>
                setUserDetails({...userDetails, mobile: text})
              }
            />
            <ErrorMessage
              errorMessage={mobileValidation}
              color={colors[props.changestyle.theme].ERROR}
            />
          </FormControl>
          <FormControl isInvalid={emailError}>
            <FormControl.Label isRequired>
              <Text style={{fontFamily: poppins_medium}}>Email</Text>
            </FormControl.Label>
            <Input
              style={authStyles.inputField}
              type="text"
              keyboardType="email-address"
              value={email}
              onChangeText={text =>
                setUserDetails({...userDetails, email: text})
              }
            />
            <ErrorMessage
              errorMessage={emailValidation}
              color={colors[props.changestyle.theme].ERROR}
            />
          </FormControl>
          <Button
            minHeight={'12'}
            opacity={
              firstname !== '' &&
              lastname !== '' &&
              mobile !== '' &&
              email !== ''
                ? '100'
                : '70'
            }
            onPress={signupUser}
            mt="2"
            backgroundColor={colors[props.changestyle.theme].TERNARY}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={`${colors[props.changestyle.theme].PRIMARY}`}
              />
            ) : (
              <Text style={authStyles.textStyle}>Sign up</Text>
            )}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
