;(function(window) {
  'use strict';

  /** The base path of the Lo-Dash builds. */
  var basePath = '../';

  /** The Lo-Dash build to load. */
  var build = (build = /build=([^&]+)/.exec(location.search)) && decodeURIComponent(build[1]);

  /** The other library to load. */
  var other = (other = /other=([^&]+)/.exec(location.search)) && decodeURIComponent(other[1]);

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
          otherIndex = otherList.selectedIndex,
          search = location.search.replace(/^\?|&?(?:build|other)=[^&]*&?/g, '');

      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      location.href =
        location.href.split('?')[0] + '?' +
        (search ? search + '&' : '') +
        'build=' + (buildIndex < 0 ? build : buildList[buildIndex].value) + '&' +
        'other=' + (otherIndex < 0 ? other : otherList[otherIndex].value);
    }

    var span1 = document.createElement('span');
    span1.style.cssText = 'float:right';
    span1.innerHTML =
      '<label for="perf-build">Build: </label>' +
      '<select id="perf-build">' +
      '<option value="lodash-compat">Lo-Dash (compat)</option>' +
      '<option value="lodash-modern">Lo-Dash (modern)</option>' +
      '<option value="lodash-custom-dev">Lo-Dash (custom development)</option>' +
      '<option value="lodash-custom">Lo-Dash (custom production)</option>' +
      '</select>';

    var span2 = document.createElement('span');
    span2.style.cssText = 'float:right';
    span2.innerHTML =
      '<label for="perf-other">Other Library: </label>' +
      '<select id="perf-other">' +
      '<option value="underscore-dev">Underscore (development)</option>' +
      '<option value="underscore">Underscore (production)</option>' +
      '<option value="lodash-compat">Lo-Dash (compat)</option>' +
      '<option value="lodash-modern">Lo-Dash (modern)</option>' +
      '<option value="lodash-custom-dev">Lo-Dash (custom development)</option>' +
      '<option value="lodash-custom">Lo-Dash (custom production)</option>' +
      '</select>';

    var buildList = span1.lastChild,
        otherList = span2.lastChild,
        toolbar = document.getElementById('perf-toolbar');

    toolbar.appendChild(span2);
    toolbar.appendChild(span1);

    buildList.selectedIndex = (function() {
      switch (build) {
        case 'lodash-compat':     return 0;
        case 'lodash-custom-dev': return 2;
        case 'lodash-custom':     return 3;
        case 'lodash-modern':
        case null:                return 1;
      }
      return -1;
    }());

    otherList.selectedIndex = (function() {
      switch (other) {
        case 'underscore-dev':    return 0;
        case 'lodash-compat':     return 2;
        case 'lodash-modern':     return 3;
        case 'lodash-custom-dev': return 4;
        case 'lodash-custom':     return 5;
        case 'underscore':
        case null:                return 1;
      }
      return -1;
    }());

    addListener(buildList, 'change', eventHandler);
    addListener(otherList, 'change', eventHandler);
  });

  // The Lo-Dash build file path.
  ui.buildPath = (function() {
    var result;
    switch (build) {
      case 'lodash-compat':     result = 'dist/lodash.compat.min.js'; break;
      case 'lodash-custom-dev': result = 'lodash.custom.js'; break;
      case 'lodash-custom':     result = 'lodash.custom.min.js'; break;
      case null:                build = 'lodash-modern';
      case 'lodash-modern':     result = 'dist/lodash.min.js'; break;
      default:                  return build;
    }
    return basePath + result;
  }());

  // The other library file path.
  ui.otherPath = (function() {
    var result;
    switch (other) {
      case 'lodash-compat':     result = 'dist/lodash.compat.min.js'; break;
      case 'lodash-modern':     result = 'dist/lodash.min.js'; break;
      case 'lodash-custom-dev': result = 'lodash.custom.js'; break;
      case 'lodash-custom':     result = 'lodash.custom.min.js'; break;
      case 'underscore-dev':    result = 'vendor/underscore/underscore.js'; break;
      case null:                other = 'underscore';
      case 'underscore':        result = 'vendor/underscore/underscore-min.js'; break;
      default:                  return other;
    }
    return basePath + result;
  }());

  ui.urlParams = { 'build': build, 'other': other };

  window.ui = ui;

}(this));
