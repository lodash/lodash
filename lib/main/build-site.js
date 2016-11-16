'use strict';

const _ = require('lodash');
const cheerio = require('cheerio');
const fs = require('fs');
const marky = require('marky-markdown');
const path = require('path');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const docPath = path.join(basePath, 'doc');
const readmePath = path.join(docPath, 'README.md');

const highlights = {
  'html': [
    'string'
  ],
  'js': [
    'comment',
    'console',
    'delimiter',
    'method',
    'modifier',
    'name',
    'numeric',
    'string',
    'support',
    'type'
  ]
};

const exts = _.keys(highlights);

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
  $('.highlight').each(function() {
    let $spans;
    const $parent = $(this);
    const classes = $parent.find('.source,.text').first().attr('class').split(' ');
    const ext = _(classes).intersection(exts).last();

    $parent.addClass(ext);

    // Remove line indicators for single line snippets.
    $parent.children('pre').each(function() {
      const $divs = $(this).children('div');
      if ($divs.length == 1) {
        $divs.replaceWith($divs.html());
      }
    });
    // Remove extraneous class names.
    $parent.find('[class]').each(function() {
      const $element = $(this);
      const classes = $element.attr('class').split(' ');
      const attr = _(classes).intersection(highlights[ext]).join(' ');
      $element.attr('class', attr || null);
    });
    // Collapse nested comment highlights.
    $parent.find(`[class~="comment"]`).each(function() {
      const $element = $(this);
      $element.text($element.text().trim());
    });
    // Collapse nested string highlights.
    $parent.find(`[class~="string"]`).each(function() {
      const $element = $(this);
      $element.text($element.text());
    });
    // Collapse nested spans.
    while (($spans = $parent.find('span:not([class])')).length) {
      $spans.each(function() {
        let $span = $(this);
        while ($span[0] && $span[0].name == 'span' && !$span.attr('class')) {
          const $parent = $span.parent();
          $span.replaceWith($span.html());
          $span = $parent;
        }
      });
    }
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

  const $ = cheerio.load(marky(markdown, {
    'enableHeadingLinkIcons': false,
    'sanitize': false
  }));

  const $header = $('h1').first().remove();
  const version = $header.find('span').first().text().trim().slice(1);

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
    $.html().trim(),
    '{% endraw %}',
    ''
  ].join('\n');

  fs.writeFile(path.join(docPath, version + '.html'), html, util.pitch);
}

build();
