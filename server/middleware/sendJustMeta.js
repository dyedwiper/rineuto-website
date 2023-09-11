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
  HEADLINE_ARCHIV,
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
      const screeningId = req.path.slice(req.path.indexOf('screening') + 10, req.path.indexOf('screening') + 34);
      Screening.findById(screeningId)
        .then((screening) => {
          if (!screening) {
            return res.status(404).json('screening not found');
          }
          res.send(`
            <meta property="og:title" content="${screening.title} | ${RINEUTO_NAME}">
            <meta property="og:image" content="${screening.imageUrl}">
            <meta property="og:type" content="${OG_TYPE}" />
            <meta property="og:url" content="${path.join(RINEUTO_BASE_URL, ROUTE_SCREENING, screeningId)}" />
            <meta property="og:site_name" content="${RINEUTO_NAME}" />
            <meta property="og:description" content="${screening.synopsis}" />
            <meta property="og:locale" content="${OG_LOCALE}" />
          `);
        })
        .catch(() => res.status(500).json(STANDARD_ERROR_MESSAGE));
    } else if (req.path.startsWith(ROUTE_PROGRAM)) {
      res.send(`
        <meta property="og:title" content="${PAGE_TITLE_PROGRAM} | ${RINEUTO_NAME}">
        <meta property="og:image" content="${path.join(RINEUTO_BASE_URL, PEARLS_IMAGE_FILENAME)}">
        <meta property="og:type" content="${OG_TYPE}" />
        <meta property="og:url" content="${path.join(RINEUTO_BASE_URL, ROUTE_PROGRAM)}" />
        <meta property="og:site_name" content="${RINEUTO_NAME}" />
        <meta property="og:description" content="${HEADLINE_PROGRAM}" />
        <meta property="og:locale" content="${OG_LOCALE}" />
      `);
    } else if (req.path.startsWith(ROUTE_ARCHIVE)) {
      res.send(`
        <meta property="og:title" content="${PAGE_TITLE_ARCHIVE} | ${RINEUTO_NAME}">
        <meta property="og:image" content="${path.join(RINEUTO_BASE_URL, PEARLS_IMAGE_FILENAME)}">
        <meta property="og:type" content="${OG_TYPE}" />
        <meta property="og:url" content="${path.join(RINEUTO_BASE_URL, ROUTE_ARCHIVE)}" />
        <meta property="og:site_name" content="${RINEUTO_NAME}" />
        <meta property="og:description" content="${HEADLINE_ARCHIV}" />
        <meta property="og:locale" content="${OG_LOCALE}" />
      `);
    } else if (req.path.startsWith(ROUTE_POSTERS)) {
      res.send(`
        <meta property="og:title" content="${PAGE_TITLE_POSTERS} | ${RINEUTO_NAME}">
        <meta property="og:image" content="${path.join(RINEUTO_BASE_URL, PEARLS_IMAGE_FILENAME)}">
        <meta property="og:type" content="${OG_TYPE}" />
        <meta property="og:url" content="${path.join(RINEUTO_BASE_URL, ROUTE_POSTERS)}" />
        <meta property="og:site_name" content="${RINEUTO_NAME}" />
        <meta property="og:description" content="${HEADLINE_POSTERS}" />
        <meta property="og:locale" content="${OG_LOCALE}" />
      `);
    } else if (req.path.startsWith(ROUTE_ABOUT)) {
      res.send(`
        <meta property="og:title" content="${PAGE_TITLE_ABOUT} | ${RINEUTO_NAME}">
        <meta property="og:image" content="${path.join(RINEUTO_BASE_URL, PEARLS_IMAGE_FILENAME)}">
        <meta property="og:type" content="${OG_TYPE}" />
        <meta property="og:url" content="${path.join(RINEUTO_BASE_URL, ROUTE_ABOUT)}" />
        <meta property="og:site_name" content="${RINEUTO_NAME}" />
        <meta property="og:description" content="${HEADLINE_ABOUT}" />
        <meta property="og:locale" content="${OG_LOCALE}" />
      `);
    } else if (req.path.startsWith(ROUTE_CONTACT)) {
      res.send(`
        <meta property="og:title" content="${PAGE_TITLE_CONTACT} | ${RINEUTO_NAME}">
        <meta property="og:image" content="${path.join(RINEUTO_BASE_URL, PEARLS_IMAGE_FILENAME)}">
        <meta property="og:type" content="${OG_TYPE}" />
        <meta property="og:url" content="${path.join(RINEUTO_BASE_URL, ROUTE_CONTACT)}" />
        <meta property="og:site_name" content="${RINEUTO_NAME}" />
        <meta property="og:description" content="${HEADLINE_CONTACT}" />
        <meta property="og:locale" content="${OG_LOCALE}" />
      `);
    } else {
      next();
    }
  } else {
    next();
  }
}

module.exports = sendJustMeta;
