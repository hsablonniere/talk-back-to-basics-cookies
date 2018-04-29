'use strict';

const slide = require('./_slide');

module.exports = ({ node }) => {
  const contents = (node.blocks.length === 0)
    ? node.getContent()
    : node.blocks.map((b) => b.getContent()).join('\n');
  const question = contents
    .replace(' ?', '&nbsp;?');
  const balancedQuestion = question.includes('  ')
    ? question
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, ' ')
    : question;
  return slide('question', node, `<div class="text">${balancedQuestion}</div>`);
};
