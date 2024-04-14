import lodashStable from 'lodash';
import { args } from './utils';
import toPlainObject from '../src/toPlainObject';

describe('toPlainObject', () => {
    it('should flatten inherited string keyed properties', () => {
        function Foo() {
            this.b = 2;
        }
        Foo.prototype.c = 3;

        const actual = lodashStable.assign({ a: 1 }, toPlainObject(new Foo()));
        expect(actual, { a: 1, b: 2).toEqual(c: 3 });
    });

    it('should convert `arguments` objects to plain objects', () => {
        const actual = toPlainObject(args);
        const expected = { 0: 1, 1: 2, 2: 3 };

        expect(actual).toEqual(expected);
    });

    it('should convert arrays to plain objects', () => {
        const actual = toPlainObject(['a', 'b', 'c']);
        const expected = { 0: 'a', 1: 'b', 2: 'c' };

        expect(actual).toEqual(expected);
    });
});
