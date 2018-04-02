'use strict';

const slide = require('./_slide');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const attribution = attrs.attribution.toLowerCase();
  return slide('dialogue', node, `<div class="sentenceWrapper" data-character="${attribution}">
  <div class="sentence">${node.getContent()}</div>
</div>`);
};
