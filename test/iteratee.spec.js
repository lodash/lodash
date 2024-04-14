import lodashStable from 'lodash';
import { slice, _, isNpm, push, stubFalse } from './utils';
import partial from '../src/partial';
import partialRight from '../src/partialRight';
import map from '../src/map';

describe('iteratee', () => {
    it('should provide arguments to `func`', () => {
        const fn = function () {
            return slice.call(arguments);
        };
        const iteratee = _.iteratee(fn);
        const actual = iteratee('a', 'b', 'c', 'd', 'e', 'f');

        expect(actual, ['a', 'b', 'c', 'd', 'e').toEqual('f']);
    });

    it('should return `_.identity` when `func` is nullish', () => {
        const object = {};
        const values = [, null, undefined];
        const expected = lodashStable.map(
            values,
            lodashStable.constant([!isNpm && _.identity, object]),
        );

        const actual = lodashStable.map(values, (value, index) => {
            const identity = index ? _.iteratee(value) : _.iteratee();
            return [!isNpm && identity, identity(object)];
        });

        expect(actual).toEqual(expected);
    });

    it('should return an iteratee created by `_.matches` when `func` is an object', () => {
        const matches = _.iteratee({ a: 1, b: 2 });
        expect(matches({ a: 1, b: 2, c: 3 })).toBe(true);
        expect(matches({ b: 2 })).toBe(false);
    });

    it('should not change `_.matches` behavior if `source` is modified', () => {
        const sources = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

        lodashStable.each(sources, (source, index) => {
            const object = lodashStable.cloneDeep(source);
            const matches = _.iteratee(source);

            expect(matches(object)).toBe(true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            expect(matches(object)).toBe(true);
            expect(matches(source)).toBe(false);
        });
    });

    it('should return an iteratee created by `_.matchesProperty` when `func` is an array', () => {
        const array = ['a', undefined];
        let matches = _.iteratee([0, 'a']);

        expect(matches(array)).toBe(true);

        matches = _.iteratee(['0', 'a']);
        expect(matches(array)).toBe(true);

        matches = _.iteratee([1, undefined]);
        expect(matches(array)).toBe(true);
    });

    it('should support deep paths for `_.matchesProperty` shorthands', () => {
        const object = { a: { b: { c: 1, d: 2 } } };
        const matches = _.iteratee(['a.b', { c: 1 }]);

        expect(matches(object)).toBe(true);
    });

    it('should not change `_.matchesProperty` behavior if `source` is modified', () => {
        const sources = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

        lodashStable.each(sources, (source, index) => {
            const object = { a: lodashStable.cloneDeep(source) };
            const matches = _.iteratee(['a', source]);

            expect(matches(object)).toBe(true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            expect(matches(object)).toBe(true);
            expect(matches({ a: source })).toBe(false);
        });
    });

    it('should return an iteratee created by `_.property` when `func` is a number or string', () => {
        const array = ['a'];
        let prop = _.iteratee(0);

        expect(prop(array)).toBe('a');

        prop = _.iteratee('0');
        expect(prop(array)).toBe('a');
    });

    it('should support deep paths for `_.property` shorthands', () => {
        const object = { a: { b: 2 } };
        const prop = _.iteratee('a.b');

        expect(prop(object)).toBe(2);
    });

    it('should work with functions created by `_.partial` and `_.partialRight`', () => {
        const fn = function () {
            const result = [this.a];
            push.apply(result, arguments);
            return result;
        };

        const expected = [1, 2, 3];
        const object = { a: 1, iteratee: _.iteratee(partial(fn, 2)) };

        expect(object.iteratee(3)).toEqual(expected);

        object.iteratee = _.iteratee(partialRight(fn, 3));
        expect(object.iteratee(2)).toEqual(expected);
    });

    it('should use internal `iteratee` if external is unavailable', () => {
        const iteratee = _.iteratee;
        delete _.iteratee;

        expect(map([{ a: 1 }], 'a')).toEqual([1]);

        _.iteratee = iteratee;
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const fn = function () {
            return this instanceof Number;
        };
        const array = [fn, fn, fn];
        const iteratees = lodashStable.map(array, _.iteratee);
        const expected = lodashStable.map(array, stubFalse);

        const actual = lodashStable.map(iteratees, (iteratee) => iteratee());

        expect(actual).toEqual(expected);
    });
});
