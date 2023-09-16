import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isNaN from '../src/isNaN';

describe('isNaN', () => {
    it('should return `true` for NaNs', () => {
        assert.strictEqual(isNaN(NaN), true);
        assert.strictEqual(isNaN(Object(NaN)), true);
    });

    it('should return `false` for non-NaNs', () => {
        const expected = lodashStable.map(falsey, (value) => value !== value);

        const actual = lodashStable.map(falsey, (value, index) => (index ? isNaN(value) : isNaN()));

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isNaN(args), false);
        assert.strictEqual(isNaN([1, 2, 3]), false);
        assert.strictEqual(isNaN(true), false);
        assert.strictEqual(isNaN(new Date()), false);
        assert.strictEqual(isNaN(new Error()), false);
        assert.strictEqual(isNaN(slice), false);
        assert.strictEqual(isNaN({ a: 1 }), false);
        assert.strictEqual(isNaN(1), false);
        assert.strictEqual(isNaN(Object(1)), false);
        assert.strictEqual(isNaN(/x/), false);
        assert.strictEqual(isNaN('a'), false);
        assert.strictEqual(isNaN(symbol), false);
    });

    it('should work with `NaN` from another realm', () => {
        if (realm.object) {
            assert.strictEqual(isNaN(realm.nan), true);
        }
    });
});
