/* eslint-disable prettier/prettier */
import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {setTheme} from '../Redux/actions';
import {connect} from 'react-redux';
import {styles} from './components.style';
import {Skeleton} from 'native-base';

const width = Dimensions.get('window').width / 2;

export const items = [
  {
    id: 1,
    aspectratio: 150 / 200,
  },
  {
    id: 2,
    aspectratio: 1,
  },
  {
    id: 3,
    aspectratio: 120 / 100,
  },
  {
    id: 4,
    aspectratio: 200 / 150,
  },
  {
    id: 5,
    aspectratio: 375 / 400,
  },
  {
    id: 6,
    aspectratio: 500 / 400,
  },
  {
    id: 7,
    aspectratio: 1040 / 500,
  },
  {
    id: 8,
    aspectratio: 2 / 1,
  },
  {
    id: 9,
    aspectratio: 1,
  },
  {
    id: 10,
    aspectratio: 375 / 400,
  },
  {
    id: 11,
    aspectratio: 1,
  },
];

const GridSkeleton = props => {
  const gridStyles = styles(props);
  return (
    <View style={gridStyles.container}>
      <View style={{flexDirection: 'row'}}>
        <View>
          {items
            .filter((_, i) => i % 2 === 0)
            .map((item, index) => (
              <Skeleton
                startColor="blueGray.100"
                key={index}
                height={width * item.aspectratio + 10}
                width={width * 0.9}
                rounded={'md'}
                margin="2"
              />
            ))}
        </View>
        <View>
          {items
            .filter((_, i) => i % 2 !== 0)
            .map((item, index) => (
              <Skeleton
                startColor="blueGray.100"
                key={index}
                height={width * item.aspectratio + 10}
                width={width * 0.95}
                rounded={'md'}
                margin="2"
              />
            ))}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(GridSkeleton);
