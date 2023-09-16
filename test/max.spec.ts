import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, noop } from './utils';
import max from '../src/max';

describe('max', () => {
    it('should return the largest value from a collection', () => {
        assert.strictEqual(max([1, 2, 3]), 3);
    });

    it('should return `undefined` for empty collections', () => {
        const values = falsey.concat([[]]),
            expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (value, index) => {
            try {
                return index ? max(value) : max();
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with non-numeric collection values', () => {
        assert.strictEqual(max(['a', 'b']), 'b');
    });
});
