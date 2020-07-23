const Screening = require('../models/Screening');
const { json } = require('express');

function sendJustMeta(req, res, next) {
  const userAgent = req.header('user-agent');
  if (userAgent && userAgent.includes('facebookexternalhit')) {
    if (req.path.startsWith('/screening')) {
      const screeningId = req.path.slice(req.path.indexOf('screening') + 10, req.path.indexOf('screening') + 34);
      Screening.findById(screeningId)
        .then((screening) => {
          if (!screening) {
            return res.status(404).json('screening not found');
          }
          res.send(`
            <meta property="og:title" content="${screening.title} | Rineuto Lichtspiele">
            <meta property="og:image" content="${screening.imageUrl}">
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.rineuto.de/screening/${screeningId}" />
            <meta property="og:site_name" content="Rineuto Lichtspiele" />
            <meta property="og:description" content="${screening.synopsis}" />
            <meta property="og:locale" content="de_DE" />
          `);
        })
        .catch((err) => res.status(400).json(err));
    } else if (req.path.startsWith('/program')) {
      res.send(`
        <meta property="og:title" content="Programm | Rineuto Lichtspiele">
        <meta property="og:image" content="https://www.rineuto.de/filmperlen.jpg">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rineuto.de/program" />
        <meta property="og:site_name" content="Rineuto Lichtspiele" />
        <meta property="og:description" content="Unsere nächsten Filmperlen" />
        <meta property="og:locale" content="de_DE" />
      `);
    } else if (req.path.startsWith('/archive')) {
      res.send(`
        <meta property="og:title" content="Archiv | Rineuto Lichtspiele">
        <meta property="og:image" content="https://www.rineuto.de/filmperlen.jpg">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rineuto.de/archive" />
        <meta property="og:site_name" content="Rineuto Lichtspiele" />
        <meta property="og:description" content="Vergangene Filmperlen" />
        <meta property="og:locale" content="de_DE" />
      `);
    } else if (req.path.startsWith('/posters')) {
      res.send(`
        <meta property="og:title" content="Plakate | Rineuto Lichtspiele">
        <meta property="og:image" content="https://www.rineuto.de/filmperlen.jpg">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rineuto.de/posters" />
        <meta property="og:site_name" content="Rineuto Lichtspiele" />
        <meta property="og:description" content="Selbstgebügelte Plakate" />
        <meta property="og:locale" content="de_DE" />
      `);
    } else if (req.path.startsWith('/about')) {
      res.send(`
        <meta property="og:title" content="Über uns | Rineuto Lichtspiele">
        <meta property="og:image" content="https://www.rineuto.de/filmperlen.jpg">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rineuto.de/about" />
        <meta property="og:site_name" content="Rineuto Lichtspiele" />
        <meta property="og:description" content="Perlen für die Säue" />
        <meta property="og:locale" content="de_DE" />
      `);
    } else if (req.path.startsWith('/contact')) {
      res.send(`
        <meta property="og:title" content="Kontakt | Rineuto Lichtspiele">
        <meta property="og:image" content="https://www.rineuto.de/filmperlen.jpg">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rineuto.de/contact" />
        <meta property="og:site_name" content="Rineuto Lichtspiele" />
        <meta property="og:description" content="Adresse etc." />
        <meta property="og:locale" content="de_DE" />
      `);
    } else {
      next();
    }
  } else if (userAgent && userAgent.includes('Twitterbot')) {
    if (req.path.startsWith('/screening')) {
      const screeningId = req.path.slice(req.path.indexOf('screening') + 10, req.path.indexOf('screening') + 34);
      Screening.findById(screeningId)
        .then((screening) => {
          if (!screening) {
            return res.status(404).json('screening not found');
          }
          res.send(`
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${screening.title}">
            <meta name="twitter:description" content="${screening.synopsis}" />
            <meta name="twitter:image" content="${screening.imageUrl}">
          `);
        })
        .catch((err) => res.status(400).json(err));
    } else if (req.path.startsWith('/program')) {
      res.send(`
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programm | Rineuto Lichtspiele">
        <meta name="twitter:description" content="Unsere nächsten Filmperlen" />
        <meta name="twitter:image" content="https://www.rineuto.de/filmperlen.jpg">
      `);
    } else if (req.path.startsWith('/archive')) {
      res.send(`
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Archiv | Rineuto Lichtspiele">
        <meta name="twitter:description" content="Vergangene Filmperlen" />
        <meta name="twitter:image" content="https://www.rineuto.de/filmperlen.jpg">
      `);
    } else if (req.path.startsWith('/posters')) {
      res.send(`
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plakate | Rineuto Lichtspiele">
        <meta name="twitter:description" content="Selbstgebügelte Plakate" />
        <meta name="twitter:image" content="https://www.rineuto.de/filmperlen.jpg">
      `);
    } else if (req.path.startsWith('/about')) {
      res.send(`
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Über uns | Rineuto Lichtspiele">
        <meta name="twitter:description" content="Perlen für die Säue" />
        <meta name="twitter:image" content="https://www.rineuto.de/filmperlen.jpg">
      `);
    } else if (req.path.startsWith('/contact')) {
      res.send(`
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kontakt | Rineuto Lichtspiele">
        <meta name="twitter:description" content="Adresse etc." />
        <meta name="twitter:image" content="https://www.rineuto.de/filmperlen.jpg">
      `);
    } else {
      next();
    }
  } else {
    next();
  }
}

module.exports = sendJustMeta;
