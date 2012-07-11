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

  /** Used to access the Firebug Lite panel */
  var fbPanel = (fbPanel = window.document && document.getElementById('FirebugUI')) &&
    (fbPanel = (fbPanel = fbPanel.contentWindow || fbPanel.contentDocument).document || fbPanel) &&
    fbPanel.getElementById('fbPanel1');

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
    console.log(text);
    if (fbPanel) {
      // scroll the Firebug Lite panel down
      fbPanel.scrollTop = fbPanel.scrollHeight;
    }
  }

  /*--------------------------------------------------------------------------*/

  lodash.extend(Benchmark.options, {
    'async': true,
    'setup': function() {
      var window = Function('return this || global')(),
          _ = window._,
          lodash = window.lodash;

      var length = 20,
          numbers = [],
          object = {},
          fourNumbers = [5, 25, 10, 30],
          nestedNumbers = [1, [2], [3, [[4]]]],
          twoNumbers = [12, 21];

      var ctor = function() { };

      var func = function(greeting, punctuation) {
        return greeting + ', ' + this.name + (punctuation || '.');
      };

      var lodashBoundNormal = lodash.bind(func, { 'name': 'moe' }),
          lodashBoundCtor = lodash.bind(ctor, { 'name': 'moe' }),
          lodashBoundPartial = lodash.bind(func, { 'name': 'moe' }, 'hi');

      var _boundNormal = _.bind(func, { 'name': 'moe' }),
          _boundCtor = _.bind(ctor, { 'name': 'moe' }),
          _boundPartial = _.bind(func, { 'name': 'moe' }, 'hi');

      var tplData = {
        'header1': 'Header1',
        'header2': 'Header2',
        'header3': 'Header3',
        'header4': 'Header4',
        'header5': 'Header5',
        'header6': 'Header6',
        'list': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      };

      var tplBase =
        '<div>' +
        "<h1 class='header1'><%= header1 %></h1>" +
        "<h2 class='header2'><%= header2 %></h2>" +
        "<h3 class='header3'><%= header3 %></h3>" +
        "<h4 class='header4'><%= header4 %></h4>" +
        "<h5 class='header5'><%= header5 %></h5>" +
        "<h6 class='header6'><%= header6 %></h6>";

      var tpl =
        tplBase +
        "<ul class='list'>" +
        "<li class='item'><%= list[0] %></li>" +
        "<li class='item'><%= list[1] %></li>" +
        "<li class='item'><%= list[2] %></li>" +
        "<li class='item'><%= list[3] %></li>" +
        "<li class='item'><%= list[4] %></li>" +
        "<li class='item'><%= list[5] %></li>" +
        "<li class='item'><%= list[6] %></li>" +
        "<li class='item'><%= list[7] %></li>" +
        "<li class='item'><%= list[8] %></li>" +
        "<li class='item'><%= list[9] %></li>" +
        '</ul>' +
        '</div>';

      var tplWithEvaluate =
        tplBase +
        "<ul class='list'>" +
        '<% for (var index = 0, length = list.length; index < length; index++) { %>' +
        "<li class='item'><%= list[index] %></li>" +
        '<% } %>' +
        '</ul>' +
        '</div>';

      var tplBaseVerbose =
        '<div>' +
        "<h1 class='header1'><%= data.header1 %></h1>" +
        "<h2 class='header2'><%= data.header2 %></h2>" +
        "<h3 class='header3'><%= data.header3 %></h3>" +
        "<h4 class='header4'><%= data.header4 %></h4>" +
        "<h5 class='header5'><%= data.header5 %></h5>" +
        "<h6 class='header6'><%= data.header6 %></h6>";

      var tplVerbose =
        tplBaseVerbose +
        "<ul class='list'>" +
        "<li class='item'><%= data.list[0] %></li>" +
        "<li class='item'><%= data.list[1] %></li>" +
        "<li class='item'><%= data.list[2] %></li>" +
        "<li class='item'><%= data.list[3] %></li>" +
        "<li class='item'><%= data.list[4] %></li>" +
        "<li class='item'><%= data.list[5] %></li>" +
        "<li class='item'><%= data.list[6] %></li>" +
        "<li class='item'><%= data.list[7] %></li>" +
        "<li class='item'><%= data.list[8] %></li>" +
        "<li class='item'><%= data.list[9] %></li>" +
        '</ul>' +
        '</div>';

      var tplVerboseWithEvaluate =
        tplBaseVerbose +
        "<ul class='list'>" +
        '<% for (var index = 0, length = data.list.length; index < length; index++) { %>' +
        "<li class='item'><%= data.list[index] %></li>" +
        '<% } %>' +
        '</ul>' +
        '</div>';

      var lodashTpl = lodash.template(tpl),
          lodashTplWithEvaluate = lodash.template(tplWithEvaluate),
          lodashTplVerbose = lodash.template(tplVerbose, null, { 'variable': 'data' }),
          lodashTplVerboseWithEvaluate = lodash.template(tplVerboseWithEvaluate, null, { 'variable': 'data' });

      var _tpl = _.template(tpl),
          _tplWithEvaluate = _.template(tplWithEvaluate),
          _tplVerbose = _.template(tplVerbose, null, { 'variable': 'data' }),
          _tplVerboseWithEvaluate = _.template(tplVerboseWithEvaluate, null, { 'variable': 'data' });

      var wordToNumber = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'twenty-one': 21,
        'twenty-two': 22,
        'twenty-three': 23,
        'twenty-four': 24,
        'twenty-five': 25
      };

      var words = _.keys(wordToNumber).slice(0, length);

      for (var index = 0; index < length; index++) {
        numbers[index] = index;
        object['key' + index] = index;
      }

      var objects = lodash.map(numbers, function(num) {
        return { 'num': num };
      });
    }
  });

  lodash.extend(Benchmark.Suite.options, {
    'onStart': function() {
      log('\n' + this.name + ':');
    },
    'onCycle': function(event) {
      log(event.target + '');
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

  suites.push(
    Benchmark.Suite('`_.bind` (uses native `Function#bind` if available and inferred fast)')
      .add('Lo-Dash', function() {
        lodash.bind(func, { 'name': 'moe' }, 'hi');
      })
      .add('Underscore', function() {
        _.bind(func, { 'name': 'moe' }, 'hi');
      })
  );

  suites.push(
    Benchmark.Suite('bound call')
      .add('Lo-Dash', function() {
        lodashBoundNormal();
      })
      .add('Underscore', function() {
        _boundNormal();
      })
  );

  suites.push(
    Benchmark.Suite('bound call with arguments')
      .add('Lo-Dash', function() {
        lodashBoundNormal('hi', '!');
      })
      .add('Underscore', function() {
        _boundNormal('hi', '!');
      })
  );

  suites.push(
    Benchmark.Suite('bound and partially applied call (uses native `Function#bind` if available)')
      .add('Lo-Dash', function() {
        lodashBoundPartial();
      })
      .add('Underscore', function() {
        _boundPartial();
      })
  );

  suites.push(
    Benchmark.Suite('bound and partially applied call with arguments (uses native `Function#bind` if available)')
      .add('Lo-Dash', function() {
        lodashBoundPartial('!');
      })
      .add('Underscore', function() {
        _boundPartial('!');
      })
  );

  suites.push(
    Benchmark.Suite('bound and called in a `new` expression, i.e. `new bound` (edge case)')
      .add('Lo-Dash', function() {
        new lodashBoundCtor();
      })
      .add('Underscore', function() {
        new _boundCtor();
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.each` iterating an array')
      .add('Lo-Dash', function() {
        var result = [];
        lodash.each(numbers, function(num) {
          result.push(num * 2);
        });
      })
      .add('Underscore', function() {
        var result = [];
        _.each(numbers, function(num) {
          result.push(num * 2);
        });
      })
  );

  suites.push(
    Benchmark.Suite('`_.each` iterating an array with `thisArg` (slow path)')
      .add('Lo-Dash', function() {
        var result = [];
        lodash.each(numbers, function(num, index) {
          result.push(num + this['key' + index]);
        }, object);
      })
      .add('Underscore', function() {
        var result = [];
        _.each(numbers, function(num, index) {
          result.push(num + this['key' + index]);
        }, object);
      })
  );

  suites.push(
    Benchmark.Suite('`_.each` iterating an object')
      .add('Lo-Dash', function() {
        var result = [];
        lodash.each(object, function(num) {
          result.push(num * 2);
        });
      })
      .add('Underscore', function() {
        var result = [];
        _.each(object, function(num) {
          result.push(num * 2);
        });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.filter` iterating an array')
      .add('Lo-Dash', function() {
        lodash.filter(numbers, function(num) {
          return num % 2;
        });
      })
      .add('Underscore', function() {
        _.filter(numbers, function(num) {
          return num % 2;
        });
      })
  );

  suites.push(
    Benchmark.Suite('`_.filter` iterating an array with `thisArg` (slow path)')
      .add('Lo-Dash', function() {
        lodash.filter(numbers, function(num, index) {
          return this['key' + index] % 2;
        }, object);
      })
      .add('Underscore', function() {
        _.filter(numbers, function(num, index) {
           return this['key' + index] % 2;
        }, object);
      })
  );

  suites.push(
    Benchmark.Suite('`_.filter` iterating an object')
      .add('Lo-Dash', function() {
        lodash.filter(object, function(num) {
          return num % 2;
        });
      })
      .add('Underscore', function() {
        _.filter(object, function(num) {
          return num % 2;
        });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.find` iterating an array')
      .add('Lo-Dash', function() {
        lodash.find(numbers, function(num) {
          return num === 19;
        });
      })
      .add('Underscore', function() {
        _.find(numbers, function(num) {
          return num === 19;
        });
      })
  );

  suites.push(
    Benchmark.Suite('`_.find` iterating an object')
      .add('Lo-Dash', function() {
        lodash.find(numbers, function(value, key) {
          return /\D9$/.test(key);
        });
      })
      .add('Underscore', function() {
        _.find(numbers, function(value, key) {
          return /\D9$/.test(key);
        });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.flatten`')
      .add('Lo-Dash', function() {
        lodash.flatten(nestedNumbers);
      })
      .add('Underscore', function() {
        _.flatten(nestedNumbers);
      })
  );

  suites.push(
    Benchmark.Suite('`_.flatten` with `shallow`')
      .add('Lo-Dash', function() {
        lodash.flatten(nestedNumbers, true);
      })
      .add('Underscore', function() {
        _.flatten(nestedNumbers, true);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.difference`')
      .add('Lo-Dash', function() {
        lodash.difference(numbers, fourNumbers, twoNumbers);
      })
      .add('Underscore', function() {
        _.difference(numbers, fourNumbers, twoNumbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.groupBy` with `callback` iterating an array')
      .add('Lo-Dash', function() {
        lodash.groupBy(numbers, function(num) { return num >> 1; });
      })
      .add('Underscore', function() {
        _.groupBy(numbers, function(num) { return num >> 1; });
      })
  );

  suites.push(
    Benchmark.Suite('`_.groupBy` with `property` name iterating an array')
      .add('Lo-Dash', function() {
        lodash.groupBy(words, 'length');
      })
      .add('Underscore', function() {
        _.groupBy(words, 'length');
      })
  );

  suites.push(
    Benchmark.Suite('`_.groupBy` with `callback` iterating an object')
      .add('Lo-Dash', function() {
        lodash.groupBy(wordToNumber, function(num) { return num >> 1; });
      })
      .add('Underscore', function() {
        _.groupBy(wordToNumber, function(num) { return num >> 1; });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.indexOf`')
      .add('Lo-Dash', function() {
        lodash.indexOf(numbers, 9);
      })
      .add('Underscore', function() {
        _.indexOf(numbers, 9);
      })
  );

  suites.push(
    Benchmark.Suite('`_.indexOf` with `isSorted`')
      .add('Lo-Dash', function() {
        lodash.indexOf(numbers, 19, true);
      })
      .add('Underscore', function() {
        _.indexOf(numbers, 19, true);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.intersection`')
      .add('Lo-Dash', function() {
        lodash.intersection(numbers, fourNumbers, twoNumbers);
      })
      .add('Underscore', function() {
        _.intersection(numbers, fourNumbers, twoNumbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.keys` (uses native `Object.keys` if available)')
      .add('Lo-Dash', function() {
        lodash.keys(object);
      })
      .add('Underscore', function() {
        _.keys(object);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.lastIndexOf`')
      .add('Lo-Dash', function() {
        lodash.lastIndexOf(numbers, 9);
      })
      .add('Underscore', function() {
        _.lastIndexOf(numbers, 9);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.map` iterating an array')
      .add('Lo-Dash', function() {
        lodash.map(objects, function(value) {
          return value.num;
        });
      })
      .add('Underscore', function() {
        _.map(objects, function(value) {
          return value.num;
        });
      })
  );

  suites.push(
    Benchmark.Suite('`_.map` with `thisArg` iterating an array (slow path)')
      .add('Lo-Dash', function() {
        lodash.map(objects, function(value, index) {
          return this['key' + index] + value.num;
        }, object);
      })
      .add('Underscore', function() {
        _.map(objects, function(value, index) {
          return this['key' + index] + value.num;
        }, object);
      })
  );

  suites.push(
    Benchmark.Suite('`_.map` iterating an object')
      .add('Lo-Dash', function() {
        lodash.map(object, function(value) {
          return value;
        });
      })
      .add('Underscore', function() {
        _.map(object, function(value) {
          return value;
        });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.max`')
      .add('Lo-Dash', function() {
        lodash.max(numbers);
      })
      .add('Underscore', function() {
        _.max(numbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.min`')
      .add('Lo-Dash', function() {
        lodash.min(numbers);
      })
      .add('Underscore', function() {
        _.min(numbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pick`')
      .add('Lo-Dash', function() {
        lodash.pick(object, 'key6', 'key13');
      })
      .add('Underscore', function() {
        _.pick(object, 'key6', 'key13');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.pluck`')
      .add('Lo-Dash', function() {
        lodash.pluck(objects, 'num');
      })
      .add('Underscore', function() {
        _.pluck(objects, 'num');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.shuffle`')
      .add('Lo-Dash', function() {
        lodash.shuffle(numbers);
      })
      .add('Underscore', function() {
        _.shuffle(numbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.size` with an array')
      .add('Lo-Dash', function() {
        lodash.size(numbers);
      })
      .add('Underscore', function() {
        _.size(numbers);
      })
  );

  suites.push(
    Benchmark.Suite('`_.size` with an object')
      .add('Lo-Dash', function() {
        lodash.size(object);
      })
      .add('Underscore', function() {
        _.size(object);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.sortBy` with `callback`')
      .add('Lo-Dash', function() {
        lodash.sortBy(numbers, function(num) { return Math.sin(num); });
      })
      .add('Underscore', function() {
        _.sortBy(numbers, function(num) { return Math.sin(num); });
      })
  );

  suites.push(
    Benchmark.Suite('`_.sortBy` with `callback` and `thisArg` (slow path)')
      .add('Lo-Dash', function() {
        lodash.sortBy(numbers, function(num) { return this.sin(num); }, Math);
      })
      .add('Underscore', function() {
        _.sortBy(numbers, function(num) { return this.sin(num); }, Math);
      })
  );

  suites.push(
    Benchmark.Suite('`_.sortBy` with `property` name')
      .add('Lo-Dash', function() {
        lodash.sortBy(words, 'length');
      })
      .add('Underscore', function() {
        _.sortBy(words, 'length');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.sortedIndex`')
      .add('Lo-Dash', function() {
        lodash.sortedIndex(numbers, 25);
      })
      .add('Underscore', function() {
        _.sortedIndex(numbers, 25);
      })
  );

  suites.push(
    Benchmark.Suite('`_.sortedIndex` with `callback`')
      .add('Lo-Dash', function() {
        lodash.sortedIndex(words, 'twenty-five', function(value) {
          return wordToNumber[value];
        });
      })
      .add('Underscore', function() {
        _.sortedIndex(words, 'twenty-five', function(value) {
          return wordToNumber[value];
        });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.template` without "evaluate" delimiters (slow path)')
      .add('Lo-Dash', function() {
        lodash.template(tpl, tplData);
      })
      .add('Underscore', function() {
        _.template(tpl, tplData);
      })
  );

  suites.push(
    Benchmark.Suite('`_.template` with "evaluate" delimiters (slow path)')
      .add('Lo-Dash', function() {
        lodash.template(tplWithEvaluate, tplData);
      })
      .add('Underscore', function() {
        _.template(tplWithEvaluate, tplData);
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without "evaluate" delimiters')
      .add('Lo-Dash', function() {
        lodashTpl(tplData);
      })
      .add('Underscore', function() {
        _tpl(tplData);
      })
  );

  suites.push(
    Benchmark.Suite('compiled template with "evaluate" delimiters')
      .add('Lo-Dash', function() {
        lodashTplWithEvaluate(tplData);
      })
      .add('Underscore', function() {
        _tplWithEvaluate(tplData);
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without a with-statement or "evaluate" delimiters')
      .add('Lo-Dash', function() {
        lodashTplVerbose(tplData);
      })
      .add('Underscore', function() {
        _tplVerbose(tplData);
      })
  );

  suites.push(
    Benchmark.Suite('compiled template without a with-statement using "evaluate" delimiters')
      .add('Lo-Dash', function() {
        lodashTplVerboseWithEvaluate(tplData);
      })
      .add('Underscore', function() {
        _tplVerboseWithEvaluate(tplData);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.times`')
      .add('Lo-Dash', function() {
        var result = [];
        lodash.times(length, function(n) { result.push(n); });
      })
      .add('Underscore', function() {
        var result = [];
        _.times(length, function(n) { result.push(n); });
      })
  );

  suites.push(
    Benchmark.Suite('`_.times` with `thisArg`')
      .add('Lo-Dash', function() {
        var result = [];
        lodash.times(length, function(n) { result.push(this.sin(n)); }, Math);
      })
      .add('Underscore', function() {
        var result = [];
        _.times(length, function(n) { result.push(this.sin(n)); }, Math);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.toArray` with an array')
      .add('Lo-Dash', function() {
        lodash.toArray(numbers);
      })
      .add('Underscore', function() {
        _.toArray(numbers);
      })
  );

  suites.push(
    Benchmark.Suite('`_.toArray` with an object')
      .add('Lo-Dash', function() {
        lodash.toArray(object);
      })
      .add('Underscore', function() {
        _.toArray(object);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.union`')
      .add('Lo-Dash', function() {
        lodash.union(numbers, fourNumbers, twoNumbers);
      })
      .add('Underscore', function() {
        _.union(numbers, fourNumbers, twoNumbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.uniq`')
      .add('Lo-Dash', function() {
        lodash.uniq(numbers.concat(fourNumbers, twoNumbers));
      })
      .add('Underscore', function() {
        _.uniq(numbers.concat(fourNumbers, twoNumbers));
      })
  );

  suites.push(
    Benchmark.Suite('`_.uniq` with `callback`')
      .add('Lo-Dash', function() {
        lodash.uniq(numbers.concat(fourNumbers, twoNumbers), function(num) {
          return num % 2;
        });
      })
      .add('Underscore', function() {
        _.uniq(numbers.concat(fourNumbers, twoNumbers), function(num) {
          return num % 2;
        });
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('`_.values`')
      .add('Lo-Dash', function() {
        lodash.values(object);
      })
      .add('Underscore', function() {
        _.values(object);
      })
  );

  /*--------------------------------------------------------------------------*/

  if (Benchmark.platform + '') {
    log(Benchmark.platform + '');
  }
  // start suites
  log('\nSit back and relax, this may take a while.');
  suites[0].run();

}(typeof global == 'object' && global || this));
