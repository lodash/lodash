import lodashStable from 'lodash';
import { noop } from './utils';
import setWith from '../src/setWith';

describe('setWith', () => {
    it('should work with a `customizer` callback', () => {
        const actual = setWith({ 0: {} }, '[0][1][2]', 3, (value) =>
            lodashStable.isObject(value) ? undefined : {},
        );

        expect(actual).toEqual({ 0: { 1: { 2: 3 } } });
    });

    it('should work with a `customizer` that returns `undefined`', () => {
        const actual = setWith({}, 'a[0].b.c', 4, noop);
        expect(actual).toEqual({ a: [{ b: { c: 4 } }] });
    });
});
