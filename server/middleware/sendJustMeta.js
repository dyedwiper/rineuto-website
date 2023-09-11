const path = require('path');
const {
  RINEUTO_BASE_URL,
  ROUTE_SCREENING,
  PEARLS_IMAGE_FILENAME,
  RINEUTO_NAME,
  ROUTE_PROGRAM,
  HEADLINE_PROGRAM,
  ROUTE_ARCHIVE,
  PAGE_TITLE_PROGRAM,
  PAGE_TITLE_ARCHIVE,
  HEADLINE_ARCHIVE,
  HEADLINE_POSTERS,
  PAGE_TITLE_POSTERS,
  PAGE_TITLE_ABOUT,
  ROUTE_ABOUT,
  HEADLINE_ABOUT,
  PAGE_TITLE_CONTACT,
  ROUTE_CONTACT,
  HEADLINE_CONTACT,
  ROUTE_POSTERS,
} = require('../constants');
const Screening = require('../models/Screening');
const { STANDARD_ERROR_MESSAGE } = require('../utils/constants');

const USER_AGENT_FACEBOOK = 'facebookexternalhit';
const USER_AGENT_TELEGRAM = 'TelegramBot';
const USER_AGENT_TWITTER = 'Twitterbot';
const USER_AGENT_WHATSAPP = 'WhatsApp';

const OG_TYPE = 'website';
const OG_LOCALE = 'de_DE';

function sendJustMeta(req, res, next) {
  const userAgent = req.header('user-agent');
  if (
    userAgent &&
    (userAgent.includes(USER_AGENT_FACEBOOK) ||
      userAgent.includes(USER_AGENT_TELEGRAM) ||
      userAgent.includes(USER_AGENT_TWITTER) ||
      userAgent.includes(USER_AGENT_WHATSAPP))
  ) {
    if (req.path.startsWith(ROUTE_SCREENING)) {
      const screeningId = req.path.split('/')[2];
      Screening.findById(screeningId)
        .then((screening) => {
          if (!screening) {
            return res.status(404).json('screening not found');
          }
          const ogMeta = createOgMeta(
            screening.title,
            path.join(ROUTE_SCREENING, screeningId),
            screening.synopsis,
            screening.imageUrl
          );
          res.send(ogMeta);
        })
        .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
    } else if (req.path.startsWith(ROUTE_PROGRAM)) {
      const ogMeta = createOgMeta(PAGE_TITLE_PROGRAM, ROUTE_PROGRAM, HEADLINE_PROGRAM);
      res.send(ogMeta);
    } else if (req.path.startsWith(ROUTE_ARCHIVE)) {
      const ogMeta = createOgMeta(PAGE_TITLE_ARCHIVE, ROUTE_ARCHIVE, HEADLINE_ARCHIVE);
      res.send(ogMeta);
    } else if (req.path.startsWith(ROUTE_POSTERS)) {
      const ogMeta = createOgMeta(PAGE_TITLE_POSTERS, ROUTE_POSTERS, HEADLINE_POSTERS);
      res.send(ogMeta);
    } else if (req.path.startsWith(ROUTE_ABOUT)) {
      const ogMeta = createOgMeta(PAGE_TITLE_ABOUT, ROUTE_ABOUT, HEADLINE_ABOUT);
      res.send(ogMeta);
    } else if (req.path.startsWith(ROUTE_CONTACT)) {
      const ogMeta = createOgMeta(PAGE_TITLE_CONTACT, ROUTE_CONTACT, HEADLINE_CONTACT);
      res.send(ogMeta);
    } else {
      next();
    }
  } else {
    next();
  }
}

function createOgMeta(title, route, description, imageUrl) {
  const ogTitle = `${title} | ${RINEUTO_NAME}`;

  let ogImage = imageUrl;
  if (!imageUrl) {
    ogImage = path.join(RINEUTO_BASE_URL, PEARLS_IMAGE_FILENAME);
  }

  const ogUrl = path.join(RINEUTO_BASE_URL, route);

  return `<meta property="og:title" content="${ogTitle}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:type" content="${OG_TYPE}" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:site_name" content="${RINEUTO_NAME}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:locale" content="${OG_LOCALE}" />`;
}

module.exports = sendJustMeta;
