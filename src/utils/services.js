export function getScreenings() {
  return fetch('/screenings').then(handleError);
}

export function getSingleScreening(id) {
  return fetch('/screenings/' + id).then(handleError);
}

export function postLoginUser(data) {
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function handleError(res) {
  let json = res.json();
  if (!res.ok) {
    return json.then(err => {
      throw err;
    });
  } else {
    return json;
  }
}
