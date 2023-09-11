import axios from 'axios';
import { setToLocalStorage } from '../utils/storage';
import { setDefaultAuthHeader } from './config';

export function postLoginUser(data) {
  return axios.post('/api/users/login', data).then((res) => {
    setToLocalStorage('rineuto-token', res.headers.get('auth-token'));
    setDefaultAuthHeader();
    return res;
  });
}

export function authenticateUser() {
  return axios.get('/api/users/authenticate');
}
