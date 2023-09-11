import { setToLocalStorage } from '../utils/storage';



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

export function getQuotes() {
  return fetch('/api/quotes').then(handleError);
}

export function getDishes() {
  return fetch('/api/dishes').then(handleError);
}

export function postDish(data, token) {
  return fetch('/api/dishes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  }).then(handleError);
}

export function deleteDish(id, token) {
  return fetch('/api/dishes/' + id, {
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

export function authenticateUser(token) {
  return fetch('/api/users/authenticate', {
    headers: { 'auth-token': token },
  }).then(handleError);
}

export function postNewsletterContact(data) {
  return fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
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
  setToLocalStorage('rineuto-token', res.headers.get('auth-token'));
  return json;
}
