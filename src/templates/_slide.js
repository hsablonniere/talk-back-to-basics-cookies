'use strict';

const debugNode = require('../../lib/debugNode');

function getHtmlForSlide (type, node, classes, contents) {
  // debugNode(node);
  const allClasses = [`slide`, ...classes].join(' ');
  return `<section class="${allClasses}" data-slide="${type}" data-sourceline="${node.source_location.lineno}">
  ${contents}
</section>`;
};

module.exports = (type, node, classesOrContents, contents) => {
  if (contents == null) {
    return getHtmlForSlide(type, node, [], classesOrContents);
  }
  return getHtmlForSlide(type, node, classesOrContents, contents);
};
