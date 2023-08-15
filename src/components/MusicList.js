/* eslint-disable prettier/prettier */
import {View, Pressable, Image} from 'react-native';
import React from 'react';
import {setTheme} from '../Redux/actions';
import {connect} from 'react-redux';
import {styles} from './components.style';
import {Center, HStack, Text, VStack} from 'native-base';
import appfont from '../utils/appfont';

// borderWidth="1"
const {poppins_medium} = appfont.font;

const MusicList = props => {
  const musicListStyles = styles(props);
  const {
    categoryId,

    chapterName,
    subCategoryImage,
    subCategoryName,
    subCategoryId,
  } = props.item;
  return (
    <Pressable
      key={props.key}
      onPress={() => {
        props.onPressEvent({
          categoryId: categoryId,
          categoryName: chapterName,
          subCategoryId: subCategoryId,
          subCategoryImage: subCategoryImage,
          subCategoryName: subCategoryName,
        });
      }}>
      <Center w={'100%'} marginY="2">
        <HStack
          w="90%"
          maxW="400"
          space={4}
          rounded="md"
          _dark={{
            borderColor: 'coolGray.300',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
          style={musicListStyles.musicListCard}
          p="4">
          <HStack
            alignItems={'center'}
            flex="3"
            space="3"
            style={
              {
                // alignItems: 'center',
              }
            }>
            <Image
              source={{
                uri: subCategoryImage,
              }}
              style={musicListStyles.musicListCardImage}
            />
            <VStack space="2">
              <Text style={musicListStyles.musicListCardText}>
                {subCategoryName}
              </Text>
              <Text style={musicListStyles.musicListCardSubText}>
                {props?.categoryName}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Center>
    </Pressable>
  );
};

const mapStateToProps = state => ({
  changestyle: state.changestyles,
});

const mapDispatchToProps = {
  appmode: theme => setTheme(theme),
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
