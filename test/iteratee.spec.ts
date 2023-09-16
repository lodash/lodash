import assert from 'node:assert';
import lodashStable from 'lodash';
import { slice, _, isNpm, push, stubFalse } from './utils';
import partial from '../src/partial';
import partialRight from '../src/partialRight';
import map from '../src/map';

describe('iteratee', () => {
    it('should provide arguments to `func`', () => {
        const fn = function () {
                return slice.call(arguments);
            },
            iteratee = _.iteratee(fn),
            actual = iteratee('a', 'b', 'c', 'd', 'e', 'f');

        assert.deepStrictEqual(actual, ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('should return `_.identity` when `func` is nullish', () => {
        const object = {},
            values = [, null, undefined],
            expected = lodashStable.map(
                values,
                lodashStable.constant([!isNpm && _.identity, object]),
            );

        const actual = lodashStable.map(values, (value, index) => {
            const identity = index ? _.iteratee(value) : _.iteratee();
            return [!isNpm && identity, identity(object)];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an iteratee created by `_.matches` when `func` is an object', () => {
        const matches = _.iteratee({ a: 1, b: 2 });
        assert.strictEqual(matches({ a: 1, b: 2, c: 3 }), true);
        assert.strictEqual(matches({ b: 2 }), false);
    });

    it('should not change `_.matches` behavior if `source` is modified', () => {
        const sources = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

        lodashStable.each(sources, (source, index) => {
            const object = lodashStable.cloneDeep(source),
                matches = _.iteratee(source);

            assert.strictEqual(matches(object), true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            assert.strictEqual(matches(object), true);
            assert.strictEqual(matches(source), false);
        });
    });

    it('should return an iteratee created by `_.matchesProperty` when `func` is an array', () => {
        let array = ['a', undefined],
            matches = _.iteratee([0, 'a']);

        assert.strictEqual(matches(array), true);

        matches = _.iteratee(['0', 'a']);
        assert.strictEqual(matches(array), true);

        matches = _.iteratee([1, undefined]);
        assert.strictEqual(matches(array), true);
    });

    it('should support deep paths for `_.matchesProperty` shorthands', () => {
        const object = { a: { b: { c: 1, d: 2 } } },
            matches = _.iteratee(['a.b', { c: 1 }]);

        assert.strictEqual(matches(object), true);
    });

    it('should not change `_.matchesProperty` behavior if `source` is modified', () => {
        const sources = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

        lodashStable.each(sources, (source, index) => {
            const object = { a: lodashStable.cloneDeep(source) },
                matches = _.iteratee(['a', source]);

            assert.strictEqual(matches(object), true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            assert.strictEqual(matches(object), true);
            assert.strictEqual(matches({ a: source }), false);
        });
    });

    it('should return an iteratee created by `_.property` when `func` is a number or string', () => {
        let array = ['a'],
            prop = _.iteratee(0);

        assert.strictEqual(prop(array), 'a');

        prop = _.iteratee('0');
        assert.strictEqual(prop(array), 'a');
    });

    it('should support deep paths for `_.property` shorthands', () => {
        const object = { a: { b: 2 } },
            prop = _.iteratee('a.b');

        assert.strictEqual(prop(object), 2);
    });

    it('should work with functions created by `_.partial` and `_.partialRight`', () => {
        const fn = function () {
            const result = [this.a];
            push.apply(result, arguments);
            return result;
        };

        const expected = [1, 2, 3],
            object = { a: 1, iteratee: _.iteratee(partial(fn, 2)) };

        assert.deepStrictEqual(object.iteratee(3), expected);

        object.iteratee = _.iteratee(partialRight(fn, 3));
        assert.deepStrictEqual(object.iteratee(2), expected);
    });

    it('should use internal `iteratee` if external is unavailable', () => {
        const iteratee = _.iteratee;
        delete _.iteratee;

        assert.deepStrictEqual(map([{ a: 1 }], 'a'), [1]);

        _.iteratee = iteratee;
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const fn = function () {
                return this instanceof Number;
            },
            array = [fn, fn, fn],
            iteratees = lodashStable.map(array, _.iteratee),
            expected = lodashStable.map(array, stubFalse);

        const actual = lodashStable.map(iteratees, (iteratee) => iteratee());

        assert.deepStrictEqual(actual, expected);
    });
});
