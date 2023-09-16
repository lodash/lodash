import assert from 'node:assert';
import lodashStable from 'lodash';
import { identity, falsey, stubArray, document, noop, LARGE_ARRAY_SIZE, square } from './utils';
import map from '../src/map';

describe('map', () => {
    const array = [1, 2];

    it('should map values in `collection` to a new array', () => {
        const object = { a: 1, b: 2 },
            expected = ['1', '2'];

        assert.deepStrictEqual(map(array, String), expected);
        assert.deepStrictEqual(map(object, String), expected);
    });

    it('should work with `_.property` shorthands', () => {
        const objects = [{ a: 'x' }, { a: 'y' }];
        assert.deepStrictEqual(map(objects, 'a'), ['x', 'y']);
    });

    it('should iterate over own string keyed properties of objects', () => {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        const actual = map(new Foo(), identity);
        assert.deepStrictEqual(actual, [1]);
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const object = { a: 1, b: 2 },
            values = [, null, undefined],
            expected = lodashStable.map(values, lodashStable.constant([1, 2]));

        lodashStable.each([array, object], (collection) => {
            const actual = lodashStable.map(values, (value, index) =>
                index ? map(collection, value) : map(collection),
            );

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should accept a falsey `collection`', () => {
        const expected = lodashStable.map(falsey, stubArray);

        const actual = lodashStable.map(falsey, (collection, index) => {
            try {
                return index ? map(collection) : map();
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should treat number values for `collection` as empty', () => {
        assert.deepStrictEqual(map(1), []);
    });

    it('should treat a nodelist as an array-like object', () => {
        if (document) {
            const actual = map(document.getElementsByTagName('body'), (element) =>
                element.nodeName.toLowerCase(),
            );

            assert.deepStrictEqual(actual, ['body']);
        }
    });

    it('should work with objects with non-number length properties', () => {
        const value = { value: 'x' },
            object = { length: { value: 'x' } };

        assert.deepStrictEqual(map(object, identity), [value]);
    });

    it('should return a wrapped value when chaining', () => {
        assert.ok(_(array).map(noop) instanceof _);
    });

    it('should provide correct `predicate` arguments in a lazy sequence', () => {
        let args,
            array = lodashStable.range(LARGE_ARRAY_SIZE + 1),
            expected = [1, 0, map(array.slice(1), square)];

        _(array)
            .slice(1)
            .map(function (value, index, array) {
                args || (args = slice.call(arguments));
            })
            .value();

        assert.deepEqual(args, [1, 0, array.slice(1)]);

        args = undefined;
        _(array)
            .slice(1)
            .map(square)
            .map(function (value, index, array) {
                args || (args = slice.call(arguments));
            })
            .value();

        assert.deepEqual(args, expected);

        args = undefined;
        _(array)
            .slice(1)
            .map(square)
            .map(function (value, index) {
                args || (args = slice.call(arguments));
            })
            .value();

        assert.deepEqual(args, expected);

        args = undefined;
        _(array)
            .slice(1)
            .map(square)
            .map(function (value) {
                args || (args = slice.call(arguments));
            })
            .value();

        assert.deepEqual(args, [1]);

        args = undefined;
        _(array)
            .slice(1)
            .map(square)
            .map(function () {
                args || (args = slice.call(arguments));
            })
            .value();

        assert.deepEqual(args, expected);
    });
});
