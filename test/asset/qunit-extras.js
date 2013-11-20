;(function(root, undefined) {
  'use strict';

  /** Native method shortcut */
  var unshift = Array.prototype.unshift;

  /** Used to match HTML entities */
  var reEscapedHtml = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g;

  /** Used to match parts of the assert message */
  var reDied = /^Died on test #\d+/,
      reExpected = /Expected: *<\/th><td><pre>([\s\S]*?)<\/pre>/,
      reMessage = /^<span class='test-message'>([\s\S]*?)<\/span>/;

  /** Used to convert HTML entities to characters */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports;

  /** Detect free variable `global`, from Node.js or Browserified code, and use it as `root` */
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given value is present in an array using strict equality
   * for comparisons, i.e. `===`.
   *
   * @oruvate
   * @param {Array} array The array to iterate over.
   * @param {*} target The value to check for.
   * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
   */
  function contains(array, value) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * Resolves the value of `property` on `object`. If `object` is falsey then
   * `undefined` is returned.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {string} property The property to get the value of.
   * @returns {*} Returns the resolved value.
   */
  function result(object, property) {
    return object ? object[property] : undefined;
  }

  /**
   * Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;`
   * in `string` to their corresponding characters.
   *
   * @private
   * @param {string} string The string to unescape.
   * @returns {string} Returns the unescaped string.
   */
  function unescape(string) {
    return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
  }

  /**
   * Used by `unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} match The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(match) {
    return htmlUnescapes[match];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Installs the QUnit additions on the given `context` object.
   *
   * @memberOf exports
   * @param {Object} context The context object.
   */
  function runInContext(context) {
    // exit early if no `context` is provided or if `QUnit` does not exist
    if (!context || !context.QUnit) {
      return;
    }

    /** Shorten `context.QUnit.QUnit` to `context.QUnit` */
    var QUnit = context.QUnit = context.QUnit.QUnit || context.QUnit;

    /** The number of retries async tests have to succeed */
    QUnit.config.asyncRetries = 0;

    /** An object of excused tests and assertions */
    QUnit.config.excused = {};

    /**
     * A callback triggered at the start of every test.
     *
     * @memberOf QUnit
     * @param {Object} details An object with `module` and `name` properties.
     */
    QUnit.testStart(function(details) {
      var excused = QUnit.config.excused || {},
          excusedTests = excused[details.module],
          excusedAsserts = excusedTests && excusedTests[details.name];

      var test = QUnit.config.current,
          finish = test.finish;

      // allow async tests to retry
      if (test.async && !test.retries) {
        test.retries = 0;
        test.finish = function() {
          var asserts = this.assertions,
              index = -1,
              length = asserts.length,
              queue = QUnit.config.queue;

          while (++index < length) {
            var assert = asserts[index];
            if (!assert.result && this.retries < QUnit.config.asyncRetries) {
              this.retries++;
              asserts.length = 0;

              var oldLength = queue.length;
              this.queue();
              unshift.apply(queue, queue.splice(oldLength, queue.length - oldLength));
              return;
            }
          }
          finish.call(this);
        };
      }
      // nothing to excuse
      if (!excusedAsserts) {
        return;
      }
      // excuse the entire test
      if (excusedAsserts === true) {
        test.async = false;
        test.callback = function() {};
        test.expected = 0;
        return;
      }
      // excuse specific assertions
      test.finish = function() {
        var asserts = this.assertions,
            index = -1,
            length = asserts.length;

        while (++index < length) {
          var assert = asserts[index],
              message = unescape(result(reMessage.exec(assert.message), 1)),
              died = result(reDied.exec(message), 0),
              expected = unescape(result(reExpected.exec(assert.message), 1));

          if ((message && contains(excusedAsserts, message)) ||
              (died && contains(excusedAsserts, died)) ||
              (expected && (
                contains(excusedAsserts, expected) ||
                contains(excusedAsserts, expected.replace(/\s+/g, ''))
              ))) {
            assert.result = true;
          }
        }
        finish.call(this);
      };
    });
  }

  /*--------------------------------------------------------------------------*/

  // expose QUnit extras
  if (freeExports && !freeExports.nodeType) {
    freeExports.runInContext = runInContext;
  } else {
    runInContext(root);
  }
}(this));
