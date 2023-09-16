import assert from 'node:assert';
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
        const stringLiteral = '__proto__',
            stringObject = Object(stringLiteral),
            expected = [stringLiteral, stringObject];

        const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, (count) =>
            isEven(count) ? stringLiteral : stringObject,
        );

        assert.deepStrictEqual(difference(largeArray, largeArray), []);
        assert.deepStrictEqual(intersection(largeArray, largeArray), expected);
        assert.deepStrictEqual(uniq(largeArray), expected);
        assert.deepStrictEqual(without.apply(_, [largeArray].concat(largeArray)), []);
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

        assert.deepStrictEqual(actual, expected);

        actual = groupBy([{ a: '__proto__' }], 'a');
        assert.ok(!(actual instanceof Array));
    });

    it('should not merge "__proto__" properties', () => {
        if (JSON) {
            merge({}, JSON.parse('{"__proto__":{"a":1}}'));

            const actual = 'a' in objectProto;
            delete objectProto.a;

            assert.ok(!actual);
        }
    });

    it('should not indirectly merge builtin prototype properties', () => {
        merge({}, { toString: { constructor: { prototype: { a: 1 } } } });

        let actual = 'a' in funcProto;
        delete funcProto.a;

        assert.ok(!actual);

        merge({}, { constructor: { prototype: { a: 1 } } });

        actual = 'a' in objectProto;
        delete objectProto.a;

        assert.ok(!actual);
    });

    it('should not indirectly merge `Object` properties', () => {
        merge({}, { constructor: { a: 1 } });

        const actual = 'a' in Object;
        delete Object.a;

        assert.ok(!actual);
    });
});
