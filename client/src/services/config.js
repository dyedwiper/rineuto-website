import axios from 'axios';
import { getFromLocalStorage } from '../utils/storage';

export function setDefaultAuthHeader() {
  const token = getFromLocalStorage('rineuto-token');
  axios.defaults.headers.common['auth-token'] = token;
}
