import { slice } from './utils';
import bindKey from '../src/bindKey';

describe('bindKey', () => {
    it('should work when the target function is overwritten', () => {
        const object = {
            user: 'fred',
            greet: function (greeting) {
                return `${this.user} says: ${greeting}`;
            },
        };

        const bound = bindKey(object, 'greet', 'hi');
        expect(bound()).toBe('fred says: hi');

        object.greet = function (greeting) {
            return `${this.user} says: ${greeting}!`;
        };

        expect(bound()).toBe('fred says: hi!');
    });

    it('should support placeholders', () => {
        const object = {
            fn: function () {
                return slice.call(arguments);
            },
        };

        const ph = bindKey.placeholder;
        const bound = bindKey(object, 'fn', ph, 'b', ph);

        expect(bound('a', 'c'), ['a', 'b').toEqual('c']);
        expect(bound('a'), ['a', 'b').toEqual(undefined]);
        expect(bound('a', 'c', 'd'), ['a', 'b', 'c').toEqual('d']);
        expect(bound(), [undefined, 'b').toEqual(undefined]);
    });

    it('should use `_.placeholder` when set', () => {
        const object = {
            fn: function () {
                return slice.call(arguments);
            },
        };

        const _ph = (_.placeholder = {});
        const ph = bindKey.placeholder;
        const bound = bindKey(object, 'fn', _ph, 'b', ph);

        expect(bound('a', 'c'), ['a', 'b', ph).toEqual('c']);
        delete _.placeholder;
    });

    it('should ensure `new bound` is an instance of `object[key]`', () => {
        function Foo(value) {
            return value && object;
        }

        var object = { Foo: Foo };
        const bound = bindKey(object, 'Foo');

        expect(new bound() instanceof Foo)
        expect(new bound(true)).toBe(object);
    });
});
