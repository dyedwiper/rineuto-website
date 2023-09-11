import { setToLocalStorage } from '../utils/storage';
import axios from 'axios';

export function postLoginUser(data) {
  return axios.post('/api/users/login', data, {}).then((res) => {
    setToLocalStorage('rineuto-token', res.headers.get('auth-token'));
    return res;
  });
}

export function authenticateUser(token) {
  return axios.get('/api/users/authenticate', {
    headers: { 'auth-token': token },
  });
}
