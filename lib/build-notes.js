'use strict';

const path = require('path');

const fs = require('fs-extra');
const initAsciidoctor = require('asciidoctor.js');

async function buildNotes () {

  const asciidoctor = initAsciidoctor();
  const asciidoc = await fs.readFile('./src/notes/story.adoc', 'utf-8');
  const ast = asciidoctor.load(asciidoc, {});

  let parags = ast.findBy();

  const notes = {};
  parags
    .filter(({ id }) => typeof id === 'string' && !id.startsWith('_'))
    .forEach((p) => {
      notes[p.id] = p.getContent();
    });

  const json = JSON.stringify(notes);
  return fs.writeFile('build/notes.json', json);
}

module.exports = { buildNotes };
