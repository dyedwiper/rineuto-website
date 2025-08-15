import { makeApiCall } from './baseService';

export function getSerials() {
  return makeApiCall('/api/serials');
}

export function getSerial(id) {
  return makeApiCall('/api/serials/id/' + id);
}

export function getSerialYears() {
  return makeApiCall('/api/serials/years');
}

export function getSerialsByYear(year) {
  return makeApiCall('/api/serials/year/' + year);
}

export function postSerial(data) {
  return makeApiCall('/api/serials', 'POST', data);
}

export function patchSerial(id, data) {
  return makeApiCall('/api/serials/' + id, 'PATCH', data);
}

export function deleteSerial(id) {
  return makeApiCall('/api/serials/' + id, 'DELETE');
}
