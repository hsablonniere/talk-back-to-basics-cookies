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
    return `<section class="${classes.join(' ')}">
  ${node.getContent()}
  <figcaption>${node.title}</figcaption>
</section>`;
  }

  if (attrs.slide === 'question') {
    const question = node.getContent()
      .replace(' ?', '&nbsp;?');
    const balancedQuestion = question.includes('  ')
      ? question
        .replace(/ /g, '&nbsp;')
        .replace(/&nbsp;&nbsp;/g, ' ')
      : question;
    return `<section class="slide slide--question">
<div class="slide--question_text">${balancedQuestion}</div>
</section>`;
  }

  if (attrs.slide === 'text') {
    const [keyword, subtext] = node.getContent().split(' : ');
    return `<section class="slide slide--text">
<div class="slide--text_keyword">${keyword}</div>
${ subtext ? `<div class="slide--text_subtext">${subtext}</div>` : '' }
</section>`;
  }

  if (attrs.slide === 'blank') {
    return `<section class="slide slide--blank"></section>`;
  }

  if (attrs.slide === 'location') {
    return `<section class="slide slide--location">
<div class="slide--location_location">${node.getContent()}</div>
</section>`;
  }

  if (Object.keys(attrs).length === 0) {
    return `<div class="notes">${node.getContent()}</div>`;
  }

  return `<section class="slide slide--paragraph">
<p>${node.getContent()}</p>
</section>`;
};
