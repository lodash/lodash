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

/**
 * Adds copy buttons to code blocks.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function addCopyButtons($) {
  let codeBlockIndex = 0;
  $('.highlight').each(function() {
    const $highlight = $(this);
    const $pre = $highlight.find('pre').first();
    if ($pre.length) {
      codeBlockIndex++;
      const codeId = `code-block-${codeBlockIndex}`;
      $pre.attr('id', codeId);
      
      // Create copy button
      const $copyButton = $('<button>')
        .addClass('copy-code-btn')
        .attr('data-clipboard-target', `#${codeId}`)
        .attr('aria-label', 'Copy code')
        .html('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H10.5C11.0523 13.5 11.5 13.0523 11.5 12.5V10.5M5.5 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V10.5M5.5 2.5V5.5H8.5M13.5 10.5H10.5M10.5 10.5V13.5M10.5 10.5H8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      
      // Wrap highlight in a container for positioning
      if (!$highlight.parent().hasClass('code-block-wrapper')) {
        $highlight.wrap('<div class="code-block-wrapper"></div>');
      }
      $highlight.after($copyButton);
    }
  });
}

/**
 * Adds dark mode toggle button and styles.
 *
 * @private
 * @param {Object} $ The Cheerio object.
 */
function addDarkModeToggle($) {
  // Create dark mode toggle button
  const $toggle = $('<button>')
    .addClass('dark-mode-toggle')
    .attr('aria-label', 'Toggle dark mode')
    .attr('title', 'Toggle dark mode')
    .html('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="dark-icon"><path d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 15.657L16.97 16.97M3.343 3.343L4.657 4.657M15.657 4.343L16.97 3.03M3.343 16.657L4.657 15.343" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/></svg><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="light-icon"><path d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z" fill="currentColor"/></svg>');
  
  // Add dark mode toggle button at the beginning of body
  const $body = $('body');
  if ($body.length) {
    $body.prepend($toggle);
  } else {
    // If no body tag, add to the root
    const $root = $('*').first();
    $root.prepend($toggle);
  }
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
    .replace(/(<)!--\s*|\s*--(>)/g, '$1$2')
    // Convert source and npm package links to anchors.
    .replace(/\[source\]\(([^)]+)\) \[npm package\]\(([^)]+)\)/g, (match, href1, href2) =>
      `<p><a href="${ href1 }">source</a> <a href="${ href2 }">npm package</a></p>`
    );

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
  // Add copy buttons to code blocks.
  addCopyButtons($);
  // Add dark mode toggle.
  addDarkModeToggle($);

  // Get the HTML content
  const contentHtml = $.html().trim();
  
  // Create the dark mode CSS and JavaScript
  const darkModeCSS = `
<style id="dark-mode-styles">
/* Dark Mode Styles */
body.dark-mode {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode h4,
body.dark-mode h5,
body.dark-mode h6 {
  color: #ffffff;
}

body.dark-mode a {
  color: #4a9eff;
}

body.dark-mode a:hover {
  color: #6bb3ff;
}

body.dark-mode code {
  background-color: #2d2d2d;
  color: #f8f8f2;
}

body.dark-mode .highlight {
  background-color: #2d2d2d;
}

body.dark-mode .highlight pre {
  background-color: #2d2d2d;
  color: #f8f8f2;
}

/* Dark Mode Toggle Button */
.dark-mode-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

body.dark-mode .dark-mode-toggle {
  background: #2d2d2d;
  border-color: #444;
  color: #e0e0e0;
}

body.dark-mode .dark-mode-toggle:hover {
  background: #3d3d3d;
}

.dark-mode-toggle .light-icon {
  display: none;
}

body.dark-mode .dark-mode-toggle .dark-icon {
  display: none;
}

body.dark-mode .dark-mode-toggle .light-icon {
  display: block;
}

/* Copy Code Button */
.code-block-wrapper {
  position: relative;
}

.copy-code-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
}

.code-block-wrapper:hover .copy-code-btn {
  opacity: 1;
  pointer-events: all;
}

.copy-code-btn:hover {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.copy-code-btn:active {
  transform: scale(0.95);
}

.copy-code-btn svg {
  width: 16px;
  height: 16px;
  color: #333;
}

body.dark-mode .copy-code-btn {
  background: rgba(45, 45, 45, 0.9);
  border-color: #555;
}

body.dark-mode .copy-code-btn:hover {
  background: rgba(55, 55, 55, 0.95);
}

body.dark-mode .copy-code-btn svg {
  color: #e0e0e0;
}

.copy-code-btn.copied {
  background: #4caf50;
  border-color: #4caf50;
  color: white;
}

.copy-code-btn.copied svg {
  color: white;
}

body.dark-mode .copy-code-btn.copied {
  background: #4caf50;
  border-color: #4caf50;
}
</style>`;

  const darkModeJS = `
<script>
(function() {
  // Dark Mode Toggle
  function initDarkMode() {
    const toggle = document.querySelector('.dark-mode-toggle');
    if (!toggle) return;
    
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('lodash-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
    }
    
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('lodash-theme', isDark ? 'dark' : 'light');
    });
  }
  
  // Copy Code Button
  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-code-btn');
    
    copyButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-clipboard-target');
        const codeBlock = document.querySelector(targetId);
        
        if (!codeBlock) return;
        
        // Get text content from code block
        const text = codeBlock.textContent || codeBlock.innerText;
        
        // Use Clipboard API if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function() {
            showCopyFeedback(button);
          }).catch(function(err) {
            fallbackCopyText(text, button);
          });
        } else {
          fallbackCopyText(text, button);
        }
      });
    });
  }
  
  function fallbackCopyText(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopyFeedback(button);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  function showCopyFeedback(button) {
    const originalHTML = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    setTimeout(function() {
      button.classList.remove('copied');
      button.innerHTML = originalHTML;
    }, 2000);
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initDarkMode();
      initCopyButtons();
    });
  } else {
    initDarkMode();
    initCopyButtons();
  }
})();
</script>`;

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
    darkModeCSS,
    contentHtml,
    darkModeJS,
    '{% endraw %}',
    ''
  ].join('\n');

  fs.writeFile(path.join(docPath, version + '.html'), html, util.pitch);
}

build();
