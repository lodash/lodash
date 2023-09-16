import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, falsey, stubObject, noop } from './utils';

describe('mapKeys and mapValues', () => {
    lodashStable.each(['mapKeys', 'mapValues'], (methodName) => {
        const func = _[methodName],
            object = { a: 1, b: 2 };

        it(`\`_.${methodName}\` should iterate over own string keyed properties of objects`, () => {
            function Foo() {
                this.a = 'a';
            }
            Foo.prototype.b = 'b';

            const actual = func(new Foo(), (value, key) => key);
            assert.deepStrictEqual(actual, { a: 'a' });
        });

        it(`\`_.${methodName}\` should accept a falsey \`object\``, () => {
            const expected = lodashStable.map(falsey, stubObject);

            const actual = lodashStable.map(falsey, (object, index) => {
                try {
                    return index ? func(object) : func();
                } catch (e) {}
            });

            assert.deepStrictEqual(actual, expected);
        });

        it(`\`_.${methodName}\` should return a wrapped value when chaining`, () => {
            assert.ok(_(object)[methodName](noop) instanceof _);
        });
    });
});
