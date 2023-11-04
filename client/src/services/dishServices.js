import axios from 'axios';

export function getDishes() {
  return axios.get('/api/dishes');
}

export function postDish(data) {
  return axios.post('/api/dishes', data);
}

export function deleteDish(id) {
  return axios.delete('/api/dishes/' + id);
}
