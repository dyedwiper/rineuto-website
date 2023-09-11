import axios from 'axios';

export function getSerials() {
  return axios.get('/api/serials');
}

export function postSerial(data, token) {
  return axios.post('/api/serials', data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function patchSerial(id, data, token) {
  return axios.patch('/api/serials/' + id, data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function deleteSerial(id, token) {
  return axios.delete('/api/serials/' + id, {
    headers: {
      'auth-token': token,
    },
  });
}
