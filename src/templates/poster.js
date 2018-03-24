'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  return `<section id="${attrs.id}" class="slide slide--poster">
  Poster!!
</section>`;
};
