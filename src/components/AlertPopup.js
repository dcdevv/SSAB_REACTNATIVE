/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {Alert, HStack, VStack} from 'native-base';

const AlertPopup = ({status, message, variant}) => {
  return (
    <Alert w="100%" status={status} variant={variant} marginY={'8'}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {message}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertPopup;
