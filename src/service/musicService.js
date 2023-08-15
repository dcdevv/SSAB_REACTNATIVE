/* eslint-disable prettier/prettier */
import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack(playlistData) {
  // console.log('Check Playlist Data -->>', playlistData);
  await TrackPlayer.add(playlistData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

/**
 * Provide availablity to Play Pause etc.
 */

export async function plackbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}
