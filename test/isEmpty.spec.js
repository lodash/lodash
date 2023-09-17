import lodashStable from 'lodash';

import {
    empties,
    stubTrue,
    slice,
    symbol,
    args,
    push,
    arrayProto,
    realm,
    MAX_SAFE_INTEGER,
} from './utils';

import isEmpty from '../src/isEmpty';

describe('isEmpty', () => {
    it('should return `true` for empty values', () => {
        const expected = lodashStable.map(empties, stubTrue);
        const actual = lodashStable.map(empties, isEmpty);

        expect(actual).toEqual(expected);

        expect(isEmpty(true)).toBe(true);
        expect(isEmpty(slice)).toBe(true);
        expect(isEmpty(1)).toBe(true);
        expect(isEmpty(NaN)).toBe(true);
        expect(isEmpty(/x/)).toBe(true);
        expect(isEmpty(symbol)).toBe(true);
        expect(isEmpty()).toBe(true);

        if (Buffer) {
            expect(isEmpty(Buffer.alloc(0))).toBe(true);
            expect(isEmpty(Buffer.alloc(1))).toBe(false);
        }
    });

    it('should return `false` for non-empty values', () => {
        expect(isEmpty([0])).toBe(false);
        expect(isEmpty({ a: 0 })).toBe(false);
        expect(isEmpty('a')).toBe(false);
    });

    it('should work with an object that has a `length` property', () => {
        expect(isEmpty({ length: 0 })).toBe(false);
    });

    it('should work with `arguments` objects', () => {
        expect(isEmpty(args)).toBe(false);
    });

    it('should work with prototype objects', () => {
        function Foo() {}
        Foo.prototype = { constructor: Foo };

        expect(isEmpty(Foo.prototype)).toBe(true);

        Foo.prototype.a = 1;
        expect(isEmpty(Foo.prototype)).toBe(false);
    });

    it('should work with jQuery/MooTools DOM query collections', () => {
        function Foo(elements) {
            push.apply(this, elements);
        }
        Foo.prototype = { length: 0, splice: arrayProto.splice };

        expect(isEmpty(new Foo([]))).toBe(true);
    });

    it('should work with maps', () => {
        if (Map) {
            lodashStable.each([new Map(), realm.map], (map) => {
                expect(isEmpty(map)).toBe(true);
                map.set('a', 1);
                expect(isEmpty(map)).toBe(false);
                map.clear();
            });
        }
    });

    it('should work with sets', () => {
        if (Set) {
            lodashStable.each([new Set(), realm.set], (set) => {
                expect(isEmpty(set)).toBe(true);
                set.add(1);
                expect(isEmpty(set)).toBe(false);
                set.clear();
            });
        }
    });

    it('should not treat objects with negative lengths as array-like', () => {
        function Foo() {}
        Foo.prototype.length = -1;

        expect(isEmpty(new Foo())).toBe(true);
    });

    it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
        function Foo() {}
        Foo.prototype.length = MAX_SAFE_INTEGER + 1;

        expect(isEmpty(new Foo())).toBe(true);
    });

    it('should not treat objects with non-number lengths as array-like', () => {
        expect(isEmpty({ length: '0' })).toBe(false);
    });

    it('should return an unwrapped value when implicitly chaining', () => {
        expect(_({}).isEmpty()).toBe(true);
    });

    it('should return a wrapped value when explicitly chaining', () => {
        expect(_({}).chain().isEmpty() instanceof _);
    });
});
