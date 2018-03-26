'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  return `<section id="${attrs.id}" class="slide slide--warning">
<div class="slide--warning_keyword">${attrs.textlabel}</div>
<div class="slide--warning_message">${node.getContent()}</div>
</section>`;
};
