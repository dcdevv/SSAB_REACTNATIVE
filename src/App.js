/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {StyleSheet, StatusBar, View, Image} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';
import {NativeBaseProvider} from 'native-base';

import AppNavigation from './Navigator';
import MusicLogoLoader from './MusicLoader';
import MusicPlayer from './Screens/AppScreens/Music/MusicPlayer';

const App = () => {
  const [splash, setSplash] = React.useState(true);

  const SplashScreen = () => {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/logo.jpg')} style={styles.logo} />
      </View>
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      setSplash(!splash);
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar barStyle={'default'} />
        {splash ? (
          <SplashScreen />
        ) : (
          <>
            {/* <MusicPlayer /> */}
            <AppNavigation />
          </>
        )}
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F78812',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
