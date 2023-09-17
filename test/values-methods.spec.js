import lodashStable from 'lodash';
import { _, args, strictArgs } from './utils';

describe('values methods', () => {
    lodashStable.each(['values', 'valuesIn'], (methodName) => {
        const func = _[methodName];
        const isValues = methodName === 'values';

        it(`\`_.${methodName}\` should get string keyed values of \`object\``, () => {
            const object = { a: 1, b: 2 };
            const actual = func(object).sort();

            expect(actual).toEqual([1, 2]);
        });

        it(`\`_.${methodName}\` should work with an object that has a \`length\` property`, () => {
            const object = { 0: 'a', 1: 'b', length: 2 };
            const actual = func(object).sort();

            expect(actual).toEqual([2, 'a', 'b']);
        });

        it(`\`_.${methodName}\` should ${
            isValues ? 'not ' : ''
        }include inherited string keyed property values`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const expected = isValues ? [1] : [1, 2];
            const actual = func(new Foo()).sort();

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
            const values = [args, strictArgs];
            const expected = lodashStable.map(values, lodashStable.constant([1, 2, 3]));

            const actual = lodashStable.map(values, (value) => func(value).sort());

            expect(actual).toEqual(expected);
        });
    });
});
