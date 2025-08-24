import { makeApiCall } from './baseService';

export function getDishes() {
  return makeApiCall('/api/dishes');
}

export function postDish(data) {
  return makeApiCall('/api/dishes', 'POST', data);
}

export function deleteDish(id) {
  return makeApiCall('/api/dishes/' + id, 'DELETE');
}
