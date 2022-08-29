export function formatToDateString(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formattedDate;
}

export function formatToDateStringWithoutYear(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
  });
  return formattedDate;
}

export function formatToTimeString(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedDate;
}
