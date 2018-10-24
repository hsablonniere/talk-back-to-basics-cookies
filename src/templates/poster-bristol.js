'use strict';

const slide = require('./_slide');

module.exports = (node) => {

  const docAttrs = node.document.getAttributes();
  const attrs = node.getAttributes();
  const [pretitle, title] = docAttrs.doctitle.split(' : ');

  const $title = (node.getTitle())
    ? `<div class="title">${node.title}</div>`
    : `<div class="pretitle">${pretitle}</div>
         <div class="title">${title}</div>`;

  return slide('poster-bristol', node, `
  <div class="main">
      ${$title}
      <div class="author">${docAttrs.author}</div>
      <div class="author-company">${docAttrs['author-company']}</div>
      <div class="date">${docAttrs.date}</div>
  </div>
  <div class="social">
      <div class="event">#${docAttrs.event}</div>
      <div class="hashtags">${docAttrs.hashtags}</div>
      <div class="author-twitter">${docAttrs['author-twitter']}</div>
  </div>`);
};
