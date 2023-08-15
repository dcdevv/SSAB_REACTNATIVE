/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {Center, HStack, Skeleton, VStack} from 'native-base';

const SkeletonLoading = props => {
  const {type, config} = props;
  const loopArray = new Array(config?.loop).fill('empty');
  switch (type) {
    case 'card-vertical':
      return (
        <>
          {loopArray.map((item, index) => (
            <Center w={config.width} key={item + index} marginY="2">
              <HStack
                w="90%"
                maxW="400"
                borderWidth="1"
                space={8}
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.500',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}
                p="4">
                <Skeleton
                  flex="1"
                  h="90"
                  rounded="full"
                  startColor="coolGray.100"
                />
                <VStack flex="3" space="4">
                  <Skeleton startColor={config.startColor} />
                  <Skeleton.Text />
                </VStack>
              </HStack>
            </Center>
          ))}
        </>
      );

    case 'card-details':
      return (
        <Center w="100%">
          <HStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            rounded="md"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}
            p="4">
            <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
            <VStack flex="3" space="4">
              <Skeleton startColor="amber.300" />
              <Skeleton.Text />
              <HStack space="2" alignItems="center">
                <Skeleton size="5" rounded="full" />
                <Skeleton h="3" flex="2" rounded="full" />
                <Skeleton
                  h="3"
                  flex="1"
                  rounded="full"
                  startColor="indigo.300"
                />
              </HStack>
            </VStack>
          </HStack>
        </Center>
      );

    case 'content-screen':
      return (
        <Center w="100%" mt={'4'}>
          <VStack
            w="90%"
            maxW="400"
            // borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}>
            <Skeleton h="64" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" my="1.5" rounded="md" />
            <Skeleton px="4" my="1.5" rounded="md" />
            <Skeleton px="4" my="1.5" rounded="md" />
          </VStack>
        </Center>
      );

    default:
      return (
        <View>
          <Text>No Anime</Text>
        </View>
      );
  }
};

export default SkeletonLoading;
