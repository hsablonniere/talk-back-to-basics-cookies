'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const [pretitle, title] = node.getTitle().split(' : ');
  return slide('section', node, `<div class="pretitle">${pretitle}</div>
  <div class="title">${title}</div>`);
};
