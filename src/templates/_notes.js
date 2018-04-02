'use strict';

const debugNode = require('../../lib/debugNode');

module.exports = (node, contents) => {
  return `<div class="notes">${node.getContent()}</div>`;
};
