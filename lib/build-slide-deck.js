'use strict';

const path = require('path');

const adt = require('asciidoctor.js-pug');
const asciidoctor = require('asciidoctor.js')();
const fs = require('fs-extra');

async function buildSlideDeck () {

  const templatesPath = path.resolve(__dirname, '../src/templates');
  // TODO: move this elswhere
  for (let key in require.cache) {
    if (key.startsWith(templatesPath)) {
      delete require.cache[key];
    }
  }
  const templates = require('../src/templates/_templates');

  const asciidoc = await fs.readFile('src/slide-deck.adoc', 'utf-8');

  const html = asciidoctor.convert(asciidoc, {
    header_footer: 'true',
    sourcemap: 'true',
    templates,
  });
  return fs.writeFile('build/index.html', html);
}

module.exports = { buildSlideDeck };
