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
  <img src="${attrs.target}" width="500px">
  <figcaption>${node.title}</figcaption>
</section>`;
};
