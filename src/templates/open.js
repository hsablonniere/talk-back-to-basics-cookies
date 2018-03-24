'use strict';

module.exports = (node) => {
  return `<section class="slide slide--open">
<p>${node.getContent()}</p>
</section>`;
};
