'use strict';

const _ = require('lodash');
const fs = require('fs');
const marky = require('marky-markdown');
const path = require('path');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const docPath = path.join(basePath, 'doc');
const readmePath = path.join(docPath, 'README.md');

const highlights = [
  'comment',
  'constant',
  'delimiter',
  'html',
  'js',
  'method',
  'modifier',
  'numeric',
  'shell',
  'source',
  'string',
  'text',
  'type'
];

function build(type) {
  const markdown = fs
    // Load markdown.
    .readFileSync(readmePath, 'utf8')
    // Uncomment docdown HTML hints.
    .replace(/(<)!--\s*|\s*--(>)/g, '$1$2');

  const $ = marky(markdown, { 'sanitize': false });
  const $header = $('h1').first().remove();
  const version = _.trim($header.find('span').first().text()).slice(1);

  // Remove docdown horizontal rules.
  $('hr').remove();

  // Remove marky-markdown additions.
  $('[id^="user-content-"]')
    .attr('class', null)
    .attr('id', null);

  $(':header:not(h3) > a').each(function() {
    const $a = $(this);
    $a.replaceWith($a.html());
  });

  // Fix marky-markdown wrapping around headers.
  $('p:empty + h3').prev().remove();

  $('h3 ~ p:empty').each(function() {
    const $p = $(this);
    let node = this.previousSibling;

    while ((node = node.previousSibling) && node.name != 'h3' && node.name != 'p') {
      $p.prepend(node.nextSibling);
    }
  });

  $('h3 code em').parent().each(function() {
    const $code = $(this);
    $code.html($code.html().replace(/<\/?em>/g, '_'));
  });

  // Cleanup highlights class names.
  $('.highlight [class]').each(function() {
    const $el = $(this);
    const className = _.intersection($el.attr('class').split(/\s+/), highlights).join(' ');

    $el.attr('class', className || null);
  });

  const html = [
    // Append YAML front matter.
    '---',
    'id: docs',
    'layout: docs',
    'title: Lodash Documentation',
    'version: ' + (version || null),
    '---',
    '',
    // Wrap in raw tags to avoid Liquid template tag processing.
    '{% raw %}',
    _.trim($.html()),
    '{% endraw %}',
    ''
  ].join('\n');

  fs.writeFile(path.join(docPath, version + '.html'), html, util.pitch);
}

build();
