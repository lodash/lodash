$(document).ready(function() {

  module("Collection functions (each, any, select, and so on...)");

  test("collections: each", function() {
    _.each([1, 2, 3], function(num, i) {
      equals(num, i + 1, 'each iterators provide value and iteration count');
    });

    var answers = [];
    _.each([1, 2, 3], function(num){ answers.push(num * this.multiplier);}, {multiplier : 5});
    equals(answers.join(', '), '5, 10, 15', 'context object property accessed');

    answers = [];
    _.forEach([1, 2, 3], function(num){ answers.push(num); });
    equals(answers.join(', '), '1, 2, 3', 'aliased as "forEach"');

    answers = [];
    var obj = {one : 1, two : 2, three : 3};
    obj.constructor.prototype.four = 4;
    _.each(obj, function(value, key){ answers.push(key); });
    equals(answers.join(", "), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');
    delete obj.constructor.prototype.four;

    answer = null;
    _.each([1, 2, 3], function(num, index, arr){ if (_.include(arr, num)) answer = true; });
    ok(answer, 'can reference the original collection from inside the iterator');

    answers = [];
    _.each({range : 1, speed : 2, length : 3}, function(v){ answers.push(v); });
    ok(answers.join(', '), '1, 2, 3', 'can iterate over objects with numeric length properties');

    answers = 0;
    _.each(null, function(){ ++answers; });
    equals(answers, 0, 'handles a null properly');
  });

  test('collections: map', function() {
    var doubled = _.map([1, 2, 3], function(num){ return num * 2; });
    equals(doubled.join(', '), '2, 4, 6', 'doubled numbers');

    var tripled = _.map([1, 2, 3], function(num){ return num * this.multiplier; }, {multiplier : 3});
    equals(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');

    var doubled = _([1, 2, 3]).map(function(num){ return num * 2; });
    equals(doubled.join(', '), '2, 4, 6', 'OO-style doubled numbers');

    var ids = _.map(document.body.childNodes, function(n){ return n.id; });
    ok(_.include(ids, 'qunit-header'), 'can use collection methods on NodeLists');

    var ids = _.map(document.images, function(n){ return n.id; });
    ok(ids[0] == 'chart_image', 'can use collection methods on HTMLCollections');

    var ifnull = _.map(null, function(){});
    ok(_.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
  });

  test('collections: reduce', function() {
    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; }, 0);
    equals(sum, 6, 'can sum up an array');

    var context = {multiplier : 3};
    sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num * this.multiplier; }, 0, context);
    equals(sum, 18, 'can reduce with a context object');

    sum = _.inject([1, 2, 3], function(sum, num){ return sum + num; }, 0);
    equals(sum, 6, 'aliased as "inject"');

    sum = _([1, 2, 3]).reduce(function(sum, num){ return sum + num; }, 0);
    equals(sum, 6, 'OO-style reduce');

    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; });
    equals(sum, 6, 'default initial value');

    var ifnull;
    try {
      _.reduce(null, function(){});
    } catch (ex) {
      ifnull = ex;
    }
    ok(ifnull instanceof TypeError, 'handles a null (without inital value) properly');

    ok(_.reduce(null, function(){}, 138) === 138, 'handles a null (with initial value) properly');
  });

  test('collections: reduceRight', function() {
    var list = _.reduceRight(["foo", "bar", "baz"], function(memo, str){ return memo + str; }, '');
    equals(list, 'bazbarfoo', 'can perform right folds');

    var list = _.foldr(["foo", "bar", "baz"], function(memo, str){ return memo + str; }, '');
    equals(list, 'bazbarfoo', 'aliased as "foldr"');

    var list = _.foldr(["foo", "bar", "baz"], function(memo, str){ return memo + str; });
    equals(list, 'bazbarfoo', 'default initial value');

    var ifnull;
    try {
      _.reduceRight(null, function(){});
    } catch (ex) {
      ifnull = ex;
    }
    ok(ifnull instanceof TypeError, 'handles a null (without inital value) properly');

    ok(_.reduceRight(null, function(){}, 138) === 138, 'handles a null (with initial value) properly');
  });

  test('collections: detect', function() {
    var result = _.detect([1, 2, 3], function(num){ return num * 2 == 4; });
    equals(result, 2, 'found the first "2" and broke the loop');
  });

  test('collections: select', function() {
    var evens = _.select([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equals(evens.join(', '), '2, 4, 6', 'selected each even number');

    evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equals(evens.join(', '), '2, 4, 6', 'aliased as "filter"');
  });

  test('collections: reject', function() {
    var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equals(odds.join(', '), '1, 3, 5', 'rejected each even number');
  });

  test('collections: all', function() {
    ok(_.all([]), 'the empty set');
    ok(_.all([true, true, true]), 'all true values');
    ok(!_.all([true, false, true]), 'one false value');
    ok(_.all([0, 10, 28], function(num){ return num % 2 == 0; }), 'even numbers');
    ok(!_.all([0, 11, 28], function(num){ return num % 2 == 0; }), 'an odd number');
    ok(_.every([true, true, true]), 'aliased as "every"');
  });

  test('collections: any', function() {
    ok(!_.any([]), 'the empty set');
    ok(!_.any([false, false, false]), 'all false values');
    ok(_.any([false, false, true]), 'one true value');
    ok(!_.any([1, 11, 29], function(num){ return num % 2 == 0; }), 'all odd numbers');
    ok(_.any([1, 10, 29], function(num){ return num % 2 == 0; }), 'an even number');
    ok(_.some([false, false, true]), 'aliased as "some"');
  });

  test('collections: include', function() {
    ok(_.include([1,2,3], 2), 'two is in the array');
    ok(!_.include([1,3,9], 2), 'two is not in the array');
    ok(_.contains({moe:1, larry:3, curly:9}, 3) === true, '_.include on objects checks their values');
    ok(_([1,2,3]).include(2), 'OO-style include');
  });

  test('collections: invoke', function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, 'sort');
    equals(result[0].join(', '), '1, 5, 7', 'first array sorted');
    equals(result[1].join(', '), '1, 2, 3', 'second array sorted');
  });

  test('collections: pluck', function() {
    var people = [{name : 'moe', age : 30}, {name : 'curly', age : 50}];
    equals(_.pluck(people, 'name').join(', '), 'moe, curly', 'pulls names out of objects');
  });

  test('collections: max', function() {
    equals(3, _.max([1, 2, 3]), 'can perform a regular Math.max');

    var neg = _.max([1, 2, 3], function(num){ return -num; });
    equals(neg, 1, 'can perform a computation-based max');
  });

  test('collections: min', function() {
    equals(1, _.min([1, 2, 3]), 'can perform a regular Math.min');

    var neg = _.min([1, 2, 3], function(num){ return -num; });
    equals(neg, 3, 'can perform a computation-based min');
  });

  test('collections: sortBy', function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person){ return person.age; });
    equals(_.pluck(people, 'name').join(', '), 'moe, curly', 'stooges sorted by age');
  });

  test('collections: sortedIndex', function() {
    var numbers = [10, 20, 30, 40, 50], num = 35;
    var index = _.sortedIndex(numbers, num);
    equals(index, 3, '35 should be inserted at index 3');
  });

  test('collections: toArray', function() {
    ok(!_.isArray(arguments), 'arguments object is not an array');
    ok(_.isArray(_.toArray(arguments)), 'arguments object converted into array');

    var numbers = _.toArray({one : 1, two : 2, three : 3});
    equals(numbers.join(', '), '1, 2, 3', 'object flattened into array');
  });

  test('collections: size', function() {
    equals(_.size({one : 1, two : 2, three : 3}), 3, 'can compute the size of an object');
  });

});
