'use strict';

const path = require('path');

const fs = require('fs-extra');
const initAsciidoctorWithTemplates = require('./asciidoctor-with-templates');

function buildSlideDeck () {
  return fs.readdir('./src/templates')
    .then(async (allSlideTypes) => {

      const allTemplates = {};
      allSlideTypes.forEach((slideType) => {
        const { name } = path.parse(slideType);
        const modulePath = path.resolve(__dirname, `../src/templates/${slideType}`);
        delete require.cache[modulePath];
        allTemplates[name] = require(modulePath);
      });

      const { asciidoctor } = initAsciidoctorWithTemplates(allTemplates);
      const asciidoc = await fs.readFile('src/slide-deck.adoc', 'utf-8');

      const html = asciidoctor.convert(asciidoc, {
        header_footer: 'true',
        attributes: {
          foo: 'bar',
        },
      });
      return fs.writeFile('build/index.html', html);
    })
    .catch(console.error);
}

module.exports = { buildSlideDeck };
