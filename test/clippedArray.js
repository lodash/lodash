import assert from 'assert';
import clippedArray from '../clippedArray';

describe('clippedArray', function () {
  let testArray = [2, 17, 92];

  it("returns normally if index is between 0 and `array.length - 1` inclusive", () => {
    assert.strictEqual(clippedArray(testArray, 1), 17);
  });

  it("returns the first element if index is less than 0", () => {
    assert.strictEqual(clippedArray(testArray, -1), 2);
  });

  it("returns the last element if index is greater than `array.length - 1`", () => {
    assert.strictEqual(clippedArray(testArray, 34), 92);
  });

  it("returns undefined if the array is empty", () => {
    assert.strictEqual(clippedArray([], 0), undefined);
  });
});
