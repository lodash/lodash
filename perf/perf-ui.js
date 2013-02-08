;(function(window) {
  'use strict';

  /** The Lo-Dash build to load */
  var build = (/build=([^&]+)/.exec(location.search) || [])[1];

  /** The other library to load */
  var other = (/other=([^&]+)/.exec(location.search) || [])[1];

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

  // expose Lo-Dash build file path
  ui.buildPath = (function() {
    switch (build) {
      case 'lodash-dev':        return 'dist/lodash.compat.js';
      case 'lodash-modern':     return 'dist/lodash.min.js';
      case 'lodash-underscore': return 'dist/lodash.underscore.min.js';
      case 'lodash-custom':     return 'lodash.custom.min.js';
    }
    return 'dist/lodash.compat.min.js';
  }());

  // expose other library file path
  ui.otherPath = (function() {
    switch (other) {
      case 'lodash-dev':        return 'dist/lodash.compat.js';
      case 'lodash-prod':       return 'dist/lodash.compat.min.js';
      case 'lodash-modern':     return 'dist/lodash.min.js';
      case 'lodash-underscore': return 'dist/lodash.underscore.min.js';
      case 'lodash-custom':     return 'lodash.custom.min.js';
      case 'underscore-dev':    return 'vendor/underscore/underscore.js';
    }
    return 'vendor/underscore/underscore-min.js';
  }());

  // initialize controls
  addListener(window, 'load', function() {
    function eventHandler(event) {
      var search = location.search.replace(/^\?|&?(?:build|other)=[^&]*&?/g, '');
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      location.href =
        location.href.split('?')[0] + '?' +
        (search ? search + '&' : '') +
        'build=' + buildList[buildList.selectedIndex].value + '&' +
        'other=' + otherList[otherList.selectedIndex].value;
    }

    var span1 = document.createElement('span');
    span1.style.cssText = 'float:right';
    span1.innerHTML =
      '<label for="perf-build">Build: </label>' +
      '<select id="perf-build">' +
      '<option value="lodash-dev">Lo-Dash</option>' +
      '<option value="lodash-prod">Lo-Dash (minified)</option>' +
      '<option value="lodash-modern">Lo-Dash (modern)</option>' +
      '<option value="lodash-underscore">Lo-Dash (underscore)</option>' +
      '<option value="lodash-custom">Lo-Dash (custom)</option>' +
      '</select>';

    var span2 = document.createElement('span');
    span2.style.cssText = 'float:right';
    span2.innerHTML =
      '<label for="perf-other">Other Library: </label>' +
      '<select id="perf-other">' +
      '<option value="underscore-dev">Underscore</option>' +
      '<option value="underscore-prod">Underscore (minified)</option>' +
      '<option value="lodash-dev">Lo-Dash</option>' +
      '<option value="lodash-prod">Lo-Dash (minified)</option>' +
      '<option value="lodash-modern">Lo-Dash (modern)</option>' +
      '<option value="lodash-underscore">Lo-Dash (underscore)</option>' +
      '<option value="lodash-custom">Lo-Dash (custom)</option>' +
      '</select>';

    var buildList = span1.lastChild,
        otherList = span2.lastChild,
        toolbar = document.getElementById('perf-toolbar');

    toolbar.appendChild(span2);
    toolbar.appendChild(span1);

    buildList.selectedIndex = (function() {
      switch (build) {
        case 'lodash-dev':        return 0;
        case 'lodash-modern':     return 2;
        case 'lodash-underscore': return 3;
        case 'lodash-custom':     return 4;
      }
      return 1;
    }());

    otherList.selectedIndex = (function() {
      switch (other) {
        case 'underscore-dev':    return 0;
        case 'lodash-dev':        return 2;
        case 'lodash-prod':       return 3;
        case 'lodash-modern':     return 4;
        case 'lodash-underscore': return 5;
        case 'lodash-custom':     return 6;
      }
      return 1;
    }());

    addListener(buildList, 'change', eventHandler);
    addListener(otherList, 'change', eventHandler);
  });

  // expose `ui`
  window.ui = ui;

}(this));
