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
      lodash = load('../lodash.min.js') || window._,
      lodash = lodash._ || lodash,
      lodash.noConflict()
    );

  /** Load Underscore */
  var _ =
    window._ || (
      _ = load('../vendor/underscore/underscore-min.js') || window._,
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
          lodash = window.lodash,
          numbers = [],
          object = {};

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
      var fastest = this.filter('fastest').pluck('name'),
          lodashHz = 1 / (this[0].stats.mean + this[0].stats.moe),
          underscoreHz = 1 / (this[1].stats.mean + this[1].stats.moe);

      if (fastest.length > 1) {
        console.log('It\'s too close to call.');
        lodashHz = underscoreHz = Math.min(lodashHz, underscoreHz);
      } else {
        console.log(fastest + ' is the fastest.');
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
        // report results
        if (score.lodash >= score.underscore) {
          console.log('\nLo-Dash is ' + (score.lodash / score.underscore).toFixed(2) + 'x faster than Underscore.');
        } else {
          console.log('\nUnderscore is ' + (score.underscore / score.lodash).toFixed(2) + 'x faster than Lo-Dash.');
        }
      }
    }
  });

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

  /*--------------------------------------------------------------------------*/

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
