import axios from 'axios';

export function getDishes() {
  return axios.get('/api/dishes');
}

export function postDish(data, token) {
  return axios.post('/api/dishes', data, {
    headers: {
      'auth-token': token,
    },
  });
}

export function deleteDish(id, token) {
  return axios.delete('/api/dishes/' + id, {
    headers: {
      'auth-token': token,
    },
  });
}
