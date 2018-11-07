'use strict';

const url = require('url');
const tldjs = require('tldjs');
const highlightjs = require('highlight.js');

const slide = require('./_slide');

function formatCookie (rawLine) {
  return rawLine
    .replace(/(Set-Cookie:)?(.*)/g, (all, sc, rest) => {
      const setCookie = (sc != null) ? `<span class="cookie">${sc}</span>` : '';
      const keyValuePairs = rest
        .split(';')
        .filter((txt) => txt !== '')
        .map((keyValue, i) => {
          const nameOrAttr = (sc != null && i === 0) ? 'name' : 'attr';
          const [k, v] = keyValue.split('=');
          const key = `${k.replace(k.trim(), '')}<span class="cookie-${nameOrAttr}-key">${k.trim()}</span>`;
          const equal = (v != null)
            ? '<span class="cookie-sign">=</span>'
            : '';
          const value = (v != null)
            ? `<span class="cookie-${nameOrAttr}-value">${v}</span>`
            : '';
          return [key, equal, value].join('');
        })
        .join(';');
      return [setCookie, keyValuePairs].join('');
    });
}

module.exports = (node) => {

  const attrs = node.getAttributes();
  const title = node.getTitle()
    ? `<div class="title ${attrs.language === 'url' ? 'title--url' : ''}">${node.getTitle()}</div>`
    : '';

  if (attrs.language === 'cookies') {

    console.log({ conent: node.getContent() });

    const cookies = node.getContent()
      .split('\n')
      .map((line) => {
        if (line.startsWith('🙈')) {
          return `<span class="invisible">${line.replace(/🙈 */, '')}</span>`;
        }
        return formatCookie(line);
      })
      .join('\n');

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
