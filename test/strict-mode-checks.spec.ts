import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, isStrict, freeze } from './utils';

describe('strict mode checks', () => {
    lodashStable.each(
        ['assign', 'assignIn', 'bindAll', 'defaults', 'defaultsDeep', 'merge'],
        (methodName) => {
            const func = _[methodName],
                isBindAll = methodName === 'bindAll';

            it(`\`_.${methodName}\` should ${
                isStrict ? '' : 'not '
            }throw strict mode errors`, () => {
                let object = freeze({ a: undefined, b: function () {} }),
                    pass = !isStrict;

                try {
                    func(object, isBindAll ? 'b' : { a: 1 });
                } catch (e) {
                    pass = !pass;
                }
                assert.ok(pass);
            });
        },
    );
});
