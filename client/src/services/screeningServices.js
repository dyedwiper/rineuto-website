import axios from 'axios';

export function getScreenings() {
  return axios.get('/api/screenings');
}

export function postScreening(data, token) {
  return axios.post('/api/screenings', data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function patchScreening(id, data, token) {
  return axios.patch('/api/screenings/' + id, data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function deleteScreening(id, token) {
  return axios.delete('/api/screenings/' + id, {
    headers: {
      'auth-token': token,
    },
  });
}
