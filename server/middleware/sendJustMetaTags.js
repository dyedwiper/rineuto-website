function sendJustMetaTags(req, res, next) {
  const path = req.path;
  const userAgent = req.get('user-agent');
  if (path.startsWith('/screening')) {
    res.send(`
            <meta property="og:title" content="test">
        `);
  }
  if (userAgent && userAgent.includes('facebookexternalhit')) {
  }
  next();
}

module.exports = sendJustMetaTags;
