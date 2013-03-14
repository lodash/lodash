(function(window) {

  /** Use a single "load" function */
  var load = typeof require == 'function' ? require : window.load;

  /** The file path of the Lo-Dash file to test */
  var filePath = (function() {
    var min = 0;
    var result = window.phantom
      ? phantom.args
      : (window.system
          ? (min = 1, system.args)
          : (window.process ? (min = 2, process.argv) : (window.arguments || []))
        );

    var last = result[result.length - 1];
    result = (result.length > min && !/perf(?:\.js)?$/.test(last))
      ? last
      : '../lodash.js';

    try {
      result = require('fs').realpathSync(result);
    } catch(e) { }

    return result;
  }());

  /** Load Lo-Dash */
  var lodash = window.lodash || (window.lodash = (
    lodash = load(filePath) || window._,
    lodash = lodash._ || lodash,
    lodash.noConflict()
  ));

  /** Load Benchmark.js */
  var Benchmark = window.Benchmark || (window.Benchmark = (
    Benchmark = load('../vendor/benchmark.js/benchmark.js') || window.Benchmark,
    Benchmark = Benchmark.Benchmark || Benchmark,
    Benchmark.runInContext(lodash.extend({}, window, { '_': lodash }))
  ));

  /** Load Underscore */
  var _ = window._ || (window._ = (
    _ = load('../vendor/underscore/underscore.js') || window._,
    _._ || _
  ));

  /** Used to access the Firebug Lite panel (set by `run`) */
  var fbPanel;

  /** Used to match path separators */
  var rePathSeparator = /[\/\\]/;

  /** Used to detect primitive types */
  var rePrimitive = /^(?:boolean|number|string|undefined)$/;

  /** Used to match RegExp special characters */
  var reSpecialChars = /[.*+?^=!:${}()|[\]\/\\]/g;

  /** Used to score performance */
  var score = { 'a': 0, 'b': 0 };

  /** Used to queue benchmark suites */
  var suites = [];

  /** Used to resolve a value's internal [[Class]] */
  var toString = Object.prototype.toString;

  /** The `ui` object */
  var ui = window.ui || ({
    'buildPath': basename(filePath, '.js'),
    'otherPath': 'underscore'
  });

  /** The Lo-Dash build basename */
  var buildName = basename(ui.buildPath, '.js');

  /** The other library basename */
  var otherName = basename(ui.otherPath, '.js');

  /** Detect if in a browser environment */
  var isBrowser = isHostType(window, 'document') && isHostType(window, 'navigator');

  /** Detect Java environment */
  var isJava = !isBrowser && /Java/.test(toString.call(window.java));

  /** Add `console.log()` support for Narwhal, Rhino, and RingoJS */
  var console = window.console || (window.console = { 'log': window.print });

  /*--------------------------------------------------------------------------*/

  /**
   * Gets the basename of the given `filePath`. If the file `extension` is passed,
   * it will be removed from the basename.
   *
   * @private
   * @param {String} path The file path to inspect.
   * @param {String} extension The extension to remove.
   * @returns {String} Returns the basename.
   */
  function basename(filePath, extension) {
    var result = (filePath || '').split(rePathSeparator).pop();
    return (arguments.length < 2)
      ? result
      : result.replace(RegExp(extension.replace(reSpecialChars, '\\$&') + '$'), '');
  }

  /**
   * Gets the Hz, i.e. operations per second, of `bench` adjusted for the
   * margin of error.
   *
   * @private
   * @param {Object} bench The benchmark object.
   * @returns {Number} Returns the adjusted Hz.
   */
  function getHz(bench) {
    var result = 1 / (bench.stats.mean + bench.stats.moe);
    return isFinite(result) ? result : 0;
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {Mixed} object The owner of the property.
   * @param {String} property The property to check.
   * @returns {Boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    if (object == null) {
      return false;
    }
    var type = typeof object[property];
    return !rePrimitive.test(type) && (type != 'object' || !!object[property]);
  }

  /**
   * Logs text to the console.
   *
   * @private
   * @param {String} text The text to log.
   */
  function log(text) {
    console.log(text + '');
    if (fbPanel) {
      // scroll the Firebug Lite panel down
      fbPanel.scrollTop = fbPanel.scrollHeight;
    }
  }

  /**
   * Runs all benchmark suites.
   *
   * @private (@public in the browser)
   */
  function run() {
    fbPanel = (fbPanel = window.document && document.getElementById('FirebugUI')) &&
      (fbPanel = (fbPanel = fbPanel.contentWindow || fbPanel.contentDocument).document || fbPanel) &&
      fbPanel.getElementById('fbPanel1');

    log('\nSit back and relax, this may take a while.');
    suites[0].run({ 'async': !isJava });
  }

  /*--------------------------------------------------------------------------*/

  lodash.extend(Benchmark.Suite.options, {
    'onStart': function() {
      log('\n' + this.name + ':');
    },
    'onCycle': function(event) {
      log(event.target);
    },
    'onComplete': function() {
      var formatNumber = Benchmark.formatNumber,
          fastest = this.filter('fastest'),
          fastestHz = getHz(fastest[0]),
          slowest = this.filter('slowest'),
          slowestHz = getHz(slowest[0]),
          aHz = getHz(this[0]),
          bHz = getHz(this[1]);

      if (fastest.length > 1) {
        log('It\'s too close to call.');
        aHz = bHz = slowestHz;
      }
      else {
        var percent = ((fastestHz / slowestHz) - 1) * 100;

        log(
          fastest[0].name + ' is ' +
          formatNumber(percent < 1 ? percent.toFixed(2) : Math.round(percent)) +
          '% faster.'
        );
      }
      // add score adjusted for margin of error
      score.a += aHz;
      score.b += bHz;

      // remove current suite from queue
      suites.shift();

      if (suites.length) {
        // run next suite
        suites[0].run({ 'async': !isJava });
      }
      else {
        var fastestTotalHz = Math.max(score.a, score.b),
            slowestTotalHz = Math.min(score.a, score.b),
            totalPercent = formatNumber(Math.round(((fastestTotalHz  / slowestTotalHz) - 1) * 100)),
            totalX = fastestTotalHz / slowestTotalHz,
            message = 'is ' + totalPercent + '% ' + (totalX == 1 ? '' : '(' + formatNumber(totalX.toFixed(2)) + 'x) ') + 'faster than';

        // report results
        if (score.a >= score.b) {
          log('\n' + buildName + ' ' + message + ' ' + otherName + '.');
        } else {
          log('\n' + otherName + ' ' + message + ' ' + buildName + '.');
        }
      }
    }
  });

  /*--------------------------------------------------------------------------*/

  lodash.extend(Benchmark.options, {
    'async': true,
    'setup': '\
      var _ = window._,\
          lodash = window.lodash,\
          belt = this.name == "Lo-Dash" ? lodash : _;\
      \
      var index,\
          date = new Date,\
          limit = 20,\
          regexp = /x/,\
          object = {},\
          objects = Array(limit),\
          numbers = Array(limit),\
          fourNumbers = [5, 25, 10, 30],\
          nestedNumbers = [1, [2], [3, [[4]]]],\
          twoNumbers = [12, 23];\
      \
      for (index = 0; index < limit; index++) {\
        numbers[index] = index;\
        object["key" + index] = index;\
        objects[index] = { "num": index };\
      }\
      \
      if (typeof bind != "undefined") {\
        var thisArg = { "name": "moe" },\
            ctor = function() {};\
        \
        var func = function(greeting, punctuation) {\
          return greeting + ", " + this.name + (punctuation || ".");\
        };\
        \
        var _boundNormal = _.bind(func, thisArg),\
            _boundPartial = _.bind(func, thisArg, "hi");\
        \
        var lodashBoundNormal = lodash.bind(func, thisArg),\
            lodashBoundPartial = lodash.bind(func, thisArg, "hi");\
      }\
      \
      if (typeof bindAll != "undefined") {\
        var bindAllObjects = Array(this.count),\
            funcNames = belt.functions(lodash);\
        \
        // potentially expensive\n\
        for (index = 0; index < this.count; index++) {\
          bindAllObjects[index] = belt.reduce(funcNames, function(object, funcName) {\
            object[funcName] = lodash[funcName];\
            return object;\
          }, {});\
        }\
      }\
      if (typeof chaining != "undefined") {\
        var _chaining = _.chain ? _(numbers).chain() : _(numbers),\
            lodashChaining = lodash(numbers);\
      }\
      if (typeof compact != "undefined") {\
        var uncompacted = numbers.slice();\
        uncompacted[2] = false;\
        uncompacted[6] = null;\
        uncompacted[18] = "";\
      }\
      \
      if (typeof countBy != "undefined" || typeof omit != "undefined") {\
        var wordToNumber = {\
          "one": 1,\
          "two": 2,\
          "three": 3,\
          "four": 4,\
          "five": 5,\
          "six": 6,\
          "seven": 7,\
          "eight": 8,\
          "nine": 9,\
          "ten": 10,\
          "eleven": 11,\
          "twelve": 12,\
          "thirteen": 13,\
          "fourteen": 14,\
          "fifteen": 15,\
          "sixteen": 16,\
          "seventeen": 17,\
          "eighteen": 18,\
          "nineteen": 19,\
          "twenty": 20,\
          "twenty-one": 21,\
          "twenty-two": 22,\
          "twenty-three": 23,\
          "twenty-four": 24,\
          "twenty-five": 25,\
          "twenty-six": 26,\
          "twenty-seven": 27,\
          "twenty-eight": 28,\
          "twenty-nine": 29,\
          "thirty": 30,\
          "thirty-one": 31,\
          "thirty-two": 32,\
          "thirty-three": 33,\
          "thirty-four": 34,\
          "thirty-five": 35,\
          "thirty-six": 36,\
          "thirty-seven": 37,\
          "thirty-eight": 38,\
          "thirty-nine": 39,\
          "forty": 40\
        };\
        \
        var words = belt.keys(wordToNumber).slice(0, limit);\
      }\
      \
      if (typeof isEqual != "undefined") {\
        var objectOfPrimitives = {\
          "boolean": true,\
          "number": 1,\
          "string": "a"\
        };\
        \
        var objectOfObjects = {\
          "boolean": new Boolean(true),\
          "number": new Number(1),\
          "string": new String("a")\
        };\
        \
        var object2 = {},\
            objects2 = Array(limit),\
            numbers2 = Array(limit),\
            nestedNumbers2 = [1, [2], [3, [[4]]]],\
            nestedNumbers3 = [1, [2], [5, [[6]]]],\
            simpleObject = { "a": 1 },\
            simpleObject2 = { "a": 2 },\
            simpleObjects = [simpleObject],\
            simpleObjects2 = [simpleObject2],\
            twoNumbers2 = [18, 27];\
        \
        for (index = 0; index < limit; index++) {\
          object2["key" + index] = index;\
          objects2[index] = { "num": index };\
          numbers2[index] = index;\
        }\
      }\
      \
      if (typeof multiArrays != "undefined") {\
        var twentyValues = Array(20),\
            twentyValues2 = Array(20),\
            twentyFiveValues = Array(25),\
            twentyFiveValues2 = Array(25),\
            thirtyValues = Array(30),\
            thirtyValues2 = Array(30),\
            fortyValues = Array(40),\
            fortyValues2 = Array(40),\
            fiftyValues = Array(50),\
            fiftyValues2 = Array(50),\
            seventyFiveValues = Array(75),\
            seventyFiveValues2 = Array(75),\
            hundredValues = Array(100),\
            hundredValues2 = Array(100),\
            lowerChars = "abcdefghijklmnopqrstuvwxyz".split(""),\
            upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");\
        \
        for (index = 0; index < 100; index++) {\
          if (index < 15) {\
            twentyValues[index] = lowerChars[index];\
            twentyValues2[index] = upperChars[index];\
          }\
          if (index < 20) {\
            twentyValues[index] =\
            twentyValues2[index] = index;\
            \
            twentyFiveValues[index] = lowerChars[index];\
            twentyFiveValues2[index] = upperChars[index];\
          }\
          if (index < 25) {\
            twentyFiveValues[index] =\
            twentyFiveValues2[index] = index;\
            \
            thirtyValues[index] =\
            fortyValues[index] =\
            fiftyValues[index] =\
            seventyFiveValues[index] =\
            hundredValues[index] = lowerChars[index];\
            \
            thirtyValues2[index] =\
            fortyValues2[index] =\
            fiftyValues2[index] =\
            seventyFiveValues2[index] =\
            hundredValues2[index] = upperChars[index];\
          }\
          else {\
            if (index < 30) {\
              thirtyValues[index] =\
              thirtyValues2[index] = index;\
            }\
            if (index < 40) {\
              fortyValues[index] =\
              fortyValues2[index] = index;\
            }\
            if (index < 50) {\
              fiftyValues[index] =\
              fiftyValues2[index] = index;\
            }\
            if (index < 75) {\
              seventyFiveValues[index] =\
              seventyFiveValues2[index] = index;\
            }\
            hundredValues[index] =\
            hundredValues2[index] = index;\
          }\
        }\
      }\
      \
      if (typeof template != "undefined") {\
        var tplData = {\
          "header1": "Header1",\
          "header2": "Header2",\
          "header3": "Header3",\
          "header4": "Header4",\
          "header5": "Header5",\
          "header6": "Header6",\
          "list": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]\
        };\
        \
        var tpl =\
          "<div>" +\
          "<h1 class=\'header1\'><%= header1 %></h1>" +\
          "<h2 class=\'header2\'><%= header2 %></h2>" +\
          "<h3 class=\'header3\'><%= header3 %></h3>" +\
          "<h4 class=\'header4\'><%= header4 %></h4>" +\
          "<h5 class=\'header5\'><%= header5 %></h5>" +\
          "<h6 class=\'header6\'><%= header6 %></h6>" +\
          "<ul class=\'list\'>" +\
          "<% for (var index = 0, length = list.length; index < length; index++) { %>" +\
          "<li class=\'item\'><%= list[index] %></li>" +\
          "<% } %>" +\
          "</ul>" +\
          "</div>";\
        \
        var tplVerbose =\
          "<div>" +\
          "<h1 class=\'header1\'><%= data.header1 %></h1>" +\
          "<h2 class=\'header2\'><%= data.header2 %></h2>" +\
          "<h3 class=\'header3\'><%= data.header3 %></h3>" +\
          "<h4 class=\'header4\'><%= data.header4 %></h4>" +\
          "<h5 class=\'header5\'><%= data.header5 %></h5>" +\
          "<h6 class=\'header6\'><%= data.header6 %></h6>" +\
          "<ul class=\'list\'>" +\
          "<% for (var index = 0, length = data.list.length; index < length; index++) { %>" +\
          "<li class=\'item\'><%= data.list[index] %></li>" +\
          "<% } %>" +\
          "</ul>" +\
          "</div>";\
        \
        var settingsObject = { "variable": "data" };\
        \
        var _tpl = _.template(tpl),\
            _tplVerbose = _.template(tplVerbose, null, settingsObject);\
        \
        var lodashTpl = lodash.template(tpl),\
            lodashTplVerbose = lodash.template(tplVerbose, null, settingsObject);\
      }\
      if (typeof where != "undefined") {\
        var _findWhere = _.findWhere || _.find,\
            lodashFindWhere = lodash.findWhere || lodash.find,\
            whereObject = { "num": 9 };\
      }'
  });

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_(...)` with a number')
      .add(buildName, '\
        lodash(2)'
      )
      .add(otherName, '\
        _(2)'
      )
  );

  suites.push(
    Benchmark.Suite('`_(...)` with an array')
      .add(buildName, '\
        lodash(numbers)'
      )
      .add(otherName, '\
        _(numbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_(...)` with an object')
      .add(buildName, '\
        lodash(object)'
      )
      .add(otherName, '\
        _(object)'
      )
  );

  // avoid Underscore induced `OutOfMemoryError` in Rhino, Narwhal, and Ringo
  if (!isJava) {
    suites.push(
      Benchmark.Suite('`_(...).tap(...)`')
        .add(buildName, {
          'fn': 'lodashChaining.tap(lodash.identity)',
          'teardown': 'function chaining(){}'
        })
        .add(otherName, {
          'fn':  '_chaining.tap(_.identity)',
          'teardown': 'function chaining(){}'
        })
    );
  }

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.bind` (uses native `Function#bind` if available and inferred fast)')
      .add(buildName, {
        'fn': 'lodash.bind(func, { "name": "moe" }, "hi")',
        'teardown': 'function bind(){}'
      })
      .add(otherName, {
        'fn': '_.bind(func, { "name": "moe" }, "hi")',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound call')
      .add(buildName, {
        'fn': 'lodashBoundNormal()',
        'teardown': 'function bind(){}'
      })
      .add(otherName, {
        'fn': '_boundNormal()',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound call with arguments')
      .add(buildName, {
        'fn': 'lodashBoundNormal("hi", "!")',
        'teardown': 'function bind(){}'
      })
      .add(otherName, {
        'fn': '_boundNormal("hi", "!")',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound and partially applied call (uses native `Function#bind` if available)')
      .add(buildName, {
        'fn': 'lodashBoundPartial()',
        'teardown': 'function bind(){}'
      })
      .add(otherName, {
        'fn': '_boundPartial()',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound and partially applied call with arguments (uses native `Function#bind` if available)')
      .add(buildName, {
        'fn': 'lodashBoundPartial("!")',
        'teardown': 'function bind(){}'
      })
      .add(otherName, {
        'fn': '_boundPartial("!")',
        'teardown': 'function bind(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.bindAll` iterating arguments')
      .add(buildName, {
        'fn': 'lodash.bindAll.apply(lodash, [bindAllObjects.pop()].concat(funcNames))',
        'teardown': 'function bindAll(){}'
      })
      .add(otherName, {
        'fn': '_.bindAll.apply(_, [bindAllObjects.pop()].concat(funcNames))',
        'teardown': 'function bindAll(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.bindAll` iterating the `object`')
      .add(buildName, {
        'fn': 'lodash.bindAll(bindAllObjects.pop())',
        'teardown': 'function bindAll(){}'
      })
      .add(otherName, {
        'fn': '_.bindAll(bindAllObjects.pop())',
        'teardown': 'function bindAll(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.clone` with an object')
      .add(buildName, '\
        lodash.clone(object)'
      )
      .add(otherName, '\
        _.clone(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.compact`')
      .add(buildName, {
        'fn': 'lodash.compact(uncompacted)',
        'teardown': 'function compact(){}'
      })
      .add(otherName, {
        'fn': '_.compact(uncompacted)',
        'teardown': 'function compact(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.contains` iterating an array')
      .add(buildName, '\
        lodash.contains(numbers, 19)'
      )
      .add(otherName, '\
        _.contains(numbers, 19)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.contains` iterating an object')
      .add(buildName, '\
        lodash.contains(object, 19)'
      )
      .add(otherName, '\
        _.contains(object, 19)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.countBy` with `callback` iterating an array')
      .add(buildName, '\
        lodash.countBy(numbers, function(num) { return num >> 1; })'
      )
      .add(otherName, '\
        _.countBy(numbers, function(num) { return num >> 1; })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.countBy` with `property` name iterating an array')
      .add(buildName, {
        'fn': 'lodash.countBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
      .add(otherName, {
        'fn': '_.countBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.countBy` with `callback` iterating an object')
      .add(buildName, {
        'fn': 'lodash.countBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
      .add(otherName, {
        'fn': '_.countBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.defaults`')
      .add(buildName, '\
        lodash.defaults({ "key2": 2, "key6": 6, "key18": 18 }, object)'
      )
      .add(otherName, '\
        _.defaults({ "key2": 2, "key6": 6, "key18": 18 }, object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.difference`')
      .add(buildName, '\
        lodash.difference(numbers, twoNumbers, fourNumbers)'
      )
      .add(otherName, '\
        _.difference(numbers, twoNumbers, fourNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.difference` iterating 100 elements')
      .add(buildName, {
        'fn': 'lodash.difference(hundredValues, hundredValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add(otherName, {
        'fn': '_.difference(hundredValues, hundredValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.difference` iterating 20 and 40 elements')
      .add(buildName, {
        'fn': 'lodash.difference(twentyValues, fortyValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add(otherName, {
        'fn': '_.difference(twentyValues, fortyValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.each` iterating an array')
      .add(buildName, '\
        var result = [];\
        lodash.each(numbers, function(num) {\
          result.push(num * 2);\
        })'
      )
      .add(otherName, '\
        var result = [];\
        _.each(numbers, function(num) {\
          result.push(num * 2);\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.each` iterating an array with `thisArg` (slow path)')
      .add(buildName, '\
        var result = [];\
        lodash.each(numbers, function(num, index) {\
          result.push(num + this["key" + index]);\
        }, object)'
      )
      .add(otherName, '\
        var result = [];\
        _.each(numbers, function(num, index) {\
          result.push(num + this["key" + index]);\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.each` iterating an object')
      .add(buildName, '\
        var result = [];\
        lodash.each(object, function(num) {\
          result.push(num * 2);\
        })'
      )
      .add(otherName, '\
        var result = [];\
        _.each(object, function(num) {\
          result.push(num * 2);\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.every` iterating an array')
      .add(buildName, '\
        lodash.every(numbers, function(num) {\
          return num + "";\
        })'
      )
      .add(otherName, '\
        _.every(numbers, function(num) {\
          return num + "";\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.every` iterating an object')
      .add(buildName, '\
        lodash.every(object, function(num) {\
          return num + "";\
        })'
      )
      .add(otherName, '\
        _.every(object, function(num) {\
          return num + "";\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.extend`')
      .add(buildName, '\
        lodash.extend({}, object)'
      )
      .add(otherName, '\
        _.extend({}, object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.filter` iterating an array')
      .add(buildName, '\
        lodash.filter(numbers, function(num) {\
          return num % 2;\
        })'
      )
      .add(otherName, '\
        _.filter(numbers, function(num) {\
          return num % 2;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.filter` iterating an array with `thisArg` (slow path)')
      .add(buildName, '\
        lodash.filter(numbers, function(num, index) {\
          return this["key" + index] % 2;\
        }, object)'
      )
      .add(otherName, '\
        _.filter(numbers, function(num, index) {\
           return this["key" + index] % 2;\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.filter` iterating an object')
      .add(buildName, '\
        lodash.filter(object, function(num) {\
          return num % 2\
        })'
      )
      .add(otherName, '\
        _.filter(object, function(num) {\
          return num % 2\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.find` iterating an array')
      .add(buildName, '\
        lodash.find(numbers, function(num) {\
          return num === 19;\
        })'
      )
      .add(otherName, '\
        _.find(numbers, function(num) {\
          return num === 19;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.find` iterating an object')
      .add(buildName, '\
        lodash.find(object, function(value, key) {\
          return /\D9$/.test(key);\
        })'
      )
      .add(otherName, '\
        _.find(object, function(value, key) {\
          return /\D9$/.test(key);\
        })'
      )
  );

  // avoid Underscore induced `OutOfMemoryError` in Rhino, Narwhal, and Ringo
  if (!isJava) {
    suites.push(
      Benchmark.Suite('`_.find` with `properties`')
        .add(buildName, {
          'fn': 'lodashFindWhere(objects, whereObject)',
          'teardown': 'function where(){}'
        })
        .add(otherName, {
          'fn': '_findWhere(objects, whereObject)',
          'teardown': 'function where(){}'
        })
    );
  }

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.flatten`')
      .add(buildName, '\
        lodash.flatten(nestedNumbers)'
      )
      .add(otherName, '\
        _.flatten(nestedNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.flatten` with `shallow`')
      .add(buildName, '\
        lodash.flatten(nestedNumbers, true)'
      )
      .add(otherName, '\
        _.flatten(nestedNumbers, true)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.functions`')
      .add(buildName, '\
        lodash.functions(lodash)'
      )
      .add(otherName, '\
        _.functions(lodash)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.groupBy` with `callback` iterating an array')
      .add(buildName, '\
        lodash.groupBy(numbers, function(num) { return num >> 1; })'
      )
      .add(otherName, '\
        _.groupBy(numbers, function(num) { return num >> 1; })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.groupBy` with `property` name iterating an array')
      .add(buildName, {
        'fn': 'lodash.groupBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
      .add(otherName, {
        'fn': '_.groupBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.groupBy` with `callback` iterating an object')
      .add(buildName, {
        'fn': 'lodash.groupBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
      .add(otherName, {
        'fn': '_.groupBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.indexOf`')
      .add(buildName, '\
        lodash.indexOf(numbers, 9)'
      )
      .add(otherName, '\
        _.indexOf(numbers, 9)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.indexOf` with `isSorted`')
      .add(buildName, '\
        lodash.indexOf(numbers, 19, true)'
      )
      .add(otherName, '\
        _.indexOf(numbers, 19, true)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.intersection`')
      .add(buildName, '\
        lodash.intersection(numbers, twoNumbers, fourNumbers)'
      )
      .add(otherName, '\
        _.intersection(numbers, twoNumbers, fourNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.intersection` iterating 100 elements')
      .add(buildName, {
        'fn': 'lodash.intersection(hundredValues, hundredValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add(otherName, {
        'fn': '_.intersection(hundredValues, hundredValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.invert`')
      .add(buildName, '\
        lodash.invert(object)'
      )
      .add(otherName, '\
        _.invert(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.invoke` iterating an array')
      .add(buildName, '\
        lodash.invoke(numbers, "toFixed", "2")'
      )
      .add(otherName, '\
        _.invoke(numbers, "toFixed", "2")'
      )
  );

  suites.push(
    Benchmark.Suite('`_.invoke` with a function for `methodName` iterating an array')
      .add(buildName, '\
        lodash.invoke(numbers, String.prototype.split, "")'
      )
      .add(otherName, '\
        _.invoke(numbers, String.prototype.split, "")'
      )
  );

  suites.push(
    Benchmark.Suite('`_.invoke` iterating an object')
      .add(buildName, '\
        lodash.invoke(object, "toFixed", "2")'
      )
      .add(otherName, '\
        _.invoke(object, "toFixed", "2")'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing primitives and objects (edge case)')
      .add(buildName, {
        'fn': 'lodash.isEqual(objectOfPrimitives, objectOfObjects)',
        'teardown': 'function isEqual(){}'
      })
      .add(otherName, {
        'fn': '_.isEqual(objectOfPrimitives, objectOfObjects)',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing arrays')
      .add(buildName, {
        'fn': '\
          lodash.isEqual(numbers, numbers2);\
          lodash.isEqual(twoNumbers, twoNumbers2);',
        'teardown': 'function isEqual(){}'
      })
      .add(otherName, {
        'fn': '\
          _.isEqual(numbers, numbers2);\
          _.isEqual(twoNumbers, twoNumbers2);',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing nested arrays')
      .add(buildName, {
        'fn': '\
          lodash.isEqual(nestedNumbers, nestedNumbers2);\
          lodash.isEqual(nestedNumbers2, nestedNumbers3);',
        'teardown': 'function isEqual(){}'
      })
      .add(otherName, {
        'fn': '\
          _.isEqual(nestedNumbers, nestedNumbers2);\
          _.isEqual(nestedNumbers2, nestedNumbers3);',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing arrays of objects')
      .add(buildName, {
        'fn': '\
          lodash.isEqual(objects, objects2);\
          lodash.isEqual(simpleObjects, simpleObjects2);',
        'teardown': 'function isEqual(){}'
      })
      .add(otherName, {
        'fn': '\
          _.isEqual(objects, objects2);\
          _.isEqual(simpleObjects, simpleObjects2);',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing objects')
      .add(buildName, {
        'fn': '\
          lodash.isEqual(object, object2);\
          lodash.isEqual(simpleObject, simpleObject2);',
        'teardown': 'function isEqual(){}'
      })
      .add(otherName, {
        'fn': '\
          _.isEqual(object, object2);\
          _.isEqual(simpleObject, simpleObject2);',
        'teardown': 'function isEqual(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.isArguments`, `_.isDate`, `_.isFunction`, `_.isNumber`, `_.isRegExp`')
      .add(buildName, '\
        lodash.isArguments(arguments);\
        lodash.isArguments(object);\
        lodash.isDate(date);\
        lodash.isDate(object);\
        lodash.isFunction(lodash);\
        lodash.isFunction(object);\
        lodash.isNumber(1);\
        lodash.isNumber(object);\
        lodash.isRegExp(regexp);\
        lodash.isRegExp(object);'
      )
      .add(otherName, '\
        _.isArguments(arguments);\
        _.isArguments(object);\
        _.isDate(date);\
        _.isDate(object);\
        _.isFunction(_);\
        _.isFunction(object);\
        _.isNumber(1);\
        _.isNumber(object);\
        _.isRegExp(regexp);\
        _.isRegExp(object);'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.keys` (uses native `Object.keys` if available)')
      .add(buildName, '\
        lodash.keys(object)'
      )
      .add(otherName, '\
        _.keys(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.lastIndexOf`')
      .add(buildName, '\
        lodash.lastIndexOf(numbers, 9)'
      )
      .add(otherName, '\
        _.lastIndexOf(numbers, 9)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.map` iterating an array')
      .add(buildName, '\
        lodash.map(objects, function(value) {\
          return value.num;\
        })'
      )
      .add(otherName, '\
        _.map(objects, function(value) {\
          return value.num;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.map` with `thisArg` iterating an array (slow path)')
      .add(buildName, '\
        lodash.map(objects, function(value, index) {\
          return this["key" + index] + value.num;\
        }, object)'
      )
      .add(otherName, '\
        _.map(objects, function(value, index) {\
          return this["key" + index] + value.num;\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.map` iterating an object')
      .add(buildName, '\
        lodash.map(object, function(value) {\
          return value;\
        })'
      )
      .add(otherName, '\
        _.map(object, function(value) {\
          return value;\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.max`')
      .add(buildName, '\
        lodash.max(numbers)'
      )
      .add(otherName, '\
        _.max(numbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.min`')
      .add(buildName, '\
        lodash.min(numbers)'
      )
      .add(otherName, '\
        _.min(numbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.omit` iterating 20 properties, omitting 2 keys')
      .add(buildName, '\
        lodash.omit(object, "key6", "key13")'
      )
      .add(otherName, '\
        _.omit(object, "key6", "key13")'
      )
  );

  suites.push(
    Benchmark.Suite('`_.omit` iterating 40 properties, omitting 20 keys')
      .add(buildName, {
        'fn': 'lodash.omit(wordToNumber, words)',
        'teardown': 'function omit(){}'
      })
      .add(otherName, {
        'fn': '_.omit(wordToNumber, words)',
        'teardown': 'function omit(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pairs`')
      .add(buildName, '\
        lodash.pairs(object)'
      )
      .add(otherName, '\
        _.pairs(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pick`')
      .add(buildName, '\
        lodash.pick(object, "key6", "key13")'
      )
      .add(otherName, '\
        _.pick(object, "key6", "key13")'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pluck`')
      .add(buildName, '\
        lodash.pluck(objects, "num")'
      )
      .add(otherName, '\
        _.pluck(objects, "num")'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.reduce` iterating an array')
      .add(buildName, '\
        lodash.reduce(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
      .add(otherName, '\
        _.reduce(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
  );

  suites.push(
    Benchmark.Suite('`_.reduce` iterating an object')
      .add(buildName, '\
        lodash.reduce(object, function(result, value, key) {\
          result.push(key, value);\
          return result;\
        }, []);'
      )
      .add(otherName, '\
        _.reduce(object, function(result, value, key) {\
          result.push(key, value);\
          return result;\
        }, []);'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.reduceRight` iterating an array')
      .add(buildName, '\
        lodash.reduceRight(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
      .add(otherName, '\
        _.reduceRight(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
  );

  suites.push(
    Benchmark.Suite('`_.reduceRight` iterating an object')
      .add(buildName, '\
        lodash.reduceRight(object, function(result, value, key) {\
          result.push(key, value);\
          return result;\
        }, []);'
      )
      .add(otherName, '\
        _.reduceRight(object, function(result, value, key) {\
          result.push(key, value);\
          return result;\
        }, []);'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.reject` iterating an array')
      .add(buildName, '\
        lodash.reject(numbers, function(num) {\
          return num % 2;\
        })'
      )
      .add(otherName, '\
        _.reject(numbers, function(num) {\
          return num % 2;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.reject` iterating an array with `thisArg` (slow path)')
      .add(buildName, '\
        lodash.reject(numbers, function(num, index) {\
          return this["key" + index] % 2;\
        }, object)'
      )
      .add(otherName, '\
        _.reject(numbers, function(num, index) {\
           return this["key" + index] % 2;\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.reject` iterating an object')
      .add(buildName, '\
        lodash.reject(object, function(num) {\
          return num % 2\
        })'
      )
      .add(otherName, '\
        _.reject(object, function(num) {\
          return num % 2\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.shuffle`')
      .add(buildName, '\
        lodash.shuffle(numbers)'
      )
      .add(otherName, '\
        _.shuffle(numbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.size` with an object')
      .add(buildName, '\
        lodash.size(object)'
      )
      .add(otherName, '\
        _.size(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.some` iterating an array')
      .add(buildName, '\
        lodash.some(numbers, function(num) {\
          return num == 19;\
        })'
      )
      .add(otherName, '\
        _.some(numbers, function(num) {\
          return num == 19;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.some` with `thisArg` iterating an array (slow path)')
      .add(buildName, '\
        lodash.some(objects, function(value, index) {\
          return this["key" + index] == 19;\
        }, object)'
      )
      .add(otherName, '\
        _.some(objects, function(value, index) {\
          return this["key" + index] == 19;\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.some` iterating an object')
      .add(buildName, '\
        lodash.some(object, function(num) {\
          return num == 19;\
        })'
      )
      .add(otherName, '\
        _.some(object, function(num) {\
          return num == 19;\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.sortBy` with `callback`')
      .add(buildName, '\
        lodash.sortBy(numbers, function(num) { return Math.sin(num); })'
      )
      .add(otherName, '\
        _.sortBy(numbers, function(num) { return Math.sin(num); })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.sortBy` with `callback` and `thisArg` (slow path)')
      .add(buildName, '\
        lodash.sortBy(numbers, function(num) { return this.sin(num); }, Math)'
      )
      .add(otherName, '\
        _.sortBy(numbers, function(num) { return this.sin(num); }, Math)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.sortBy` with `property` name')
      .add(buildName, {
        'fn': 'lodash.sortBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
      .add(otherName, {
        'fn': '_.sortBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.sortedIndex`')
      .add(buildName, '\
        lodash.sortedIndex(numbers, 25)'
      )
      .add(otherName, '\
        _.sortedIndex(numbers, 25)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.sortedIndex` with `callback`')
      .add(buildName, {
        'fn': '\
          lodash.sortedIndex(words, "twenty-five", function(value) {\
            return wordToNumber[value];\
          })',
        'teardown': 'function countBy(){}'
      })
      .add(otherName, {
        'fn': '\
          _.sortedIndex(words, "twenty-five", function(value) {\
            return wordToNumber[value];\
          })',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.template` (slow path)')
      .add(buildName, {
        'fn': 'lodash.template(tpl, tplData)',
        'teardown': 'function template(){}'
      })
      .add(otherName, {
        'fn': '_.template(tpl, tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('compiled template')
      .add(buildName, {
        'fn': 'lodashTpl(tplData)',
        'teardown': 'function template(){}'
      })
      .add(otherName, {
        'fn': '_tpl(tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without a with-statement')
      .add(buildName, {
        'fn': 'lodashTplVerbose(tplData)',
        'teardown': 'function template(){}'
      })
      .add(otherName, {
        'fn': '_tplVerbose(tplData)',
        'teardown': 'function template(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.times`')
      .add(buildName, '\
        var result = [];\
        lodash.times(limit, function(n) { result.push(n); })'
      )
      .add(otherName, '\
        var result = [];\
        _.times(limit, function(n) { result.push(n); })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.times` with `thisArg`')
      .add(buildName, '\
        var result = [];\
        lodash.times(limit, function(n) { result.push(this.sin(n)); }, Math)'
      )
      .add(otherName, '\
        var result = [];\
        _.times(limit, function(n) { result.push(this.sin(n)); }, Math)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.toArray` with an array (edge case)')
      .add(buildName, '\
        lodash.toArray(numbers)'
      )
      .add(otherName, '\
        _.toArray(numbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.toArray` with an object')
      .add(buildName, '\
        lodash.toArray(object)'
      )
      .add(otherName, '\
        _.toArray(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.union`')
      .add(buildName, '\
        lodash.union(numbers, twoNumbers, fourNumbers)'
      )
      .add(otherName, '\
        _.union(numbers, twoNumbers, fourNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.union` iterating an array of 75 elements')
      .add(buildName, {
        'fn': 'lodash.union(fiftyValues, twentyFiveValues2);',
        'teardown': 'function multiArrays(){}'
      })
      .add(otherName, {
        'fn': '_.union(fiftyValues, twentyFiveValues2);',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.uniq`')
      .add(buildName, '\
        lodash.uniq(numbers.concat(twoNumbers, fourNumbers))'
      )
      .add(otherName, '\
        _.uniq(numbers.concat(twoNumbers, fourNumbers))'
      )
  );

  suites.push(
    Benchmark.Suite('`_.uniq` with `callback`')
      .add(buildName, '\
        lodash.uniq(numbers.concat(twoNumbers, fourNumbers), function(num) {\
          return num % 2;\
        });'
      )
      .add(otherName, '\
        _.uniq(numbers.concat(twoNumbers, fourNumbers), function(num) {\
          return num % 2;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.uniq` iterating an array of 75 elements')
      .add(buildName, {
        'fn': 'lodash.uniq(fiftyValues.concat(twentyFiveValues2));',
        'teardown': 'function multiArrays(){}'
      })
      .add(otherName, {
        'fn': '_.uniq(fiftyValues.concat(twentyFiveValues2));',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.values`')
      .add(buildName, '\
        lodash.values(object)'
      )
      .add(otherName, '\
        _.values(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.where`')
      .add(buildName, {
        'fn': 'lodash.where(objects, whereObject);',
        'teardown': 'function where(){}'
      })
      .add(otherName, {
        'fn': '_.where(objects, whereObject);',
        'teardown': 'function where(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.without`')
      .add(buildName, '\
        lodash.without(numbers, 9, 12, 14, 15)'
      )
      .add(otherName, '\
        _.without(numbers, 9, 12, 14, 15)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.without` iterating an array of 30 elements')
      .add(buildName, {
        'fn': 'lodash.without.apply(lodash, [thirtyValues].concat(thirtyValues2));',
        'teardown': 'function multiArrays(){}'
      })
      .add(otherName, {
        'fn': '_.without.apply(_, [thirtyValues].concat(thirtyValues2));',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  if (Benchmark.platform + '') {
    log(Benchmark.platform);
  }
  // in the browser, expose `run` to be called later
  if (window.document && !window.phantom) {
    window.run = run;
  } else {
    run();
  }
}(typeof global == 'object' && global || this));
