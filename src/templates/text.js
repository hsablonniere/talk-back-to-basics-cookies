'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const [keyword, subtext] = node.getContent().split(' : ');
  return slide('text', node, `<div class="keyword">${keyword}</div>
${ subtext ? `<div class="subtext">${subtext}</div>` : '' }`);
};
