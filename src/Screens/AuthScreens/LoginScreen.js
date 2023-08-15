/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Text,
} from 'native-base';
import appfont from '../../utils/appfont';
const {poppins_medium, poppins_semibold} = appfont.font;
import colors from '../../utils/appcolorpallet';
import {styles} from './styles';
import {setTheme} from '../../Redux/actions';
import {connect} from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import appmessage from '../../common/message';
import {loginUser} from '../../api';
import AlertPopup from '../../components/AlertPopup';

const {mobileValidation} = appmessage.messages;

const LoginScreen = props => {
  const [enterMobileNumber, setEnterMobileNumber] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const authStyles = styles(props);

  const signinUser = async () => {
    if (enterMobileNumber.length < 10) {
      setValidationError(true);
      setTimeout(() => {
        setValidationError(false);
      }, 3000);
      return;
    }
    setLoading(true);
    await loginUser({
      mobile: enterMobileNumber,
    })
      .then(res => {
        setLoading(false);
        if (res.data.status == 200) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setEnterMobileNumber('');
            props.navigation.navigate('otp');
          }, 2000);
        } else {
          setErrorMessage(res.data.message);
          setError(true);
          setTimeout(() => {
            setError(false);
            setEnterMobileNumber('');
          }, 2000);
        }
        // props.navigation.navigate('otp');
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
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
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isInvalid={validationError}>
            <FormControl.Label isRequired>
              <Text style={{fontFamily: poppins_medium}}>
                Please enter mobile number
              </Text>
            </FormControl.Label>
            <Input
              style={authStyles.inputField}
              maxLength={10}
              value={enterMobileNumber}
              onChangeText={text => setEnterMobileNumber(text)}
              keyboardAppearance={'dark'}
              keyboardType={'number-pad'}
            />
            <ErrorMessage
              errorMessage={mobileValidation}
              color={colors[props.changestyle.theme].ERROR}
            />
          </FormControl>
          <FormControl>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: `${colors[props.changestyle.theme].QUATERNARY}`,
              }}
              alignSelf="flex-end"
              mt="1">
              <Text style={{fontFamily: poppins_medium}}>Forget Password?</Text>
            </Link>
          </FormControl>
          <Button
            mt="2"
            minHeight={'12'}
            backgroundColor={colors[props.changestyle.theme].TERNARY}
            opacity={enterMobileNumber.length !== 10 ? '70' : '100'}
            onPress={signinUser}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={`${colors[props.changestyle.theme].PRIMARY}`}
              />
            ) : (
              <Text style={authStyles.textStyle}>Sign in</Text>
            )}
          </Button>
        </VStack>

        {success && (
          <AlertPopup
            message={`OTP send successfully on ${enterMobileNumber}`}
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
