import assert from 'node:assert';
import lodashStable from 'lodash';
import { typedArrays, falsey, stubFalse, args, slice, symbol, realm } from './utils';
import isTypedArray from '../src/isTypedArray';

describe('isTypedArray', () => {
    it('should return `true` for typed arrays', () => {
        const expected = lodashStable.map(typedArrays, (type) => type in root);

        const actual = lodashStable.map(typedArrays, (type) => {
            const Ctor = root[type];
            return Ctor ? isTypedArray(new Ctor(new ArrayBuffer(8))) : false;
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non typed arrays', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isTypedArray(value) : isTypedArray(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isTypedArray(args), false);
        assert.strictEqual(isTypedArray([1, 2, 3]), false);
        assert.strictEqual(isTypedArray(true), false);
        assert.strictEqual(isTypedArray(new Date()), false);
        assert.strictEqual(isTypedArray(new Error()), false);
        assert.strictEqual(isTypedArray(slice), false);
        assert.strictEqual(isTypedArray({ a: 1 }), false);
        assert.strictEqual(isTypedArray(1), false);
        assert.strictEqual(isTypedArray(/x/), false);
        assert.strictEqual(isTypedArray('a'), false);
        assert.strictEqual(isTypedArray(symbol), false);
    });

    it('should work with typed arrays from another realm', () => {
        if (realm.object) {
            const props = lodashStable.invokeMap(typedArrays, 'toLowerCase');

            const expected = lodashStable.map(props, (key) => realm[key] !== undefined);

            const actual = lodashStable.map(props, (key) => {
                const value = realm[key];
                return value ? isTypedArray(value) : false;
            });

            assert.deepStrictEqual(actual, expected);
        }
    });
});
