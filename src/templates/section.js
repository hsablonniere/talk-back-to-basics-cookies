'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  const [pretitle, title] = node.getTitle().split(' : ')
  return `<section class="slide slide--section">
  <div class="slide--section_pretitle">${pretitle}</div>
  <div class="slide--section_title">${title}</div>
</section>${node.getContent()}`;
};
