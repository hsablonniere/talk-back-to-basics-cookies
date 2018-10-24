'use strict';

const document = require('./_document');
const notes = require('./_notes');

const blank = require('./blank');
const dialogue = require('./dialogue');
const listing = require('./listing');
const location = require('./location');
const media = require('./media');
const poster = require('./poster');
const posterBristol = require('./poster-bristol');
const question = require('./question');
const section = require('./section');
const text = require('./text');
const video = require('./video');
const warning = require('./warning');

module.exports = {
  admonition: (node) => {
    if (node.style === 'WARNING') {
      return warning(node);
    }
  },
  document: node => document(node),
  image: (node) => media(node),
  listing: (node) => listing(node),
  paragraph: (node) => {
    const attrs = node.getAttributes();
    if (attrs.slide === 'poster') {
      return poster(node);
    }
    if (attrs.slide === 'poster-bristol') {
      return posterBristol(node);
    }
    if (attrs.slide === 'question') {
      return question(node);
    }
    if (attrs.slide === 'text') {
      return text(node);
    }
    if (attrs.slide === 'blank') {
      return blank(node);
    }
    if (attrs.slide === 'location') {
      return location(node);
    }
    if (Object.keys(attrs).length === 0) {
      return notes(node);
    }
  },
  // pass through
  preamble: (node) => node.getContent(),
  quote: (node) => {
    const attrs = node.getAttributes();
    const attribution = attrs.attribution.toLowerCase();
    if (attribution === 'sherlock' || attribution === 'watson') {
      return dialogue(node);
    }
  },
  section: (node) => section(node) + node.getContent(),
  video: (node) => video(node),
};
