import axios from 'axios';

export function getNotices() {
  return axios.get('/api/notices');
}

export function postNotice(data, token) {
  return axios.post('/api/notices', data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function patchNotice(id, data, token) {
  return axios.patch('/api/notices/' + id, data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function deleteNotice(id, token) {
  return axios.delete('/api/notices/' + id, {
    headers: {
      'auth-token': token,
    },
  });
}
