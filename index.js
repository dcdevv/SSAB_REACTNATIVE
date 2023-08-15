/* eslint-disable prettier/prettier */
/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {plackbackService} from './src/service/musicService';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => plackbackService);
