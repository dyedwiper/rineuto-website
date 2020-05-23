function formatDate(req, res, next) {
  if (req.body.day && req.body.time) {
    req.body = {
      ...req.body,
      date: req.body.day + 'T' + req.body.time,
    };
    delete req.body.day;
    delete req.body.time;
  }
  next();
}

module.exports = formatDate;
