import assert from 'assert';
import group from '../sortedIndexByComparator.js';

describe('sortedIndexByComparator', () => {
  it('Should group items evenly with the given amount of groups', () => {
    assert.strictEqual(sortedIndexByComparator([[0,10],[10,16],[16,20]], 15, compare ), 1);
    assert.strictEqual(sortedIndexByComparator([[0,5],[5,7],[7,20],[20,100]], 10, compare ), 2);
  });
});