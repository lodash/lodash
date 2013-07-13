;(function(window) {
  'use strict';

  /** The base path of the builds */
  var basePath = '../';

  /** The Lo-Dash build to load */
  var build = (/build=([^&]+)/.exec(location.search) || [])[1];

  /** The module loader to use */
  var loader = (/loader=([^&]+)/.exec(location.search) || [])[1];

  /** The `ui` object */
  var ui = {};

  /*--------------------------------------------------------------------------*/

  /**
   * Registers an event listener on an element.
   *
   * @private
   * @param {Element} element The element.
   * @param {String} eventName The name of the event.
   * @param {Function} handler The event handler.
   * @returns {Element} The element.
   */
  function addListener(element, eventName, handler) {
    if (typeof element.addEventListener != 'undefined') {
      element.addEventListener(eventName, handler, false);
    } else if (typeof element.attachEvent != 'undefined') {
      element.attachEvent('on' + eventName, handler);
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose `ui.urlParams` properties
  ui.urlParams = {
    'build': build,
    'loader': loader
  };

  // expose Lo-Dash build file path
  ui.buildPath = (function() {
    var result;
    switch (build) {
      case 'lodash-compat':     result = 'dist/lodash.compat.min.js'; break;
      case 'lodash-modern-dev': result = 'dist/lodash.js'; break;
      case 'lodash-modern':     result = 'dist/lodash.min.js'; break;
      case 'lodash-legacy':     result = 'dist/lodash.legacy.min.js'; break;
      case 'lodash-mobile':     result = 'dist/lodash.mobile.min.js'; break;
      case 'lodash-underscore': result = 'dist/lodash.underscore.min.js'; break;
      case 'lodash-custom-dev': result = 'lodash.custom.js'; break;
      case 'lodash-custom':     result = 'lodash.custom.min.js'; break;
      case 'lodash-compat-dev':
      case 'lodash-modularize':
      case  undefined:          result = 'lodash.js'; break;
      default:                  return build;
    }
    return basePath + result;
  }());

  // expose module loader file path
  ui.loaderPath = (function() {
    var result;
    switch (loader) {
      case 'curl':      result = 'vendor/curl/src/curl.js'; break;
      case 'dojo':      result = 'vendor/dojo/dojo.js'; break;
      case 'requirejs':
      case  undefined:  result = 'vendor/requirejs/require.js'; break;
      default:          return loader;
    }
    return basePath + result;
  }());

  // initialize controls
  addListener(window, 'load', function() {
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
            case 'lodash-compat-dev':
            case undefined:           return 0;
          }
          return -1;
        }());

        loaderList.selectedIndex = (function() {
          switch (loader) {
            case 'none':      return 0
            case 'curl':      return 1;
            case 'dojo':      return 2;
            case 'requirejs':
            case undefined:   return 3;
          }
          return -1;
        }());

        addListener(buildList, 'change', eventHandler);
        addListener(loaderList, 'change', eventHandler);
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
