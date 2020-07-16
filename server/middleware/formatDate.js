function formatDate(req, res, next) {
  if (req.body.day && req.body.time) {
    const date = new Date(req.body.day + 'T' + req.body.time);
    req.body = {
      ...req.body,
      date: date,
    };
    delete req.body.day;
    delete req.body.time;
  }
  next();
}

module.exports = formatDate;
