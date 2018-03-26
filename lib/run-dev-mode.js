'use strict';

const bs = require('browser-sync').create();
const chokidar = require('chokidar');
const { buildSlideDeck } = require('./build-slide-deck');
const { buildNotes } = require('./build-notes');
const fs = require('fs-extra');

const port = 8080;
bs.init({
  port,
  server: './build',
  ghostMode: false,
  open: false,
  notify: false,
  reloadDebounce: 500,
});

let subdomain = process.cwd()
  .toLowerCase()
  .replace(require('os').homedir(), '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/-$/g, '')
  .replace(/^-/g, '');

console.log(`http://${subdomain}.localhost:${port}\n`)

const watcher = chokidar.watch(['./src', './build'], {
  persistent: true,
});

watcher.on('change', (path, stats) => {
  if (path === 'src/slide-deck.adoc' || path.startsWith('src/templates')) {
    buildSlideDeck();
    return;
  }
  if (path === 'src/notes/story.adoc') {
    buildNotes();
    return;
  }
  if (path.endsWith('___jb_tmp___')) {
    return;
  }
  if (path.startsWith('src/css')
    || path.startsWith('src/fonts')
    || path.startsWith('src/img')
    || path.startsWith('src/js')
    || path.startsWith('src/videos')) {
    const dstpath = path.replace(/^src\//, 'build/');
    setTimeout(() => fs.copy(path, dstpath, (err) => console.log(err)), 500);
    return;
  }
  if (path.startsWith('build/')) {
    bs.reload(path);
    return;
  }
});
