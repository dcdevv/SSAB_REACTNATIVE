/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  setSongsList,
  setTheme,
  setExtractMusicList,
} from '../../../Redux/actions';
import {styles} from './styles';
import {Box, Button, Fab, Heading} from 'native-base';
import {getContent} from '../../../api';
import SkeletonLoading from '../../../components/SkeletonLoading';
import AppHeader from '../../../components/AppHeader';
import appfont from '../../../utils/appfont';
import SongList from '../../../components/SongList';
import Feather from 'react-native-vector-icons/Feather';
import RoundButton from '../../../components/RoundButton';
import colors from '../../../utils/appcolorpallet';

const {poppins_medium, poppins_regular} = appfont.font;

const Content = props => {
  const {setMusicPlayerList} = props;
  console.log('Check setMusicPlayerList-->>', setMusicPlayerList);
  const {theme} = props.changestyle;
  const contentStyle = styles(props);
  const {
    categoryId,
    categoryName,
    subCategoryId,
    subCategoryImage,
    subCategoryName,
  } = props.route.params.data;
  const [loading, setLoading] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [extractMusicList, setExtractMusicList] = useState([]);

  const getContentList = async () => {
    setLoading(true);
    await getContent({
      categoryId: categoryId,
      subCategoryId: subCategoryId,
    })
      .then(res => {
        setLoading(false);
        if (res.status == 200) {
          let dataStringify = JSON.stringify(res);
          let response = JSON.parse(dataStringify);
          let musicContent = response.result.content_list.map((item, index) => {
            return {
              id: item?.contentId,
              title: item?.title,
              artist: item?.subTitle,
              album: response?.result?.subCategoryName,
              artwork: item?.contentImage,
              url: item?.nameOnDisk,
            };
          });

          setMusicPlayerList(musicContent);
          setContentList(response.result.content_list);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const onPlaySong = (item, index) => {
    // addsonglisttoplayer();
    props.navigation.navigate('music', {
      item: {
        id: item?.contentId,
        title: item?.title,
        artist: item?.subTitle,
        album: 'Album Name',
        artwork: item?.contentImage,
        url: item?.nameOnDisk,
      },
      index: index,
    });
  };

  useEffect(() => {
    getContentList();
  }, []);

  return (
    <View style={contentStyle.container}>
      <AppHeader navigationProps={props.navigation} />
      {/* <Button
        onPress={getContentList}
        variant="ghost"
        backgroundColor={'violet.200'}>
        <Text>Get Content</Text>
      </Button> */}
      {loading ? (
        <SkeletonLoading type={'content-screen'} />
      ) : (
        <View style={contentStyle.contentContainer}>
          <View style={contentStyle.contentCoverImageContainer}>
            <Image
              source={{uri: subCategoryImage}}
              style={contentStyle.contentCoverImage}
              resizeMode="cover"
            />
            <View style={contentStyle.overlay} />
            { contentList.length ? <TouchableOpacity style={contentStyle.roundButton}>
              <Feather name="play" size={25} color={colors[theme].ACTIVEICON} />
            </TouchableOpacity> : null }
          </View>
          <View style={contentStyle.titleContainer}>
            <Text numberOfLines={1} style={contentStyle.contentTitle}>
              {categoryName}
            </Text>
            <Text numberOfLines={1} style={contentStyle.contentSubTitle}>
              {subCategoryName}
            </Text>
          </View>

          {
            contentList.length ? <FlatList
              style={{marginBottom: 10, height: '50%'}}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={contentList}
              renderItem={({item, index}) => {
                return (
                  <SongList
                    item={item}
                    onPlaySong={() => onPlaySong(item, index)}
                  />
                );
              }
            }/> : <Text style={contentStyle.emptyListStyle}>No Data found</Text>
          }
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
  setMusicPlayerList: songlist => setSongsList(songlist),
  setExtractMusicPlayerList: musicList => setExtractMusicList(musicList),
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
