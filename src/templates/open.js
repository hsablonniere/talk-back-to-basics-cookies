'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  if (attrs.slide === 'table') {
    return `<section id="${attrs.id}" class="slide slide--table">
<div>
${node.getContent()}
</div>
</section>`;
  }

  return `<section class="slide slide--open">
<p>${node.getContent()}</p>
</section>`;
};
