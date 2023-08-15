/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */

import {View, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Center, Text, HStack, VStack, Button} from 'native-base';
import {setTheme} from '../../../Redux/actions';
import {connect} from 'react-redux';
import {styles} from './styles';
import MusicList from '../../../components/MusicList';
import AppHeader from '../../../components/AppHeader';
import {getSubCategories} from '../../../api';
import SkeletonLoading from '../../../components/SkeletonLoading';

const Chapters = props => {
  const {id, categoryName} = props.route.params;
  const chapterStyles = styles(props);
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);

  const skeletonConfig = {
    loop: 4,
    borderShown: true,
    width: '100%',
    startColor: 'coolGray.100',
  };

  const getChapters = async () => {
    setLoading(true);
    await getSubCategories(id)
      .then(res => {
        setLoading(false);
        if (res.status == 200) {
          let dataStringify = JSON.stringify(res);
          let response = JSON.parse(dataStringify);
          setChapters(response.result.sub_category_list);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const onSelectChapter = data => {
    data.categoryName = categoryName;
    props.navigation.navigate('Content', {
      data: data,
    });
  };

  useEffect(() => {
    if (id) {
      getChapters();
    }
  }, []);

  return (
    <View style={chapterStyles.container}>
      <AppHeader navigationProps={props.navigation} />
      {/* <Button
        onPress={getChapters}
        variant="ghost"
        backgroundColor={'violet.200'}>
        <Text>Get Chapters</Text>
      </Button> */}
      {loading && (
        <SkeletonLoading type={'card-vertical'} config={skeletonConfig} />
      )}

      {
        chapters.length ? <FlatList
          data={chapters}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <MusicList
                key={index}
                item={item}
                onPressEvent={onSelectChapter}
                categoryName={categoryName}
              />
            );
          }}
        /> : !loading ? <Text style={chapterStyles.emptyListStyle}>No Data Found</Text> : null
      }
    </View>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapters);
