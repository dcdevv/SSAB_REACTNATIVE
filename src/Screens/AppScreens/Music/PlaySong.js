/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box, HStack, VStack} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  setupPlayer,
  addTrack,
  plackbackService,
} from '../../../service/musicService';
import {connect} from 'react-redux';
import SkeletonLoading from '../../../components/SkeletonLoading';
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress,
  useTrackPlayerEvents,
  Event,
  Capability,
} from 'react-native-track-player';
import {FlatList} from 'react-native';
import {useRef} from 'react';
import Slider from '@react-native-community/slider';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const PlaySong = props => {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  const songSlider = useRef(null);
  // const {item, index} = props.route.params;
  const {songList} = props.getappstates;
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const [track, setTrack] = React.useState(null);
  const [songIndex, setSongIndex] = React.useState(0);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  const skeletonConfig = {
    loop: 4,
    borderShown: true,
    width: '100%',
    startColor: 'coolGray.100',
  };

  //Next Button
  const skipToNext = async () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * SCREEN_WIDTH,
    });
  };

  //Previous Button
  const skipToPrevious = async () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * SCREEN_WIDTH,
    });
  };

  //OnScroll Skip
  const skip = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  //Play Pause
  const togglePlayback = async playback => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack(songList);
    }
    setIsPlayerReady(isSetup);
  }

  React.useEffect(() => {
    setup();
    scrollx.addListener(({value}) => {
      const index = Math.round(value / SCREEN_WIDTH);
      skip(index);
      setSongIndex(index);
    });

    return () => {
      scrollx.removeAllListeners();
      TrackPlayer.pause();
    };
  }, []);

  function format(seconds) {
    let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  } 

  // React.useEffect(() => {
  //   setup();
  //   return () => {
  //     TrackPlayer.pause();
  //   };
  // }, []);

  // React.useEffect(() => {
  //   scrollx.addListener(({value}) => {
  //     const index = Math.round(value / SCREEN_WIDTH);
  //     skip(index);
  //   });

  //   return () => {
  //     scrollx.removeAllListeners();
  //   };
  // }, []);

  if (!isPlayerReady) {
    return <SkeletonLoading type={'content-screen'} config={skeletonConfig} />;
  }

  return (
    <LinearGradient colors={['#B77689', '#64313F']} style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'default'}
      />
      <Animated.FlatList
        ref={songSlider}
        data={songList}
        keyExtractor={song => song.id}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollx},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          return (
            <Animated.View style={styles.playsongContainer}>
              <View style={styles.artWorkWrapper}>
                <Image
                  source={{uri: item?.artwork?.toString()}}
                  resizeMode="cover"
                  style={styles.artWorkImage}
                />
              </View>
            </Animated.View>
          );
        }}
      />
      <View>
        <Text style={styles.title}>{songList[songIndex].title}</Text>
        <Text style={styles.artist}>{songList[songIndex].artist}</Text>
      </View>
      <View>
        <Slider
          style={styles.progressContainer}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor="#FFd369"
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#FFF"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.progressLableContainer}>
          <Text style={styles.progressLableText}>
            { format(position) }
            {/* {new Date(position * 1000).toISOString().substring(14, 5)} */}
          </Text>
          <Text style={styles.progressLableText}>
            { format(duration) }
            {/* {new Date((duration - position) * 1000).toISOString().substring(14, 5)} */}
          </Text>
        </View>
      </View>
      <View style={styles.musicControls}>
        <TouchableOpacity onPress={skipToPrevious}>
          <FeatherIcon name="skip-back" size={35} color={'#FFD369'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
          <FeatherIcon
            name={
              playbackState === State.Playing ? 'pause-circle' : 'play-circle'
            }
            size={75}
            color={'#FFD369'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <FeatherIcon name="skip-forward" size={35} color={'#FFD369'} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity>
            <FeatherIcon name="heart" size={30} color={'#777777'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FeatherIcon name="repeat" size={30} color={'#777777'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FeatherIcon name="share-2" size={30} color={'#777777'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FeatherIcon name="more-horizontal" size={30} color={'#777777'} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  getappstates: state.getappstates,
});

export default connect(mapStateToProps, null)(PlaySong);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  playsongContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingtext: {
    color: '#FFF',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  songCoverImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.45,
    borderRadius: 5,
  },
  songCoverImageContainer: {
    elevation: 6,
    borderRadius: 20,
    shadowColor: '#FFF',
    shadowOffset: {height: 10, width: 10},
  },
  title: {
    color: '#FFF',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  subTitle: {
    color: '#FFF',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    opacity: 0.8,
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
  bottomContainer: {
    borderTopColor: '#393e46',
    borderTopWidth: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
});
