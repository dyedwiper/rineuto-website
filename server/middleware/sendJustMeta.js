const Screening = require('../models/Screening');

function sendJustMeta(req, res, next) {
  const userAgent = req.get('user-agent');
  // if (userAgent && userAgent.includes('facebookexternalhit')) {
  if (req.path.startsWith('/screening')) {
    const screeningId = req.path.slice(-24);
    Screening.findById(screeningId)
      .then((screening) => {
        res.send(`
            <html>
              <head>
                <meta property="og:title" content="${screening.title}">
                <meta property="og:image" content="${screening.imageUrl}">
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.rineuto.de" />
                <meta property="og:site_name" content="Rineuto Lichtspiele" />
                <meta property="og:description" content="${screening.synopsis}" />
                <meta property="og:locale" content="de_DE" />
              </head>
            </html>
          `);
      })
      .catch((err) => res.status(400).json(err));
  }
  // } else if (userAgent && userAgent.includes('Twitterbot')) {
  //   if (req.path.startsWith('/screening')) {
  //     const screeningId = req.path.slice(-24);
  //     Screening.findById(screeningId)
  //       .then((screening) => {
  //         res.send(`
  //           <meta name="twitter:card" content="summary_large_image" />
  //           <meta name="twitter:title" content="${screening.title}">
  //           <meta name="twitter:description" content="${screening.synopsis}" />
  //           <meta name="twitter:image" content="${screening.imageUrl}">
  //         `);
  //       })
  //       .catch((err) => res.status(400).json(err));
  //   }
  // }
  else {
    next();
  }
}

module.exports = sendJustMeta;
