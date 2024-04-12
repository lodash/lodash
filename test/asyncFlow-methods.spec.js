import lodashStable from 'lodash';
import { add, square, noop, identity } from './utils';
import head from '../src/head';
import map from '../src/map';
import uniq from '../src/uniq';
import asyncFlow from '../src/asyncFlow';
import asyncFlowRight from '../src/asyncFlowRight';

const methods = {
    asyncFlow,
    asyncFlowRight,
};

const asyncIdentity = Promise.resolve(identity);

describe('asyncFlow methods', () => {
    lodashStable.each(['asyncFlow', 'asyncFlowRight'], (methodName) => {
        const func = methods[methodName];
        const isAsyncFlow = methodName === 'asyncFlow';

        it(`\`_.${methodName}\` should supply each function with the return value of the previous`, async () => {
            const fixed = function (n) {
                return n.toFixed(1);
            };
            const combined = isAsyncFlow
                ? func(add, asyncIdentity, square, fixed)
                : func(fixed, square, asyncIdentity, add);

            await expect(combined(1, 2)).resolves.toBe('9.0');
        });

        it(`\`_.${methodName}\` should return a new function`, () => {
            assert.notStrictEqual(func(noop), noop);
        });

        it(`\`_.${methodName}\` should work with a curried function and \`_.head\``, async () => {
            const curried = lodashStable.curry(asyncIdentity);

            const combined = isAsyncFlow ? func(head, curried) : func(curried, head);

            await expect(combined([1])).resolves.toBe(1);
        });

        it(`\`_.${methodName}\` should work with curried functions with placeholders`, () => {
            const curried = lodashStable.curry(lodashStable.ary(map, 2), 2);
            const getProp = curried(curried.placeholder, (value) => value.a);
            const objects = [{ a: 1 }, { a: 2 }, { a: 1 }];

            const combined = isAsyncFlow ? func(getProp, uniq) : func(uniq, getProp);

            expect(combined(objects)).toEqual([1, 2]);
        });
    });
});
