import lodashStable from 'lodash';
import { objectProto } from './utils';
import defaults from '../src/defaults';

describe('defaults', () => {
    it('should assign source properties if missing on `object`', () => {
        const actual = defaults({ a: 1 }, { a: 2, b: 2 });
        expect(actual).toEqual({ a: 1, b: 2 });
    });

    it('should accept multiple sources', () => {
        const expected = { a: 1, b: 2, c: 3 };
        let actual = defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });

        expect(actual).toEqual(expected);

        actual = defaults({ a: 1, b: 2 }, { b: 3, c: 3 }, { c: 2 });
        expect(actual).toEqual(expected);
    });

    it('should not overwrite `null` values', () => {
        const actual = defaults({ a: null }, { a: 1 });
        expect(actual.a).toBe(null);
    });

    it('should overwrite `undefined` values', () => {
        const actual = defaults({ a: undefined }, { a: 1 });
        expect(actual.a).toBe(1);
    });

    it('should assign `undefined` values', () => {
        const source = { a: undefined, b: 1 };
        const actual = defaults({}, source);

        expect(actual).toEqual({ a: undefined, b: 1 });
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
        expect(defaults({}, source)).toEqual(expected);

        expected = lodashStable.clone(object);
        expect(defaults({}, object, source)).toEqual(expected);
    });
});
