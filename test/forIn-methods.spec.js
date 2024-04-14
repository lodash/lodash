import lodashStable from 'lodash';
import { _ } from './utils';

describe('forIn methods', () => {
    lodashStable.each(['forIn', 'forInRight'], (methodName) => {
        const func = _[methodName];

        it(`\`_.${methodName}\` iterates over inherited string keyed properties`, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const keys = [];
            func(new Foo(), (value, key) => {
                keys.push(key);
            });
            expect(keys.sort()).toEqual(['a', 'b']);
        });
    });
});
