/* eslint-disable prettier/prettier */

import {SET_THEME} from '../actions/action.type';

const initialState = {
  theme: 'LIGHT',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};
