import lodashStable from 'lodash';
import { _ } from './utils';

describe('update methods', () => {
    lodashStable.each(['update', 'updateWith'], (methodName) => {
        const func = _[methodName];
        const oldValue = 1;

        it(`\`_.${methodName}\` should invoke \`updater\` with the value on \`path\` of \`object\``, () => {
            const object = { a: [{ b: { c: oldValue } }] };
            const expected = oldValue + 1;

            lodashStable.each(['a[0].b.c', ['a', '0', 'b', 'c']], (path) => {
                func(object, path, (n) => {
                    expect(n).toBe(oldValue);
                    return ++n;
                });

                expect(object.a[0].b.c).toBe(expected);
                object.a[0].b.c = oldValue;
            });
        });
    });
});
