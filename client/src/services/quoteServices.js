import { makeApiCall } from './baseService';

export function getQuotes() {
  return makeApiCall('/api/quotes');
}
