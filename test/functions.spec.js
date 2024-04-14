import { identity, noop } from './utils';
import functions from '../src/functions';

describe('functions', () => {
    it('should return the function names of an object', () => {
        const object = { a: 'a', b: identity, c: /x/, d: noop };
        const actual = functions(object).sort();

        expect(actual).toEqual(['b', 'd']);
    });

    it('should not include inherited functions', () => {
        function Foo() {
            this.a = identity;
            this.b = 'b';
        }
        Foo.prototype.c = noop;

        expect(functions(new Foo())).toEqual(['a']);
    });
});
