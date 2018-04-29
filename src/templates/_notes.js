'use strict';

const debugNode = require('../../lib/debugNode');

module.exports = ({ node }) => {
  const multilineContents = node.getContent()
    .replace(/\n/g, '<br>');
  return `<div class="notes">${multilineContents}</div>`;
};
