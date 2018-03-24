'use strict';

module.exports = (node) => {
  return `<section class="slide slide--listing">
${node.getContent()}
</section>`;
};
