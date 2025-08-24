import { makeApiCall } from './baseService';

export function postNewsletterContact(data) {
  return makeApiCall('/api/newsletter', 'POST', data);
}
