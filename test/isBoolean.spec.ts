import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isBoolean from '../src/isBoolean';

describe('isBoolean', () => {
    it('should return `true` for booleans', () => {
        assert.strictEqual(isBoolean(true), true);
        assert.strictEqual(isBoolean(false), true);
        assert.strictEqual(isBoolean(Object(true)), true);
        assert.strictEqual(isBoolean(Object(false)), true);
    });

    it('should return `false` for non-booleans', () => {
        const expected = lodashStable.map(falsey, (value) => value === false);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isBoolean(value) : isBoolean(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isBoolean(args), false);
        assert.strictEqual(isBoolean([1, 2, 3]), false);
        assert.strictEqual(isBoolean(new Date()), false);
        assert.strictEqual(isBoolean(new Error()), false);
        assert.strictEqual(isBoolean(slice), false);
        assert.strictEqual(isBoolean({ a: 1 }), false);
        assert.strictEqual(isBoolean(1), false);
        assert.strictEqual(isBoolean(/x/), false);
        assert.strictEqual(isBoolean('a'), false);
        assert.strictEqual(isBoolean(symbol), false);
    });

    it('should work with a boolean from another realm', () => {
        if (realm.boolean) {
            assert.strictEqual(isBoolean(realm.boolean), true);
        }
    });
});
