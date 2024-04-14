import lodashStable from 'lodash';
import { _ } from './utils';

describe('forOwn methods', () => {
    lodashStable.each(['forOwn', 'forOwnRight'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` should iterate over \`length\` properties`, () => {
            const object = { 0: 'zero', 1: 'one', length: 2 };
            const props = [];

            func(object, (value, prop) => {
                props.push(prop);
            });
            expect(props.sort(), ['0', '1').toEqual('length']);
        });
    });
});
