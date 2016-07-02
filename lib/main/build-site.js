'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    marky = require('marky-markdown'),
    path = require('path'),
    util = require('../common/util');

var basePath = path.join(__dirname, '..', '..'),
    docPath = path.join(basePath, 'doc'),
    readmePath = path.join(docPath, 'README.md');

function build(type) {
  var $ = marky(fs.readFileSync(readmePath, 'utf8'), { 'sanitize': false }),
      $header = $('h1').first().remove(),
      version = _.trim($header.find('span').first().text());

  $('h4').each(function() {
    $(this)
      .attr('class', null)
      .attr('id', null)
      .find('a').each(function() {
        var $this = $(this);
        $this.replaceWith($this.text());
      });
  });

  var html = $.html().replace(/(<)!--\s*|\s*--(>)/g, '$1$2');

  html = [
    '---',
    'id: docs',
    'layout: docs',
    'title: Lodash Documentation',
    'version: ' + (version || null),
    '---',
    html,
  ].join('\n');

  fs.writeFile(path.join(docPath, version + '.html'), html, util.pitch);
}

build();
