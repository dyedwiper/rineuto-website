const router = require('express').Router();
const axios = require('axios');
const { STANDARD_ERROR_MESSAGE, STANDARD_SUCCESS_MESSAGE } = require('../constants');

router.post('/', (req, res) => {
  if (req.body.captcha?.toLowerCase() !== process.env.NEWSLETTER_CAPTCHA) {
    return res.status(400).json('Falsches Passwort');
  }

  const data = {
    email: req.body.email,
    includeListIds: [Number(process.env.SENDINBLUE_LIST_ID)],
    templateId: Number(process.env.SENDINBLUE_TEMPLATE_ID),
    redirectionUrl: 'https://rineuto.de/newsletter/confirmation',
  };

  const config = {
    headers: {
      'api-key': process.env.SENDINBLUE_APIKEY,
    },
  };

  axios
    .post(process.env.SENDINBLUE_URL, data, config)
    .then(() => res.json(STANDARD_SUCCESS_MESSAGE))
    .catch((err) => {
      if (
        (err.response.data.code === 'invalid_parameter' && err.response.data.message.includes('email')) ||
        (err.response.data.code === 'missing_parameter' && err.response.data.message.includes('Email'))
      ) {
        return res.status(400).json('Die angegebene E-Mail-Adresse ist nicht valide.');
      }
      res.status(500).json(STANDARD_ERROR_MESSAGE);
    });
});

module.exports = router;
