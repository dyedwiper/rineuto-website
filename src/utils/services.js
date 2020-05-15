import { setToStorage } from '../utils/storage';

export function getFutureScreenings() {
  return fetch('/api/screenings/future').then(handleError);
}

export function getPastScreenings() {
  return fetch('/api/screenings/past').then(handleError);
}

export function getSingleScreening(id) {
  return fetch('/api/screenings/' + id).then(handleError);
}

export function getPastScreeningsByYear(year) {
  return fetch('/api/screenings/year/' + year).then(handleError);
}

export function postScreening(data, token) {
  return fetch('/api/screenings', {
    method: 'POST',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function getSeries(year) {
  return fetch('/api/series/year/' + year).then(handleError);
}

export function getNews() {
  return fetch('api/news').then(handleError);
}

export function postLoginUser(data) {
  return fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleLogin);
}

export function getUser(token) {
  return fetch('/api/users/authenticate', {
    headers: { 'auth-token': token },
  }).then(handleError);
}

function handleError(res) {
  let json = res.json();
  if (!res.ok) {
    return json.then((err) => {
      throw err;
    });
  }
  return json;
}

function handleLogin(res) {
  let json = res.json();
  if (!res.ok) {
    return json.then((err) => {
      throw err;
    });
  }
  setToStorage('rineuto-token', res.headers.get('auth-token'));
  return json;
}
