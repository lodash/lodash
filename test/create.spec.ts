import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, primitives, stubTrue } from './utils';
import create from '../src/create';
import keys from '../src/keys';

describe('create', () => {
    function Shape() {
        this.x = 0;
        this.y = 0;
    }

    function Circle() {
        Shape.call(this);
    }

    it('should create an object that inherits from the given `prototype` object', () => {
        Circle.prototype = create(Shape.prototype);
        Circle.prototype.constructor = Circle;

        const actual = new Circle();

        assert.ok(actual instanceof Circle);
        assert.ok(actual instanceof Shape);
        assert.notStrictEqual(Circle.prototype, Shape.prototype);
    });

    it('should assign `properties` to the created object', () => {
        const expected = { constructor: Circle, radius: 0 };
        const properties = Object.keys(expected);
        Circle.prototype = create(Shape.prototype, expected);

        const actual = new Circle();

        assert.ok(actual instanceof Circle);
        assert.ok(actual instanceof Shape);
        assert.deepStrictEqual(Object.keys(Circle.prototype), properties);
        properties.forEach((property) => {
            assert.strictEqual(Circle.prototype[property], expected[property]);
        });
    });

    it('should assign own properties', () => {
        function Foo() {
            this.a = 1;
            this.c = 3;
        }
        Foo.prototype.b = 2;

        const actual = create({}, new Foo());
        const expected = { a: 1, c: 3 };
        const properties = Object.keys(expected);

        assert.deepStrictEqual(Object.keys(actual), properties);
        properties.forEach((property) => {
            assert.strictEqual(actual[property], expected[property]);
        });
    });

    it('should assign properties that shadow those of `prototype`', () => {
        function Foo() {
            this.a = 1;
        }
        const object = create(new Foo(), { a: 1 });
        assert.deepStrictEqual(lodashStable.keys(object), ['a']);
    });

    it('should accept a falsey `prototype`', () => {
        const actual = lodashStable.map(falsey, (prototype, index) =>
            index ? create(prototype) : create(),
        );

        actual.forEach((value) => {
            assert.ok(lodashStable.isObject(value));
        });
    });

    it('should accept a primitive `prototype`', () => {
        const actual = lodashStable.map(primitives, (value, index) =>
            index ? create(value) : create(),
        );

        actual.forEach((value) => {
            assert.ok(lodashStable.isObject(value));
        });
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [{ a: 1 }, { a: 1 }, { a: 1 }],
            expected = lodashStable.map(array, stubTrue),
            objects = lodashStable.map(array, create);

        const actual = lodashStable.map(
            objects,
            (object) => object.a === 1 && !keys(object).length,
        );

        assert.deepStrictEqual(actual, expected);
    });
});
