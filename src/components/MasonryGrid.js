/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import Card from './Card';
import {items} from '../data/DummyData';

const width = Dimensions.get('window').width / 2;

const MasonryGrid = props => {
  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <View>
          {props.data
            .filter((_, i) => i % 2 === 0)
            .map((item, index) => (
              <Card
                homeScreenProps={props.homeScreenProps}
                key={index}
                width={width}
                aspectratio={item.aspectratio}
                color={item.color}
                categoryId={item.categoryId}
                categoryName={item.categoryName}
                imageUrl={item.categoryImage}
                chapters={item.chapters}
                onPressEvent={props.onPressEvent}
              />
            ))}
        </View>
        <View>
          {props.data
            .filter((_, i) => i % 2 !== 0)
            .map((item, index) => (
              <Card
                homeScreenProps={props.homeScreenProps}
                key={index}
                width={width}
                aspectratio={item.aspectratio}
                color={item.color}
                categoryName={item.categoryName}
                imageUrl={item.categoryImage}
                chapters={item.chapters}
                onPressEvent={props.onPressEvent}
                categoryId={item.categoryId}
              />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MasonryGrid;
