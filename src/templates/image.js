'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  console.log(attrs);
  const classes = [
    'slide',
    'slide--media',
    ...node.getRoles(),
  ];
  return `<section id="${attrs.id}" class="${classes.join(' ')}">
  <img class="slide--media_img" src="${attrs.target}" width="500px">
  <div class="slide--media_author">Photo by ${attrs.author}</div>
</section>`;
};
