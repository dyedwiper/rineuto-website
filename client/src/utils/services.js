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
