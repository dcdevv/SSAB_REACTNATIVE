/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
import React, {useState, useEffect, useRef} from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {songs} from '../model/data';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const {width, height} = Dimensions.get('window');

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add(songs);
};

const togglePlayback = async playbackstate => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackstate == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const renderSongs = ({index, item}) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.artWorkWrapper}>
          <Image
            style={styles.artWorkImage}
            source={{
              uri: item.image,
            }}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <View style={styles.progressLableContainer}>
            <Text style={styles.progressLableText}>
              {new Date(progress.position * 1000)
                .toISOString()
                .substring(14, 5)}
            </Text>
            <Text style={styles.progressLableText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substring(14, 5)}
            </Text>
          </View>
        </View>
        <View style={styles.musicControls}>
          <TouchableOpacity>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={'#FFD369'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Ionicons
              name={
                playbackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color={'#FFD369'}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={'#FFD369'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={30} color={'#777777'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={30} color={'#777777'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={30} color={'#777777'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={30} color={'#777777'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    borderTopColor: '#393e46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    marginVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  artWorkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    elevation: 6,
    shadowColor: '#CCCC',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    alignSelf: 'center',
  },
  artWorkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#eee',
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#eee',
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
  progressLableText: {
    color: '#FFFF',
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
});

{
  /**
<HStack
                marginTop={'4'}
                marginBottom={'4'}
                justifyContent={'space-between'}>
                <VStack>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.subTitle}>{item?.artist}</Text>
                </VStack>
                <VStack margin={1}>
                  <FeatherIcon name="heart" color={'#FFF'} size={25} />
                </VStack>
              </HStack>
              <Box marginLeft={2} marginRight={2}>
                <Slider
                  colorScheme={'yellow'}
                  w={SCREEN_WIDTH}
                  // defaultValue={70}
                  minValue={0}
                  maxValue={duration}
                  step={1}>
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </Box>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text style={styles.subTitle}>
                  {new Date(position * 1000).toISOString().substring(15, 19)}
                </Text>
                <Text style={styles.subTitle}>
                  {new Date((duration - position) * 1000)
                    .toISOString()
                    .substring(15, 19)}
                </Text>
              </HStack>
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                height={SCREEN_HEIGHT * 0.2}>
                <FeatherIcon name="shuffle" color={'#FFF'} size={25} />
                <Pressable onPress={skipToPrevious}>
                  <FeatherIcon name="skip-back" color={'#FFF'} size={25} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    togglePlayback(playBackState);
                  }}>
                  <FeatherIcon
                    name={
                      playBackState === State.Playing
                        ? 'pause-circle'
                        : 'play-circle'
                    }
                    color={'#FFF'}
                    size={60}
                  />
                </Pressable>
                <Pressable onPress={skipToNext}>
                  <FeatherIcon name="skip-forward" color={'#FFF'} size={25} />
                </Pressable>
                <FeatherIcon name="repeat" color={'#FFF'} size={25} />
              </HStack>
*/
}
