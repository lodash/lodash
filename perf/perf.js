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

  lodash.extend(Benchmark.options, {
    'async': true,
    'setup': function() {
      var window = Function('return this || global')(),
          _ = window._,
          lodash = window.lodash;

      var numbers = [],
          object = {},
          fourNumbers = [5, 25, 10, 30],
          nestedNumbers = [1, [2], [3, [[4]]]],
          twoNumbers = [12, 21],
          words = [
            'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
            'seventeen', 'eighteen', 'nineteen', 'twenty'
          ];

      var ctor = function() { },
          func = function(greeting) { return greeting + ': ' + this.name; };

      var lodashBoundNormal = lodash.bind(func, { 'name': 'moe' }),
          lodashBoundCtor = lodash.bind(ctor, { 'name': 'moe' }),
          lodashBoundPartial = lodash.bind(func, { 'name': 'moe' }, 'hi');

      var _boundNormal = _.bind(func, { 'name': 'moe' }),
          _boundCtor = _.bind(ctor, { 'name': 'moe' }),
          _boundPartial = _.bind(func, { 'name': 'moe' }, 'hi');

      for (var index = 0; index < 20; index++) {
        numbers[index] = index;
        object['key' + index] = index;
      }

      var objects = lodash.map(numbers, function(n) {
        return { 'num': n };
      });
    }
  });

  lodash.extend(Benchmark.Suite.options, {
    'onStart': function() {
      console.log('\n' + this.name + ':');
    },
    'onCycle': function(event) {
      console.log(event.target + '');
    },
    'onComplete': function() {
      var fastest = this.filter('fastest'),
          slowest = this.filter('slowest'),
          lodashHz = 1 / (this[0].stats.mean + this[0].stats.moe),
          underscoreHz = 1 / (this[1].stats.mean + this[1].stats.moe);

      if (fastest.length > 1) {
        console.log('It\'s too close to call.');
        lodashHz = underscoreHz = Math.min(lodashHz, underscoreHz);
      }
      else {
        var fastestHz = fastest[0] == this[0] ? lodashHz : underscoreHz,
            slowestHz = slowest[0] == this[0] ? lodashHz : underscoreHz,
            percent = Math.round(((fastestHz / slowestHz) - 1) * 100);

        console.log(fastest[0].name + ' is ' + percent + '% faster.');
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
            totalPercent = Math.round(((fastestTotalHz  / slowestTotalHz) - 1) * 100),
            totalX = (fastestTotalHz / slowestTotalHz).toFixed(2),
            message = ' is ' + totalPercent + '% (' + totalX + 'x) faster than ';

        // report results
        if (score.lodash >= score.underscore) {
          console.log('\nLo-Dash' + message + 'Underscore.');
        } else {
          console.log('\nUnderscore' + message + 'Lo-Dash.');
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
    Benchmark.Suite('bound normal')
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
        var timesTwo = [];
        lodash.each(numbers, function(num) {
          timesTwo.push(num * 2);
        });
      })
      .add('Underscore', function() {
        var timesTwo = [];
        _.each(numbers, function(num) {
          timesTwo.push(num * 2);
        });
      })
  );

  suites.push(
    Benchmark.Suite('each object')
      .add('Lo-Dash', function() {
        var timesTwo = [];
        lodash.each(object, function(num) {
          timesTwo.push(num * 2);
        });
      })
      .add('Underscore', function() {
        var timesTwo = [];
        _.each(object, function(num) {
          timesTwo.push(num * 2);
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
        lodash.groupBy(numbers, function(num) { return Math.floor(num); });
      })
      .add('Underscore', function() {
        _.groupBy(numbers, function(num) { return Math.floor(num); });
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
    Benchmark.Suite('map')
      .add('Lo-Dash', function() {
        lodash.map(objects, function(obj) {
          return obj.num;
        });
      })
      .add('Underscore', function() {
        _.map(objects, function(obj) {
          return obj.num;
        });
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
    console.log(Benchmark.platform + '');
  }
  // start suites
  suites[0].run();

}(typeof global == 'object' && global || this));
