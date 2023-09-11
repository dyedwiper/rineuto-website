import axios from 'axios';

export function getNotices() {
  return axios.get('/api/notices');
}

export function postNotice(data) {
  return axios.post('/api/notices', data);
}

export function patchNotice(id, data) {
  return axios.patch('/api/notices/' + id, data);
}

export function deleteNotice(id) {
  return axios.delete('/api/notices/' + id);
}
