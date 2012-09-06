;(function(window) {
  'use strict';

  /** `QUnit.addEvent` shortcut */
  var addEvent = QUnit.addEvent;

  /** The Lo-Dash build to load */
  var build = (/build=([^&]+)/.exec(location.search) || [])[1];

  /** A flag to determine if RequireJS should be loaded */
  var norequire = /[?&]norequire=true(?:&|$)/.test(location.search);

  /*--------------------------------------------------------------------------*/

  // assign `QUnit.config` properties
  QUnit.config.lodashFilename = (function() {
    switch (build) {
      case 'prod':         return 'lodash.min';
      case 'custom':       return 'lodash.custom.min';
      case 'custom-debug': return 'lodash.custom';
    }
    return 'lodash';
  }());

  // assign `QUnit.urlParams` properties
  QUnit.extend(QUnit.urlParams, {
    'build': build,
    'norequire': norequire
  });

  // initialize the build dropdown
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
        (search ? search + '&' : '') + 'build=' +
        dropdown[dropdown.selectedIndex].value +
        (checkbox.checked ? '&norequire=true' : '');
    }

    function init() {
      var toolbar = document.getElementById('qunit-testrunner-toolbar');
      if (toolbar) {
        toolbar.appendChild(span1);
        toolbar.appendChild(span2);

        dropdown.selectedIndex = (function() {
          switch (build) {
            case 'prod':         return 1;
            case 'custom':       return 2;
            case 'custom-debug': return 3;
          }
          return 0;
        }());

        checkbox.checked = norequire;
        addEvent(checkbox, 'click', eventHandler);
        addEvent(dropdown, 'change', eventHandler);
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
      '<option value="dev">Developement</option>' +
      '<option value="prod">Production</option>' +
      '<option value="custom">Custom</option>' +
      '<option value="custom-debug">Custom (debug)</option>' +
      '</select>';

    var checkbox = span1.firstChild,
        dropdown = span2.lastChild;

    init();
  });

}(this));
