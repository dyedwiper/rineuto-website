import axios from 'axios';

export function getSerials() {
  return axios.get('/api/serials');
}

export function getSerial(id) {
  return axios.get('/api/serials/id/' + id);
}

export function getSerialYears() {
  return axios.get('/api/serials/years');
}

export function getSerialsByYear(year) {
  return axios.get('/api/serials/year/' + year);
}

export function postSerial(data) {
  return axios.post('/api/serials', data);
}

export function patchSerial(id, data) {
  return axios.patch('/api/serials/' + id, data);
}

export function deleteSerial(id) {
  return axios.delete('/api/serials/' + id);
}
