'use strict';

const path = require('path');
const fs = require('fs');

const slide = require('./_slide');

module.exports = ({ node, next }) => {

  const attrs = node.getAttributes();
  const classes = node.getRoles();

  // let svgFile
  // if (attrs.target.endsWith('.svg')) {
  //   svgFile = fs.readFileSync(path.resolve('src', attrs.target), 'utf-8');
  // }

  const author = (attrs.author) ? `<div class="author">Photo by ${attrs.author}</div>` : '';
  const figcaption = (node.getTitle() || attrs.url) ? `<figcaption class="caption">${node.getTitle() || attrs.url}</figcaption>` : '';

  // if (attrs.target.endsWith('.svg')) {
  //   return slide('media', node, classes, `<div class="element element--svg">${svgFile}</div>
  // ${author}
  // ${figcaption}`);
  // }

  return slide('media', node, classes, `<img class="element" src="${attrs.target}">
  ${author}
  ${figcaption}`);
};
