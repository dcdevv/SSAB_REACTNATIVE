/* eslint-disable prettier/prettier */
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Pressable,
  Text,
} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '../../../components/BottomSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {HStack, VStack} from 'native-base';
import {setTheme} from '../../../Redux/actions';
import {connect} from 'react-redux';
import {styles} from './styles';
import colors from '../../../utils/appcolorpallet';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const MusicPlayer = props => {
  const {route, changestyle} = props;
  const songDetails = route.params;
  const musicPlayerStyles = styles(props);

  const ref = React.useRef(null);
  const onPress = React.useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={musicPlayerStyles.container}>
        <StatusBar style="light" />
        <TouchableOpacity style={musicPlayerStyles.button} onPress={onPress} />
        <BottomSheet ref={ref}>
          <View style={musicPlayerStyles.bottomSheetContainer}>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              px={1}
              py={6}>
              <HStack>
                <FeatherIcon
                  name="arrow-left"
                  color={colors[changestyle.theme].ACTIVEICON}
                  size={25}
                  style={{marginHorizontal: 10}}
                />
              </HStack>
              <HStack>
                <FeatherIcon
                  name="shuffle"
                  color={colors[changestyle.theme].ACTIVEICON}
                  size={25}
                  style={{marginHorizontal: 10}}
                />
                <FeatherIcon
                  name="heart"
                  color={colors[changestyle.theme].ACTIVEICON}
                  size={25}
                  style={{marginHorizontal: 10}}
                />
                <FeatherIcon
                  name="more-vertical"
                  color={colors[changestyle.theme].ACTIVEICON}
                  size={25}
                  style={{marginHorizontal: 10}}
                />
              </HStack>
            </HStack>
            <VStack
              height={SCREEN_HEIGHT * 0.5}
              justifyContent={'center'}
              alignItems={'center'}>
              <View style={musicPlayerStyles.songCoverImageContainer}>
                <Image
                  source={{uri: songDetails?.contentImage}}
                  style={musicPlayerStyles.songCoverImage}
                  resizeMode="cover"
                />
              </View>
            </VStack>
            <VStack
              height={SCREEN_HEIGHT * 0.3}
              justifyContent={'center'}
              alignItems={'center'}>
              <HStack
                width={SCREEN_WIDTH * 0.8}
                justifyContent={'center'}
                alignItems={'center'}>
                <VStack space={4} margin={'10'}>
                  <Text>TITLE</Text>
                  <Text>TITLE</Text>
                </VStack>
              </HStack>
              <HStack
                justifyContent={'space-around'}
                alignItems={'center'}
                width={SCREEN_WIDTH * 0.8}>
                <Pressable>
                  <FeatherIcon name="skip-back" size={30} color={'tomato'} />
                </Pressable>
                <Pressable style={musicPlayerStyles.playButton}>
                  <FeatherIcon name="play-circle" size={30} color={'#FFF'} />
                </Pressable>
                <Pressable>
                  <FeatherIcon name="skip-forward" size={30} color={'tomato'} />
                </Pressable>
              </HStack>
            </VStack>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
