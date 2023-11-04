import axios from 'axios';

export function getQuotes() {
  return axios.get('/api/quotes');
}
