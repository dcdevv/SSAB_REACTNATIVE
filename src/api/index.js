/* eslint-disable prettier/prettier */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appconfig from '../utils/config';
import apiconstants from './apiconstants';
import config from '../utils/config';
const {root_url} = appconfig.config;

const api = async (method, url, data) => {
  const token = await AsyncStorage.getItem('Token');
  let config = {
    token: '123456',
  };
  return axios({
    method: method,
    url: url,
    headers: config,
    data: data,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

const apiWithoutToken = async (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

const registerUser = async data => {
  return await apiWithoutToken(
    'post',
    `${root_url}${apiconstants.API.signup_user}`,
    data,
  )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

const loginUser = async data => {
  return await apiWithoutToken(
    'post',
    `${root_url}${apiconstants.API.singin_user}`,
    data,
  )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

const verifyOtp = async data => {
  return await apiWithoutToken(
    'post',
    `${root_url}${apiconstants.API.verify_otp}`,
    data,
  )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

const getCategories = async () => {
  return await api('get', `${root_url}${apiconstants.API.getCategories}`)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

const getSubCategories = async id => {
  return await api(
    'get',
    `${root_url}${apiconstants.API.getSubCategories}/${id}`,
  )
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

const getContent = async data => {
  const {categoryId, subCategoryId} = data;
  return await api(
    'get',
    `${root_url}${apiconstants.API.getContent}/${categoryId}/${subCategoryId}`,
  )
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

export {
  registerUser,
  loginUser,
  verifyOtp,
  getCategories,
  getSubCategories,
  getContent,
};
