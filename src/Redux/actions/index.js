/* eslint-disable prettier/prettier */
import {SET_LANGUAGE, SET_SONGLIST, SET_THEME} from './action.type';

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = language => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setSongsList = songlist => ({
  type: SET_SONGLIST,
  payload: songlist,
});
export const setExtractMusicList = songlist => ({
  type: SET_SONGLIST,
  payload: songlist,
});
