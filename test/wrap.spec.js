import lodashStable from 'lodash';
import { noop, slice, stubA } from './utils';
import wrap from '../src/wrap';

describe('wrap', () => {
    it('should create a wrapped function', () => {
        const p = wrap(lodashStable.escape, (func, text) => `<p>${func(text)}</p>`);

        expect(p('fred, barney, & pebbles')).toBe('<p>fred, barney &amp; pebbles</p>');
    });

    it('should provide correct `wrapper` arguments', () => {
        let args;

        const wrapped = wrap(noop, function () {
            args || (args = slice.call(arguments));
        });

        wrapped(1, 2, 3);
        expect(args).toEqual([noop, 1, 2, 3]);
    });

    it('should use `_.identity` when `wrapper` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, stubA);

        const actual = lodashStable.map(values, (value, index) => {
            const wrapped = index ? wrap('a', value) : wrap('a');
            return wrapped('b', 'c');
        });

        expect(actual).toEqual(expected);
    });

    it('should use `this` binding of function', () => {
        const p = wrap(lodashStable.escape, function (func) {
            return `<p>${func(this.text)}</p>`;
        });

        const object = { p: p, text: 'fred, barney, & pebbles' };
        expect(object.p()).toBe('<p>fred, barney &amp; pebbles</p>');
    });
});
