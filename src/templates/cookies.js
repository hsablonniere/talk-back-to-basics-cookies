'use strict';

const slide = require('./_slide');

function formatCookie (cookie) {
  return '<span class="cookie">' + cookie
    .replace(/([^\s;]+)=([^;]+?)(;|$)/g, (all, key, value, semi) => {
      return `<span class="cookie-key">${key}</span><span class="cookie-sign">=</span><span class="cookie-value">${value}</span>${semi}`;
    })
    .replace(/([^\s;=>]+)(;|$)/g, (all, key, semi) => {
      return `<span class="cookie-key">${key}</span>${semi}`;
    })
    .replace(/([:])/, (all) => {
      return `<span class="cookie-sign">${all}</span>`;
    })
    .replace(/([;])/g, (all) => {
      return `<span class="cookie-sign">${all}</span>`;
    }) + '</span>';
}

module.exports = ({ node }) => {

  const attrs = node.getAttributes();
  const title = node.getTitle()
    ? `<div class="title">${node.getTitle()}</div>`
    : '';

  const cookies = node.getContent()
    .split('Set-Cookie: ')
    .filter((a) => a !== '')
    .map((a) => `Set-Cookie: ${a}`)
    .map(formatCookie)
    .join('');

  return slide('listing', node, `${title}
<pre class="codeBlock">
${cookies}
</pre>`);
};
