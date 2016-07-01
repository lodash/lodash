'use strict';

const fs = require('fs'),
      marky = require('marky-markdown'),
      path = require('path'),
      _ = require('lodash');

const basePath = path.join(__dirname, '..', '..'),
      docPath = path.join(basePath, 'doc'),
      readmePath = path.join(docPath, 'README.md');

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(type) {
  let html =
    marky(fs.readFileSync(readmePath, 'utf8'), { sanitize: false });
  const header = html('h1').first();
  const version = _.trim(header.find('span').first().text());

  header.remove();
  html = html.html();
  html = html.replace(/<!--\s*/g, '<');
  html = html.replace(/-->/g, '>');

  html = [
      '---',
      'id: docs',
      'layout: docs',
      'title: lodash Documentation',
      `version: ${version ? version : null}`,
      '---',
      html,
    ].join('\n');

  // File output
  fs.writeFile(path.join(docPath, `${version}.html`), html, onComplete);
}

build();