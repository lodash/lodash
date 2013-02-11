/*!
 * QUnit CLI Boilerplate v1.2.0
 * Copyright 2011-2012 John-David Dalton <http://allyoucanleet.com/>
 * Based on a gist by Jörn Zaefferer <https://gist.github.com/722381>
 * Available under MIT license <http://mths.be/mit>
 */
;(function(window) {
  'use strict';

  /**
   * Timeout fallbacks based on the work of Andrea Giammarchi and Weston C.
   * https://github.com/WebReflection/wru/blob/master/src/rhinoTimers.js
   * http://stackoverflow.com/questions/2261705/how-to-run-a-javascript-function-asynchronously-without-using-settimeout
   */
  (function() {

    /**
     * Schedules timer-based callbacks.
     *
     * @private
     * @param {Function|String} fn The function to call.
     * @oaram {Number} delay The number of milliseconds to delay the `fn` call.
     * @param [arg1, arg2, ...] Arguments to invoke `fn` with.
     * @param {Boolean} repeated A flag to specify whether `fn` is called repeatedly.
     * @returns {Number} The the ID of the timeout.
     */
    function schedule(fn, delay, args, repeated) {
      // Rhino 1.7RC4 will error assigning `task` below
      // https://bugzilla.mozilla.org/show_bug.cgi?id=775566
      var task = ids[++counter] = new JavaAdapter(java.util.TimerTask, {
        'run': function() {
          fn.apply(window, args);
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
     * @memberOf window
     * @param {Number} id The ID of the timeout to be cleared.
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
     * @memberOf window
     * @param {Function|String} fn The function to call or string to evaluate.
     * @oaram {Number} delay The number of milliseconds to delay each `fn` call.
     * @param [arg1, arg2, ...] Arguments to invoke `fn` with.
     * @returns {Number} The the ID of the timeout.
     */
    function setInterval(fn, delay) {
      return schedule(fn, delay, slice.call(arguments, 2), true);
    }

    /**
     * Executes a code snippet or a function after specified delay.
     *
     * @memberOf window
     * @param {Function|String} fn The function to call or string to evaluate.
     * @oaram {Number} delay The number of milliseconds to delay the `fn` call.
     * @param [arg1, arg2, ...] Arguments to invoke `fn` with.
     * @returns {Number} The the ID of the timeout.
     */
    function setTimeout(fn, delay) {
      return schedule(fn, delay, slice.call(arguments, 2));
    }

    try {
      var counter = 0,
          ids = {},
          slice = Array.prototype.slice,
          timer = new java.util.Timer;

      window.clearInterval =
      window.clearTimeout = clearTimer;
      window.setInterval = setInterval;
      window.setTimeout = setTimeout;
    } catch(e) { }
  }());

  /*--------------------------------------------------------------------------*/

  (function() {

    /** Used as a horizontal rule in console output */
    var hr = '----------------------------------------';

    /** Shorten `window.QUnit.QUnit` to `window.QUnit` */
    window.QUnit && (QUnit = QUnit.QUnit || QUnit);

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

        console.log(hr);
        console.log('    PASS: ' + details.passed + '  FAIL: ' + details.failed + '  TOTAL: ' + details.total);
        console.log('    Finished in ' + details.runtime + ' milliseconds.');
        console.log(hr);

        // exit out of Rhino
        try {
          quit();
        } catch(e) { }

        // exit out of Node.js or PhantomJS
        try {
          var process = window.process || window.phantom;
          if (details.failed) {
            console.error('Error: ' + details.failed + ' of ' + details.total + ' tests failed.');
            process.exit(1);
          } else {
            process.exit(0);
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
      console.log(hr);
      console.log(details.name);
      console.log(hr);
    });

    /**
     * Converts an object into a string representation.
     *
     * @memberOf QUnit
     * @type Function
     * @param {Object} object The object to stringify.
     * @returns {String} The result string.
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
        console.log(' FAIL - '+ testName);
        assertions.forEach(function(value) {
          console.log('    ' + value);
        });
      }
      else {
        console.log(' PASS - ' + testName);
      }
      assertions.length = 0;
    });

    /**
     * An object used to hold information about the current running test.
     *
     * @memberOf QUnit.config
     * @type Object
     */
    QUnit.config.testStats = {

      /**
       * An array of test summaries (pipe separated).
       *
       * @memberOf QUnit.config.testStats
       * @type Array
       */
      'assertions': []
    };
  }());

  /*--------------------------------------------------------------------------*/

  // expose shortcuts
  // exclude `module` because some environments have it as a built-in object
  ('asyncTest deepEqual equal equals expect notDeepEqual notEqual notStrictEqual ' +
   'ok raises same start stop strictEqual test throws').replace(/\S+/g, function(methodName) {
    window[methodName] = QUnit[methodName];
  });

  // add `console.log()` support for Narwhal, Rhino, and RingoJS
  if (!window.console && window.print) {
    window.console = { 'log': window.print };
  }
  // must call `QUnit.start()` in the test file if using QUnit < 1.3.0 with
  // Node.js or any version of QUnit with Narwhal, PhantomJS, Rhino, or RingoJS
  QUnit.init();

}(typeof global == 'object' && global || this));
