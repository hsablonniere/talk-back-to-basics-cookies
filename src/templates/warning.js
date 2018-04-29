'use strict';

const slide = require('./_slide');

module.exports = ({ node }) => {
  const attrs = node.getAttributes();
  return slide('warning', node, `<div class="keyword">${attrs.textlabel}</div>
<div class="message">${node.getContent()}</div>`);
};
