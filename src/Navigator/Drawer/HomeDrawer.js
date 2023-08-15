/* eslint-disable prettier/prettier */
import * as React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AppNavigator from '../Stacks/AppNavigator';
import Profile from '../../Screens/AppScreens/Profile/Profile';
import {setTheme} from '../../Redux/actions';
import {connect} from 'react-redux';
import colors from '../../utils/appcolorpallet';
import {Switch, View} from 'react-native';
import {Avatar, Heading, Text, IconButton} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {styles} from './style';
import appfont from '../../utils/appfont';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {poppins_medium, gtw} = appfont.font;

const Drawer = createDrawerNavigator();

const HomeDrawer = props => {
  const drawerStyles = styles(props);
  const {theme} = props.changestyle;

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => {
    props.appmode(isEnabled ? 'LIGHT' : 'DARK');
    setIsEnabled(previousState => !previousState);
  };

  const customScreenOptions = {
    headerShown: false,

    drawerActiveTintColor: colors[theme].ACTIVEICON,
    drawerInactiveTintColor: colors[theme].INACTIVEICON,
    drawerStyle: {
      backgroundColor: colors[theme].PRIMARY,
    },
  };

  // const logoutApp = async () => {
  //   await AsyncStorage.removeItem('@IsUserLogin');
  //   props.navigation.navigate('auth');
  // };

  const renderDrawerItem = props => {
    return (
      <>
        <DrawerContentScrollView {...props}>
          <View style={drawerStyles.topContainer}>
            <View style={drawerStyles.titleContainer}>
              <View style={drawerStyles.avatarContainer}>
                <Avatar
                  margin={'2.5'}
                  source={{
                    uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-Transparent-Image.png',
                  }}
                  size="md"
                />
                <FeatherIcon
                  style={drawerStyles.themeSwicherIcon}
                  name={theme === 'DARK' ? 'sun' : 'moon'}
                  onPress={toggleSwitch}
                  color={colors[theme].ACTIVETEXT}
                  size={25}
                />
              </View>
              <View style={drawerStyles.titleInnerContainer}>
                <Heading
                  margin={'1.5'}
                  fontFamily={gtw}
                  size="lg"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  color={colors[theme].ACTIVETEXT}
                  fontWeight="medium">
                  Welcome,
                </Heading>
                <Text
                  margin={'1.5'}
                  letterSpacing="2xl"
                  fontFamily={gtw}
                  color={colors[theme].ACTIVETEXT}>
                  {' '}
                  Ketan Mandlik
                </Text>
              </View>
            </View>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={drawerStyles.logoutContainer}>
          <DrawerItem
            label="Logout"
            onPress={() => {
              // logoutApp();
            }}
            icon={({color, size}) => (
              <FeatherIcon name="log-out" color={color} size={size} />
            )}
          />

          <Text>Logout</Text>
        </View>
      </>
    );
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="App"
      drawerContent={renderDrawerItem}
      screenOptions={customScreenOptions}>
      <Drawer.Screen
        name="App"
        component={AppNavigator}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDrawer);
