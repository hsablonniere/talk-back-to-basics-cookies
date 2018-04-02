'use strict';

const highlightjs = require('highlight.js')

module.exports = (node) => {

  const attrs = node.getAttributes();

  const title = node.getTitle() ? `<div class="slide--listing_title">${node.getTitle()}</div>` : '';

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
    return `<section class="slide slide--listing">
${title}
<pre class="slide--listing_codeBlock">
${cookie}
</pre>
</section>`;
  }

  return `<section class="slide slide--listing">
${title}
<pre class="slide--listing_codeBlock">
${highlightjs.highlight(attrs.language, node.getContent()).value}
</pre>
</section>`;
};
