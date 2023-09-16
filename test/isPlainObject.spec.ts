import assert from 'node:assert';
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

        assert.strictEqual(isPlainObject({}), true);
        assert.strictEqual(isPlainObject({ a: 1 }), true);
        assert.strictEqual(isPlainObject({ constructor: Foo }), true);
        assert.strictEqual(isPlainObject([1, 2, 3]), false);
        assert.strictEqual(isPlainObject(new Foo(1)), false);
    });

    it('should return `true` for objects with a `[[Prototype]]` of `null`', () => {
        const object = create(null);
        assert.strictEqual(isPlainObject(object), true);

        object.constructor = objectProto.constructor;
        assert.strictEqual(isPlainObject(object), true);
    });

    it('should return `true` for objects with a `valueOf` property', () => {
        assert.strictEqual(isPlainObject({ valueOf: 0 }), true);
    });

    it('should return `true` for objects with a writable `Symbol.toStringTag` property', () => {
        if (Symbol && Symbol.toStringTag) {
            const object = {};
            object[Symbol.toStringTag] = 'X';

            assert.deepStrictEqual(isPlainObject(object), true);
        }
    });

    it('should return `false` for objects with a custom `[[Prototype]]`', () => {
        const object = create({ a: 1 });
        assert.strictEqual(isPlainObject(object), false);
    });

    it('should return `false` for DOM elements', () => {
        if (element) {
            assert.strictEqual(isPlainObject(element), false);
        }
    });

    it('should return `false` for non-Object objects', function () {
        assert.strictEqual(isPlainObject(arguments), false);
        assert.strictEqual(isPlainObject(Error), false);
        assert.strictEqual(isPlainObject(Math), false);
    });

    it('should return `false` for non-objects', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isPlainObject(value) : isPlainObject(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isPlainObject(true), false);
        assert.strictEqual(isPlainObject('a'), false);
        assert.strictEqual(isPlainObject(symbol), false);
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

            assert.deepStrictEqual(isPlainObject(object), false);
        }
    });

    it('should not mutate `value`', () => {
        if (Symbol && Symbol.toStringTag) {
            const proto = {};
            proto[Symbol.toStringTag] = undefined;
            const object = create(proto);

            assert.strictEqual(isPlainObject(object), false);
            assert.ok(!lodashStable.has(object, Symbol.toStringTag));
        }
    });

    it('should work with objects from another realm', () => {
        if (realm.object) {
            assert.strictEqual(isPlainObject(realm.object), true);
        }
    });
});
