export function getScreenings() {
  return fetch('/screenings').then(handleError)
}

export function getSingleScreening(id) {
  return fetch('/screenings/' + id).then(handleError)
}

function handleError(res) {
  let json = res.json()
  if (!res.ok) {
    return json.then(err => {
      throw err
    })
  } else {
    return json
  }
}
