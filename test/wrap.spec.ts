import assert from 'node:assert';
import lodashStable from 'lodash';
import { noop, slice, stubA } from './utils';
import wrap from '../src/wrap';

describe('wrap', () => {
    it('should create a wrapped function', () => {
        const p = wrap(lodashStable.escape, (func, text) => `<p>${func(text)}</p>`);

        assert.strictEqual(p('fred, barney, & pebbles'), '<p>fred, barney, &amp; pebbles</p>');
    });

    it('should provide correct `wrapper` arguments', () => {
        let args;

        const wrapped = wrap(noop, function () {
            args || (args = slice.call(arguments));
        });

        wrapped(1, 2, 3);
        assert.deepStrictEqual(args, [noop, 1, 2, 3]);
    });

    it('should use `_.identity` when `wrapper` is nullish', () => {
        const values = [, null, undefined],
            expected = lodashStable.map(values, stubA);

        const actual = lodashStable.map(values, (value, index) => {
            const wrapped = index ? wrap('a', value) : wrap('a');
            return wrapped('b', 'c');
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should use `this` binding of function', () => {
        const p = wrap(lodashStable.escape, function (func) {
            return `<p>${func(this.text)}</p>`;
        });

        const object = { p: p, text: 'fred, barney, & pebbles' };
        assert.strictEqual(object.p(), '<p>fred, barney, &amp; pebbles</p>');
    });
});
