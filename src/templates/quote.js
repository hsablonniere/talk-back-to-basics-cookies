'use strict';

const poster = require('./poster');

module.exports = (node) => {
  const attrs = node.getAttributes();
  return `<section class="slide slide--sherlock">
<div class="slide--sherlock_sentenceWrapper" data-character="${attrs.attribution.toLowerCase()}">
  <div class="slide--sherlock_sentence">${node.getContent()}</div>
</div>
</section>`;
};
