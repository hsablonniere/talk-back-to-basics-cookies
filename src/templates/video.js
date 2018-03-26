'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  const classes = [
    'slide',
    'slide--media',
    ...node.getRoles(),
  ];

  const author = (attrs.author) ? `<div class="slide--media_author">Photo by ${attrs.author}</div>` : '';

  const figcaption = (node.getTitle()) ? `<figcaption class="slide--media_caption">${node.getTitle()}</figcaption>` : '';

  return `<section id="${attrs.id}" class="${classes.join(' ')}">
  <video class="slide--media_element" src="${attrs.target}" loop></video>
  ${author}
  ${figcaption}
</section>`;
};
