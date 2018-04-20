'use strict';

const url = require('url');
const tldjs = require('tldjs');
const highlightjs = require('highlight.js');

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

module.exports = (node) => {

  const attrs = node.getAttributes();
  const title = node.getTitle()
    ? `<div class="title ${attrs.language === 'url' ? 'title--url' : ''}">${node.getTitle()}</div>`
    : '';

  if (attrs.language === 'cookies') {

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
  }

  if (attrs.language === 'url') {

    const urls = node.getContent()
      .split('\n')
      .map((line, index) => {
        const wrong = line.startsWith('! ');
        const withCookies = line.startsWith('V ');
        const theUrl = line.replace(/^(!|V) /, '');
        const parsedUrl = url.parse(theUrl);
        const parsedTld = tldjs.parse(theUrl);

        return [
          `<span data-url-line="${index}" class="${wrong ? `url--wrong` : ''} ${withCookies ? `url--withCookies` : ''}">`,
          `<span class="url-protocol"><span class="url--label">protocole</span>${parsedUrl.protocol.replace(':', '')}</span>://`,
          `<span class="url-host"><span class="url--label">hôte</span>`,
          parsedTld.subdomain ? `<span class="url-subdomain"><span class="url--label">sous-domaine</span>${parsedTld.subdomain}</span>.` : '',
          `<span class="url-domain"><span class="url--label">domaine</span>`,
          `<span class="url-domainPrefix">${parsedTld.domain.replace('.' + parsedTld.publicSuffix, '')}</span>`,
          `.<span class="url-domainSuffix"><span class="url--label">${attrs.suffix || 'suffixe public'}</span>${parsedTld.publicSuffix}</span>`,
          `</span>`,
          `</span>`,
          parsedUrl.port ? `:<span class="url-port"><span class="url--label">port</span>${parsedUrl.port}</span>` : '',
          `<span class="url-path"><span class="url--label">path</span>${parsedUrl.pathname}</span>`,
          `</span>`,
        ].join('');
      })
      .join('\n');

    const setCookie = (attrs.setCookie != null)
      ? `<pre class="codeBlock">${formatCookie('Set-Cookie: ' + attrs.setCookie)}</pre>`
      : '';

    return slide('listing', node, `${title}
${setCookie}
<pre class="codeBlock">
${urls}
</pre>`);
  }

  return slide('listing', node, `${title}
<pre class="codeBlock" data-lang="${attrs.language}">
${highlightjs.highlight(attrs.language, node.getContent()).value}
</pre>`);
};
