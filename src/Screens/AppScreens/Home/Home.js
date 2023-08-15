/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {setTheme} from '../../../Redux/actions';
import {connect} from 'react-redux';
import {styles} from './styles';
import MasonryGrid from '../../../components/MasonryGrid';
import {createStackNavigator} from '@react-navigation/stack';
import AppHeader from '../../../components/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCategories} from '../../../api';
import GridSkeleton from '../../../components/GridSkeleton';

const Stack = createStackNavigator();

const Home = props => {
  const homeStyles = styles(props);
  let minimum = 150;
  let maximum = 450;
  let difference = maximum - minimum;
  let minimum2 = 250;
  let maximum2 = 550;
  let difference2 = maximum2 - minimum2;
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategory = async () => {
    setLoading(true);
    await getCategories()
      .then(res => {
        console.log('Get Category Response', res);
        setLoading(false);
        if (res.status == 200) {
          let dataStringify = JSON.stringify(res);
          let response = JSON.parse(dataStringify);
          setCategoryList(
            response.result.category_list.map((item, index) => {
              item.aspectratio = Math.floor(Math.random() * (2.5 - 1) + 1);
              // item.aspectratio = 1;
              return item;
            }),
          );
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const onSelectCategory = (id, categoryname) => {
    props.navigation.navigate('Chapters', {
      id: id,
      categoryName: categoryname,
    });
  };

  useEffect(() => {
    console.log('Home.js');
    fetchCategory();
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      {loading ? (
        <GridSkeleton />
      ) : (
        <>
          <AppHeader navigationProps={props.navigation} />
          <MasonryGrid
            homeScreenProps={props}
            data={categoryList}
            onPressEvent={onSelectCategory}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
