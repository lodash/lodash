import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, args, strictArgs } from './utils';

describe('values methods', () => {
    lodashStable.each(['values', 'valuesIn'], (methodName) => {
        const func = _[methodName],
            isValues = methodName == 'values';

        it(`\`_.${methodName}\` should get string keyed values of \`object\``, () => {
            const object = { a: 1, b: 2 },
                actual = func(object).sort();

            assert.deepStrictEqual(actual, [1, 2]);
        });

        it(`\`_.${methodName}\` should work with an object that has a \`length\` property`, () => {
            const object = { '0': 'a', '1': 'b', length: 2 },
                actual = func(object).sort();

            assert.deepStrictEqual(actual, [2, 'a', 'b']);
        });

        it(`\`_.${methodName}\` should ${
            isValues ? 'not ' : ''
        }include inherited string keyed property values`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const expected = isValues ? [1] : [1, 2],
                actual = func(new Foo()).sort();

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            const values = [args, strictArgs],
                expected = lodashStable.map(values, lodashStable.constant([1, 2, 3]));

            const actual = lodashStable.map(values, (value) => func(value).sort());

            assert.deepStrictEqual(actual, expected);
        });
    });
});
