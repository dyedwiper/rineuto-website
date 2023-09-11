import { setToLocalStorage } from '../utils/storage';



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
