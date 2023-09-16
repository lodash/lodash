import assert from 'node:assert';
import lodashStable from 'lodash';

describe('lodash(...) methods that return the wrapped modified array', () => {
    const funcs = ['push', 'reverse', 'sort', 'unshift'];

    lodashStable.each(funcs, (methodName) => {
        it(`\`_(...).${methodName}\` should return a new wrapper`, () => {
            const array = [1, 2, 3],
                wrapped = _(array),
                actual = wrapped[methodName]();

            assert.ok(actual instanceof _);
            assert.notStrictEqual(actual, wrapped);
        });
    });
});
