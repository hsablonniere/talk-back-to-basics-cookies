'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  return `<section id="${attrs.id}" class="slide slide--section">
  <div class="slide--section_title">${node.getTitle()}</div>
</section>${node.getContent()}`;
};
