(function() {
  var _ = typeof require == 'function' ? require('..') : window._;

  QUnit.module('Functions');
  QUnit.config.asyncRetries = 3;

  test('bind', function() {
    var context = {name : 'moe'};
    var func = function(arg) { return 'name: ' + (this.name || arg); };
    var bound = _.bind(func, context);
    equal(bound(), 'name: moe', 'can bind a function to a context');

    bound = _(func).bind(context);
    equal(bound(), 'name: moe', 'can do OO-style binding');

    bound = _.bind(func, null, 'curly');
    var result = bound();
    // Work around a PhantomJS bug when applying a function with null|undefined.
    ok(result === 'name: curly' || result === 'name: ' + window.name, 'can bind without specifying a context');

    func = function(salutation, name) { return salutation + ': ' + name; };
    func = _.bind(func, this, 'hello');
    equal(func('moe'), 'hello: moe', 'the function was partially applied in advance');

    func = _.bind(func, this, 'curly');
    equal(func(), 'hello: curly', 'the function was completely applied in advance');

    func = function(salutation, firstname, lastname) { return salutation + ': ' + firstname + ' ' + lastname; };
    func = _.bind(func, this, 'hello', 'moe', 'curly');
    equal(func(), 'hello: moe curly', 'the function was partially applied in advance and can accept multiple arguments');

    func = function(context, message) { equal(this, context, message); };
    _.bind(func, 0, 0, 'can bind a function to `0`')();
    _.bind(func, '', '', 'can bind a function to an empty string')();
    _.bind(func, false, false, 'can bind a function to `false`')();

    // These tests are only meaningful when using a browser without a native bind function
    // To test this with a modern browser, set underscore's nativeBind to undefined
    var F = function () { return this; };
    var boundf = _.bind(F, {hello: 'moe curly'});
    var Boundf = boundf; // make eslint happy.
    var newBoundf = new Boundf();
    equal(newBoundf.hello, undefined, 'function should not be bound to the context, to comply with ECMAScript 5');
    equal(boundf().hello, 'moe curly', "When called without the new operator, it's OK to be bound to the context");
    ok(newBoundf instanceof F, 'a bound instance is an instance of the original function');

    throws(function() { _.bind('notafunction'); }, TypeError, 'throws an error when binding to a non-function');
  });

  test('partial', function() {
    var obj = {name: 'moe'};
    var func = function() { return this.name + ' ' + _.toArray(arguments).join(' '); };

    obj.func = _.partial(func, 'a', 'b');
    equal(obj.func('c', 'd'), 'moe a b c d', 'can partially apply');

    obj.func = _.partial(func, _, 'b', _, 'd');
    equal(obj.func('a', 'c'), 'moe a b c d', 'can partially apply with placeholders');

    func = _.partial(function() { return arguments.length; }, _, 'b', _, 'd');
    equal(func('a', 'c', 'e'), 5, 'accepts more arguments than the number of placeholders');
    equal(func('a'), 4, 'accepts fewer arguments than the number of placeholders');

    func = _.partial(function() { return typeof arguments[2]; }, _, 'b', _, 'd');
    equal(func('a'), 'undefined', 'unfilled placeholders are undefined');

    // passes context
    function MyWidget(name, options) {
      this.name = name;
      this.options = options;
    }
    MyWidget.prototype.get = function() {
      return this.name;
    };
    var MyWidgetWithCoolOpts = _.partial(MyWidget, _, {a: 1});
    var widget = new MyWidgetWithCoolOpts('foo');
    ok(widget instanceof MyWidget, 'Can partially bind a constructor');
    equal(widget.get(), 'foo', 'keeps prototype');
    deepEqual(widget.options, {a: 1});
  });

  test('bindAll', function() {
    var curly = {name : 'curly'}, moe = {
      name    : 'moe',
      getName : function() { return 'name: ' + this.name; },
      sayHi   : function() { return 'hi: ' + this.name; }
    };
    curly.getName = moe.getName;
    _.bindAll(moe, 'getName', 'sayHi');
    curly.sayHi = moe.sayHi;
    equal(curly.getName(), 'name: curly', 'unbound function is bound to current object');
    equal(curly.sayHi(), 'hi: moe', 'bound function is still bound to original object');

    curly = {name : 'curly'};
    moe = {
      name    : 'moe',
      getName : function() { return 'name: ' + this.name; },
      sayHi   : function() { return 'hi: ' + this.name; },
      sayLast : function() { return this.sayHi(_.last(arguments)); }
    };

    throws(function() { _.bindAll(moe); }, Error, 'throws an error for bindAll with no functions named');
    throws(function() { _.bindAll(moe, 'sayBye'); }, TypeError, 'throws an error for bindAll if the given key is undefined');
    throws(function() { _.bindAll(moe, 'name'); }, TypeError, 'throws an error for bindAll if the given key is not a function');

    _.bindAll(moe, 'sayHi', 'sayLast');
    curly.sayHi = moe.sayHi;
    equal(curly.sayHi(), 'hi: moe');

    var sayLast = moe.sayLast;
    equal(sayLast(1, 2, 3, 4, 5, 6, 7, 'Tom'), 'hi: moe', 'createCallback works with any number of arguments');
  });

  test('memoize', function() {
    var fib = function(n) {
      return n < 2 ? n : fib(n - 1) + fib(n - 2);
    };
    equal(fib(10), 55, 'a memoized version of fibonacci produces identical results');
    fib = _.memoize(fib); // Redefine `fib` for memoization
    equal(fib(10), 55, 'a memoized version of fibonacci produces identical results');

    var o = function(str) {
      return str;
    };
    var fastO = _.memoize(o);
    equal(o('toString'), 'toString', 'checks hasOwnProperty');
    equal(fastO('toString'), 'toString', 'checks hasOwnProperty');

    // Expose the cache.
    var upper = _.memoize(function(s) {
      return s.toUpperCase();
    });
    equal(upper('foo'), 'FOO');
    equal(upper('bar'), 'BAR');
    deepEqual(upper.cache, {foo: 'FOO', bar: 'BAR'});
    upper.cache = {foo: 'BAR', bar: 'FOO'};
    equal(upper('foo'), 'BAR');
    equal(upper('bar'), 'FOO');

    var hashed = _.memoize(function(key) {
      //https://github.com/jashkenas/underscore/pull/1679#discussion_r13736209
      ok(/[a-z]+/.test(key), 'hasher doesn\'t change keys');
      return key;
    }, function(key) {
      return key.toUpperCase();
    });
    hashed('yep');
    deepEqual(hashed.cache, {'YEP': 'yep'}, 'takes a hasher');

    // Test that the hash function can be used to swizzle the key.
    var objCacher = _.memoize(function(value, key) {
      return {key: key, value: value};
    }, function(value, key) {
      return key;
    });
    var myObj = objCacher('a', 'alpha');
    var myObjAlias = objCacher('b', 'alpha');
    notStrictEqual(myObj, undefined, 'object is created if second argument used as key');
    strictEqual(myObj, myObjAlias, 'object is cached if second argument used as key');
    strictEqual(myObj.value, 'a', 'object is not modified if second argument used as key');
  });

  asyncTest('delay', 2, function() {
    var delayed = false;
    _.delay(function(){ delayed = true; }, 100);
    setTimeout(function(){ ok(!delayed, "didn't delay the function quite yet"); }, 50);
    setTimeout(function(){ ok(delayed, 'delayed the function'); start(); }, 150);
  });

  asyncTest('defer', 1, function() {
    var deferred = false;
    _.defer(function(bool){ deferred = bool; }, true);
    _.delay(function(){ ok(deferred, 'deferred the function'); start(); }, 50);
  });

  asyncTest('throttle', 2, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 32);
    throttledIncr(); throttledIncr();

    equal(counter, 1, 'incr was called immediately');
    _.delay(function(){ equal(counter, 2, 'incr was throttled'); start(); }, 64);
  });

  asyncTest('throttle arguments', 2, function() {
    var value = 0;
    var update = function(val){ value = val; };
    var throttledUpdate = _.throttle(update, 32);
    throttledUpdate(1); throttledUpdate(2);
    _.delay(function(){ throttledUpdate(3); }, 64);
    equal(value, 1, 'updated to latest value');
    _.delay(function(){ equal(value, 3, 'updated to latest value'); start(); }, 96);
  });

  asyncTest('throttle once', 2, function() {
    var counter = 0;
    var incr = function(){ return ++counter; };
    var throttledIncr = _.throttle(incr, 32);
    var result = throttledIncr();
    _.delay(function(){
      equal(result, 1, 'throttled functions return their value');
      equal(counter, 1, 'incr was called once'); start();
    }, 64);
  });

  asyncTest('throttle twice', 1, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 32);
    throttledIncr(); throttledIncr();
    _.delay(function(){ equal(counter, 2, 'incr was called twice'); start(); }, 64);
  });

  asyncTest('more throttling', 3, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 30);
    throttledIncr(); throttledIncr();
    equal(counter, 1);
    _.delay(function(){
      equal(counter, 2);
      throttledIncr();
      equal(counter, 3);
      start();
    }, 85);
  });

  asyncTest('throttle repeatedly with results', 6, function() {
    var counter = 0;
    var incr = function(){ return ++counter; };
    var throttledIncr = _.throttle(incr, 100);
    var results = [];
    var saveResult = function() { results.push(throttledIncr()); };
    saveResult(); saveResult();
    _.delay(saveResult, 50);
    _.delay(saveResult, 150);
    _.delay(saveResult, 160);
    _.delay(saveResult, 230);
    _.delay(function() {
      equal(results[0], 1, 'incr was called once');
      equal(results[1], 1, 'incr was throttled');
      equal(results[2], 1, 'incr was throttled');
      equal(results[3], 2, 'incr was called twice');
      equal(results[4], 2, 'incr was throttled');
      equal(results[5], 3, 'incr was called trailing');
      start();
    }, 300);
  });

  asyncTest('throttle triggers trailing call when invoked repeatedly', 2, function() {
    var counter = 0;
    var limit = 48;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 32);

    var stamp = new Date;
    while (new Date - stamp < limit) {
      throttledIncr();
    }
    var lastCount = counter;
    ok(counter > 1);

    _.delay(function() {
      ok(counter > lastCount);
      start();
    }, 96);
  });

  asyncTest('throttle does not trigger leading call when leading is set to false', 2, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 60, {leading: false});

    throttledIncr(); throttledIncr();
    equal(counter, 0);

    _.delay(function() {
      equal(counter, 1);
      start();
    }, 96);
  });

  asyncTest('more throttle does not trigger leading call when leading is set to false', 3, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 100, {leading: false});

    throttledIncr();
    _.delay(throttledIncr, 50);
    _.delay(throttledIncr, 60);
    _.delay(throttledIncr, 200);
    equal(counter, 0);

    _.delay(function() {
      equal(counter, 1);
    }, 250);

    _.delay(function() {
      equal(counter, 2);
      start();
    }, 350);
  });

  asyncTest('one more throttle with leading: false test', 2, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 100, {leading: false});

    var time = new Date;
    while (new Date - time < 350) throttledIncr();
    ok(counter <= 3);

    _.delay(function() {
      ok(counter <= 4);
      start();
    }, 200);
  });

  asyncTest('throttle does not trigger trailing call when trailing is set to false', 4, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 60, {trailing: false});

    throttledIncr(); throttledIncr(); throttledIncr();
    equal(counter, 1);

    _.delay(function() {
      equal(counter, 1);

      throttledIncr(); throttledIncr();
      equal(counter, 2);

      _.delay(function() {
        equal(counter, 2);
        start();
      }, 96);
    }, 96);
  });

  asyncTest('throttle continues to function after system time is set backwards', 2, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var throttledIncr = _.throttle(incr, 100);
    var origNowFunc = _.now;

    throttledIncr();
    equal(counter, 1);
    _.now = function () {
      return new Date(2013, 0, 1, 1, 1, 1);
    };

    _.delay(function() {
      throttledIncr();
      equal(counter, 2);
      start();
      _.now = origNowFunc;
    }, 200);
  });

  asyncTest('throttle re-entrant', 2, function() {
    var sequence = [
      ['b1', 'b2'],
      ['c1', 'c2']
    ];
    var value = '';
    var throttledAppend;
    var append = function(arg){
      value += this + arg;
      var args = sequence.pop();
      if (args) {
        throttledAppend.call(args[0], args[1]);
      }
    };
    throttledAppend = _.throttle(append, 32);
    throttledAppend.call('a1', 'a2');
    equal(value, 'a1a2');
    _.delay(function(){
      equal(value, 'a1a2c1c2b1b2', 'append was throttled successfully');
      start();
    }, 100);
  });

  asyncTest('debounce', 1, function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var debouncedIncr = _.debounce(incr, 32);
    debouncedIncr(); debouncedIncr();
    _.delay(debouncedIncr, 16);
    _.delay(function(){ equal(counter, 1, 'incr was debounced'); start(); }, 96);
  });

  asyncTest('debounce asap', 4, function() {
    var a, b;
    var counter = 0;
    var incr = function(){ return ++counter; };
    var debouncedIncr = _.debounce(incr, 64, true);
    a = debouncedIncr();
    b = debouncedIncr();
    equal(a, 1);
    equal(b, 1);
    equal(counter, 1, 'incr was called immediately');
    _.delay(debouncedIncr, 16);
    _.delay(debouncedIncr, 32);
    _.delay(debouncedIncr, 48);
    _.delay(function(){ equal(counter, 1, 'incr was debounced'); start(); }, 128);
  });

  asyncTest('debounce asap recursively', 2, function() {
    var counter = 0;
    var debouncedIncr = _.debounce(function(){
      counter++;
      if (counter < 10) debouncedIncr();
    }, 32, true);
    debouncedIncr();
    equal(counter, 1, 'incr was called immediately');
    _.delay(function(){ equal(counter, 1, 'incr was debounced'); start(); }, 96);
  });

  asyncTest('debounce after system time is set backwards', 2, function() {
    var counter = 0;
    var origNowFunc = _.now;
    var debouncedIncr = _.debounce(function(){
      counter++;
    }, 100, true);

    debouncedIncr();
    equal(counter, 1, 'incr was called immediately');

    _.now = function () {
      return new Date(2013, 0, 1, 1, 1, 1);
    };

    _.delay(function() {
      debouncedIncr();
      equal(counter, 2, 'incr was debounced successfully');
      start();
      _.now = origNowFunc;
    }, 200);
  });

  asyncTest('debounce re-entrant', 2, function() {
    var sequence = [
      ['b1', 'b2']
    ];
    var value = '';
    var debouncedAppend;
    var append = function(arg){
      value += this + arg;
      var args = sequence.pop();
      if (args) {
        debouncedAppend.call(args[0], args[1]);
      }
    };
    debouncedAppend = _.debounce(append, 32);
    debouncedAppend.call('a1', 'a2');
    equal(value, '');
    _.delay(function(){
      equal(value, 'a1a2b1b2', 'append was debounced successfully');
      start();
    }, 100);
  });

  test('once', function() {
    var num = 0;
    var increment = _.once(function(){ return ++num; });
    increment();
    increment();
    equal(num, 1);

    equal(increment(), 1, 'stores a memo to the last value');
  });

  test('Recursive onced function.', 1, function() {
    var f = _.once(function(){
      ok(true);
      f();
    });
    f();
  });

  test('wrap', function() {
    var greet = function(name){ return 'hi: ' + name; };
    var backwards = _.wrap(greet, function(func, name){ return func(name) + ' ' + name.split('').reverse().join(''); });
    equal(backwards('moe'), 'hi: moe eom', 'wrapped the salutation function');

    var inner = function(){ return 'Hello '; };
    var obj   = {name : 'Moe'};
    obj.hi    = _.wrap(inner, function(fn){ return fn() + this.name; });
    equal(obj.hi(), 'Hello Moe');

    var noop    = function(){};
    var wrapped = _.wrap(noop, function(){ return Array.prototype.slice.call(arguments, 0); });
    var ret     = wrapped(['whats', 'your'], 'vector', 'victor');
    deepEqual(ret, [noop, ['whats', 'your'], 'vector', 'victor']);
  });

  test('negate', function() {
    var isOdd = function(n){ return n & 1; };
    equal(_.negate(isOdd)(2), true, 'should return the complement of the given function');
    equal(_.negate(isOdd)(3), false, 'should return the complement of the given function');
  });

  test('compose', function() {
    var greet = function(name){ return 'hi: ' + name; };
    var exclaim = function(sentence){ return sentence + '!'; };
    var composed = _.compose(exclaim, greet);
    equal(composed('moe'), 'hi: moe!', 'can compose a function that takes another');

    composed = _.compose(greet, exclaim);
    equal(composed('moe'), 'hi: moe!', 'in this case, the functions are also commutative');

    // f(g(h(x, y, z)))
    function h(x, y, z) {
      equal(arguments.length, 3, 'First function called with multiple args');
      return z * y;
    }
    function g(x) {
      equal(arguments.length, 1, 'Composed function is called with 1 argument');
      return x;
    }
    function f(x) {
      equal(arguments.length, 1, 'Composed function is called with 1 argument');
      return x * 2;
    }
    composed = _.compose(f, g, h);
    equal(composed(1, 2, 3), 12);
  });

  test('after', function() {
    var testAfter = function(afterAmount, timesCalled) {
      var afterCalled = 0;
      var after = _.after(afterAmount, function() {
        afterCalled++;
      });
      while (timesCalled--) after();
      return afterCalled;
    };

    equal(testAfter(5, 5), 1, 'after(N) should fire after being called N times');
    equal(testAfter(5, 4), 0, 'after(N) should not fire unless called N times');
    equal(testAfter(0, 0), 0, 'after(0) should not fire immediately');
    equal(testAfter(0, 1), 1, 'after(0) should fire when first invoked');
  });

  test('before', function() {
    var testBefore = function(beforeAmount, timesCalled) {
      var beforeCalled = 0;
      var before = _.before(beforeAmount, function() { beforeCalled++; });
      while (timesCalled--) before();
      return beforeCalled;
    };

    equal(testBefore(5, 5), 4, 'before(N) should not fire after being called N times');
    equal(testBefore(5, 4), 4, 'before(N) should fire before being called N times');
    equal(testBefore(0, 0), 0, 'before(0) should not fire immediately');
    equal(testBefore(0, 1), 0, 'before(0) should not fire when first invoked');

    var context = {num: 0};
    var increment = _.before(3, function(){ return ++this.num; });
    _.times(10, increment, context);
    equal(increment(), 2, 'stores a memo to the last value');
    equal(context.num, 2, 'provides context');
  });

  test('iteratee', function() {
    var identity = _.iteratee();
    equal(identity, _.identity, '_.iteratee is exposed as an external function.');

    function fn() {
      return arguments;
    }
    _.each([_.iteratee(fn), _.iteratee(fn, {})], function(cb) {
      equal(cb().length, 0);
      deepEqual(_.toArray(cb(1, 2, 3)), _.range(1, 4));
      deepEqual(_.toArray(cb(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)), _.range(1, 11));
    });
    
  });

}());
