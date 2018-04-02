'use strict';

const highlightjs = require('highlight.js');

const slide = require('./_slide');

module.exports = (node) => {

  const attrs = node.getAttributes();
  const title = node.getTitle()
    ? `<div class="title">${node.getTitle()}</div>`
    : '';

  if (attrs.language === 'cookies') {
    const cookie = node.getContent()
      .replace(/([^\s;]+)=([^;]+?)(;|$)/g, (all, key, value, semi) => {
        return `<span class="cookie-key">${key}</span><span class="cookie-sign">=</span><span class="cookie-value">${value}</span>${semi}`;
      })
      .replace(/([^\s;=>]+)(;|$)/g, (all, key, semi) => {
        return `<span class="cookie-key">${key}</span>${semi}`;
      })
      .replace(/([;:])/g, (all) => {
        return `<span class="cookie-sign">${all}</span>`;
      });

    return slide('listing', node, `${title}
<pre class="codeBlock">
${cookie}
</pre>`);
  }

  return slide('listing', node, `${title}
<pre class="codeBlock">
${highlightjs.highlight(attrs.language, node.getContent()).value}
</pre>`);
};
