function replaceUmlautsAndSpecialCharacters(someString) {
  return someString
    .replace(/\u00e4/g, 'ae')
    .replace(/\u00f6/g, 'oe')
    .replace(/\u00fc/g, 'ue')
    .replace(/\u00df/g, 'ss')
    .replace(/[^a-z^A-Z^0-9]+/g, '_');
}

function stripHtml(html) {
  // Very simple and unsafe stripping, taken from https://stackoverflow.com/a/822464/11854580
  return html.replace(/<[^>]*>?/gm, '');
}

module.exports = { replaceUmlautsAndSpecialCharacters, stripHtml };
