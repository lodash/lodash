import assert from 'node:assert';
import lodashStable from 'lodash';

import {
    slice,
    asyncFunc,
    genFunc,
    arrayViews,
    objToString,
    funcTag,
    falsey,
    stubFalse,
    args,
    symbol,
    document,
    realm,
} from './utils';

import isFunction from '../src/isFunction';

describe('isFunction', () => {
    it('should return `true` for functions', () => {
        assert.strictEqual(isFunction(slice), true);
    });

    it('should return `true` for async functions', () => {
        assert.strictEqual(isFunction(asyncFunc), typeof asyncFunc === 'function');
    });

    it('should return `true` for generator functions', () => {
        assert.strictEqual(isFunction(genFunc), typeof genFunc === 'function');
    });

    it('should return `true` for the `Proxy` constructor', () => {
        if (Proxy) {
            assert.strictEqual(isFunction(Proxy), true);
        }
    });

    it('should return `true` for array view constructors', () => {
        const expected = lodashStable.map(
            arrayViews,
            (type) => objToString.call(root[type]) === funcTag,
        );

        const actual = lodashStable.map(arrayViews, (type) => isFunction(root[type]));

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-functions', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isFunction(value) : isFunction(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isFunction(args), false);
        assert.strictEqual(isFunction([1, 2, 3]), false);
        assert.strictEqual(isFunction(true), false);
        assert.strictEqual(isFunction(new Date()), false);
        assert.strictEqual(isFunction(new Error()), false);
        assert.strictEqual(isFunction({ a: 1 }), false);
        assert.strictEqual(isFunction(1), false);
        assert.strictEqual(isFunction(/x/), false);
        assert.strictEqual(isFunction('a'), false);
        assert.strictEqual(isFunction(symbol), false);

        if (document) {
            assert.strictEqual(isFunction(document.getElementsByTagName('body')), false);
        }
    });

    it('should work with a function from another realm', () => {
        if (realm.function) {
            assert.strictEqual(isFunction(realm.function), true);
        }
    });
});
