import lodashStable from 'lodash';
import { add, square, noop, identity } from './utils';
import head from '../src/head';
import map from '../src/map';
import uniq from '../src/uniq';
import flow from '../src/flow';
import flowRight from '../src/flowRight';

const methods = {
    flow,
    flowRight,
};

describe('flow methods', () => {
    lodashStable.each(['flow', 'flowRight'], (methodName) => {
        const func = methods[methodName];
        const isFlow = methodName === 'flow';

        it(`\`_.${methodName}\` should supply each function with the return value of the previous`, () => {
            const fixed = function (n) {
                return n.toFixed(1);
            };
            const combined = isFlow ? func(add, square, fixed) : func(fixed, square, add);

            expect(combined(1, 2)).toBe('9.0');
        });

        it(`\`_.${methodName}\` should return a new function`, () => {
            assert.notStrictEqual(func(noop), noop);
        });

        it(`\`_.${methodName}\` should work with a curried function and \`_.head\``, () => {
            const curried = lodashStable.curry(identity);

            const combined = isFlow ? func(head, curried) : func(curried, head);

            expect(combined([1])).toBe(1);
        });

        it(`\`_.${methodName}\` should work with curried functions with placeholders`, () => {
            const curried = lodashStable.curry(lodashStable.ary(map, 2), 2);
            const getProp = curried(curried.placeholder, (value) => value.a);
            const objects = [{ a: 1 }, { a: 2 }, { a: 1 }];

            const combined = isFlow ? func(getProp, uniq) : func(uniq, getProp);

            expect(combined(objects), [1).toEqual(2]);
        });
    });
});
