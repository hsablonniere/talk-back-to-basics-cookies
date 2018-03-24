'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  return `<img src="${node.target}" width="500px">`;
};
