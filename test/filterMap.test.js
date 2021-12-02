import assert from 'assert';
import filterMap from '../filterMap.js';

describe('filterMap', () => {

  it('Should perform a normal map operation', () => {
    assert.deepStrictEqual(
      filterMap([1, 2, 3, 4, 5], x => x + 1),
      [2, 3, 4, 5, 6]
    );
  });

  it('Should filter out null values ', () => {
    const years = [1942, 1978, 2000, 2021, 2022, 2030, 2045];
    const currentYear = 2021;
    const ages  = filterMap(years, year => year <= currentYear ? currentYear - year : null)
    assert.deepStrictEqual(ages, [79, 43, 21, 0]);
  });

  it('Should keep undefined', () => {
    assert.deepStrictEqual(
      filterMap([undefined, undefined, undefined], x => x),
      [undefined, undefined, undefined]
    );
  });

  it('Should operate on empty arrays', () => {
    assert.deepStrictEqual(
      filterMap([], x => x - 1),
      []
    );
  });

  it('Should preserve falsy values', () => {
    // Define a simple mapping to some assorted values
    const f = key => ({
      'one': 'hello',
      'two': 'world',
      'three': '',        // try a falsy value
      'four': 'lorem',
      'five': 0,          // and another
      'six': NaN,         // And NaN for extra weirdness
      'seven': null,      // this one should be the only value removed
      'eight': undefined, // verify we keep undefined too
      'nine': 'ipsum'
    }[key]);
    assert.deepStrictEqual(
      filterMap(
        ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
        f
      ),
      ['hello', 'world', '', 'lorem', 0, NaN, undefined, 'ipsum', undefined]
    );
  });
});
