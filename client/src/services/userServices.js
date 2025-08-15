import { setToLocalStorage } from '../utils/storage';
import { makeApiCall } from './baseService';
import { setDefaultAuthHeader } from './config';

export function postLoginUser(data) {
  return makeApiCall('/api/users/login', 'POST', data).then((res) => {
    setToLocalStorage('rineuto-token', res.headers.get('auth-token'));
    setDefaultAuthHeader();
    return res;
  });
}

export function authenticateUser() {
  return makeApiCall('/api/users/authenticate');
}
