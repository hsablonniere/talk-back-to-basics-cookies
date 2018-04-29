'use strict';

const slide = require('./_slide');

module.exports = ({ node }) => {

  const attrs = node.getAttributes();
  const title = node.getTitle()
    ? `<div class="title ${attrs.language === 'url' ? 'title--url' : ''}">${node.getTitle()}</div>`
    : '';

  let highlightedCode;
  try {
    highlightedCode = highlightjs.highlight(attrs.language, node.getContent());
    highlightedCode = highlightedCode.value;
  }
  catch (e) {
    highlightedCode = node.getContent();
  }

  return slide('listing', node, `${title}
<pre class="codeBlock" data-lang="${attrs.language}">
${highlightedCode}
</pre>`);
};
