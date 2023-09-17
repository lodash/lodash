import lodashStable from 'lodash';

import {
    document,
    create,
    objectProto,
    falsey,
    stubFalse,
    symbol,
    defineProperty,
    realm,
} from './utils';

import isPlainObject from '../src/isPlainObject';

describe('isPlainObject', () => {
    const element = document && document.createElement('div');

    it('should detect plain objects', () => {
        function Foo(a) {
            this.a = 1;
        }

        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject({ a: 1 })).toBe(true);
        expect(isPlainObject({ constructor: Foo })).toBe(true);
        expect(isPlainObject([1, 2, 3])).toBe(false);
        expect(isPlainObject(new Foo(1))).toBe(false);
    });

    it('should return `true` for objects with a `[[Prototype]]` of `null`', () => {
        const object = create(null);
        expect(isPlainObject(object)).toBe(true);

        object.constructor = objectProto.constructor;
        expect(isPlainObject(object)).toBe(true);
    });

    it('should return `true` for objects with a `valueOf` property', () => {
        expect(isPlainObject({ valueOf: 0 })).toBe(true);
    });

    it('should return `true` for objects with a writable `Symbol.toStringTag` property', () => {
        if (Symbol && Symbol.toStringTag) {
            const object = {};
            object[Symbol.toStringTag] = 'X';

            expect(isPlainObject(object)).toEqual(true);
        }
    });

    it('should return `false` for objects with a custom `[[Prototype]]`', () => {
        const object = create({ a: 1 });
        expect(isPlainObject(object)).toBe(false);
    });

    it('should return `false` for DOM elements', () => {
        if (element) {
            expect(isPlainObject(element)).toBe(false);
        }
    });

    it('should return `false` for non-Object objects', function () {
        expect(isPlainObject(arguments)).toBe(false);
        expect(isPlainObject(Error)).toBe(false);
        expect(isPlainObject(Math)).toBe(false);
    });

    it('should return `false` for non-objects', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isPlainObject(value) : isPlainObject(),
        );

        expect(actual).toEqual(expected);

        expect(isPlainObject(true)).toBe(false);
        expect(isPlainObject('a')).toBe(false);
        expect(isPlainObject(symbol)).toBe(false);
    });

    it('should return `false` for objects with a read-only `Symbol.toStringTag` property', () => {
        if (Symbol && Symbol.toStringTag) {
            const object = {};
            defineProperty(object, Symbol.toStringTag, {
                configurable: true,
                enumerable: false,
                writable: false,
                value: 'X',
            });

            expect(isPlainObject(object)).toEqual(false);
        }
    });

    it('should not mutate `value`', () => {
        if (Symbol && Symbol.toStringTag) {
            const proto = {};
            proto[Symbol.toStringTag] = undefined;
            const object = create(proto);

            expect(isPlainObject(object)).toBe(false);
            expect(lodashStable.has(object, Symbol.toStringTag)).toBe(false);
        }
    });

    it('should work with objects from another realm', () => {
        if (realm.object) {
            expect(isPlainObject(realm.object)).toBe(true);
        }
    });
});
