/* eslint-disable prettier/prettier */
import {SET_SONGLIST} from '../actions/action.type';

const initialState = {
  songList: [],
  extractMusicPlayerList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SONGLIST:
      return {
        ...state,
        songList: action.payload,
      };

    default:
      return state;
  }
};
