'use strict';

const path = require('path');
const { takeScreenshot } = require('../../lib/screenshot');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const classes = [
    'slide',
    'slide--media',
    ...node.getRoles(),
  ];

  if (attrs.url != null) {
    classes.push('dark');
    const viewport = {};
    if (attrs.width != null) {
      viewport.height = Number(attrs.width) * 3 / 4;
      viewport.width = Number(attrs.width);
    }

    if (attrs.url.startsWith('https://caniuse.com')) {
      viewport.deviceScaleFactor = 1.75;
      takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
      return `<section id="${attrs.id}" class="${classes.join(' ')}">
    <img class="slide--media_element caniuse" src="${attrs.target}" width="500px">
</section>`;
    }

    if (attrs.url.startsWith('https://twitter.com')) {
      viewport.deviceScaleFactor = 3;
      takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
      return `<section id="${attrs.id}" class="${classes.join(' ')}">
    <img class="slide--media_element twitter" src="${attrs.target}" width="500px">
</section>`;
    }

    takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
    return `<section id="${attrs.id}" class="${classes.join(' ')}">
  <div class="slide--media_browser">
    <figcaption class="slide--media_url"><a href="${attrs.url}" target="_blank" rel="noopener">${attrs.url}</a></figcaption>
    <img class="slide--media_element" src="${attrs.target}" width="500px">
  </div>
</section>`;
  }

  const author = (attrs.author) ? `<div class="slide--media_author">Photo by ${attrs.author}</div>` : '';
  const figcaption = (node.getTitle() || attrs.url) ? `<figcaption class="slide--media_caption">${node.getTitle() || attrs.url}</figcaption>` : '';

  return `<section id="${attrs.id}" class="${classes.join(' ')}">
  <img class="slide--media_element" src="${attrs.target}" width="500px">
  ${author}
  ${figcaption}
</section>`;
};
