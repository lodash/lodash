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

      var ctor = function() { },
          func = function(greeting) { return greeting + ': ' + this.name; };

      var lodashBoundNormal = lodash.bind(func, { 'name': 'moe' }),
          lodashBoundCtor = lodash.bind(ctor, { 'name': 'moe' }),
          lodashBoundPartial = lodash.bind(func, { 'name': 'moe' }, 'hi');

      var _boundNormal = _.bind(func, { 'name': 'moe' }),
          _boundCtor = _.bind(ctor, { 'name': 'moe' }),
          _boundPartial = _.bind(func, { 'name': 'moe' }, 'hi');

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
          slowest = this.filter('slowest'),
          lodashHz = 1 / (this[0].stats.mean + this[0].stats.moe),
          underscoreHz = 1 / (this[1].stats.mean + this[1].stats.moe);

      if (fastest.length > 1) {
        log('It\'s too close to call.');
        lodashHz = underscoreHz = Math.min(lodashHz, underscoreHz);
      }
      else {
        var fastestHz = fastest[0] == this[0] ? lodashHz : underscoreHz,
            slowestHz = slowest[0] == this[0] ? lodashHz : underscoreHz,
            percent = formatNumber(Math.round(((fastestHz / slowestHz) - 1) * 100));

        log(fastest[0].name + ' is ' + percent + '% faster.');
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
    Benchmark.Suite('bind call')
      .add('Lo-Dash', function() {
        lodash.bind(func, { 'name': 'moe' }, 'hi');
      })
      .add('Underscore', function() {
        _.bind(func, { 'name': 'moe' }, 'hi');
      })
  );

  suites.push(
    Benchmark.Suite('bound')
      .add('Lo-Dash', function() {
        lodashBoundNormal();
      })
      .add('Underscore', function() {
        _boundNormal();
      })
  );

  suites.push(
    Benchmark.Suite('bound partial')
      .add('Lo-Dash', function() {
        lodashBoundPartial();
      })
      .add('Underscore', function() {
        _boundPartial();
      })
  );

  suites.push(
    Benchmark.Suite('bound constructor')
      .add('Lo-Dash', function() {
        new lodashBoundCtor();
      })
      .add('Underscore', function() {
        new _boundCtor();
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('each array')
      .add('Lo-Dash', function() {
        var result = [];
        lodash.each(numbers, function(num) { result.push(num * 2); });
      })
      .add('Underscore', function() {
        var result = [];
        _.each(numbers, function(num) { result.push(num * 2); });
      })
  );

  suites.push(
    Benchmark.Suite('each array thisArg')
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
    Benchmark.Suite('each object')
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
    Benchmark.Suite('find')
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

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('flatten deep')
      .add('Lo-Dash', function() {
        lodash.flatten(nestedNumbers);
      })
      .add('Underscore', function() {
        _.flatten(nestedNumbers);
      })
  );

  suites.push(
    Benchmark.Suite('flatten shallow')
      .add('Lo-Dash', function() {
        lodash.flatten(nestedNumbers, true);
      })
      .add('Underscore', function() {
        _.flatten(nestedNumbers, true);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('difference')
      .add('Lo-Dash', function() {
        lodash.difference(numbers, fourNumbers);
      })
      .add('Underscore', function() {
        _.difference(numbers, fourNumbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('groupBy callback')
      .add('Lo-Dash', function() {
        lodash.groupBy(numbers, function(num) { return num >> 1; });
      })
      .add('Underscore', function() {
        _.groupBy(numbers, function(num) { return num >> 1; });
      })
  );

  suites.push(
    Benchmark.Suite('groupBy property name')
      .add('Lo-Dash', function() {
        lodash.groupBy(words, 'length');
      })
      .add('Underscore', function() {
        _.groupBy(words, 'length');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('indexOf')
      .add('Lo-Dash', function() {
        lodash.indexOf(numbers, 9);
      })
      .add('Underscore', function() {
        _.indexOf(numbers, 9);
      })
  );

  suites.push(
    Benchmark.Suite('indexOf isSorted')
      .add('Lo-Dash', function() {
        lodash.indexOf(numbers, 19, true);
      })
      .add('Underscore', function() {
        _.indexOf(numbers, 19, true);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('intersection')
      .add('Lo-Dash', function() {
        lodash.intersection(numbers, fourNumbers, twoNumbers);
      })
      .add('Underscore', function() {
        _.intersection(numbers, fourNumbers, twoNumbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('keys')
      .add('Lo-Dash', function() {
        lodash.keys(object);
      })
      .add('Underscore', function() {
        _.keys(object);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('lastIndexOf')
      .add('Lo-Dash', function() {
        lodash.lastIndexOf(numbers, 9);
      })
      .add('Underscore', function() {
        _.lastIndexOf(numbers, 9);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('map')
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
    Benchmark.Suite('map thisArg')
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

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('max')
      .add('Lo-Dash', function() {
        lodash.max(numbers);
      })
      .add('Underscore', function() {
        _.max(numbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('min')
      .add('Lo-Dash', function() {
        lodash.min(numbers);
      })
      .add('Underscore', function() {
        _.min(numbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('pick')
      .add('Lo-Dash', function() {
        lodash.pick(object, 'key6', 'key13');
      })
      .add('Underscore', function() {
        _.pick(object, 'key6', 'key13');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('pluck')
      .add('Lo-Dash', function() {
        lodash.pluck(objects, 'num');
      })
      .add('Underscore', function() {
        _.pluck(objects, 'num');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('sortBy callback')
      .add('Lo-Dash', function() {
        lodash.sortBy(numbers, function(num) { return Math.sin(num); });
      })
      .add('Underscore', function() {
        _.sortBy(numbers, function(num) { return Math.sin(num); });
      })
  );

  suites.push(
    Benchmark.Suite('sortBy callback thisArg')
      .add('Lo-Dash', function() {
        lodash.sortBy(numbers, function(num) { return this.sin(num); }, Math);
      })
      .add('Underscore', function() {
        _.sortBy(numbers, function(num) { return this.sin(num); }, Math);
      })
  );

  suites.push(
    Benchmark.Suite('sortBy property name')
      .add('Lo-Dash', function() {
        lodash.sortBy(words, 'length');
      })
      .add('Underscore', function() {
        _.sortBy(words, 'length');
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('sortedIndex')
      .add('Lo-Dash', function() {
        lodash.sortedIndex(numbers, 25);
      })
      .add('Underscore', function() {
        _.sortedIndex(numbers, 25);
      })
  );

  suites.push(
    Benchmark.Suite('sortedIndex callback')
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
    Benchmark.Suite('times')
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
    Benchmark.Suite('times thisArg')
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
    Benchmark.Suite('union')
      .add('Lo-Dash', function() {
        lodash.union(numbers, fourNumbers, twoNumbers);
      })
      .add('Underscore', function() {
        _.union(numbers, fourNumbers, twoNumbers);
      })
  );

  /*--------------------------------------------------------------------------*/

  suites.push(
    Benchmark.Suite('uniq')
      .add('Lo-Dash', function() {
        lodash.uniq(numbers.concat(fourNumbers, twoNumbers));
      })
      .add('Underscore', function() {
        _.uniq(numbers.concat(fourNumbers, twoNumbers));
      })
  );

  suites.push(
    Benchmark.Suite('uniq callback')
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
    Benchmark.Suite('values')
      .add('Lo-Dash', function() {
        lodash.values(objects);
      })
      .add('Underscore', function() {
        _.values(objects);
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
