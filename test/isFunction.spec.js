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
    root,
} from './utils';

import isFunction from '../src/isFunction';

describe('isFunction', () => {
    it('should return `true` for functions', () => {
        expect(isFunction(slice)).toBe(true);
    });

    it('should return `true` for async functions', () => {
        expect(isFunction(asyncFunc)).toBe(typeof asyncFunc === 'function');
    });

    it('should return `true` for generator functions', () => {
        expect(isFunction(genFunc)).toBe(typeof genFunc === 'function');
    });

    it('should return `true` for the `Proxy` constructor', () => {
        if (Proxy) {
            expect(isFunction(Proxy)).toBe(true);
        }
    });

    it('should return `true` for array view constructors', () => {
        const expected = lodashStable.map(
            arrayViews,
            (type) => objToString.call(root[type]) === funcTag,
        );

        const actual = lodashStable.map(arrayViews, (type) => isFunction(root[type]));

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non-functions', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isFunction(value) : isFunction(),
        );

        expect(actual).toEqual(expected);

        expect(isFunction(args)).toBe(false);
        expect(isFunction([1, 2, 3])).toBe(false);
        expect(isFunction(true)).toBe(false);
        expect(isFunction(new Date())).toBe(false);
        expect(isFunction(new Error())).toBe(false);
        expect(isFunction({ a: 1 })).toBe(false);
        expect(isFunction(1)).toBe(false);
        expect(isFunction(/x/)).toBe(false);
        expect(isFunction('a')).toBe(false);
        expect(isFunction(symbol)).toBe(false);

        if (document) {
            expect(isFunction(document.getElementsByTagName('body'))).toBe(false);
        }
    });

    it('should work with a function from another realm', () => {
        if (realm.function) {
            expect(isFunction(realm.function)).toBe(true);
        }
    });
});
