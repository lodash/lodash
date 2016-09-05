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

const hlSources = [
  'highlight',
  'source',
  'text'
];

const hlTypes = [
  'html',
  'js',
  'shell'
];

/**
 * Converts Lodash method references into documentation links.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function autoLink($) {
  $('.doc-container code').each(function() {
    const $code = $(this);
    const html = $code.html();
    if (/^_\.\w+$/.test(html)) {
      const id = html.split('.')[1];
      $code.replaceWith(`<a href="#${ id }"><code>_.${ id }</code></a>`);
    }
  });
}

/**
 * Removes horizontal rules from the document.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function removeHorizontalRules($) {
  $('hr').remove();
}

/**
 * Removes marky-markdown specific ids and class names.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function removeMarkyAttributes($) {
  $('[id^="user-content-"]')
    .attr('class', null)
    .attr('id', null);

  $(':header:not(h3) > a').each(function() {
    const $a = $(this);
    $a.replaceWith($a.html());
  });
}

/**
 * Renames "_" id and anchor references to "lodash".
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function renameLodashId($) {
  $('#_').attr('id', 'lodash');
  $('[href="#_"]').attr('href', '#lodash');
}

/**
 * Repairs broken marky-markdown headers.
 * See https://github.com/npm/marky-markdown/issues/217 for more details.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function repairMarkyHeaders($) {
  $('p:empty + h3').prev().remove();

  $('h3 ~ p:empty').each(function() {
    const $p = $(this);
    let node = this.prev;
    while ((node = node.prev) && node.name != 'h3' && node.name != 'p') {
      $p.prepend(node.next);
    }
  });

  $('h3 code em').parent().each(function() {
    const $code = $(this);
    $code.html($code.html().replace(/<\/?em>/g, '_'));
  });
}

/**
 * Cleans up highlights blocks by removing extraneous class names and elements.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function tidyHighlights($) {
  // Remove extraneous class names.
  $('.highlight [class]').each(function() {
    const $element = $(this);
    const classes = $element.attr('class').split(' ');
    if (!_.isEmpty(_.intersection(classes, hlSources)) &&
        !_.isEmpty(_.intersection(classes, hlTypes))) {
      return;
    }
    const attr = _.intersection(classes, highlights).join(' ');
    $element.attr('class', attr || null);
  });
  // Unwrap elements containing only text.
  $('.highlight :not([class])').each(function() {
    let element = $(this);
    while (element && !element.children.length) {
      const $element = $(element);
      $element.replaceWith($element.text());
      element = element.parent;
    }
  });
  // Collapse comments.
  $('.highlight [class~="comment"] > [class~="comment"]').each(function() {
    const $parent = $(this).parent();
    $parent.text($parent.text());
  });
}

/*----------------------------------------------------------------------------*/

/**
 * Creates the documentation HTML.
 *
 * @private
 */
function build() {
  const markdown = fs
    // Load markdown.
    .readFileSync(readmePath, 'utf8')
    // Uncomment docdown HTML hints.
    .replace(/(<)!--\s*|\s*--(>)/g, '$1$2');

  const $ = marky(markdown, { 'sanitize': false });
  const $header = $('h1').first().remove();
  const version = _.trim($header.find('span').first().text()).slice(1);

  // Auto-link Lodash method references.
  autoLink($);
  // Rename "_" id references to "lodash".
  renameLodashId($);
  // Remove docdown horizontal rules.
  removeHorizontalRules($);
  // Remove marky-markdown attribute additions.
  removeMarkyAttributes($);
  // Repair marky-markdown wrapping around headers.
  repairMarkyHeaders($);
  // Cleanup highlights.
  tidyHighlights($);

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
