;(function(window) {
  'use strict';

  /** `QUnit.addEvent` shortcut */
  var addEvent = QUnit.addEvent;

  /** The Lo-Dash build to load */
  var build = (/build=([^&]+)/.exec(location.search) || [])[1];

  /** A flag to determine if RequireJS should be loaded */
  var norequire = /[?&]norequire=true(?:&|$)/.test(location.search);

  /** The `ui` object */
  var ui = {};

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash build file path
  ui.buildPath = (function() {
    switch (build) {
      case 'lodash-compat':     return 'dist/lodash.compat.min.js';
      case 'lodash-modern-dev': return 'dist/lodash.js';
      case 'lodash-modern':     return 'dist/lodash.min.js';
      case 'lodash-legacy':     return 'dist/lodash.legacy.min.js';
      case 'lodash-mobile':     return 'dist/lodash.mobile.min.js';
      case 'lodash-underscore': return 'dist/lodash.underscore.min.js';
      case 'lodash-custom-dev': return 'lodash.custom.js';
      case 'lodash-custom':     return 'lodash.custom.min.js';
    }
    return 'lodash.js';
  }());

  // assign `QUnit.urlParams` properties
  QUnit.extend(QUnit.urlParams, {
    'build': build,
    'norequire': norequire
  });

  // initialize controls
  addEvent(window, 'load', function() {
    function eventHandler(event) {
      var search = location.search.replace(/^\?|&?(?:build|norequire)=[^&]*&?/g, '');
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      location.href =
        location.href.split('?')[0] + '?' +
        (search ? search + '&' : '') +
        'build=' + buildList[buildList.selectedIndex].value +
        (checkbox.checked ? '&norequire=true' : '');
    }

    function init() {
      var toolbar = document.getElementById('qunit-testrunner-toolbar');
      if (toolbar) {
        toolbar.appendChild(span1);
        toolbar.appendChild(span2);

        buildList.selectedIndex = (function() {
          switch (build) {
            case 'lodash-compat':     return 1;
            case 'lodash-modern-dev': return 2;
            case 'lodash-modern':     return 3;
            case 'lodash-legacy':     return 4;
            case 'lodash-mobile':     return 5;
            case 'lodash-underscore': return 6;
            case 'lodash-custom-dev': return 7;
            case 'lodash-custom':     return 8;
          }
          return 0;
        }());

        checkbox.checked = norequire;
        addEvent(checkbox, 'click', eventHandler);
        addEvent(buildList, 'change', eventHandler);
      }
      else {
        setTimeout(init, 15);
      }
    }

    var span1 = document.createElement('span');
    span1.innerHTML =
      '<input id="qunit-norequire" type="checkbox">' +
      '<label for="qunit-norequire">No RequireJS</label>';

    var span2 = document.createElement('span');
    span2.style.cssText = 'float:right';
    span2.innerHTML =
      '<label for="qunit-build">Build: </label>' +
      '<select id="qunit-build">' +
      '<option value="lodash-compat-dev">Lo-Dash (compat development)</option>' +
      '<option value="lodash-compat">Lo-Dash (compat production)</option>' +
      '<option value="lodash-modern-dev">Lo-Dash (modern development)</option>' +
      '<option value="lodash-modern">Lo-Dash (modern production)</option>' +
      '<option value="lodash-legacy">Lo-Dash (legacy)</option>' +
      '<option value="lodash-mobile">Lo-Dash (mobile)</option>' +
      '<option value="lodash-underscore">Lo-Dash (underscore)</option>' +
      '<option value="lodash-custom-dev">Lo-Dash (custom development)</option>' +
      '<option value="lodash-custom">Lo-Dash (custom production)</option>' +
      '</select>';

    var checkbox = span1.firstChild,
        buildList = span2.lastChild;

    init();
  });

  // expose `ui`
  window.ui = ui;

}(this));
