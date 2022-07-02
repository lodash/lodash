import assert from 'assert';
import lodashStable from 'lodash';
import sampleWeightSize from '.../sampleWeightSize.js';

describe('sampleWeightSize', function () {
  const array = [1, 2, 3, 4, 5];
  const weight = [100, 10, 1, 1, 1];

  it('should return a random elements', function () {
    const actual = sampleWeightSize(array, weight, 10);

    assert.strictEqual(actual.length, 10);
    assert.deepStrictEqual(lodashStable.difference(actual, array), []);
  });

  it('should contain elements of the collection', function () {
    const actual = sampleWeightSize(array, weight, array.length).sort();

    assert.deepStrictEqual(actual, array);
  });
});
