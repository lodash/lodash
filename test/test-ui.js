;(function(window) {
  'use strict';

  /** `QUnit.addEvent` shortcut */
  var addEvent = QUnit.addEvent;

  /** The Lo-Dash build to load */
  var build = (/build=([^&]+)/.exec(location.search) || [])[1];

  /** The module loader to use */
  var loader = (/loader=([^&]+)/.exec(location.search) || [])[1];

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

  // expose module loader file path
  ui.loaderPath = (function() {
    switch (loader) {
      case 'curl': return 'vendor/curl/src/curl.js';
      case 'dojo': return 'vendor/dojo/dojo.js';
    }
    return 'vendor/requirejs/require.js';
  }());

  // assign `QUnit.urlParams` properties
  QUnit.extend(QUnit.urlParams, {
    'build': build,
    'loader': loader
  });

  // initialize controls
  addEvent(window, 'load', function() {
    function eventHandler(event) {
      var search = location.search.replace(/^\?|&?(?:build|loader)=[^&]*&?/g, '');
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      location.href =
        location.href.split('?')[0] + '?' +
        (search ? search + '&' : '') +
        'build=' + buildList[buildList.selectedIndex].value + '&' +
        'loader=' + loaderList[loaderList.selectedIndex].value;
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
            case 'lodash-modularize': return 6;
            case 'lodash-underscore': return 7;
            case 'lodash-custom-dev': return 8;
            case 'lodash-custom':     return 9;
          }
          return 0;
        }());

        loaderList.selectedIndex = (function() {
          switch (loader) {
            case 'none':     return 0
            case 'curl':     return 1;
            case 'dojo':     return 2;
          }
          return 3;
        }());

        addEvent(buildList, 'change', eventHandler);
        addEvent(loaderList, 'change', eventHandler);
      }
      else {
        setTimeout(init, 15);
      }
    }

    var span1 = document.createElement('span');
    span1.style.cssText = 'float:right';
    span1.innerHTML =
      '<label for="qunit-build">Build: </label>' +
      '<select id="qunit-build">' +
      '<option value="lodash-compat-dev">Lo-Dash (compat development)</option>' +
      '<option value="lodash-compat">Lo-Dash (compat production)</option>' +
      '<option value="lodash-modern-dev">Lo-Dash (modern development)</option>' +
      '<option value="lodash-modern">Lo-Dash (modern production)</option>' +
      '<option value="lodash-legacy">Lo-Dash (legacy)</option>' +
      '<option value="lodash-mobile">Lo-Dash (mobile)</option>' +
      '<option value="lodash-modularize">Lo-Dash (modularize)</option>' +
      '<option value="lodash-underscore">Lo-Dash (underscore)</option>' +
      '<option value="lodash-custom-dev">Lo-Dash (custom development)</option>' +
      '<option value="lodash-custom">Lo-Dash (custom production)</option>' +
      '</select>';

    var span2 = document.createElement('span');
    span2.style.cssText = 'float:right';
    span2.innerHTML =
      '<label for="qunit-loader">Loader: </label>' +
      '<select id="qunit-loader">' +
      '<option value="none">None</option>' +
      '<option value="curl">Curl</option>' +
      '<option value="dojo">Dojo</option>' +
      '<option value="requirejs">RequireJS</option>' +
      '</select>';

    var buildList = span1.lastChild,
        loaderList = span2.lastChild;

    init();
  });

  // expose `ui`
  window.ui = ui;

}(this));
