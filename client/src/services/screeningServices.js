import axios from 'axios';

export function getScreenings() {
  return axios.get('/api/screenings');
}

export function getScreening(id) {
  return axios.get('/api/screenings/id/' + id).then((res) => {
    const screening = res.data;
    screening.date = new Date(screening.date);
    return screening;
  });
}

export function postScreening(data) {
  return axios.post('/api/screenings', data);
}

export function patchScreening(id, data) {
  return axios.patch('/api/screenings/' + id, data);
}

export function deleteScreening(id) {
  return axios.delete('/api/screenings/' + id);
}
