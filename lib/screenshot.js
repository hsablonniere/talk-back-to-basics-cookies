'use strict';

const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const defaultViewport = {
  width: 1280,
  height: 960,
  isLandscape: true,
};

function wait (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function takeScreenshot (url, customViewport) {

  const viewport = Object.assign({}, defaultViewport);
  Object.assign(viewport, customViewport);

  viewport.deviceScaleFactor = 1920 / viewport.width;

  const safeUrl = url
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/-$/, '');
  const filename = `./src/img/screenshots/${safeUrl}.jpg`;

  const exists = await fs.pathExists(filename);
  if (exists) {
    console.log(`already exists: ${filename}`);
    return Promise.resolve();
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url);

  if (url.includes('github.com')) {
    console.log('inject');
    await page.addStyleTag({
      content: `.commit-tease, .file-wrap, .signup-prompt-bg { display: none }`,
    });
  }

  if (url.includes('caniuse.com')) {

    const jsonRect = await page.evaluate(() => localStorage.setItem('config-agents', 'ie,edge,firefox,chrome,safari,ios_saf,and_chr,samsung'));
    await page.reload();
    await wait(1000);

    console.log('inject');
    await page.addStyleTag({
      content: `.feature-title { font-weight: bold; font-size: 3em; }
.support-list h4 { height:55px; font-weight: bold; font-size: 1.2em; }
.stat-cell { font-weight: bold; font-size: 1.6em; }
.view-mode-control { display: none; }`,
    });

    const element = await page.$('.feature-block');
    await element.screenshot({ path: filename });
  }
  else {
    await page.screenshot({ path: filename });
  }

  console.log(`saving file to ${filename}`);

  await browser.close();
}

const pages = require('../src/img/screenshots/pages.json');

const allPages = pages.map((page) => {

  const url = (typeof page === 'string')
    ? page
    : page.url;

  const viewport = (typeof page === 'string')
    ? {}
    : page.viewport;

  console.log(`screenshot:     ${url}`);
  return takeScreenshot(url, viewport);
});

Promise.all(allPages)
  .then(() => console.log('done'))
  .catch(console.error);

// module.exports = { takeScreenshot };
