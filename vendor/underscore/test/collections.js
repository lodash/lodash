$(document).ready(function() {

  module("Collections");

  test("each", function() {
    _.each([1, 2, 3], function(num, i) {
      equal(num, i + 1, 'each iterators provide value and iteration count');
    });

    var answers = [];
    _.each([1, 2, 3], function(num){ answers.push(num * this.multiplier);}, {multiplier : 5});
    equal(answers.join(', '), '5, 10, 15', 'context object property accessed');

    answers = [];
    _.forEach([1, 2, 3], function(num){ answers.push(num); });
    equal(answers.join(', '), '1, 2, 3', 'aliased as "forEach"');

    answers = [];
    var obj = {one : 1, two : 2, three : 3};
    obj.constructor.prototype.four = 4;
    _.each(obj, function(value, key){ answers.push(key); });
    equal(answers.join(", "), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');
    delete obj.constructor.prototype.four;

    answer = null;
    _.each([1, 2, 3], function(num, index, arr){ if (_.include(arr, num)) answer = true; });
    ok(answer, 'can reference the original collection from inside the iterator');

    answers = 0;
    _.each(null, function(){ ++answers; });
    equal(answers, 0, 'handles a null properly');
  });

  test('map', function() {
    var doubled = _.map([1, 2, 3], function(num){ return num * 2; });
    equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');

    doubled = _.collect([1, 2, 3], function(num){ return num * 2; });
    equal(doubled.join(', '), '2, 4, 6', 'aliased as "collect"');

    var tripled = _.map([1, 2, 3], function(num){ return num * this.multiplier; }, {multiplier : 3});
    equal(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');

    var doubled = _([1, 2, 3]).map(function(num){ return num * 2; });
    equal(doubled.join(', '), '2, 4, 6', 'OO-style doubled numbers');

    if (document.querySelectorAll) {
      var ids = _.map(document.querySelectorAll('#map-test *'), function(n){ return n.id; });
      deepEqual(ids, ['id1', 'id2'], 'Can use collection methods on NodeLists.');
    }

    var ids = _.map($('#map-test').children(), function(n){ return n.id; });
    deepEqual(ids, ['id1', 'id2'], 'Can use collection methods on jQuery Array-likes.');

    var ids = _.map(document.images, function(n){ return n.id; });
    ok(ids[0] == 'chart_image', 'can use collection methods on HTMLCollections');

    var ifnull = _.map(null, function(){});
    ok(_.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
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

    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; });
    equal(sum, 6, 'default initial value');

    var ifnull;
    try {
      _.reduce(null, function(){});
    } catch (ex) {
      ifnull = ex;
    }
    ok(ifnull instanceof TypeError, 'handles a null (without inital value) properly');

    ok(_.reduce(null, function(){}, 138) === 138, 'handles a null (with initial value) properly');
    equal(_.reduce([], function(){}, undefined), undefined, 'undefined can be passed as a special case');
    raises(function() { _.reduce([], function(){}); }, TypeError, 'throws an error for empty arrays with no initial value');
  });

  test('reduceRight', function() {
    var list = _.reduceRight(["foo", "bar", "baz"], function(memo, str){ return memo + str; }, '');
    equal(list, 'bazbarfoo', 'can perform right folds');

    var list = _.foldr(["foo", "bar", "baz"], function(memo, str){ return memo + str; }, '');
    equal(list, 'bazbarfoo', 'aliased as "foldr"');

    var list = _.foldr(["foo", "bar", "baz"], function(memo, str){ return memo + str; });
    equal(list, 'bazbarfoo', 'default initial value');

    var ifnull;
    try {
      _.reduceRight(null, function(){});
    } catch (ex) {
      ifnull = ex;
    }
    ok(ifnull instanceof TypeError, 'handles a null (without inital value) properly');

    var sum = _.reduceRight({a: 1, b: 2, c: 3}, function(sum, num){ return sum + num; });
    equal(sum, 6, 'default initial value on object');

    ok(_.reduceRight(null, function(){}, 138) === 138, 'handles a null (with initial value) properly');

    equal(_.reduceRight([], function(){}, undefined), undefined, 'undefined can be passed as a special case');
    raises(function() { _.reduceRight([], function(){}); }, TypeError, 'throws an error for empty arrays with no initial value');

    // Assert that the correct arguments are being passed.

    var args,
        memo = {},
        object = {a: 1, b: 2},
        lastKey = _.keys(object).pop();

    var expected = lastKey == 'a'
      ? [memo, 1, 'a', object]
      : [memo, 2, 'b', object];

    _.reduceRight(object, function() {
      args || (args = _.toArray(arguments));
    }, memo);

    deepEqual(args, expected);

    // And again, with numeric keys.

    object = {'2': 'a', '1': 'b'};
    lastKey = _.keys(object).pop();
    args = null;

    expected = lastKey == '2'
      ? [memo, 'a', '2', object]
      : [memo, 'b', '1', object];

    _.reduceRight(object, function() {
      args || (args = _.toArray(arguments));
    }, memo);

    deepEqual(args, expected);
  });

  test('find', function() {
    var array = [1, 2, 3, 4];
    strictEqual(_.find(array, function(n) { return n > 2; }), 3, 'should return first found `value`');
    strictEqual(_.find(array, function() { return false; }), void 0, 'should return `undefined` if `value` is not found');
  });

  test('detect', function() {
    var result = _.detect([1, 2, 3], function(num){ return num * 2 == 4; });
    equal(result, 2, 'found the first "2" and broke the loop');
  });

  test('select', function() {
    var evens = _.select([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equal(evens.join(', '), '2, 4, 6', 'selected each even number');

    evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equal(evens.join(', '), '2, 4, 6', 'aliased as "filter"');
  });

  test('reject', function() {
    var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equal(odds.join(', '), '1, 3, 5', 'rejected each even number');

    var context = "obj";

    var evens = _.reject([1, 2, 3, 4, 5, 6], function(num){
      equal(context, "obj");
      return num % 2 != 0;
    }, context);
    equal(evens.join(', '), '2, 4, 6', 'rejected each odd number');
  });

  test('all', function() {
    ok(_.all([], _.identity), 'the empty set');
    ok(_.all([true, true, true], _.identity), 'all true values');
    ok(!_.all([true, false, true], _.identity), 'one false value');
    ok(_.all([0, 10, 28], function(num){ return num % 2 == 0; }), 'even numbers');
    ok(!_.all([0, 11, 28], function(num){ return num % 2 == 0; }), 'an odd number');
    ok(_.all([1], _.identity) === true, 'cast to boolean - true');
    ok(_.all([0], _.identity) === false, 'cast to boolean - false');
    ok(_.every([true, true, true], _.identity), 'aliased as "every"');
    ok(!_.all([undefined, undefined, undefined], _.identity), 'works with arrays of undefined');
  });

  test('any', function() {
    var nativeSome = Array.prototype.some;
    Array.prototype.some = null;
    ok(!_.any([]), 'the empty set');
    ok(!_.any([false, false, false]), 'all false values');
    ok(_.any([false, false, true]), 'one true value');
    ok(_.any([null, 0, 'yes', false]), 'a string');
    ok(!_.any([null, 0, '', false]), 'falsy values');
    ok(!_.any([1, 11, 29], function(num){ return num % 2 == 0; }), 'all odd numbers');
    ok(_.any([1, 10, 29], function(num){ return num % 2 == 0; }), 'an even number');
    ok(_.any([1], _.identity) === true, 'cast to boolean - true');
    ok(_.any([0], _.identity) === false, 'cast to boolean - false');
    ok(_.some([false, false, true]), 'aliased as "some"');
    Array.prototype.some = nativeSome;
  });

  test('include', function() {
    ok(_.include([1,2,3], 2), 'two is in the array');
    ok(!_.include([1,3,9], 2), 'two is not in the array');
    ok(_.contains({moe:1, larry:3, curly:9}, 3) === true, '_.include on objects checks their values');
    ok(_([1,2,3]).include(2), 'OO-style include');
  });

  test('invoke', function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, 'sort');
    equal(result[0].join(', '), '1, 5, 7', 'first array sorted');
    equal(result[1].join(', '), '1, 2, 3', 'second array sorted');
  });

  test('invoke w/ function reference', function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, Array.prototype.sort);
    equal(result[0].join(', '), '1, 5, 7', 'first array sorted');
    equal(result[1].join(', '), '1, 2, 3', 'second array sorted');
  });

  // Relevant when using ClojureScript
  test('invoke when strings have a call method', function() {
    String.prototype.call = function() {
      return 42;
    };
    var list = [[5, 1, 7], [3, 2, 1]];
    var s = "foo";
    equal(s.call(), 42, "call function exists");
    var result = _.invoke(list, 'sort');
    equal(result[0].join(', '), '1, 5, 7', 'first array sorted');
    equal(result[1].join(', '), '1, 2, 3', 'second array sorted');
    delete String.prototype.call;
    equal(s.call, undefined, "call function removed");
  });

  test('pluck', function() {
    var people = [{name : 'moe', age : 30}, {name : 'curly', age : 50}];
    equal(_.pluck(people, 'name').join(', '), 'moe, curly', 'pulls names out of objects');
  });

  test('where', function() {
    var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}];
    var result = _.where(list, {a: 1});
    equal(result.length, 3);
    equal(result[result.length - 1].b, 4);
    result = _.where(list, {b: 2});
    equal(result.length, 2);
    equal(result[0].a, 1);
  });

  test('max', function() {
    equal(3, _.max([1, 2, 3]), 'can perform a regular Math.max');

    var neg = _.max([1, 2, 3], function(num){ return -num; });
    equal(neg, 1, 'can perform a computation-based max');

    equal(-Infinity, _.max({}), 'Maximum value of an empty object');
    equal(-Infinity, _.max([]), 'Maximum value of an empty array');

    equal(299999, _.max(_.range(1,300000)), "Maximum value of a too-big array");
  });

  test('min', function() {
    equal(1, _.min([1, 2, 3]), 'can perform a regular Math.min');

    var neg = _.min([1, 2, 3], function(num){ return -num; });
    equal(neg, 3, 'can perform a computation-based min');

    equal(Infinity, _.min({}), 'Minimum value of an empty object');
    equal(Infinity, _.min([]), 'Minimum value of an empty array');

    var now = new Date(9999999999);
    var then = new Date(0);
    equal(_.min([now, then]), then);

    equal(1, _.min(_.range(1,300000)), "Minimum value of a too-big array");
  });

  test('sortBy', function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person){ return person.age; });
    equal(_.pluck(people, 'name').join(', '), 'moe, curly', 'stooges sorted by age');

    var list = [undefined, 4, 1, undefined, 3, 2];
    equal(_.sortBy(list, _.identity).join(','), '1,2,3,4,,', 'sortBy with undefined values');

    var list = ["one", "two", "three", "four", "five"];
    var sorted = _.sortBy(list, 'length');
    equal(sorted.join(' '), 'one two four five three', 'sorted by length');

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
  });

  test('groupBy', function() {
    var parity = _.groupBy([1, 2, 3, 4, 5, 6], function(num){ return num % 2; });
    ok('0' in parity && '1' in parity, 'created a group for each value');
    equal(parity[0].join(', '), '2, 4, 6', 'put each even number in the right group');

    var list = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    var grouped = _.groupBy(list, 'length');
    equal(grouped['3'].join(' '), 'one two six ten');
    equal(grouped['4'].join(' '), 'four five nine');
    equal(grouped['5'].join(' '), 'three seven eight');

    var context = {};
    _.groupBy([{}], function(){ ok(this === context); }, context);

    grouped = _.groupBy([4.2, 6.1, 6.4], function(num) {
      return Math.floor(num) > 4 ? 'hasOwnProperty' : 'constructor';
    });
    equal(grouped.constructor.length, 1);
    equal(grouped.hasOwnProperty.length, 2);

    var array = [{}];
    _.groupBy(array, function(value, index, obj){ ok(obj === array); });
  });

  test('countBy', function() {
    var parity = _.countBy([1, 2, 3, 4, 5], function(num){ return num % 2 == 0; });
    equal(parity['true'], 2);
    equal(parity['false'], 3);

    var list = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
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
  });

  test('sortedIndex', function() {
    var numbers = [10, 20, 30, 40, 50], num = 35;
    var indexForNum = _.sortedIndex(numbers, num);
    equal(indexForNum, 3, '35 should be inserted at index 3');

    var indexFor30 = _.sortedIndex(numbers, 30);
    equal(indexFor30, 2, '30 should be inserted at index 2');

    var objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}];
    var iterator = function(obj){ return obj.x; };
    strictEqual(_.sortedIndex(objects, {x: 25}, iterator), 2);
    strictEqual(_.sortedIndex(objects, {x: 35}, 'x'), 3);

    var context = {1: 2, 2: 3, 3: 4};
    iterator = function(obj){ return this[obj]; };
    strictEqual(_.sortedIndex([1, 3], 2, iterator, context), 1);
  });

  test('shuffle', function() {
    var numbers = _.range(10);
    var shuffled = _.shuffle(numbers).sort();
    notStrictEqual(numbers, shuffled, 'original object is unmodified');
    equal(shuffled.join(','), numbers.join(','), 'contains the same members before and after shuffle');
  });

  test('toArray', function() {
    ok(!_.isArray(arguments), 'arguments object is not an array');
    ok(_.isArray(_.toArray(arguments)), 'arguments object converted into array');
    var a = [1,2,3];
    ok(_.toArray(a) !== a, 'array is cloned');
    equal(_.toArray(a).join(', '), '1, 2, 3', 'cloned array contains same elements');

    var numbers = _.toArray({one : 1, two : 2, three : 3});
    equal(numbers.join(', '), '1, 2, 3', 'object flattened into array');
  });

  test('size', function() {
    equal(_.size({one : 1, two : 2, three : 3}), 3, 'can compute the size of an object');
    equal(_.size([1, 2, 3]), 3, 'can compute the size of an array');

    var func = function() {
      return _.size(arguments);
    };

    equal(func(1, 2, 3, 4), 4, 'can test the size of the arguments object');

    equal(_.size('hello'), 5, 'can compute the size of a string');

    equal(_.size(null), 0, 'handles nulls');
  });

});
