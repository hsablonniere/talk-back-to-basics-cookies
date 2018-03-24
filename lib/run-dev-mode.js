'use strict';

const bs = require('browser-sync').create();
const chokidar = require('chokidar');
const { buildSlideDeck } = require('./build-slide-deck');
const fs = require('fs-extra');

bs.init({
  port: 8080,
  server: './build',
  ghostMode: false,
  open: false,
  notify: false,
  reloadDebounce: 500,
});

const watcher = chokidar.watch(['./src', './build'], {
  persistent: true,
});

watcher.on('change', (path, stats) => {
  if (path === 'src/slide-deck.adoc' || path.startsWith('src/templates')) {
    buildSlideDeck();
    return;
  }
  if (path.endsWith('___jb_tmp___')) {
    return;
  }
  if (path.startsWith('src/js') || path.startsWith('src/css')) {
    const dstpath = path.replace(/^src\//, 'build/');
    fs.copy(path, dstpath, (err) => console.log(err));
    return;
  }
  if (path.startsWith('build/')) {
    bs.reload(path);
    return;
  }
});
