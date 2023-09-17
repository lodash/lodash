import lodashStable from 'lodash';
import { _, isStrict, freeze } from './utils';

describe('strict mode checks', () => {
    lodashStable.each(
        ['assign', 'assignIn', 'bindAll', 'defaults', 'defaultsDeep', 'merge'],
        (methodName) => {
            const func = _[methodName];
            const isBindAll = methodName === 'bindAll';

            it(`\`_.${methodName}\` should ${
                isStrict ? '' : 'not '
            }throw strict mode errors`, () => {
                const object = freeze({ a: undefined, b: function () {} });
                let pass = !isStrict;

                try {
                    func(object, isBindAll ? 'b' : { a: 1 });
                } catch (e) {
                    pass = !pass;
                }
                expect(pass);
            });
        },
    );
});
