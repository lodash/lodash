(function(window) {

  /** Use a single load function */
  var load = typeof require == 'function' ? require : window.load;

  /** Load Benchmark.js */
  var Benchmark =
    window.Benchmark || (
      Benchmark = load('../vendor/benchmark.js/benchmark.js') || window.Benchmark,
      Benchmark.Benchmark || Benchmark
    );

  /** Load Lo-Dash */
  var lodash =
    window.lodash || (
      lodash = load('../lodash.js') || window._,
      lodash = lodash._ || lodash,
      lodash.noConflict()
    );

  /** Load Underscore */
  var _ =
    window._ || (
      _ = load('../vendor/underscore/underscore.js') || window._,
      _._ || _
    );

  /** Used to access the Firebug Lite panel (set by `run`) */
  var fbPanel;

  /** Used to score Lo-Dash and Underscore performance */
  var score = { 'lodash': 0, 'underscore': 0 };

  /** Used to queue benchmark suites */
  var suites = [];

  /** Add `console.log()` support for Narwhal and RingoJS */
  window.console || (window.console = { 'log': window.print });

  /** Expose functions to the global object */
  window._ = _;
  window.Benchmark = Benchmark;
  window.lodash = lodash;

  /*--------------------------------------------------------------------------*/

  /**
   * Gets the Hz, i.e. operations per second, of `bench` adjusted for the
   * margin of error.
   *
   * @private
   * @param {Object} bench The benchmark object.
   * @returns {Number} Returns the adjusted Hz.
   */
  function getHz(bench) {
    return 1 / (bench.stats.mean + bench.stats.moe);
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
    suites[0].run();
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
          lodashHz = getHz(this[0]),
          underscoreHz = getHz(this[1]);

      if (fastest.length > 1) {
        log('It\'s too close to call.');
        lodashHz = underscoreHz = slowestHz;
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
      score.lodash += lodashHz;
      score.underscore += underscoreHz;

      // remove current suite from queue
      suites.shift();

      if (suites.length) {
        // run next suite
        suites[0].run();
      }
      else {
        var fastestTotalHz = Math.max(score.lodash, score.underscore),
            slowestTotalHz = Math.min(score.lodash, score.underscore),
            totalPercent = formatNumber(Math.round(((fastestTotalHz  / slowestTotalHz) - 1) * 100)),
            totalX = fastestTotalHz / slowestTotalHz,
            message = ' is ' + totalPercent + '% ' + (totalX == 1 ? '' : '(' + formatNumber(totalX.toFixed(2)) + 'x) ') + 'faster than ';

        // report results
        if (score.lodash >= score.underscore) {
          log('\nLo-Dash' + message + 'Underscore.');
        } else {
          log('\nUnderscore' + message + 'Lo-Dash.');
        }
      }
    }
  });

  /*--------------------------------------------------------------------------*/

  lodash.extend(Benchmark.options, {
    'async': true,
    'setup': '\
      var window = Function("return this || global")(),\
          _ = window._,\
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
          twoNumbers = [12, 21];\
      \
      for (index = 0; index < limit; index++) {\
        numbers[index] = index;\
        object["key" + index] = index;\
        objects[index] = { "num": index };\
      }\
      \
      if (typeof bind != "undefined") {\
        var contextObject = { "name": "moe" },\
            ctor = function() {};\
        \
        var func = function(greeting, punctuation) {\
          return greeting + ", " + this.name + (punctuation || ".");\
        };\
        \
        var lodashBoundNormal = lodash.bind(func, contextObject),\
            lodashBoundCtor = lodash.bind(ctor, contextObject),\
            lodashBoundPartial = lodash.bind(func, contextObject, "hi");\
        \
        var _boundNormal = _.bind(func, contextObject),\
            _boundCtor = _.bind(ctor, contextObject),\
            _boundPartial = _.bind(func, contextObject, "hi");\
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
            nestedNumbers2 = [1, [2], [3, [[4]]]];\
        \
        for (index = 0; index < limit; index++) {\
          numbers2[index] = index;\
          object2["key" + index] = index;\
          objects2[index] = { "num": index };\
        }\
      }\
      \
      if (typeof multiArrays != "undefined") {\
        var twentyFiveValues = Array(25),\
            twentyFiveValues2 = Array(25),\
            fiftyValues = Array(50),\
            seventyFiveValues = Array(75),\
            seventyFiveValues2 = Array(75),\
            lowerChars = "abcdefghijklmnopqrstuvwxyz".split(""),\
            upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");\
        \
        for (index = 0; index < 75; index++) {\
          if (index < 26) {\
            if (index < 20) {\
              twentyFiveValues[index] = lowerChars[index];\
              twentyFiveValues2[index] = upperChars[index];\
            }\
            else if (index < 25) {\
              twentyFiveValues[index] =\
              twentyFiveValues2[index] = index;\
            }\
            fiftyValues[index] =\
            seventyFiveValues[index] = lowerChars[index];\
            seventyFiveValues2[index] = upperChars[index];\
          }\
          else {\
            if (index < 50) {\
              fiftyValues[index] = index;\
            }\
            seventyFiveValues[index] = index;\
            seventyFiveValues2[index] = index + (index < 60 ? 75 : 0);\
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
        var tplBase =\
          "<div>" +\
          "<h1 class=\'header1\'><%= header1 %></h1>" +\
          "<h2 class=\'header2\'><%= header2 %></h2>" +\
          "<h3 class=\'header3\'><%= header3 %></h3>" +\
          "<h4 class=\'header4\'><%= header4 %></h4>" +\
          "<h5 class=\'header5\'><%= header5 %></h5>" +\
          "<h6 class=\'header6\'><%= header6 %></h6>";\
        \
        var tpl =\
          tplBase +\
          "<ul class=\'list\'>" +\
          "<li class=\'item\'><%= list[0] %></li>" +\
          "<li class=\'item\'><%= list[1] %></li>" +\
          "<li class=\'item\'><%= list[2] %></li>" +\
          "<li class=\'item\'><%= list[3] %></li>" +\
          "<li class=\'item\'><%= list[4] %></li>" +\
          "<li class=\'item\'><%= list[5] %></li>" +\
          "<li class=\'item\'><%= list[6] %></li>" +\
          "<li class=\'item\'><%= list[7] %></li>" +\
          "<li class=\'item\'><%= list[8] %></li>" +\
          "<li class=\'item\'><%= list[9] %></li>" +\
          "</ul>" +\
          "</div>";\
        \
        var tplWithEvaluate =\
          tplBase +\
          "<ul class=\'list\'>" +\
          "<% for (var index = 0, length = list.length; index < length; index++) { %>" +\
          "<li class=\'item\'><%= list[index] %></li>" +\
          "<% } %>" +\
          "</ul>" +\
          "</div>";\
        \
        var tplBaseVerbose =\
          "<div>" +\
          "<h1 class=\'header1\'><%= data.header1 %></h1>" +\
          "<h2 class=\'header2\'><%= data.header2 %></h2>" +\
          "<h3 class=\'header3\'><%= data.header3 %></h3>" +\
          "<h4 class=\'header4\'><%= data.header4 %></h4>" +\
          "<h5 class=\'header5\'><%= data.header5 %></h5>" +\
          "<h6 class=\'header6\'><%= data.header6 %></h6>";\
        \
        var tplVerbose =\
          tplBaseVerbose +\
          "<ul class=\'list\'>" +\
          "<li class=\'item\'><%= data.list[0] %></li>" +\
          "<li class=\'item\'><%= data.list[1] %></li>" +\
          "<li class=\'item\'><%= data.list[2] %></li>" +\
          "<li class=\'item\'><%= data.list[3] %></li>" +\
          "<li class=\'item\'><%= data.list[4] %></li>" +\
          "<li class=\'item\'><%= data.list[5] %></li>" +\
          "<li class=\'item\'><%= data.list[6] %></li>" +\
          "<li class=\'item\'><%= data.list[7] %></li>" +\
          "<li class=\'item\'><%= data.list[8] %></li>" +\
          "<li class=\'item\'><%= data.list[9] %></li>" +\
          "</ul>" +\
          "</div>";\
        \
        var tplVerboseWithEvaluate =\
          tplBaseVerbose +\
          "<ul class=\'list\'>" +\
          "<% for (var index = 0, length = data.list.length; index < length; index++) { %>" +\
          "<li class=\'item\'><%= data.list[index] %></li>" +\
          "<% } %>" +\
          "</ul>" +\
          "</div>";\
        \
        var settingsObject = { "variable": "data" };\
        \
        var lodashTpl = lodash.template(tpl),\
            lodashTplWithEvaluate = lodash.template(tplWithEvaluate),\
            lodashTplVerbose = lodash.template(tplVerbose, null, settingsObject),\
            lodashTplVerboseWithEvaluate = lodash.template(tplVerboseWithEvaluate, null, settingsObject);\
        \
        var _tpl = _.template(tpl),\
            _tplWithEvaluate = _.template(tplWithEvaluate),\
            _tplVerbose = _.template(tplVerbose, null, settingsObject),\
            _tplVerboseWithEvaluate = _.template(tplVerboseWithEvaluate, null, settingsObject);\
      }'
  });

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.bind` (uses native `Function#bind` if available and inferred fast)')
      .add('Lo-Dash', {
        'fn': 'lodash.bind(func, { "name": "moe" }, "hi")',
        'teardown': 'function bind(){}'
      })
      .add('Underscore', {
        'fn': '_.bind(func, { "name": "moe" }, "hi")',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound call')
      .add('Lo-Dash', {
        'fn': 'lodashBoundNormal()',
        'teardown': 'function bind(){}'
      })
      .add('Underscore', {
        'fn': '_boundNormal()',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound call with arguments')
      .add('Lo-Dash', {
        'fn': 'lodashBoundNormal("hi", "!")',
        'teardown': 'function bind(){}'
      })
      .add('Underscore', {
        'fn': '_boundNormal("hi", "!")',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound and partially applied call (uses native `Function#bind` if available)')
      .add('Lo-Dash', {
        'fn': 'lodashBoundPartial()',
        'teardown': 'function bind(){}'
      })
      .add('Underscore', {
        'fn': '_boundPartial()',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound and partially applied call with arguments (uses native `Function#bind` if available)')
      .add('Lo-Dash', {
        'fn': 'lodashBoundPartial("!")',
        'teardown': 'function bind(){}'
      })
      .add('Underscore', {
        'fn': '_boundPartial("!")',
        'teardown': 'function bind(){}'
      })
  );

  suites.push(
    Benchmark.Suite('bound and called in a `new` expression, i.e. `new bound` (edge case)')
      .add('Lo-Dash', {
        'fn': 'new lodashBoundCtor()',
        'teardown': 'function bind(){}'
      })
      .add('Underscore', {
        'fn': 'new _boundCtor()',
        'teardown': 'function bind(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.bindAll` iterating arguments')
      .add('Lo-Dash', {
        'fn': 'lodash.bindAll.apply(lodash, [bindAllObjects.pop()].concat(funcNames))',
        'teardown': 'function bindAll(){}'
      })
      .add('Underscore', {
        'fn': '_.bindAll.apply(_, [bindAllObjects.pop()].concat(funcNames))',
        'teardown': 'function bindAll(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.bindAll` iterating the `object`')
      .add('Lo-Dash', {
        'fn': 'lodash.bindAll(bindAllObjects.pop())',
        'teardown': 'function bindAll(){}'
      })
      .add('Underscore', {
        'fn': '_.bindAll(bindAllObjects.pop())',
        'teardown': 'function bindAll(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.clone` with an object')
      .add('Lo-Dash', '\
        lodash.clone(object)'
      )
      .add('Underscore', '\
        _.clone(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.countBy` with `callback` iterating an array')
      .add('Lo-Dash', '\
        lodash.countBy(numbers, function(num) { return num >> 1; })'
      )
      .add('Underscore', '\
        _.countBy(numbers, function(num) { return num >> 1; })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.countBy` with `property` name iterating an array')
      .add('Lo-Dash', {
        'fn': 'lodash.countBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
      .add('Underscore', {
        'fn': '_.countBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.countBy` with `callback` iterating an object')
      .add('Lo-Dash', {
        'fn': 'lodash.countBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
      .add('Underscore', {
        'fn': '_.countBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.difference`')
      .add('Lo-Dash', '\
        lodash.difference(numbers, fourNumbers, twoNumbers)'
      )
      .add('Underscore', '\
        _.difference(numbers, fourNumbers, twoNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.difference` iterating 25 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.difference(twentyFiveValues, twentyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.difference(twentyFiveValues, twentyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.difference` iterating 50 and 75 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.difference(fiftyValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.difference(fiftyValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.difference` iterating 75 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.difference(seventyFiveValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.difference(seventyFiveValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.each` iterating an array')
      .add('Lo-Dash', '\
        var result = [];\
        lodash.each(numbers, function(num) {\
          result.push(num * 2);\
        })'
      )
      .add('Underscore', '\
        var result = [];\
        _.each(numbers, function(num) {\
          result.push(num * 2);\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.each` iterating an array with `thisArg` (slow path)')
      .add('Lo-Dash', '\
        var result = [];\
        lodash.each(numbers, function(num, index) {\
          result.push(num + this["key" + index]);\
        }, object)'
      )
      .add('Underscore', '\
        var result = [];\
        _.each(numbers, function(num, index) {\
          result.push(num + this["key" + index]);\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.each` iterating an object')
      .add('Lo-Dash', '\
        var result = [];\
        lodash.each(object, function(num) {\
          result.push(num * 2);\
        })'
      )
      .add('Underscore', '\
        var result = [];\
        _.each(object, function(num) {\
          result.push(num * 2);\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.filter` iterating an array')
      .add('Lo-Dash', '\
        lodash.filter(numbers, function(num) {\
          return num % 2;\
        })'
      )
      .add('Underscore', '\
        _.filter(numbers, function(num) {\
          return num % 2;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.filter` iterating an array with `thisArg` (slow path)')
      .add('Lo-Dash', '\
        lodash.filter(numbers, function(num, index) {\
          return this["key" + index] % 2;\
        }, object)'
      )
      .add('Underscore', '\
        _.filter(numbers, function(num, index) {\
           return this["key" + index] % 2;\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.filter` iterating an object')
      .add('Lo-Dash', '\
        lodash.filter(object, function(num) {\
          return num % 2\
        })'
      )
      .add('Underscore', '\
        _.filter(object, function(num) {\
          return num % 2\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.find` iterating an array')
      .add('Lo-Dash', '\
        lodash.find(numbers, function(num) {\
          return num === 19;\
        })'
      )
      .add('Underscore', '\
        _.find(numbers, function(num) {\
          return num === 19;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.find` iterating an object')
      .add('Lo-Dash', '\
        lodash.find(object, function(value, key) {\
          return /\D9$/.test(key);\
        })'
      )
      .add('Underscore', '\
        _.find(object, function(value, key) {\
          return /\D9$/.test(key);\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.flatten`')
      .add('Lo-Dash', '\
        lodash.flatten(nestedNumbers)'
      )
      .add('Underscore', '\
        _.flatten(nestedNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.flatten` with `shallow`')
      .add('Lo-Dash', '\
        lodash.flatten(nestedNumbers, true)'
      )
      .add('Underscore', '\
        _.flatten(nestedNumbers, true)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.functions`')
      .add('Lo-Dash', '\
        lodash.functions(lodash)'
      )
      .add('Underscore', '\
        _.functions(lodash)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.groupBy` with `callback` iterating an array')
      .add('Lo-Dash', '\
        lodash.groupBy(numbers, function(num) { return num >> 1; })'
      )
      .add('Underscore', '\
        _.groupBy(numbers, function(num) { return num >> 1; })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.groupBy` with `property` name iterating an array')
      .add('Lo-Dash', {
        'fn': 'lodash.groupBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
      .add('Underscore', {
        'fn': '_.groupBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.groupBy` with `callback` iterating an object')
      .add('Lo-Dash', {
        'fn': 'lodash.groupBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
      .add('Underscore', {
        'fn': '_.groupBy(wordToNumber, function(num) { return num >> 1; })',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.indexOf`')
      .add('Lo-Dash', '\
        lodash.indexOf(numbers, 9)'
      )
      .add('Underscore', '\
        _.indexOf(numbers, 9)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.indexOf` with `isSorted`')
      .add('Lo-Dash', '\
        lodash.indexOf(numbers, 19, true)'
      )
      .add('Underscore', '\
        _.indexOf(numbers, 19, true)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.intersection`')
      .add('Lo-Dash', '\
        lodash.intersection(numbers, fourNumbers, twoNumbers)'
      )
      .add('Underscore', '\
        _.intersection(numbers, fourNumbers, twoNumbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.intersection` iterating 25 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.intersection(twentyFiveValues, twentyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.intersection(twentyFiveValues, twentyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.intersection` iterating 50 and 75 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.intersection(fiftyValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.intersection(fiftyValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.intersection` iterating 75 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.intersection(seventyFiveValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.intersection(seventyFiveValues, seventyFiveValues2)',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.invert`')
      .add('Lo-Dash', '\
        lodash.invert(object)'
      )
      .add('Underscore', '\
        _.invert(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.invoke` iterating an array')
      .add('Lo-Dash', '\
        lodash.invoke(numbers, "toFixed", "2")'
      )
      .add('Underscore', '\
        _.invoke(numbers, "toFixed", "2")'
      )
  );

  suites.push(
    Benchmark.Suite('`_.invoke` with a function for `methodName` iterating an array')
      .add('Lo-Dash', '\
        lodash.invoke(numbers, String.prototype.split, "")'
      )
      .add('Underscore', '\
        _.invoke(numbers, String.prototype.split, "")'
      )
  );

  suites.push(
    Benchmark.Suite('`_.invoke` iterating an object')
      .add('Lo-Dash', '\
        lodash.invoke(object, "toFixed", "2")'
      )
      .add('Underscore', '\
        _.invoke(object, "toFixed", "2")'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing primitives and objects (edge case)')
      .add('Lo-Dash', {
        'fn': 'lodash.isEqual(objectOfPrimitives, objectOfObjects)',
        'teardown': 'function isEqual(){}'
      })
      .add('Underscore', {
        'fn': '_.isEqual(objectOfPrimitives, objectOfObjects)',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing arrays')
      .add('Lo-Dash', {
        'fn': 'lodash.isEqual(numbers, numbers2)',
        'teardown': 'function isEqual(){}'
      })
      .add('Underscore', {
        'fn': '_.isEqual(numbers, numbers2)',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing nested arrays')
      .add('Lo-Dash', {
        'fn': 'lodash.isEqual(nestedNumbers, nestedNumbers2)',
        'teardown': 'function isEqual(){}'
      })
      .add('Underscore', {
        'fn': '_.isEqual(nestedNumbers, nestedNumbers2)',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing arrays of objects')
      .add('Lo-Dash', {
        'fn': 'lodash.isEqual(objects, objects2)',
        'teardown': 'function isEqual(){}'
      })
      .add('Underscore', {
        'fn': '_.isEqual(objects, objects2)',
        'teardown': 'function isEqual(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.isEqual` comparing objects')
      .add('Lo-Dash', {
        'fn': 'lodash.isEqual(object, object2)',
        'teardown': 'function isEqual(){}'
      })
      .add('Underscore', {
        'fn': '_.isEqual(object, object2)',
        'teardown': 'function isEqual(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.isArguments`, `_.isDate`, `_.isFunction`, `_.isNumber`, `_.isRegExp`')
      .add('Lo-Dash', '\
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
      .add('Underscore', '\
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
      .add('Lo-Dash', '\
        lodash.keys(object)'
      )
      .add('Underscore', '\
        _.keys(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.lastIndexOf`')
      .add('Lo-Dash', '\
        lodash.lastIndexOf(numbers, 9)'
      )
      .add('Underscore', '\
        _.lastIndexOf(numbers, 9)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.map` iterating an array')
      .add('Lo-Dash', '\
        lodash.map(objects, function(value) {\
          return value.num;\
        })'
      )
      .add('Underscore', '\
        _.map(objects, function(value) {\
          return value.num;\
        })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.map` with `thisArg` iterating an array (slow path)')
      .add('Lo-Dash', '\
        lodash.map(objects, function(value, index) {\
          return this["key" + index] + value.num;\
        }, object)'
      )
      .add('Underscore', '\
        _.map(objects, function(value, index) {\
          return this["key" + index] + value.num;\
        }, object)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.map` iterating an object')
      .add('Lo-Dash', '\
        lodash.map(object, function(value) {\
          return value;\
        })'
      )
      .add('Underscore', '\
        _.map(object, function(value) {\
          return value;\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.max`')
      .add('Lo-Dash', '\
        lodash.max(numbers)'
      )
      .add('Underscore', '\
        _.max(numbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.min`')
      .add('Lo-Dash', '\
        lodash.min(numbers)'
      )
      .add('Underscore', '\
        _.min(numbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.omit` iterating 20 properties, omitting 2 keys')
      .add('Lo-Dash', '\
        lodash.omit(object, "key6", "key13")'
      )
      .add('Underscore', '\
        _.omit(object, "key6", "key13")'
      )
  );

  suites.push(
    Benchmark.Suite('`_.omit` iterating 40 properties, omitting 20 keys')
      .add('Lo-Dash', {
        'fn': 'lodash.omit(wordToNumber, words)',
        'teardown': 'function omit(){}'
      })
      .add('Underscore', {
        'fn': 'result = _.omit(wordToNumber, words)',
        'teardown': 'function omit(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pairs`')
      .add('Lo-Dash', '\
        lodash.pairs(object)'
      )
      .add('Underscore', '\
        _.pairs(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pick`')
      .add('Lo-Dash', '\
        lodash.pick(object, "key6", "key13")'
      )
      .add('Underscore', '\
        _.pick(object, "key6", "key13")'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pluck`')
      .add('Lo-Dash', '\
        lodash.pluck(objects, "num")'
      )
      .add('Underscore', '\
        _.pluck(objects, "num")'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.reduce` iterating an array')
      .add('Lo-Dash', '\
        lodash.reduce(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
      .add('Underscore', '\
        _.reduce(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
  );

  suites.push(
    Benchmark.Suite('`_.reduce` iterating an object')
      .add('Lo-Dash', '\
        lodash.reduce(object, function(result, value, key) {\
          result.push([key, value]);\
          return result;\
        }, []);'
      )
      .add('Underscore', '\
        _.reduce(object, function(result, value, key) {\
          result.push([key, value]);\
          return result;\
        }, []);'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.reduceRight` iterating an array')
      .add('Lo-Dash', '\
        lodash.reduceRight(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
      .add('Underscore', '\
        _.reduceRight(numbers, function(result, value, index) {\
          result[index] = value;\
          return result;\
        }, {});'
      )
  );

  suites.push(
    Benchmark.Suite('`_.reduceRight` iterating an object')
      .add('Lo-Dash', '\
        lodash.reduceRight(object, function(result, value, key) {\
          result.push([key, value]);\
          return result;\
        }, []);'
      )
      .add('Underscore', '\
        _.reduceRight(object, function(result, value, key) {\
          result.push([key, value]);\
          return result;\
        }, []);'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.shuffle`')
      .add('Lo-Dash', '\
        lodash.shuffle(numbers)'
      )
      .add('Underscore', '\
        _.shuffle(numbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.size` with an object')
      .add('Lo-Dash', '\
        lodash.size(object)'
      )
      .add('Underscore', '\
        _.size(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.sortBy` with `callback`')
      .add('Lo-Dash', '\
        lodash.sortBy(numbers, function(num) { return Math.sin(num); })'
      )
      .add('Underscore', '\
        _.sortBy(numbers, function(num) { return Math.sin(num); })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.sortBy` with `callback` and `thisArg` (slow path)')
      .add('Lo-Dash', '\
        lodash.sortBy(numbers, function(num) { return this.sin(num); }, Math)'
      )
      .add('Underscore', '\
        _.sortBy(numbers, function(num) { return this.sin(num); }, Math)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.sortBy` with `property` name')
      .add('Lo-Dash', {
        'fn': 'lodash.sortBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
      .add('Underscore', {
        'fn': '_.sortBy(words, "length")',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.sortedIndex`')
      .add('Lo-Dash', '\
        lodash.sortedIndex(numbers, 25)'
      )
      .add('Underscore', '\
        _.sortedIndex(numbers, 25)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.sortedIndex` with `callback`')
      .add('Lo-Dash', {
        'fn': '\
          lodash.sortedIndex(words, "twenty-five", function(value) {\
            return wordToNumber[value];\
          })',
        'teardown': 'function countBy(){}'
      })
      .add('Underscore', {
        'fn': '\
          _.sortedIndex(words, "twenty-five", function(value) {\
            return wordToNumber[value];\
          })',
        'teardown': 'function countBy(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.template` without "evaluate" delimiters (slow path)')
      .add('Lo-Dash', {
        'fn': 'lodash.template(tpl, tplData)',
        'teardown': 'function template(){}'
      })
      .add('Underscore', {
        'fn': '_.template(tpl, tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.template` with "evaluate" delimiters (slow path)')
      .add('Lo-Dash', {
        'fn': 'lodash.template(tplWithEvaluate, tplData)',
        'teardown': 'function template(){}'
      })
      .add('Underscore', {
        'fn': '_.template(tplWithEvaluate, tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without "evaluate" delimiters')
      .add('Lo-Dash', {
        'fn': 'lodashTpl(tplData)',
        'teardown': 'function template(){}'
      })
      .add('Underscore', {
        'fn': '_tpl(tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('compiled template with "evaluate" delimiters')
      .add('Lo-Dash', {
        'fn': 'lodashTplWithEvaluate(tplData)',
        'teardown': 'function template(){}'
      })
      .add('Underscore', {
        'fn': '_tplWithEvaluate(tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without a with-statement or "evaluate" delimiters')
      .add('Lo-Dash', {
        'fn': 'lodashTplVerbose(tplData)',
        'teardown': 'function template(){}'
      })
      .add('Underscore', {
        'fn': '_tplVerbose(tplData)',
        'teardown': 'function template(){}'
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without a with-statement using "evaluate" delimiters')
      .add('Lo-Dash', {
        'fn': 'lodashTplVerboseWithEvaluate(tplData)',
        'teardown': 'function template(){}'
      })
      .add('Underscore', {
        'fn': '_tplVerboseWithEvaluate(tplData)',
        'teardown': 'function template(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.times`')
      .add('Lo-Dash', '\
        var result = [];\
        lodash.times(length, function(n) { result.push(n); })'
      )
      .add('Underscore', '\
        var result = [];\
        _.times(length, function(n) { result.push(n); })'
      )
  );

  suites.push(
    Benchmark.Suite('`_.times` with `thisArg`')
      .add('Lo-Dash', '\
        var result = [];\
        lodash.times(length, function(n) { result.push(this.sin(n)); }, Math)'
      )
      .add('Underscore', '\
        var result = [];\
        _.times(length, function(n) { result.push(this.sin(n)); }, Math)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.toArray` with an array')
      .add('Lo-Dash', '\
        lodash.toArray(numbers)'
      )
      .add('Underscore', '\
        _.toArray(numbers)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.toArray` with an object')
      .add('Lo-Dash', '\
        lodash.toArray(object)'
      )
      .add('Underscore', '\
        _.toArray(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.union`')
      .add('Lo-Dash', '\
        lodash.union(numbers, fourNumbers, twoNumbers)'
      )
      .add('Underscore', '\
        _.union(numbers, fourNumbers, twoNumbers)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.uniq`')
      .add('Lo-Dash', '\
        lodash.uniq(numbers.concat(fourNumbers, twoNumbers))'
      )
      .add('Underscore', '\
        _.uniq(numbers.concat(fourNumbers, twoNumbers))'
      )
  );

  suites.push(
    Benchmark.Suite('`_.uniq` with `callback`')
      .add('Lo-Dash', '\
        lodash.uniq(numbers.concat(fourNumbers, twoNumbers), function(num) {\
          return num % 2;\
        });'
      )
      .add('Underscore', '\
        _.uniq(numbers.concat(fourNumbers, twoNumbers), function(num) {\
          return num % 2;\
        })'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.values`')
      .add('Lo-Dash', '\
        lodash.values(object)'
      )
      .add('Underscore', '\
        _.values(object)'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.where`')
      .add('Lo-Dash', '\
        lodash.where(objects, { "num": 9 });'
      )
      .add('Underscore', '\
        _.where(objects, { "num": 9 });'
      )
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.without`')
      .add('Lo-Dash', '\
        lodash.without(numbers, 9, 12, 14, 15)'
      )
      .add('Underscore', '\
        _.without(numbers, 9, 12, 14, 15)'
      )
  );

  suites.push(
    Benchmark.Suite('`_.without` iterating an array of 25 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.without.apply(lodash, [twentyFiveValues].concat(twentyFiveValues2));',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.without.apply(_, [twentyFiveValues].concat(twentyFiveValues2));',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.without` iterating an array of 75 and 50 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.without.apply(lodash, [seventyFiveValues2].concat(fiftyValues));',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.without.apply(_, [seventyFiveValues2].concat(fiftyValues));',
        'teardown': 'function multiArrays(){}'
      })
  );

  suites.push(
    Benchmark.Suite('`_.without` iterating an array of 75 elements')
      .add('Lo-Dash', {
        'fn': 'lodash.without.apply(lodash, [seventyFiveValues].concat(seventyFiveValues2));',
        'teardown': 'function multiArrays(){}'
      })
      .add('Underscore', {
        'fn': '_.without.apply(_, [seventyFiveValues].concat(seventyFiveValues2));',
        'teardown': 'function multiArrays(){}'
      })
  );

  /*--------------------------------------------------------------------------*/

  if (Benchmark.platform + '') {
    log(Benchmark.platform);
  }

  // in the browser, expose `run` to be called later
  if (window.document) {
    window.run = run;
  } else {
    run();
  }
}(typeof global == 'object' && global || this));
