'use strict';

const _ = require('lodash');
const fs = require('fs');
const marky = require('marky-markdown');
const minify = require('html-minifier').minify;
const path = require('path');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const docPath = path.join(basePath, 'doc');
const readmePath = path.join(docPath, 'README.md');

const highlights = [
  'comment',
  'constant',
  'delimiter',
  'method',
  'modifier',
  'numeric',
  'string',
  'type'
];

const hlTypes = [
  'html',
  'js',
  'shell'
];

const hlSources = [
  'highlight',
  'source',
  'text'
];

function build(type) {
  const markdown = fs
    // Load markdown.
    .readFileSync(readmePath, 'utf8')
    // Uncomment docdown HTML hints.
    .replace(/(<)!--\s*|\s*--(>)/g, '$1$2')
    // Escape HTML markup in usage examples.
    .replace(/```js[\s\S]+?```/g, m => m.replace(/</g, '&lt;').replace(/>/g, '&gt;'));

  const $ = marky(markdown, { 'sanitize': false });
  const $header = $('h1').first().remove();
  const version = _.trim($header.find('span').first().text()).slice(1);

  // Rename "_" id references to "lodash".
  $('#_').attr('id', 'lodash');
  $('[href="#_"]').attr('href', '#lodash');

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
    const names = $el.attr('class').split(/\s+/);
    const attr = _.intersection(names, highlights).join(' ');

    if (!_.isEmpty(_.intersection(names, hlSources)) &&
        !_.isEmpty(_.intersection(names, hlTypes))) {
      return;
    }
    $el.attr('class', attr || null);
  });

  // Unwrap elements containing only text.
  $('.highlight :not([class])').each(function() {
    const $el = $(this);
    if (_.every($(el).children(), ['type', 'text'])) {
      $el.replaceWith($el.text());
    }
  });

  // Consolidate hightlights comments.
  $('.highlight [class~="comment"] > [class~="comment"]').each(function() {
    const $parent = $(this).parent();
    $parent.text($parent.text());
  });

  // Minify hightlights snippets.
  $('.highlight').each(function() {
    const $div = $(this);
    $div.html(minify($div.html(), {
      'collapseBooleanAttributes': true,
      'collapseInlineTagWhitespace': true,
      'collapseWhitespace': true,
      'removeAttributeQuotes': true,
      'removeComments': true,
      'removeEmptyAttributes': true,
      'removeEmptyElements': true,
      'removeOptionalTags': true,
      'removeRedundantAttributes': true
    })
    .replace(/(?:<span>[^<]+<\/span>){2,}/g, match =>
      match.replace(/<\/?span>/g, '')
    ));
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
