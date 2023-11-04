import axios from 'axios';

export function postNewsletterContact(data) {
  return axios.post('/api/newsletter', data, {});
}
