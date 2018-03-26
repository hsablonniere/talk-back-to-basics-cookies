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

  if (attrs.slide === 'question') {
    const question = node.getContent()
      .replace(' ?', '&nbsp;?');
    const balancedQuestion = question.includes('  ')
      ? question
        .replace(/ /g, '&nbsp;')
        .replace(/&nbsp;&nbsp;/g, ' ')
      : question;
    return `<section id="${attrs.id}" class="slide slide--question">
<div class="slide--question_text">${balancedQuestion}</div>
</section>`;
  }

  if (attrs.slide === 'text') {
    const [keyword, subtext] = node.getContent().split(' : ');
    return `<section id="${attrs.id}" class="slide slide--text">
<div class="slide--text_keyword">${keyword}</div>
${ subtext ? `<div class="slide--text_subtext">${subtext}</div>` : '' }
</section>`;
  }

  if (attrs.slide === 'blank') {
    return `<section id="${attrs.id}" class="slide slide--blank"></section>`;
  }

  if (attrs.slide === 'sherlock') {
    const classes = [
      'slide',
      'slide--sherlock',
      ...node.getRoles(),
    ];
    return `<section id="${attrs.id}" class="${classes.join(' ')}">
<div class="slide--sherlock_sentenceWrapper">
  <div class="slide--sherlock_sentence">${node.getContent()}</div>
</div>
</section>`;
  }

  if (attrs.slide === 'location') {
    return `<section id="${attrs.id}" class="slide slide--location">
<div class="slide--location_location">${node.getContent()}</div>
</section>`;
  }

  if (Object.keys(attrs).length === 0) {
    return `<section class="slide slide--todo">
  <div class="slide--todo_text">TODO: ${node.getContent()}</div>
  </section>`;
  }

  return `<section id="${attrs.id}" class="slide slide--paragraph">
<p>${node.getContent()}</p>
</section>`;
};
