/*!
 * QUnit Extras v1.0.0
 * Copyright 2011-2012 John-David Dalton <http://allyoucanleet.com/>
 * Based on a gist by Jörn Zaefferer <https://gist.github.com/722381>
 * Available under MIT license <http://mths.be/mit>
 */
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

  /** Used as a horizontal rule in console output */
  var hr = '----------------------------------------';

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
   * Creates a string with `text` repeated `n` number of times.
   *
   * @private
   * @param {string} text The text to repeat.
   * @param {number} n The number of times to repeat `text`.
   * @returns {string} The created string.
   */
  function repeat(text, n) {
    return Array(n + 1).join(text);
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

    /** Used to report the test module for failing tests */
    var moduleName,
        modulePrinted;

    /** Object shortcuts */
    var console = context.console,
        phantom = context.phantom,
        process = phantom || context.process,
        document = !phantom && context.document;

    /** Detects if running in a PhantomJS web page */
    var isPhantomPage = typeof context.callPhantom == 'function';

    /** Used to display the wait throbber */
    var throbberId,
        throbberDelay = 500,
        waitCount = -1;

    /** Shorten `context.QUnit.QUnit` to `context.QUnit` */
    var QUnit = context.QUnit = context.QUnit.QUnit || context.QUnit;

    /*------------------------------------------------------------------------*/

    /**
     * Schedules timer-based callbacks.
     *
     * @private
     * @param {Function|string} fn The function to call.
     * @param {number} delay The number of milliseconds to delay the `fn` call.
     * @param [arg1, arg2, ...] Arguments to invoke `fn` with.
     * @param {boolean} repeated A flag to specify whether `fn` is called repeatedly.
     * @returns {number} The the ID of the timeout.
     */
    function schedule(fn, delay, args, repeated) {
      // Rhino 1.7RC4 will error assigning `task` below
      // https://bugzilla.mozilla.org/show_bug.cgi?id=775566
      var task = ids[++counter] = new JavaAdapter(java.util.TimerTask, {
        'run': function() {
          fn.apply(context, args);
        }
      });
      // support non-functions
      if (typeof fn != 'function') {
        fn = (function(code) {
          code = String(code);
          return function() { eval(code); };
        }(fn));
      }
      // used by setInterval
      if (repeated) {
        timer.schedule(task, delay, delay);
      }
      // used by setTimeout
      else {
        timer.schedule(task, delay);
      }
      return counter;
    }

    /**
     * Clears the delay set by `setInterval` or `setTimeout`.
     *
     * @memberOf context
     * @param {number} id The ID of the timeout to be cleared.
     */
    function clearTimer(id) {
      if (ids[id]) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
      }
    }

    /**
     * Executes a code snippet or function repeatedly, with a delay between each call.
     *
     * @memberOf context
     * @param {Function|string} fn The function to call or string to evaluate.
     * @param {number} delay The number of milliseconds to delay each `fn` call.
     * @param [arg1, arg2, ...] Arguments to invoke `fn` with.
     * @returns {number} The the ID of the timeout.
     */
    function setInterval(fn, delay) {
      return schedule(fn, delay, slice.call(arguments, 2), true);
    }

    /**
     * Executes a code snippet or a function after specified delay.
     *
     * @memberOf context
     * @param {Function|string} fn The function to call or string to evaluate.
     * @param {number} delay The number of milliseconds to delay the `fn` call.
     * @param [arg1, arg2, ...] Arguments to invoke `fn` with.
     * @returns {number} The the ID of the timeout.
     */
    function setTimeout(fn, delay) {
      return schedule(fn, delay, slice.call(arguments, 2));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Writes an inline message to standard output.
     *
     * @private
     * @param {string} text The text to log.
     */
    var logInline = (function() {
      // exit early if not Node.js
      if (!(typeof process == 'object' && process &&
          process.on && process.stdout && process.platform != 'win32')) {
        return function() {};
      }
      // cleanup any inline logs when exited via `ctrl+c`
      process.on('SIGINT', function() {
        logInline('');
        process.exit();
      });

      var prevLine = '';
      return function(text) {
        var blankLine = repeat(' ', prevLine.length);
        if (text.length > hr.length) {
          text = text.slice(0, hr.length - 3) + '...';
        }
        prevLine = text;
        process.stdout.write(text + blankLine.slice(text.length) + '\r');
      }
    }());

    /**
     * Writes the wait throbber to standard output.
     *
     * @private
     */
    function logThrobber() {
      logInline('Please wait' + repeat('.', (++waitCount % 3) + 1));
    }

    /*------------------------------------------------------------------------*/

    /**
     * The number of retries async tests have to succeed.
     *
     * @memberOf QUnit.config
     * @type number
     */
    QUnit.config.asyncRetries = 0;

    /**
     * An object of excused tests and assertions.
     *
     * @memberOf QUnit.config
     * @type Object
     */
    QUnit.config.excused = {};

    /**
     * An object used to hold information about the current running test.
     *
     * @memberOf QUnit.config
     * @type Object
     */
    QUnit.config.testStats = {

      /**
       * An array of test summaries.
       *
       * @memberOf QUnit.config.testStats
       * @type Array
       */
      'assertions': []
    };

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

    /*------------------------------------------------------------------------*/

    // add logging extras
    if (isPhantomPage || !document) {

      /**
       * A logging callback triggered when all testing is completed.
       *
       * @memberOf QUnit
       * @param {Object} details An object with properties `failed`, `passed`, `runtime`, and `total`.
       */
      QUnit.done(function() {
        var ran;
        return function(details) {
          // stop `asyncTest()` from erroneously calling `done()` twice in
          // environments w/o timeouts
          if (ran) {
            return;
          }
          ran = true;

          logInline('');
          console.log(hr);
          console.log('    PASS: ' + details.passed + '  FAIL: ' + details.failed + '  TOTAL: ' + details.total);
          console.log('    Finished in ' + details.runtime + ' milliseconds.');
          console.log(hr);

          // exit out of Node.js or PhantomJS
          try {
            if (details.failed) {
              process.exit(1);
            } else {
              process.exit(0);
            }
          } catch(e) { }

          // exit out of Narwhal, Rhino, or RingoJS
          try {
            if (details.failed) {
              java.lang.System.exit(1);
            } else {
              quit();
            }
          } catch(e) { }
        };
      }());

      /**
       * A logging callback triggered after every assertion.
       *
       * @memberOf QUnit
       * @param {Object} details An object with properties `actual`, `expected`, `message`, and `result`.
       */
      QUnit.log(function(details) {
        var expected = details.expected,
            result = details.result,
            type = typeof expected != 'undefined' ? 'EQ' : 'OK';

        var assertion = [
          result ? 'PASS' : 'FAIL',
          type,
          details.message || 'ok'
        ];

        if (!result && type == 'EQ') {
          assertion.push('Expected: ' + expected + ', Actual: ' + details.actual);
        }
        QUnit.config.testStats.assertions.push(assertion.join(' | '));
      });

      /**
       * A logging callback triggered at the start of every test module.
       *
       * @memberOf QUnit
       * @param {Object} details An object with property `name`.
       */
      QUnit.moduleStart(function(details) {
        // reset the `modulePrinted` flag
        var newModuleName = details.name;
        if (moduleName != newModuleName) {
          moduleName = newModuleName;
          modulePrinted = false;
        }
        // initialize the wait throbber
        if (!throbberId) {
          throbberId = context.setInterval(logThrobber, throbberDelay);
          logThrobber();
        }
      });

      /**
       * A logging callback triggered after a test is completed.
       *
       * @memberOf QUnit
       * @param {Object} details An object with properties `failed`, `name`, `passed`, and `total`.
       */
      QUnit.testDone(function(details) {
        var assertions = QUnit.config.testStats.assertions,
            testName = details.name;

        if (details.failed > 0) {
          logInline('');
          if (!modulePrinted) {
            modulePrinted = true;
            console.log(hr);
            console.log(moduleName);
            console.log(hr);
          }
          console.log(' FAIL - '+ testName);
          assertions.forEach(function(value) {
            console.log('    ' + value);
          });
        }
        assertions.length = 0;
      });

      /**
       * Converts an object into a string representation.
       *
       * @memberOf QUnit
       * @type Function
       * @param {Object} object The object to stringify.
       * @returns {string} The result string.
       */
      QUnit.jsDump.parsers.object = (function() {
        var func = QUnit.jsDump.parsers.object;
        return function(object) {
          // fork to support Rhino's error objects
          if (typeof object.rhinoException == 'object') {
            return object.name +
              ' { message: "' + object.message +
              '", fileName: "' + object.fileName +
              '", lineNumber: ' + object.lineNumber + ' }';
          }
          return func(object);
        };
      }());
    }

    /*------------------------------------------------------------------------*/

    // add CLI extras
    if (!document) {
      // Timeout fallbacks based on the work of Andrea Giammarchi and Weston C.
      // https://github.com/WebReflection/wru/blob/master/src/rhinoTimers.js
      // http://stackoverflow.com/questions/2261705/how-to-run-a-javascript-function-asynchronously-without-using-settimeout
      try {
        var counter = 0,
            ids = {},
            slice = Array.prototype.slice,
            timer = new java.util.Timer;

        (function() {
          var getDescriptor = Object.getOwnPropertyDescriptor || function() {
            return { 'writable': true };
          };

          var descriptor;
          if ((!context.clearInterval || ((descriptor = getDescriptor(context, 'clearInterval')) && (descriptor.writable || descriptor.set))) &&
              (!context.setInterval   || ((descriptor = getDescriptor(context, 'setInterval'))   && (descriptor.writable || descriptor.set)))) {
            context.clearInterval = clearTimer;
            context.setInterval = setInterval;
          }
          if ((!context.clearTimeout || ((descriptor = getDescriptor(context, 'clearTimeout')) && (descriptor.writable || descriptor.set))) &&
              (!context.setTimeout   || ((descriptor = getDescriptor(context, 'setTimeout'))   && (descriptor.writable || descriptor.set)))) {
            context.clearTimeout = clearTimer;
            context.setTimeout = setTimeout;
          }
        }());
      } catch(e) { }

      // add `console.log` support to Narwhal, Rhino, and RingoJS
      console || (console = context.console = { 'log': context.print });

      // expose shortcuts
      // exclude `module` because some environments have it as a built-in object
      ('asyncTest deepEqual equal equals expect notDeepEqual notEqual notStrictEqual ' +
       'ok raises same start stop strictEqual test throws').replace(/\S+/g, function(methodName) {
        context[methodName] = QUnit[methodName];
      });

      // must call `QUnit.start` in the test file if not loaded in a browser
      QUnit.config.autostart = false;
      QUnit.init();
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose QUnit extras
  if (freeExports && !freeExports.nodeType) {
    freeExports.runInContext = runInContext;
  } else {
    runInContext(root);
  }
}(this));
