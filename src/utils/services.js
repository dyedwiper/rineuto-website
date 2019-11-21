export function getScreenings() {
  return fetch('/screenings').then(handleError)
}

function handleError(res) {
  let json = res.json()
  if (!res.ok) {
    return json.then(err => {
      throw err
    })
  } else {
    console.log(json)
    return json
  }
}
