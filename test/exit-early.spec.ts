import assert from 'node:assert';
import lodashStable from 'lodash';
import { _ } from './utils';

describe('exit early', () => {
    lodashStable.each(
        [
            '_baseEach',
            'forEach',
            'forEachRight',
            'forIn',
            'forInRight',
            'forOwn',
            'forOwnRight',
            'transform',
        ],
        (methodName) => {
            const func = _[methodName];

            it(`\`_.${methodName}\` can exit early when iterating arrays`, () => {
                if (func) {
                    const array = [1, 2, 3],
                        values = [];

                    func(array, (value, other) => {
                        values.push(lodashStable.isArray(value) ? other : value);
                        return false;
                    });

                    assert.deepStrictEqual(values, [
                        lodashStable.endsWith(methodName, 'Right') ? 3 : 1,
                    ]);
                }
            });

            it(`\`_.${methodName}\` can exit early when iterating objects`, () => {
                if (func) {
                    const object = { a: 1, b: 2, c: 3 },
                        values = [];

                    func(object, (value, other) => {
                        values.push(lodashStable.isArray(value) ? other : value);
                        return false;
                    });

                    assert.strictEqual(values.length, 1);
                }
            });
        },
    );
});
