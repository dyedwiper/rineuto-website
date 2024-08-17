import axios from 'axios';

export function getNotices() {
  return axios.get('/api/notices').then((res) => {
    const notices = res.data;
    const formattedNotices = notices.map((notice) => {
      notice.date = new Date(notice.date);
      return notice;
    });
    return formattedNotices;
  });
}

export function getNotice(id) {
  return axios.get('/api/notices/' + id).then((res) => {
    const notice = res.data;
    notice.date = new Date(notice.date);
    return notice;
  });
}

export function postNotice(data) {
  return axios.post('/api/notices', data);
}

export function patchNotice(id, data) {
  return axios.patch('/api/notices/' + id, data);
}

export function deleteNotice(id) {
  return axios.delete('/api/notices/' + id);
}
