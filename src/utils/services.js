import { setToStorage } from '../utils/storage';

export function getScreenings() {
  return fetch('/api/screenings').then(handleError);
}

export function getSingleScreening(id) {
  return fetch('/api/screenings/' + id).then(handleError);
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

export function patchScreening(id, data, token) {
  return fetch('/api/screenings/' + id, {
    method: 'PATCH',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function deleteScreening(id, token) {
  return fetch('/api/screenings/' + id, {
    method: 'DELETE',
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function getSeries() {
  return fetch('/api/series').then(handleError);
}

export function postSeries(data, token) {
  return fetch('/api/series', {
    method: 'POST',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function patchSeries(id, data, token) {
  return fetch('/api/series/' + id, {
    method: 'PATCH',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function getNews() {
  return fetch('/api/news').then(handleError);
}

export function postNews(data, token) {
  return fetch('/api/news', {
    method: 'POST',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function patchNews(id, data, token) {
  return fetch('/api/news/' + id, {
    method: 'PATCH',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function deleteNews(id, token) {
  return fetch('/api/news/' + id, {
    method: 'DELETE',
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
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
