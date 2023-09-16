import assert from 'node:assert';
import pullAll from '../src/pullAll';

describe('pullAll', () => {
    it('should work with the same value for `array` and `values`', () => {
        const array = [{ a: 1 }, { b: 2 }],
            actual = pullAll(array, array);

        assert.deepStrictEqual(actual, []);
    });
});
