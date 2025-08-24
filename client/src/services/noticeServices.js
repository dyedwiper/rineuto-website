import { makeApiCall } from './baseService';

export function getNotices() {
  return makeApiCall('/api/notices').then((res) => {
    const notices = res.data;
    const formattedNotices = notices.map((notice) => {
      notice.date = new Date(notice.date);
      return notice;
    });
    return formattedNotices;
  });
}

export function getNotice(id) {
  return makeApiCall('/api/notices/id/' + id).then((res) => {
    const notice = res.data;
    notice.date = new Date(notice.date);
    return notice;
  });
}

export function postNotice(data) {
  return makeApiCall('/api/notices', 'POST', data);
}

export function patchNotice(id, data) {
  return makeApiCall('/api/notices/' + id, 'PATCH', data);
}

export function deleteNotice(id) {
  return makeApiCall('/api/notices/' + id, 'DELETE');
}
