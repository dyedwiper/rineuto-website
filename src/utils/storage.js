export function getFromStorage(key) {
  if (!key) {
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setToStorage(key, value) {
  localStorage.setItem(key, value);
}
