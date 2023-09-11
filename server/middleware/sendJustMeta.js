const Screening = require('../models/Screening');
const { STANDARD_ERROR_MESSAGE } = require('../utils/constants');

const USER_AGENT_FACEBOOK = 'facebookexternalhit';
const USER_AGENT_TELEGRAM = 'TelegramBot';
const USER_AGENT_TWITTER = 'Twitterbot';
const USER_AGENT_WHATSAPP = 'WhatsApp';

function sendJustMeta(req, res, next) {
  const userAgent = req.header('user-agent');
  if (
    userAgent &&
    (userAgent.includes(USER_AGENT_FACEBOOK) ||
      userAgent.includes(USER_AGENT_TELEGRAM) ||
      userAgent.includes(USER_AGENT_TWITTER) ||
      userAgent.includes(USER_AGENT_WHATSAPP))
  ) {
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
        .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
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
  } else {
    next();
  }
}

module.exports = sendJustMeta;
