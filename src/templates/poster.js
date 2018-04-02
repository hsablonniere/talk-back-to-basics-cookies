'use strict';

module.exports = (node) => {
  const docAttrs = node.document.getAttributes();
  const attrs = node.getAttributes();
  const [pretitle, title] = docAttrs.doctitle.split(' : ');

  const $title = (node.getTitle())
    ? `<div class="slide--poster_header">
         <div class="slide--poster_title">${node.title}</div>
      </div>`
    : `<div class="slide--poster_header">
         <div class="slide--poster_pretitle">${pretitle}</div>
         <div class="slide--poster_title">${title}</div>
      </div>`;

  return `<section class="slide slide--poster">
  ${$title}
  <div class="slide--poster_details">
    <div class="slide--poster_details_author">
      <div class="slide--poster_author-company">${docAttrs['author-company']}</div>
      <div class="slide--poster_author-twitter">${docAttrs['author-twitter']}</div>
      <div class="slide--poster_author">${docAttrs.author}</div>
    </div>
    <div class="slide--poster_details_event">
      <div class="slide--poster_event">${docAttrs.event}</div>
      <div class="slide--poster_date">${docAttrs.date}</div>
      <div class="slide--poster_hashtags">${docAttrs.hashtags}</div>
    </div>
  </div>
</section>`;
};
