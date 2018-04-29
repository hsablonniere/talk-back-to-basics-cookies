'use strict';

const _ = require('lodash');
const parser = require('postcss-selector-parser');

const processor = parser();

function containsOnlyTagsClassesAndSimpleAttributes (selector) {
  return selector.every((node) => {
    return ['tag', 'id', 'class'].includes(node.type)
      // only attributes with = or valueless attributes for now
      || (node.type === 'attribute' && (node.operator === '=' || node.operator == null));
  });
}

function parseSelectors (selectors) {

  return processor.astSync(selectors)
    .filter((selector) => containsOnlyTagsClassesAndSimpleAttributes(selector))
    .map((selector) => {

      const selectorString = selector.toString().trim();

      // TODO error on multiple tags, is it even possible ?
      const [nodeName = null] = _(selector.nodes)
        .filter(({ type }) => type === 'tag')
        .map(({ value }) => value)
        .value();

      // TODO error on multiple ids, is it even possible ?
      const [id = null] = _(selector.nodes)
        .filter(({ type }) => type === 'id')
        .map(({ value }) => value)
        .value();

      const roles = _(selector.nodes)
        .filter(({ type }) => type === 'class')
        .map(({ value }) => value)
        .value();

      const attributes = _(selector.nodes)
        .filter(({ type }) => type === 'attribute')
        .map((attr) => {
          // why raws does not work?
          // console.log(attr.raws.attribute)
          // console.log(attr.raws.value)
          return [attr._attribute, attr._value || null];
        })
        .fromPairs()
        .value();

      return { nodeName, id, roles, attributes };
    });
}

module.exports = { parseSelectors };
