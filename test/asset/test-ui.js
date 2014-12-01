;(function(window) {
  'use strict';

  /** The base path of the Lo-Dash builds. */
  var basePath = '../';

  /** The Lo-Dash build to load. */
  var build = (build = /build=([^&]+)/.exec(location.search)) && decodeURIComponent(build[1]);

  /** The module loader to use. */
  var loader = (loader = /loader=([^&]+)/.exec(location.search)) && decodeURIComponent(loader[1]);

  /** The `ui` object. */
  var ui = {};

  /*--------------------------------------------------------------------------*/

  /**
   * Registers an event listener on an element.
   *
   * @private
   * @param {Element} element The element.
   * @param {string} eventName The name of the event.
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

  // Initialize controls.
  addListener(window, 'load', function() {
    function eventHandler(event) {
      var buildIndex = buildList.selectedIndex,
          loaderIndex = loaderList.selectedIndex,
          search = location.search.replace(/^\?|&?(?:build|loader)=[^&]*&?/g, '');

      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      location.href =
        location.href.split('?')[0] + '?' +
        (search ? search + '&' : '') +
        'build=' + (buildIndex < 0 ? build : buildList[buildIndex].value) + '&' +
        'loader=' + (loaderIndex < 0 ? loader : loaderList[loaderIndex].value);
    }

    function init() {
      var toolbar = document.getElementById('qunit-testrunner-toolbar');
      if (!toolbar) {
        setTimeout(init, 15);
        return;
      }
      toolbar.appendChild(span1);
      toolbar.appendChild(span2);

      buildList.selectedIndex = (function() {
        switch (build) {
          case 'lodash-compat':         return 1;
          case 'lodash-modern-dev':     return 2;
          case 'lodash-modern':         return 3;
          case 'lodash-custom-dev':     return 4;
          case 'lodash-custom':         return 5;
          case 'lodash-compat-dev':
          case null:                    return 0;
        }
        return -1;
      }());

      loaderList.selectedIndex = (function() {
        switch (loader) {
          case 'curl':      return 1;
          case 'dojo':      return 2;
          case 'requirejs': return 3;
          case 'none':
          case null:        return 0;
        }
        return -1;
      }());

      addListener(buildList, 'change', eventHandler);
      addListener(loaderList, 'change', eventHandler);
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

    setTimeout(function() {
      ui.timing.loadEventEnd = +new Date;
    }, 1);

    init();
  });

  // Used to indicate that Lo-Dash is in strict mode.
  ui.isStrict = /\b(?:lodash-es6|transpiled)\b/.test([location.pathname, location.search]);

  // Used to indicate testing a foreign file.
  ui.isForeign = RegExp('^(\\w+:)?//').test(build);

  // Used to indicate testing a modularized build.
  ui.isModularize = /\b(?:commonjs|(index|main)\.js|lodash-(?:amd|es6|node)|modularize|npm|transpiled)\b/.test([location.pathname, location.search]);

  // Used to indicate testing in Sauce Labs' automated test cloud.
  ui.isSauceLabs = location.port == '9001';

  // The Lo-Dash build file path.
  ui.buildPath = (function() {
    var result;
    switch (build) {
      case 'lodash-compat':         result = 'dist/lodash.compat.min.js'; break;
      case 'lodash-modern-dev':     result = 'dist/lodash.js'; break;
      case 'lodash-modern':         result = 'dist/lodash.min.js'; break;
      case 'lodash-custom-dev':     result = 'lodash.custom.js'; break;
      case 'lodash-custom':         result = 'lodash.custom.min.js'; break;
      case null:                    build  = 'lodash-compat-dev';
      case 'lodash-compat-dev':     result = 'lodash.js'; break;
      default:                      return build;
    }
    return basePath + result;
  }());

  // The module loader file path.
  ui.loaderPath = (function() {
    var result;
    switch (loader) {
      case 'curl':      result = 'node_modules/curl-amd/dist/curl-kitchen-sink/curl.js'; break;
      case 'dojo':      result = 'node_modules/dojo/dojo.js'; break;
      case 'requirejs': result = 'node_modules/requirejs/require.js'; break;
      case null:        loader = 'none'; return '';
      default:          return loader;
    }
    return basePath + result;
  }());

  ui.urlParams = { 'build': build, 'loader': loader };
  ui.timing = { 'loadEventEnd': 0 };

  window.ui = ui;

}(this));
