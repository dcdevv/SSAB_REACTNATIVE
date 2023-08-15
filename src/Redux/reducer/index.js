/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import appreducer from './appreducer';
import stylereducer from './stylereducer';

export default combineReducers({
  changestyles: stylereducer,
  getappstates: appreducer,
});
