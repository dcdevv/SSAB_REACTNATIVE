/* eslint-disable prettier/prettier */
import {View, Text, Dimensions, Switch} from 'react-native';
import React, {useState} from 'react';
import {styles} from './components.style';
import {setTheme} from '../Redux/actions';
import {connect} from 'react-redux';
import {Box, HStack, IconButton} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../utils/appcolorpallet';

const {width, height} = Dimensions.get('window');

const AppHeader = props => {
  const {changestyle, appmode} = props;
  const HeaderStyles = styles(props);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    appmode(isEnabled ? 'LIGHT' : 'DARK');
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View>
      <Box safeAreaTop bg={colors[changestyle.theme].HEADER} />
      <HStack
        bg={colors[changestyle.theme].HEADER}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w={width}
        maxW={width}>
        <HStack alignItems="center">
          <IconButton
            onPress={() => props.navigationProps.openDrawer()}
            icon={
              <FeatherIcon
                size={20}
                name="align-justify"
                color={colors[changestyle.theme].INACTIVEICON}
              />
            }
          />
        </HStack>
        {/* <HStack>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={toggleSwitch}
          />
          <IconButton
            icon={<FeatherIcon name="more-vertical" size={20} color="white" />}
          />
        </HStack> */}
      </HStack>
    </View>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
