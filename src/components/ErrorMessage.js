/* eslint-disable prettier/prettier */
import React from 'react';
import {FormControl, Box, Text} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import appfont from '../utils/appfont';

const {poppins_semibold} = appfont.font;

const ErrorMessage = ({errorMessage, color}) => {
  return (
    <Box>
      <FormControl.ErrorMessage
        leftIcon={<FeatherIcon name="alert-circle" size={20} color={color} />}>
        <Text fontFamily={poppins_semibold} size="md" color={color}>
          {errorMessage ? errorMessage : 'Error'}
        </Text>
      </FormControl.ErrorMessage>
    </Box>
  );
};

export default ErrorMessage;
