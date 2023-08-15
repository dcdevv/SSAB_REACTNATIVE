/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserInfo = async (key, value) => {
  try {
    //
  } catch (error) {
    throw error;
  }
};

const getUserInfo = async key => {
  let user = await AsyncStorage.getItem(key);
  return JSON.parse(user);
};

const generateRandomColor = () => {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
};

export {getUserInfo, generateRandomColor};
