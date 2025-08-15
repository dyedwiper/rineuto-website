import { makeApiCall } from './baseService';

export function getFutureScreenings() {
  return makeApiCall('/api/screenings/future');
}

export function getPastScreeningsByYear(year) {
  return makeApiCall('/api/screenings/past/year/' + year);
}

export function getYearsOfPastScreenings() {
  return makeApiCall('/api/screenings/past/years');
}

export function getScreening(id) {
  return makeApiCall('/api/screenings/id/' + id).then((res) => {
    const screening = res.data;
    screening.date = new Date(screening.date);
    return screening;
  });
}

export function postScreening(data) {
  return makeApiCall('/api/screenings', 'POST', data);
}

export function patchScreening(id, data) {
  return makeApiCall('/api/screenings/' + id, 'PATCH', data);
}

export function deleteScreening(id) {
  return makeApiCall('/api/screenings/' + id, 'DELETE');
}
