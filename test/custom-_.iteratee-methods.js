import assert from 'assert';
import partial from '../partial.js';
import property from '../property.js';
import iteratee from '../iteratee.js';

describe('custom `_.iteratee` methods', function() {
  var array = ['one', 'two', 'three'],
      getPropA = partial(property, 'a'),
      getPropB = partial(property, 'b'),
      getLength = partial(property, 'length'),
      iteratee = iteratee;

  var getSum = function() {
    return function(result, object) {
      return result + object.a;
    };
  };

  var objects = [
    { 'a': 0, 'b': 0 },
    { 'a': 1, 'b': 0 },
    { 'a': 1, 'b': 1 }
  ];

  it('`_.countBy` should use `_.iteratee` internally', function() {
    iteratee = getLength;
    assert.deepEqual(_.countBy(array), { '3': 2, '5': 1 });
    iteratee = iteratee;
  });

  it('`_.differenceBy` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.deepEqual(_.differenceBy(objects, [objects[1]]), [objects[0]]);
    iteratee = iteratee;
  });

  it('`_.dropRightWhile` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.dropRightWhile(objects), objects.slice(0, 2));
    iteratee = iteratee;
  });

  it('`_.dropWhile` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.dropWhile(objects.reverse()).reverse(), objects.reverse().slice(0, 2));
    iteratee = iteratee;
  });

  it('`_.every` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.strictEqual(_.every(objects.slice(1)), true);
    iteratee = iteratee;
  });

  it('`_.filter` should use `_.iteratee` internally', function() {
    var objects = [{ 'a': 0 }, { 'a': 1 }];

    iteratee = getPropA;
    assert.deepEqual(_.filter(objects), [objects[1]]);
    iteratee = iteratee;
  });

  it('`_.find` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.strictEqual(_.find(objects), objects[1]);
    iteratee = iteratee;
  });

  it('`_.findIndex` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.strictEqual(_.findIndex(objects), 1);
    iteratee = iteratee;
  });

  it('`_.findLast` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.strictEqual(_.findLast(objects), objects[2]);
    iteratee = iteratee;
  });

  it('`_.findLastIndex` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.strictEqual(_.findLastIndex(objects), 2);
    iteratee = iteratee;
  });

  it('`_.findKey` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.strictEqual(_.findKey(objects), '2');
    iteratee = iteratee;
  });

  it('`_.findLastKey` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.strictEqual(_.findLastKey(objects), '2');
    iteratee = iteratee;
  });

  it('`_.groupBy` should use `_.iteratee` internally', function() {
    iteratee = getLength;
    assert.deepEqual(_.groupBy(array), { '3': ['one', 'two'], '5': ['three'] });
    iteratee = iteratee;
  });

  it('`_.intersectionBy` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.deepEqual(_.intersectionBy(objects, [objects[2]]), [objects[1]]);
    iteratee = iteratee;
  });

  it('`_.keyBy` should use `_.iteratee` internally', function() {
    iteratee = getLength;
    assert.deepEqual(_.keyBy(array), { '3': 'two', '5': 'three' });
    iteratee = iteratee;
  });

  it('`_.map` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.deepEqual(_.map(objects), [0, 1, 1]);
    iteratee = iteratee;
  });

  it('`_.mapKeys` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.mapKeys({ 'a': { 'b': 2 } }), { '2':  { 'b': 2 } });
    iteratee = iteratee;
  });

  it('`_.mapValues` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.mapValues({ 'a': { 'b': 2 } }), { 'a': 2 });
    iteratee = iteratee;
  });

  it('`_.maxBy` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.maxBy(objects), objects[2]);
    iteratee = iteratee;
  });

  it('`_.meanBy` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.strictEqual(_.meanBy(objects), 2 / 3);
    iteratee = iteratee;
  });

  it('`_.minBy` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.minBy(objects), objects[0]);
    iteratee = iteratee;
  });

  it('`_.partition` should use `_.iteratee` internally', function() {
    var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }];

    iteratee = getPropA;
    assert.deepEqual(_.partition(objects), [objects.slice(0, 2), objects.slice(2)]);
    iteratee = iteratee;
  });

  it('`_.pullAllBy` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.deepEqual(_.pullAllBy(objects.slice(), [{ 'a': 1, 'b': 0 }]), [objects[0]]);
    iteratee = iteratee;
  });

  it('`_.reduce` should use `_.iteratee` internally', function() {
    iteratee = getSum;
    assert.strictEqual(_.reduce(objects, undefined, 0), 2);
    iteratee = iteratee;
  });

  it('`_.reduceRight` should use `_.iteratee` internally', function() {
    iteratee = getSum;
    assert.strictEqual(_.reduceRight(objects, undefined, 0), 2);
    iteratee = iteratee;
  });

  it('`_.reject` should use `_.iteratee` internally', function() {
    var objects = [{ 'a': 0 }, { 'a': 1 }];

    iteratee = getPropA;
    assert.deepEqual(_.reject(objects), [objects[0]]);
    iteratee = iteratee;
  });

  it('`_.remove` should use `_.iteratee` internally', function() {
    var objects = [{ 'a': 0 }, { 'a': 1 }];

    iteratee = getPropA;
    _.remove(objects);
    assert.deepEqual(objects, [{ 'a': 0 }]);
    iteratee = iteratee;
  });

  it('`_.some` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.strictEqual(_.some(objects), true);
    iteratee = iteratee;
  });

  it('`_.sortBy` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.deepEqual(_.sortBy(objects.slice().reverse()), [objects[0], objects[2], objects[1]]);
    iteratee = iteratee;
  });

  it('`_.sortedIndexBy` should use `_.iteratee` internally', function() {
    var objects = [{ 'a': 30 }, { 'a': 50 }];

    iteratee = getPropA;
    assert.strictEqual(_.sortedIndexBy(objects, { 'a': 40 }), 1);
    iteratee = iteratee;
  });

  it('`_.sortedLastIndexBy` should use `_.iteratee` internally', function() {
    var objects = [{ 'a': 30 }, { 'a': 50 }];

    iteratee = getPropA;
    assert.strictEqual(_.sortedLastIndexBy(objects, { 'a': 40 }), 1);
    iteratee = iteratee;
  });

  it('`_.sumBy` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.strictEqual(_.sumBy(objects), 1);
    iteratee = iteratee;
  });

  it('`_.takeRightWhile` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.takeRightWhile(objects), objects.slice(2));
    iteratee = iteratee;
  });

  it('`_.takeWhile` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.takeWhile(objects.reverse()), objects.reverse().slice(2));
    iteratee = iteratee;
  });

  it('`_.transform` should use `_.iteratee` internally', function() {
    iteratee = function() {
      return function(result, object) {
        result.sum += object.a;
      };
    };

    assert.deepEqual(_.transform(objects, undefined, { 'sum': 0 }), { 'sum': 2 });
    iteratee = iteratee;
  });

  it('`_.uniqBy` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.uniqBy(objects), [objects[0], objects[2]]);
    iteratee = iteratee;
  });

  it('`_.unionBy` should use `_.iteratee` internally', function() {
    iteratee = getPropB;
    assert.deepEqual(_.unionBy(objects.slice(0, 1), [objects[2]]), [objects[0], objects[2]]);
    iteratee = iteratee;
  });

  it('`_.xorBy` should use `_.iteratee` internally', function() {
    iteratee = getPropA;
    assert.deepEqual(_.xorBy(objects, objects.slice(1)), [objects[0]]);
    iteratee = iteratee;
  });
});
