'use strict';

const poster = require('./poster');

module.exports = (node) => {
  const attrs = node.getAttributes();

  if (attrs.slide === 'poster') {
    return poster(node);
  }

  if (attrs.slide === 'media') {
    const classes = [
      'slide',
      'slide--media',
      ...node.getRoles(),
    ];
    return `<section id="${attrs.id}" class="${classes.join(' ')}">
  ${node.getContent()}
  <figcaption>${node.title}</figcaption>
</section>`;
  }

  return `<section id="${attrs.id}" class="slide slide--paragraph">
<p>${node.getContent()}</p>
</section>`;
};
