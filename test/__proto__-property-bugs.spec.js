import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, isEven, _, create, stubFalse, objectProto, funcProto } from './utils';
import difference from '../src/difference';
import intersection from '../src/intersection';
import uniq from '../src/uniq';
import without from '../src/without';
import groupBy from '../src/groupBy';
import merge from '../src/merge';

describe('`__proto__` property bugs', () => {
    it('should work with the "__proto__" key in internal data objects', () => {
        const stringLiteral = '__proto__';
        const stringObject = Object(stringLiteral);
        const expected = [stringLiteral, stringObject];

        const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, (count) =>
            isEven(count) ? stringLiteral : stringObject,
        );

        expect(difference(largeArray, largeArray)).toEqual([]);
        expect(intersection(largeArray, largeArray)).toEqual(expected);
        expect(uniq(largeArray)).toEqual(expected);
        expect(without.apply(_, [largeArray].concat(largeArray))).toEqual([]);
    });

    it('should treat "__proto__" as a regular key in assignments', () => {
        const methods = ['assign', 'assignIn', 'defaults', 'defaultsDeep', 'merge'];

        const source = create(null);
        source.__proto__ = [];

        const expected = lodashStable.map(methods, stubFalse);

        let actual = lodashStable.map(methods, (methodName) => {
            const result = _[methodName]({}, source);
            return result instanceof Array;
        });

        expect(actual).toEqual(expected);

        actual = groupBy([{ a: '__proto__' }], 'a');
        expect(actual instanceof Array).toBe(false);
    });

    it('should not merge "__proto__" properties', () => {
        if (JSON) {
            merge({}, JSON.parse('{"__proto__":{"a":1}}'));

            const actual = 'a' in objectProto;
            delete objectProto.a;

            expect(actual).toBe(false);
        }
    });

    it('should not indirectly merge builtin prototype properties', () => {
        merge({}, { toString: { constructor: { prototype: { a: 1 } } } });

        let actual = 'a' in funcProto;
        delete funcProto.a;

        expect(actual).toBe(false);

        merge({}, { constructor: { prototype: { a: 1 } } });

        actual = 'a' in objectProto;
        delete objectProto.a;

        expect(actual).toBe(false);
    });

    it('should not indirectly merge `Object` properties', () => {
        merge({}, { constructor: { a: 1 } });

        const actual = 'a' in Object;
        delete Object.a;

        expect(actual).toBe(false);
    });
});
