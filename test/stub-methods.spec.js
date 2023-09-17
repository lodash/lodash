import lodashStable from 'lodash';
import { _, empties } from './utils';

describe('stub methods', () => {
    lodashStable.each(
        ['noop', 'stubTrue', 'stubFalse', 'stubArray', 'stubObject', 'stubString'],
        (methodName) => {
            const func = _[methodName];

            const pair = {
                stubArray: [[], 'an empty array'],
                stubFalse: [false, '`false`'],
                stubObject: [{}, 'an empty object'],
                stubString: ['', 'an empty string'],
                stubTrue: [true, '`true`'],
                noop: [undefined, '`undefined`'],
            }[methodName];

            const values = Array(2).concat(empties, true, 1, 'a');
            const expected = lodashStable.map(values, lodashStable.constant(pair[0]));

            it(`\`_.${methodName}\` should return ${pair[1]}`, () => {
                const actual = lodashStable.map(values, (value, index) => {
                    if (index < 2) {
                        return index ? func.call({}) : func();
                    }
                    return func(value);
                });

                expect(actual).toEqual(expected);
            });
        },
    );
});
