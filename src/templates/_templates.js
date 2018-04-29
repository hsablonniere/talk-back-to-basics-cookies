'use strict';

const _ = require('lodash');

const { parseSelectors } = require('../../lib/css-parser');

const document = require('./_document');
const notes = require('./_notes');

const blank = require('./blank');
const cookies = require('./cookies');
const dialogue = require('./dialogue');
const listing = require('./listing');
const location = require('./location');
const media = require('./media');
const poster = require('./poster');
const question = require('./question');
const section = require('./section');
const screenshot = require('./screenshot');
const text = require('./text');
const url = require('./url');
const video = require('./video');
const warning = require('./warning');

const templates = {
  'admonition[name=warning]': warning,
  document,
  'image[url]': screenshot,
  image: media,
  'listing[language=cookies]': cookies,
  'listing[language=url]': url,
  listing,
  'paragraph[slide=poster]': poster,
  'paragraph[slide=question]': question,
  'paragraph[slide=text]': text,
  'paragraph[slide=blank]': blank,
  'paragraph[slide=location]': location,
  // we should support "paragraph:not([slide])"
  'paragraph': notes,
  // pass through
  preamble: ({ node }) => node.getContent(),
  'quote[attribution=Watson], quote[attribution=Sherlock]': dialogue,
  section: (ctx) => section(ctx) + ctx.node.getContent(),
  video,
};

const allParsedSelectors = _.mapValues(templates, (v, selectors) => parseSelectors(selectors));

function matchesParsedSelector (parsedSelector, node) {

  if (parsedSelector.nodeName != null && parsedSelector.nodeName !== node.node_name) {
    return false;
  }

  const attrsEntries = Object.entries(parsedSelector.attributes);
  const nodeAttrs = node.getAttributes();

  if (attrsEntries.length > 0) {
    const attrMismatch = attrsEntries.some(([k, v]) => {
      return v != null && nodeAttrs[k] !== v
        || v == null && !nodeAttrs.hasOwnProperty(k);
    });
    if (attrMismatch) {
      return false;
    }
  }

  return true;
}

function globalHandler (ctx) {
  const foundEntry = Object.entries(templates).find(([selectors, templateFn]) => {
    const parsedSelectors = allParsedSelectors[selectors];
    const matches = _.some(parsedSelectors, (parsedSel) => matchesParsedSelector(parsedSel, ctx.node));
    if (matches) {
      return templateFn;
    }
  });
  if (foundEntry != null) {
    const [sel, tmplFn] = foundEntry;
    return tmplFn(ctx);
  }
  return ctx.next();
}

// grab "everything I need"
module.exports = [{
  admonition: globalHandler,
  document: globalHandler,
  image: globalHandler,
  listing: globalHandler,
  open: globalHandler,
  paragraph: globalHandler,
  preamble: globalHandler,
  quote: globalHandler,
  section: globalHandler,
  video: globalHandler,
}];
