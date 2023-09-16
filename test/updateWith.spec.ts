import assert from 'node:assert';
import lodashStable from 'lodash';
import { stubThree, stubFour, noop } from './utils';
import updateWith from '../src/updateWith';

describe('updateWith', () => {
    it('should work with a `customizer` callback', () => {
        const actual = updateWith({ '0': {} }, '[0][1][2]', stubThree, (value) =>
            lodashStable.isObject(value) ? undefined : {},
        );

        assert.deepStrictEqual(actual, { '0': { '1': { '2': 3 } } });
    });

    it('should work with a `customizer` that returns `undefined`', () => {
        const actual = updateWith({}, 'a[0].b.c', stubFour, noop);
        assert.deepStrictEqual(actual, { a: [{ b: { c: 4 } }] });
    });
});
