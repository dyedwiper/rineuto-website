import { setToStorage } from '../utils/storage';

export function getScreenings() {
  return fetch('/api/screenings').then(handleError);
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

export function getSerials() {
  return fetch('/api/serials').then(handleError);
}

export function postSerial(data, token) {
  return fetch('/api/serials', {
    method: 'POST',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function patchSerial(id, data, token) {
  return fetch('/api/serials/' + id, {
    method: 'PATCH',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function deleteSerial(id, token) {
  return fetch('/api/serials/' + id, {
    method: 'DELETE',
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function getNotices() {
  return fetch('/api/notices').then(handleError);
}

export function postNotice(data, token) {
  return fetch('/api/notices', {
    method: 'POST',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function patchNotice(id, data, token) {
  return fetch('/api/notices/' + id, {
    method: 'PATCH',
    body: data,
    headers: {
      'auth-token': token,
    },
  }).then(handleError);
}

export function deleteNotice(id, token) {
  return fetch('/api/notices/' + id, {
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
