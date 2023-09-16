import assert from 'node:assert';
import lodashStable from 'lodash';
import { objectProto } from './utils';
import defaults from '../src/defaults';

describe('defaults', () => {
    it('should assign source properties if missing on `object`', () => {
        const actual = defaults({ a: 1 }, { a: 2, b: 2 });
        assert.deepStrictEqual(actual, { a: 1, b: 2 });
    });

    it('should accept multiple sources', () => {
        let expected = { a: 1, b: 2, c: 3 },
            actual = defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });

        assert.deepStrictEqual(actual, expected);

        actual = defaults({ a: 1, b: 2 }, { b: 3, c: 3 }, { c: 2 });
        assert.deepStrictEqual(actual, expected);
    });

    it('should not overwrite `null` values', () => {
        const actual = defaults({ a: null }, { a: 1 });
        assert.strictEqual(actual.a, null);
    });

    it('should overwrite `undefined` values', () => {
        const actual = defaults({ a: undefined }, { a: 1 });
        assert.strictEqual(actual.a, 1);
    });

    it('should assign `undefined` values', () => {
        const source = { a: undefined, b: 1 },
            actual = defaults({}, source);

        assert.deepStrictEqual(actual, { a: undefined, b: 1 });
    });

    it('should assign properties that shadow those on `Object.prototype`', () => {
        const object = {
            constructor: objectProto.constructor,
            hasOwnProperty: objectProto.hasOwnProperty,
            isPrototypeOf: objectProto.isPrototypeOf,
            propertyIsEnumerable: objectProto.propertyIsEnumerable,
            toLocaleString: objectProto.toLocaleString,
            toString: objectProto.toString,
            valueOf: objectProto.valueOf,
        };

        const source = {
            constructor: 1,
            hasOwnProperty: 2,
            isPrototypeOf: 3,
            propertyIsEnumerable: 4,
            toLocaleString: 5,
            toString: 6,
            valueOf: 7,
        };

        let expected = lodashStable.clone(source);
        assert.deepStrictEqual(defaults({}, source), expected);

        expected = lodashStable.clone(object);
        assert.deepStrictEqual(defaults({}, object, source), expected);
    });
});
