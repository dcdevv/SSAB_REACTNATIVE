/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const {width, height} = Dimensions.get('window');

const OnBoardingSwiper = props => {
  return (
    <Onboarding
      imageContainerStyles={styles.container}
      onDone={() => props.navigation.replace('auth')}
      onSkip={() => props.navigation.replace('auth')}
      pages={[
        {
          backgroundColor: '#F5EBE0',
          image: (
            <Image
              style={styles.imageStyles}
              resizeMode="cover"
              source={require('../assets/onboarding1.png')}
            />
          ),
        },
        {
          backgroundColor: '#F5EBE0',
          image: (
            <Image
              style={styles.imageStyles}
              resizeMode="cover"
              source={require('../assets/onboarding2.png')}
            />
          ),
        },
        {
          backgroundColor: '#F5EBE0',
          image: (
            <Image
              style={styles.imageStyles}
              resizeMode="cover"
              source={require('../assets/onboarding3.png')}
            />
          ),
        },
      ]}
    />
  );
};

export default OnBoardingSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    maxHeight: height,
    maxWidth: width,
  },
});
