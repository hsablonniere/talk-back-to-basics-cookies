'use strict';

const path = require('path');
const { takeScreenshot } = require('../../lib/screenshot');

const slide = require('./_slide');

module.exports = (node) => {
  const attrs = node.getAttributes();
  const classes = node.getRoles();

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
      return slide('media', node, classes, `<img class="element caniuse" src="${attrs.target}">`);
    }

    if (attrs.url.startsWith('https://twitter.com')) {
      viewport.deviceScaleFactor = 3;
      takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
      return slide('media', node, classes, `<img class="element twitter" src="${attrs.target}">`);
    }

    takeScreenshot(attrs.url, path.resolve('src', attrs.target), viewport);
    return slide('media', node, classes, `<div class="browser">
    <figcaption class="url"><a href="${attrs.url}" target="_blank" rel="noopener">${attrs.url}</a></figcaption>
    <img class="element" src="${attrs.target}">
  </div>`);
  }

  const author = (attrs.author) ? `<div class="author">Photo by ${attrs.author}</div>` : '';
  const figcaption = (node.getTitle() || attrs.url) ? `<figcaption class="caption">${node.getTitle() || attrs.url}</figcaption>` : '';

  return slide('media', node, classes, `<img class="element" src="${attrs.target}">
  ${author}
  ${figcaption}`);
};
