'use strict';

const slide = require('./_slide');

module.exports = ({ node }) => {
  return slide('location', node, `<div class="location">${node.getContent()}</div>`);
};
