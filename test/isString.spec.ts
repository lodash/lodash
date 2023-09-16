import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isString from '../src/isString';

describe('isString', () => {
    it('should return `true` for strings', () => {
        assert.strictEqual(isString('a'), true);
        assert.strictEqual(isString(Object('a')), true);
    });

    it('should return `false` for non-strings', () => {
        const expected = lodashStable.map(falsey, (value) => value === '');

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isString(value) : isString(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isString(args), false);
        assert.strictEqual(isString([1, 2, 3]), false);
        assert.strictEqual(isString(true), false);
        assert.strictEqual(isString(new Date()), false);
        assert.strictEqual(isString(new Error()), false);
        assert.strictEqual(isString(slice), false);
        assert.strictEqual(isString({ '0': 1, length: 1 }), false);
        assert.strictEqual(isString(1), false);
        assert.strictEqual(isString(/x/), false);
        assert.strictEqual(isString(symbol), false);
    });

    it('should work with strings from another realm', () => {
        if (realm.string) {
            assert.strictEqual(isString(realm.string), true);
        }
    });
});
