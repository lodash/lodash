(function() {
  var _ = typeof require == 'function' ? require('..') : window._;

  QUnit.module('Collections');

  test('each', function() {
    _.each([1, 2, 3], function(num, i) {
      equal(num, i + 1, 'each iterators provide value and iteration count');
    });

    var answers = [];
    _.each([1, 2, 3], function(num){ answers.push(num * this.multiplier);}, {multiplier : 5});
    deepEqual(answers, [5, 10, 15], 'context object property accessed');

    answers = [];
    _.each([1, 2, 3], function(num){ answers.push(num); });
    deepEqual(answers, [1, 2, 3], 'aliased as "forEach"');

    answers = [];
    var obj = {one : 1, two : 2, three : 3};
    obj.constructor.prototype.four = 4;
    _.each(obj, function(value, key){ answers.push(key); });
    deepEqual(answers, ['one', 'two', 'three'], 'iterating over objects works, and ignores the object prototype.');
    delete obj.constructor.prototype.four;

    // ensure the each function is JITed
    _(1000).times(function() { _.each([], function(){}); });
    var count = 0;
    obj = {1 : 'foo', 2 : 'bar', 3 : 'baz'};
    _.each(obj, function(value, key){ count++; });
    equal(count, 3, 'the fun should be called only 3 times');

    var answer = null;
    _.each([1, 2, 3], function(num, index, arr){ if (_.include(arr, num)) answer = true; });
    ok(answer, 'can reference the original collection from inside the iterator');

    answers = 0;
    _.each(null, function(){ ++answers; });
    equal(answers, 0, 'handles a null properly');

    _.each(false, function(){});

    var a = [1, 2, 3];
    strictEqual(_.each(a, function(){}), a);
    strictEqual(_.each(null, function(){}), null);
  });

  test('forEach', function() {
    strictEqual(_.each, _.forEach, 'alias for each');
  });

  test('lookupIterator with contexts', function() {
    _.each([true, false, 'yes', '', 0, 1, {}], function(context) {
      _.each([1], function() {
        equal(this, context);
      }, context);
    });
  });

  test('Iterating objects with sketchy length properties', function() {
    var functions = [
        'each', 'map', 'filter', 'find',
        'some', 'every', 'max', 'min',
        'groupBy', 'countBy', 'partition', 'indexBy'
    ];
    var reducers = ['reduce', 'reduceRight'];

    var tricks = [
      {length: '5'},
      {
        length: {
          valueOf: _.constant(5)
        }
      },
      {length: Math.pow(2, 53) + 1},
      {length: Math.pow(2, 53)},
      {length: null},
      {length: -2},
      {length: new Number(15)}
    ];

    expect(tricks.length * (functions.length + reducers.length + 4));

    _.each(tricks, function(trick) {
      var length = trick.length;
      strictEqual(_.size(trick), 1, 'size on obj with length: ' + length);
      deepEqual(_.toArray(trick), [length], 'toArray on obj with length: ' + length);
      deepEqual(_.shuffle(trick), [length], 'shuffle on obj with length: ' + length);
      deepEqual(_.sample(trick), length, 'sample on obj with length: ' + length);


      _.each(functions, function(method) {
        _[method](trick, function(val, key) {
          strictEqual(key, 'length', method + ': ran with length = ' + val);
        });
      });

      _.each(reducers, function(method) {
        strictEqual(_[method](trick), trick.length, method);
      });
    });
  });

  test('Resistant to collection length and properties changing while iterating', function() {

    var collection = [
      'each', 'map', 'filter', 'find',
      'some', 'every', 'max', 'min', 'reject',
      'groupBy', 'countBy', 'partition', 'indexBy',
      'reduce', 'reduceRight'
    ];
    var array = [
      'findIndex', 'findLastIndex'
    ];
    var object = [
      'mapObject', 'findKey', 'pick', 'omit'
    ];

    _.each(collection.concat(array), function(method) {
      var sparseArray = [1, 2, 3];
      sparseArray.length = 100;
      var answers = 0;
      _[method](sparseArray, function(){
        ++answers;
        return method === 'every' ? true : null;
      }, {});
      equal(answers, 100, method + ' enumerates [0, length)');

      var growingCollection = [1, 2, 3], count = 0;
      _[method](growingCollection, function() {
        if (count < 10) growingCollection.push(count++);
        return method === 'every' ? true : null;
      }, {});
      equal(count, 3, method + ' is resistant to length changes');
    });

    _.each(collection.concat(object), function(method) {
      var changingObject = {0: 0, 1: 1}, count = 0;
      _[method](changingObject, function(val) {
        if (count < 10) changingObject[++count] = val + 1;
        return method === 'every' ? true : null;
      }, {});

      equal(count, 2, method + ' is resistant to property changes');
    });
  });

  test('map', function() {
    var doubled = _.map([1, 2, 3], function(num){ return num * 2; });
    deepEqual(doubled, [2, 4, 6], 'doubled numbers');

    var tripled = _.map([1, 2, 3], function(num){ return num * this.multiplier; }, {multiplier : 3});
    deepEqual(tripled, [3, 6, 9], 'tripled numbers with context');

    doubled = _([1, 2, 3]).map(function(num){ return num * 2; });
    deepEqual(doubled, [2, 4, 6], 'OO-style doubled numbers');

    var ids = _.map({length: 2, 0: {id: '1'}, 1: {id: '2'}}, function(n){
      return n.id;
    });
    deepEqual(ids, ['1', '2'], 'Can use collection methods on Array-likes.');

    deepEqual(_.map(null, _.noop), [], 'handles a null properly');

    deepEqual(_.map([1], function() {
      return this.length;
    }, [5]), [1], 'called with context');

    // Passing a property name like _.pluck.
    var people = [{name : 'moe', age : 30}, {name : 'curly', age : 50}];
    deepEqual(_.map(people, 'name'), ['moe', 'curly'], 'predicate string map to object properties');
  });

  test('collect', function() {
    strictEqual(_.map, _.collect, 'alias for map');
  });

  test('reduce', function() {
    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; }, 0);
    equal(sum, 6, 'can sum up an array');

    var context = {multiplier : 3};
    sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num * this.multiplier; }, 0, context);
    equal(sum, 18, 'can reduce with a context object');

    sum = _.inject([1, 2, 3], function(sum, num){ return sum + num; }, 0);
    equal(sum, 6, 'aliased as "inject"');

    sum = _([1, 2, 3]).reduce(function(sum, num){ return sum + num; }, 0);
    equal(sum, 6, 'OO-style reduce');

    sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; });
    equal(sum, 6, 'default initial value');

    var prod = _.reduce([1, 2, 3, 4], function(prod, num){ return prod * num; });
    equal(prod, 24, 'can reduce via multiplication');

    ok(_.reduce(null, _.noop, 138) === 138, 'handles a null (with initial value) properly');
    equal(_.reduce([], _.noop, undefined), undefined, 'undefined can be passed as a special case');
    equal(_.reduce([_], _.noop), _, 'collection of length one with no initial value returns the first item');
    equal(_.reduce([], _.noop), undefined, 'returns undefined when collection is empty and no initial value');
  });

  test('foldl', function() {
    strictEqual(_.reduce, _.foldl, 'alias for reduce');
  });

  test('reduceRight', function() {
    var list = _.reduceRight(['foo', 'bar', 'baz'], function(memo, str){ return memo + str; }, '');
    equal(list, 'bazbarfoo', 'can perform right folds');

    list = _.reduceRight(['foo', 'bar', 'baz'], function(memo, str){ return memo + str; });
    equal(list, 'bazbarfoo', 'default initial value');

    var sum = _.reduceRight({a: 1, b: 2, c: 3}, function(sum, num){ return sum + num; });
    equal(sum, 6, 'default initial value on object');

    ok(_.reduceRight(null, _.noop, 138) === 138, 'handles a null (with initial value) properly');
    equal(_.reduceRight([_], _.noop), _, 'collection of length one with no initial value returns the first item');

    equal(_.reduceRight([], _.noop, undefined), undefined, 'undefined can be passed as a special case');
    equal(_.reduceRight([], _.noop), undefined, 'returns undefined when collection is empty and no initial value');

    // Assert that the correct arguments are being passed.

    var args,
        memo = {},
        object = {a: 1, b: 2},
        lastKey = _.keys(object).pop();

    var expected = lastKey === 'a'
      ? [memo, 1, 'a', object]
      : [memo, 2, 'b', object];

    _.reduceRight(object, function() {
      if (!args) args = _.toArray(arguments);
    }, memo);

    deepEqual(args, expected);

    // And again, with numeric keys.

    object = {'2': 'a', '1': 'b'};
    lastKey = _.keys(object).pop();
    args = null;

    expected = lastKey === '2'
      ? [memo, 'a', '2', object]
      : [memo, 'b', '1', object];

    _.reduceRight(object, function() {
      if (!args) args = _.toArray(arguments);
    }, memo);

    deepEqual(args, expected);
  });

  test('foldr', function() {
    strictEqual(_.reduceRight, _.foldr, 'alias for reduceRight');
  });

  test('find', function() {
    var array = [1, 2, 3, 4];
    strictEqual(_.find(array, function(n) { return n > 2; }), 3, 'should return first found `value`');
    strictEqual(_.find(array, function() { return false; }), void 0, 'should return `undefined` if `value` is not found');

    array.dontmatch = 55;
    strictEqual(_.find(array, function(x) { return x === 55; }), void 0, 'iterates array-likes correctly');

    // Matching an object like _.findWhere.
    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}, {a: 2, b: 4}];
    deepEqual(_.find(list, {a: 1}), {a: 1, b: 2}, 'can be used as findWhere');
    deepEqual(_.find(list, {b: 4}), {a: 1, b: 4});
    ok(!_.find(list, {c: 1}), 'undefined when not found');
    ok(!_.find([], {c: 1}), 'undefined when searching empty list');

    var result = _.find([1, 2, 3], function(num){ return num * 2 === 4; });
    equal(result, 2, 'found the first "2" and broke the loop');

    var obj = {
      a: {x: 1, z: 3},
      b: {x: 2, z: 2},
      c: {x: 3, z: 4},
      d: {x: 4, z: 1}
    };

    deepEqual(_.find(obj, {x: 2}), {x: 2, z: 2}, 'works on objects');
    deepEqual(_.find(obj, {x: 2, z: 1}), void 0);
    deepEqual(_.find(obj, function(x) {
      return x.x === 4;
    }), {x: 4, z: 1});

    _.findIndex([{a: 1}], function(a, key, obj) {
      equal(key, 0);
      deepEqual(obj, [{a: 1}]);
      strictEqual(this, _, 'called with context');
    }, _);
  });

  test('detect', function() {
    strictEqual(_.detect, _.find, 'alias for detect');
  });

  test('filter', function() {
    var evenArray = [1, 2, 3, 4, 5, 6];
    var evenObject = {one: 1, two: 2, three: 3};
    var isEven = function(num){ return num % 2 === 0; };

    deepEqual(_.filter(evenArray, isEven), [2, 4, 6]);
    deepEqual(_.filter(evenObject, isEven), [2], 'can filter objects');
    deepEqual(_.filter([{}, evenObject, []], 'two'), [evenObject], 'predicate string map to object properties');

    _.filter([1], function() {
      equal(this, evenObject, 'given context');
    }, evenObject);

    // Can be used like _.where.
    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}];
    deepEqual(_.filter(list, {a: 1}), [{a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}]);
    deepEqual(_.filter(list, {b: 2}), [{a: 1, b: 2}, {a: 2, b: 2}]);
    deepEqual(_.filter(list, {}), list, 'Empty object accepts all items');
    deepEqual(_(list).filter({}), list, 'OO-filter');
  });

  test('select', function() {
    strictEqual(_.filter, _.select, 'alias for filter');
  });

  test('reject', function() {
    var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 === 0; });
    deepEqual(odds, [1, 3, 5], 'rejected each even number');

    var context = 'obj';

    var evens = _.reject([1, 2, 3, 4, 5, 6], function(num){
      equal(context, 'obj');
      return num % 2 !== 0;
    }, context);
    deepEqual(evens, [2, 4, 6], 'rejected each odd number');

    deepEqual(_.reject([odds, {one: 1, two: 2, three: 3}], 'two'), [odds], 'predicate string map to object properties');

    // Can be used like _.where.
    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}];
    deepEqual(_.reject(list, {a: 1}), [{a: 2, b: 2}]);
    deepEqual(_.reject(list, {b: 2}), [{a: 1, b: 3}, {a: 1, b: 4}]);
    deepEqual(_.reject(list, {}), [], 'Returns empty list given empty object');
    deepEqual(_.reject(list, []), [], 'Returns empty list given empty array');
  });

  test('every', function() {
    ok(_.every([], _.identity), 'the empty set');
    ok(_.every([true, true, true], _.identity), 'every true values');
    ok(!_.every([true, false, true], _.identity), 'one false value');
    ok(_.every([0, 10, 28], function(num){ return num % 2 === 0; }), 'even numbers');
    ok(!_.every([0, 11, 28], function(num){ return num % 2 === 0; }), 'an odd number');
    ok(_.every([1], _.identity) === true, 'cast to boolean - true');
    ok(_.every([0], _.identity) === false, 'cast to boolean - false');
    ok(!_.every([undefined, undefined, undefined], _.identity), 'works with arrays of undefined');

    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}];
    ok(!_.every(list, {a: 1, b: 2}), 'Can be called with object');
    ok(_.every(list, 'a'), 'String mapped to object property');

    list = [{a: 1, b: 2}, {a: 2, b: 2, c: true}];
    ok(_.every(list, {b: 2}), 'Can be called with object');
    ok(!_.every(list, 'c'), 'String mapped to object property');

    ok(_.every({a: 1, b: 2, c: 3, d: 4}, _.isNumber), 'takes objects');
    ok(!_.every({a: 1, b: 2, c: 3, d: 4}, _.isObject), 'takes objects');
    ok(_.every(['a', 'b', 'c', 'd'], _.hasOwnProperty, {a: 1, b: 2, c: 3, d: 4}), 'context works');
    ok(!_.every(['a', 'b', 'c', 'd', 'f'], _.hasOwnProperty, {a: 1, b: 2, c: 3, d: 4}), 'context works');
  });

  test('all', function() {
    strictEqual(_.all, _.every, 'alias for all');
  });

  test('some', function() {
    ok(!_.some([]), 'the empty set');
    ok(!_.some([false, false, false]), 'all false values');
    ok(_.some([false, false, true]), 'one true value');
    ok(_.some([null, 0, 'yes', false]), 'a string');
    ok(!_.some([null, 0, '', false]), 'falsy values');
    ok(!_.some([1, 11, 29], function(num){ return num % 2 === 0; }), 'all odd numbers');
    ok(_.some([1, 10, 29], function(num){ return num % 2 === 0; }), 'an even number');
    ok(_.some([1], _.identity) === true, 'cast to boolean - true');
    ok(_.some([0], _.identity) === false, 'cast to boolean - false');
    ok(_.some([false, false, true]));

    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}];
    ok(!_.some(list, {a: 5, b: 2}), 'Can be called with object');
    ok(_.some(list, 'a'), 'String mapped to object property');

    list = [{a: 1, b: 2}, {a: 2, b: 2, c: true}];
    ok(_.some(list, {b: 2}), 'Can be called with object');
    ok(!_.some(list, 'd'), 'String mapped to object property');

    ok(_.some({a: '1', b: '2', c: '3', d: '4', e: 6}, _.isNumber), 'takes objects');
    ok(!_.some({a: 1, b: 2, c: 3, d: 4}, _.isObject), 'takes objects');
    ok(_.some(['a', 'b', 'c', 'd'], _.hasOwnProperty, {a: 1, b: 2, c: 3, d: 4}), 'context works');
    ok(!_.some(['x', 'y', 'z'], _.hasOwnProperty, {a: 1, b: 2, c: 3, d: 4}), 'context works');
  });

  test('any', function() {
    strictEqual(_.any, _.some, 'alias for any');
  });

  test('includes', function() {
    _.each([null, void 0, 0, 1, NaN, {}, []], function(val) {
      strictEqual(_.includes(val, 'hasOwnProperty'), false);
    });
    strictEqual(_.includes([1, 2, 3], 2), true, 'two is in the array');
    ok(!_.includes([1, 3, 9], 2), 'two is not in the array');

    strictEqual(_.includes([5, 4, 3, 2, 1], 5, true), true, 'doesn\'t delegate to binary search');

    ok(_.includes({moe: 1, larry: 3, curly: 9}, 3) === true, '_.includes on objects checks their values');
    ok(_([1, 2, 3]).includes(2), 'OO-style includes');
  });

  test('include', function() {
    strictEqual(_.includes, _.include, 'alias for includes');
  });

  test('contains', function() {
    strictEqual(_.includes, _.contains, 'alias for includes');

    var numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    strictEqual(_.includes(numbers, 1, 1), true, 'contains takes a fromIndex');
    strictEqual(_.includes(numbers, 1, -1), false, 'contains takes a fromIndex');
    strictEqual(_.includes(numbers, 1, -2), false, 'contains takes a fromIndex');
    strictEqual(_.includes(numbers, 1, -3), true, 'contains takes a fromIndex');
    strictEqual(_.includes(numbers, 1, 6), true, 'contains takes a fromIndex');
    strictEqual(_.includes(numbers, 1, 7), false, 'contains takes a fromIndex');

    ok(_.every([1, 2, 3], _.partial(_.contains, numbers)), 'fromIndex is guarded');
  });

  test('includes with NaN', function() {
    strictEqual(_.includes([1, 2, NaN, NaN], NaN), true, 'Expected [1, 2, NaN] to contain NaN');
    strictEqual(_.includes([1, 2, Infinity], NaN), false, 'Expected [1, 2, NaN] to contain NaN');
  });

  test('includes with +- 0', function() {
    _.each([-0, +0], function(val) {
      strictEqual(_.includes([1, 2, val, val], val), true);
      strictEqual(_.includes([1, 2, val, val], -val), true);
      strictEqual(_.includes([-1, 1, 2], -val), false);
    });
  });


  test('invoke', 5, function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, 'sort');
    deepEqual(result[0], [1, 5, 7], 'first array sorted');
    deepEqual(result[1], [1, 2, 3], 'second array sorted');

    _.invoke([{
      method: function() {
        deepEqual(_.toArray(arguments), [1, 2, 3], 'called with arguments');
      }
    }], 'method', 1, 2, 3);

    deepEqual(_.invoke([{a: null}, {}, {a: _.constant(1)}], 'a'), [null, void 0, 1], 'handles null & undefined');

    throws(function() {
      _.invoke([{a: 1}], 'a');
    }, TypeError, 'throws for non-functions');
  });

  test('invoke w/ function reference', function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, Array.prototype.sort);
    deepEqual(result[0], [1, 5, 7], 'first array sorted');
    deepEqual(result[1], [1, 2, 3], 'second array sorted');

    deepEqual(_.invoke([1, 2, 3], function(a) {
      return a + this;
    }, 5), [6, 7, 8], 'receives params from invoke');
  });

  // Relevant when using ClojureScript
  test('invoke when strings have a call method', function() {
    String.prototype.call = function() {
      return 42;
    };
    var list = [[5, 1, 7], [3, 2, 1]];
    var s = 'foo';
    equal(s.call(), 42, 'call function exists');
    var result = _.invoke(list, 'sort');
    deepEqual(result[0], [1, 5, 7], 'first array sorted');
    deepEqual(result[1], [1, 2, 3], 'second array sorted');
    delete String.prototype.call;
    equal(s.call, undefined, 'call function removed');
  });

  test('pluck', function() {
    var people = [{name: 'moe', age: 30}, {name: 'curly', age: 50}];
    deepEqual(_.pluck(people, 'name'), ['moe', 'curly'], 'pulls names out of objects');
    deepEqual(_.pluck(people, 'address'), [undefined, undefined], 'missing properties are returned as undefined');
    //compat: most flexible handling of edge cases
    deepEqual(_.pluck([{'[object Object]': 1}], {}), [1]);
  });

  test('where', function() {
    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}];
    var result = _.where(list, {a: 1});
    equal(result.length, 3);
    equal(result[result.length - 1].b, 4);
    result = _.where(list, {b: 2});
    equal(result.length, 2);
    equal(result[0].a, 1);
    result = _.where(list, {});
    equal(result.length, list.length);

    function test() {}
    test.map = _.map;
    deepEqual(_.where([_, {a: 1, b: 2}, _], test), [_, _], 'checks properties given function');
  });

  test('findWhere', function() {
    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}, {a: 2, b: 4}];
    var result = _.findWhere(list, {a: 1});
    deepEqual(result, {a: 1, b: 2});
    result = _.findWhere(list, {b: 4});
    deepEqual(result, {a: 1, b: 4});

    result = _.findWhere(list, {c: 1});
    ok(_.isUndefined(result), 'undefined when not found');

    result = _.findWhere([], {c: 1});
    ok(_.isUndefined(result), 'undefined when searching empty list');

    function test() {}
    test.map = _.map;
    equal(_.findWhere([_, {a: 1, b: 2}, _], test), _, 'checks properties given function');

    function TestClass() {
      this.y = 5;
      this.x = 'foo';
    }
    var expect = {c: 1, x: 'foo', y: 5};
    deepEqual(_.findWhere([{y: 5, b: 6}, expect], new TestClass()), expect, 'uses class instance properties');
  });

  test('max', function() {
    equal(-Infinity, _.max(null), 'can handle null/undefined');
    equal(-Infinity, _.max(undefined), 'can handle null/undefined');
    equal(-Infinity, _.max(null, _.identity), 'can handle null/undefined');

    equal(3, _.max([1, 2, 3]), 'can perform a regular Math.max');

    var neg = _.max([1, 2, 3], function(num){ return -num; });
    equal(neg, 1, 'can perform a computation-based max');

    equal(-Infinity, _.max({}), 'Maximum value of an empty object');
    equal(-Infinity, _.max([]), 'Maximum value of an empty array');
    equal(_.max({'a': 'a'}), -Infinity, 'Maximum value of a non-numeric collection');

    equal(299999, _.max(_.range(1, 300000)), 'Maximum value of a too-big array');

    equal(3, _.max([1, 2, 3, 'test']), 'Finds correct max in array starting with num and containing a NaN');
    equal(3, _.max(['test', 1, 2, 3]), 'Finds correct max in array starting with NaN');

    var a = {x: -Infinity};
    var b = {x: -Infinity};
    var iterator = function(o){ return o.x; };
    equal(_.max([a, b], iterator), a, 'Respects iterator return value of -Infinity');

    deepEqual(_.max([{'a': 1}, {'a': 0, 'b': 3}, {'a': 4}, {'a': 2}], 'a'), {'a': 4}, 'String keys use property iterator');

    deepEqual(_.max([0, 2], function(a){ return a * this.x; }, {x: 1}), 2, 'Iterator context');
    deepEqual(_.max([[1], [2, 3], [-1, 4], [5]], 0), [5], 'Lookup falsy iterator');
    deepEqual(_.max([{0: 1}, {0: 2}, {0: -1}, {a: 1}], 0), {0: 2}, 'Lookup falsy iterator');
  });

  test('min', function() {
    equal(Infinity, _.min(null), 'can handle null/undefined');
    equal(Infinity, _.min(undefined), 'can handle null/undefined');
    equal(Infinity, _.min(null, _.identity), 'can handle null/undefined');

    equal(1, _.min([1, 2, 3]), 'can perform a regular Math.min');

    var neg = _.min([1, 2, 3], function(num){ return -num; });
    equal(neg, 3, 'can perform a computation-based min');

    equal(Infinity, _.min({}), 'Minimum value of an empty object');
    equal(Infinity, _.min([]), 'Minimum value of an empty array');
    equal(_.min({'a': 'a'}), Infinity, 'Minimum value of a non-numeric collection');

    var now = new Date(9999999999);
    var then = new Date(0);
    equal(_.min([now, then]), then);

    equal(1, _.min(_.range(1, 300000)), 'Minimum value of a too-big array');

    equal(1, _.min([1, 2, 3, 'test']), 'Finds correct min in array starting with num and containing a NaN');
    equal(1, _.min(['test', 1, 2, 3]), 'Finds correct min in array starting with NaN');

    var a = {x: Infinity};
    var b = {x: Infinity};
    var iterator = function(o){ return o.x; };
    equal(_.min([a, b], iterator), a, 'Respects iterator return value of Infinity');

    deepEqual(_.min([{'a': 1}, {'a': 0, 'b': 3}, {'a': 4}, {'a': 2}], 'a'), {'a': 0, 'b': 3}, 'String keys use property iterator');

    deepEqual(_.min([0, 2], function(a){ return a * this.x; }, {x: -1}), 2, 'Iterator context');
    deepEqual(_.min([[1], [2, 3], [-1, 4], [5]], 0), [-1, 4], 'Lookup falsy iterator');
    deepEqual(_.min([{0: 1}, {0: 2}, {0: -1}, {a: 1}], 0), {0: -1}, 'Lookup falsy iterator');
  });

  test('sortBy', function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person){ return person.age; });
    deepEqual(_.pluck(people, 'name'), ['moe', 'curly'], 'stooges sorted by age');

    var list = [undefined, 4, 1, undefined, 3, 2];
    deepEqual(_.sortBy(list, _.identity), [1, 2, 3, 4, undefined, undefined], 'sortBy with undefined values');

    list = ['one', 'two', 'three', 'four', 'five'];
    var sorted = _.sortBy(list, 'length');
    deepEqual(sorted, ['one', 'two', 'four', 'five', 'three'], 'sorted by length');

    function Pair(x, y) {
      this.x = x;
      this.y = y;
    }

    var collection = [
      new Pair(1, 1), new Pair(1, 2),
      new Pair(1, 3), new Pair(1, 4),
      new Pair(1, 5), new Pair(1, 6),
      new Pair(2, 1), new Pair(2, 2),
      new Pair(2, 3), new Pair(2, 4),
      new Pair(2, 5), new Pair(2, 6),
      new Pair(undefined, 1), new Pair(undefined, 2),
      new Pair(undefined, 3), new Pair(undefined, 4),
      new Pair(undefined, 5), new Pair(undefined, 6)
    ];

    var actual = _.sortBy(collection, function(pair) {
      return pair.x;
    });

    deepEqual(actual, collection, 'sortBy should be stable');

    deepEqual(_.sortBy(collection, 'x'), collection, 'sortBy accepts property string');

    list = ['q', 'w', 'e', 'r', 't', 'y'];
    deepEqual(_.sortBy(list), ['e', 'q', 'r', 't', 'w', 'y'], 'uses _.identity if iterator is not specified');
  });

  test('groupBy', function() {
    var parity = _.groupBy([1, 2, 3, 4, 5, 6], function(num){ return num % 2; });
    ok('0' in parity && '1' in parity, 'created a group for each value');
    deepEqual(parity[0], [2, 4, 6], 'put each even number in the right group');

    var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    var grouped = _.groupBy(list, 'length');
    deepEqual(grouped['3'], ['one', 'two', 'six', 'ten']);
    deepEqual(grouped['4'], ['four', 'five', 'nine']);
    deepEqual(grouped['5'], ['three', 'seven', 'eight']);

    var context = {};
    _.groupBy([{}], function(){ ok(this === context); }, context);

    grouped = _.groupBy([4.2, 6.1, 6.4], function(num) {
      return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
    });
    equal(grouped.constructor.length, 1);
    equal(grouped.hasOwnProperty.length, 2);

    var array = [{}];
    _.groupBy(array, function(value, index, obj){ ok(obj === array); });

    array = [1, 2, 1, 2, 3];
    grouped = _.groupBy(array);
    equal(grouped['1'].length, 2);
    equal(grouped['3'].length, 1);

    var matrix = [
      [1, 2],
      [1, 3],
      [2, 3]
    ];
    deepEqual(_.groupBy(matrix, 0), {1: [[1, 2], [1, 3]], 2: [[2, 3]]});
    deepEqual(_.groupBy(matrix, 1), {2: [[1, 2]], 3: [[1, 3], [2, 3]]});
  });

  test('indexBy', function() {
    var parity = _.indexBy([1, 2, 3, 4, 5], function(num){ return num % 2 === 0; });
    equal(parity['true'], 4);
    equal(parity['false'], 5);

    var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    var grouped = _.indexBy(list, 'length');
    equal(grouped['3'], 'ten');
    equal(grouped['4'], 'nine');
    equal(grouped['5'], 'eight');

    var array = [1, 2, 1, 2, 3];
    grouped = _.indexBy(array);
    equal(grouped['1'], 1);
    equal(grouped['2'], 2);
    equal(grouped['3'], 3);
  });

  test('countBy', function() {
    var parity = _.countBy([1, 2, 3, 4, 5], function(num){ return num % 2 === 0; });
    equal(parity['true'], 2);
    equal(parity['false'], 3);

    var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    var grouped = _.countBy(list, 'length');
    equal(grouped['3'], 4);
    equal(grouped['4'], 3);
    equal(grouped['5'], 3);

    var context = {};
    _.countBy([{}], function(){ ok(this === context); }, context);

    grouped = _.countBy([4.2, 6.1, 6.4], function(num) {
      return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
    });
    equal(grouped.constructor, 1);
    equal(grouped.hasOwnProperty, 2);

    var array = [{}];
    _.countBy(array, function(value, index, obj){ ok(obj === array); });

    array = [1, 2, 1, 2, 3];
    grouped = _.countBy(array);
    equal(grouped['1'], 2);
    equal(grouped['3'], 1);
  });

  test('shuffle', function() {
    var numbers = _.range(10);
    var shuffled = _.shuffle(numbers);
    notStrictEqual(numbers, shuffled, 'original object is unmodified');
    ok(_.every(_.range(10), function() { //appears consistent?
      return _.every(numbers, _.partial(_.contains, numbers));
    }), 'contains the same members before and after shuffle');

    shuffled = _.shuffle({a: 1, b: 2, c: 3, d: 4});
    equal(shuffled.length, 4);
    deepEqual(shuffled.sort(), [1, 2, 3, 4], 'works on objects');
  });

  test('sample', function() {
    var numbers = _.range(10);
    var allSampled = _.sample(numbers, 10).sort();
    deepEqual(allSampled, numbers, 'contains the same members before and after sample');
    allSampled = _.sample(numbers, 20).sort();
    deepEqual(allSampled, numbers, 'also works when sampling more objects than are present');
    ok(_.contains(numbers, _.sample(numbers)), 'sampling a single element returns something from the array');
    strictEqual(_.sample([]), undefined, 'sampling empty array with no number returns undefined');
    notStrictEqual(_.sample([], 5), [], 'sampling empty array with a number returns an empty array');
    notStrictEqual(_.sample([1, 2, 3], 0), [], 'sampling an array with 0 picks returns an empty array');
    deepEqual(_.sample([1, 2], -1), [], 'sampling a negative number of picks returns an empty array');
    ok(_.contains([1, 2, 3], _.sample({a: 1, b: 2, c: 3})), 'sample one value from an object');
  });

  test('toArray', function() {
    ok(!_.isArray(arguments), 'arguments object is not an array');
    ok(_.isArray(_.toArray(arguments)), 'arguments object converted into array');
    var a = [1, 2, 3];
    ok(_.toArray(a) !== a, 'array is cloned');
    deepEqual(_.toArray(a), [1, 2, 3], 'cloned array contains same elements');

    var numbers = _.toArray({one : 1, two : 2, three : 3});
    deepEqual(numbers, [1, 2, 3], 'object flattened into array');

    if (typeof document != 'undefined') {
      // test in IE < 9
      var actual;
      try {
        actual = _.toArray(document.childNodes);
      } catch(ex) { }
      deepEqual(actual, _.map(document.childNodes, _.identity), 'works on NodeList');
    }
  });

  test('size', function() {
    equal(_.size({one : 1, two : 2, three : 3}), 3, 'can compute the size of an object');
    equal(_.size([1, 2, 3]), 3, 'can compute the size of an array');
    equal(_.size({length: 3, 0: 0, 1: 0, 2: 0}), 3, 'can compute the size of Array-likes');

    var func = function() {
      return _.size(arguments);
    };

    equal(func(1, 2, 3, 4), 4, 'can test the size of the arguments object');

    equal(_.size('hello'), 5, 'can compute the size of a string literal');
    equal(_.size(new String('hello')), 5, 'can compute the size of string object');

    equal(_.size(null), 0, 'handles nulls');
    equal(_.size(0), 0, 'handles numbers');
  });

  test('partition', function() {
    var list = [0, 1, 2, 3, 4, 5];
    deepEqual(_.partition(list, function(x) { return x < 4; }), [[0, 1, 2, 3], [4, 5]], 'handles bool return values');
    deepEqual(_.partition(list, function(x) { return x & 1; }), [[1, 3, 5], [0, 2, 4]], 'handles 0 and 1 return values');
    deepEqual(_.partition(list, function(x) { return x - 3; }), [[0, 1, 2, 4, 5], [3]], 'handles other numeric return values');
    deepEqual(_.partition(list, function(x) { return x > 1 ? null : true; }), [[0, 1], [2, 3, 4, 5]], 'handles null return values');
    deepEqual(_.partition(list, function(x) { if (x < 2) return true; }), [[0, 1], [2, 3, 4, 5]], 'handles undefined return values');
    deepEqual(_.partition({a: 1, b: 2, c: 3}, function(x) { return x > 1; }), [[2, 3], [1]], 'handles objects');

    deepEqual(_.partition(list, function(x, index) { return index % 2; }), [[1, 3, 5], [0, 2, 4]], 'can reference the array index');
    deepEqual(_.partition(list, function(x, index, arr) { return x === arr.length - 1; }), [[5], [0, 1, 2, 3, 4]], 'can reference the collection');

    // Default iterator
    deepEqual(_.partition([1, false, true, '']), [[1, true], [false, '']], 'Default iterator');
    deepEqual(_.partition([{x: 1}, {x: 0}, {x: 1}], 'x'), [[{x: 1}, {x: 1}], [{x: 0}]], 'Takes a string');

    // Context
    var predicate = function(x){ return x === this.x; };
    deepEqual(_.partition([1, 2, 3], predicate, {x: 2}), [[2], [1, 3]], 'partition takes a context argument');

    deepEqual(_.partition([{a: 1}, {b: 2}, {a: 1, b: 2}], {a: 1}), [[{a: 1}, {a: 1, b: 2}], [{b: 2}]], 'predicate can be object');

    var object = {a: 1};
    _.partition(object, function(val, key, obj) {
      equal(val, 1);
      equal(key, 'a');
      equal(obj, object);
      equal(this, predicate);
    }, predicate);
  });

  if (typeof document != 'undefined') {
    test('Can use various collection methods on NodeLists', function() {
        var parent = document.createElement('div');
        parent.innerHTML = '<span id=id1></span>textnode<span id=id2></span>';

        var elementChildren = _.filter(parent.childNodes, _.isElement);
        equal(elementChildren.length, 2);

        deepEqual(_.map(elementChildren, 'id'), ['id1', 'id2']);
        deepEqual(_.map(parent.childNodes, 'nodeType'), [1, 3, 1]);

        ok(!_.every(parent.childNodes, _.isElement));
        ok(_.some(parent.childNodes, _.isElement));

        function compareNode(node) {
          return _.isElement(node) ? node.id.charAt(2) : void 0;
        }
        equal(_.max(parent.childNodes, compareNode), _.last(parent.childNodes));
        equal(_.min(parent.childNodes, compareNode), _.first(parent.childNodes));
    });
  }

}());
